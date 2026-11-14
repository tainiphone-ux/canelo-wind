// Recorta un trozo de vídeo y lo escala a 1080x1920 (sin recortar los lados).
// swift recorte.swift entrada.mp4 inicio duracion salida.mp4
import AVFoundation
let a = CommandLine.arguments
let src = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let t0 = Double(a[2])!, dur = Double(a[3])!
let out = URL(fileURLWithPath: a[4])
try? FileManager.default.removeItem(at: out)
let s = DispatchSemaphore(value: 0)
Task {
  let vt = try await src.loadTracks(withMediaType: .video).first!
  let at = try await src.loadTracks(withMediaType: .audio).first
  let size = try await vt.load(.naturalSize)
  let comp = AVMutableComposition()
  let range = CMTimeRange(start: CMTime(seconds: t0, preferredTimescale: 600), duration: CMTime(seconds: dur, preferredTimescale: 600))
  let cv = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
  try cv.insertTimeRange(range, of: vt, at: .zero)
  if let at = at {
    let ca = comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid)!
    try ca.insertTimeRange(range, of: at, at: .zero)
  }
  let W = 1080.0, H = 1920.0
  let k = min(W / size.width, H / size.height)
  let sc = CGAffineTransform(scaleX: k, y: k).concatenating(CGAffineTransform(translationX: (W - size.width * k) / 2, y: (H - size.height * k) / 2))
  let inst = AVMutableVideoCompositionLayerInstruction(assetTrack: cv)
  inst.setTransform(sc, at: .zero)
  let vci = AVMutableVideoCompositionInstruction()
  vci.timeRange = CMTimeRange(start: .zero, duration: CMTime(seconds: dur, preferredTimescale: 600))
  vci.layerInstructions = [inst]
  let vc = AVMutableVideoComposition()
  vc.renderSize = CGSize(width: W, height: H)
  vc.frameDuration = CMTime(value: 1, timescale: 30)
  vc.instructions = [vci]
  let ex = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetHighestQuality)!
  ex.videoComposition = vc
  try await ex.export(to: out, as: .mp4)
  print("ok")
  s.signal()
}
s.wait()
