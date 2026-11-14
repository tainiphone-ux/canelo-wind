// Imprime duración y tamaño de un vídeo.  swift info.swift video.mp4
import AVFoundation
let a = CommandLine.arguments
let v = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let s = DispatchSemaphore(value: 0)
Task {
  let dur = try await v.load(.duration)
  let tracks = try await v.loadTracks(withMediaType: .video)
  if let t = tracks.first {
    let sz = try await t.load(.naturalSize)
    let tr = try await t.load(.preferredTransform)
    print("dur=\(CMTimeGetSeconds(dur)) size=\(sz) transform=\(tr)")
  }
  s.signal()
}
s.wait()
