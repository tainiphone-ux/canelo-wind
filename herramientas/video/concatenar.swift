// Une varios vídeos (con su audio) seguidos en uno solo.  swift concatenar.swift salida.mp4 v1.mp4 v2.mp4 ...
import AVFoundation
let a = CommandLine.arguments
let out = URL(fileURLWithPath: a[1])
let fuentes = a[2...].map { AVURLAsset(url: URL(fileURLWithPath: $0)) }
try? FileManager.default.removeItem(at: out)
let s = DispatchSemaphore(value: 0)
Task {
  let comp = AVMutableComposition()
  let cv = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
  let ca = comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid)!
  var cursor = CMTime.zero
  for f in fuentes {
    let vt = try await f.loadTracks(withMediaType: .video).first!
    let dur = try await f.load(.duration)
    try cv.insertTimeRange(CMTimeRange(start: .zero, duration: dur), of: vt, at: cursor)
    if cursor == .zero { cv.preferredTransform = try await vt.load(.preferredTransform) }
    if let at = try await f.loadTracks(withMediaType: .audio).first {
      try ca.insertTimeRange(CMTimeRange(start: .zero, duration: dur), of: at, at: cursor)
    }
    cursor = CMTimeAdd(cursor, dur)
  }
  let ex = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetHighestQuality)!
  try await ex.export(to: out, as: .mp4)
  print("ok", CMTimeGetSeconds(cursor))
  s.signal()
}
s.wait()
