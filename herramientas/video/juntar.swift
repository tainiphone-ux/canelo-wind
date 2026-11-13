// Junta un vídeo sin sonido con un audio (WAV) en un MP4.  swift juntar.swift video.mp4 audio.wav salida.mp4
import AVFoundation
let a = CommandLine.arguments
let video = AVURLAsset(url: URL(fileURLWithPath: a[1])), audio = AVURLAsset(url: URL(fileURLWithPath: a[2]))
let out = URL(fileURLWithPath: a[3])
let comp = AVMutableComposition()
let sem = DispatchSemaphore(value: 0)
Task {
  let vt = try await video.loadTracks(withMediaType: .video).first!
  let at = try await audio.loadTracks(withMediaType: .audio).first!
  let dur = try await video.load(.duration)
  let cv = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
  try cv.insertTimeRange(CMTimeRange(start: .zero, duration: dur), of: vt, at: .zero)
  cv.preferredTransform = try await vt.load(.preferredTransform)
  let adur = try await audio.load(.duration)
  let ca = comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid)!
  try ca.insertTimeRange(CMTimeRange(start: .zero, duration: CMTimeMinimum(dur, adur)), of: at, at: .zero)
  try? FileManager.default.removeItem(at: out)
  let ex = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetHighestQuality)!
  try await ex.export(to: out, as: .mp4)
  print("ok")
  sem.signal()
}
sem.wait()
