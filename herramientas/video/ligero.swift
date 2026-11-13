// Copia ligera para redes: 720×1280, H.264 (bitrate en bits/s), AAC mono.  swift ligero.swift entrada.mp4 salida.mp4 1300000
import AVFoundation
let a = CommandLine.arguments
let src = AVURLAsset(url: URL(fileURLWithPath: a[1])); let out = URL(fileURLWithPath: a[2]); let br = Int(a[3])!
try? FileManager.default.removeItem(at: out)
let s = DispatchSemaphore(value: 0)
Task {
  let vt = try await src.loadTracks(withMediaType: .video).first!
  let at = try await src.loadTracks(withMediaType: .audio).first!
  let r = try AVAssetReader(asset: src)
  let vo = AVAssetReaderTrackOutput(track: vt, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange]); r.add(vo)
  let ao = AVAssetReaderTrackOutput(track: at, outputSettings: [AVFormatIDKey: kAudioFormatLinearPCM]); r.add(ao)
  let w = try AVAssetWriter(outputURL: out, fileType: .mp4)
  let vi = AVAssetWriterInput(mediaType: .video, outputSettings: [AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: 720, AVVideoHeightKey: 1280,
    AVVideoScalingModeKey: AVVideoScalingModeResizeAspect, AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: br, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel, AVVideoMaxKeyFrameIntervalKey: 60]])
  let ai = AVAssetWriterInput(mediaType: .audio, outputSettings: [AVFormatIDKey: kAudioFormatMPEG4AAC, AVSampleRateKey: 44100, AVNumberOfChannelsKey: 1, AVEncoderBitRateKey: 96000])
  vi.expectsMediaDataInRealTime = false; ai.expectsMediaDataInRealTime = false; w.add(vi); w.add(ai)
  r.startReading(); w.startWriting(); w.startSession(atSourceTime: .zero)
  let g = DispatchGroup(); let q1 = DispatchQueue(label: "v"), q2 = DispatchQueue(label: "a")
  g.enter(); vi.requestMediaDataWhenReady(on: q1) { while vi.isReadyForMoreMediaData { if let b = vo.copyNextSampleBuffer() { vi.append(b) } else { vi.markAsFinished(); g.leave(); return } } }
  g.enter(); ai.requestMediaDataWhenReady(on: q2) { while ai.isReadyForMoreMediaData { if let b = ao.copyNextSampleBuffer() { ai.append(b) } else { ai.markAsFinished(); g.leave(); return } } }
  g.notify(queue: .global()) { _ = r; w.finishWriting { print("ok", w.status.rawValue); s.signal() } }
}
s.wait()
