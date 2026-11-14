// Saca un fotograma de un vídeo en un segundo dado.  swift frame.swift video.mp4 segundo salida.png
import AVFoundation
import AppKit
let a = CommandLine.arguments
let asset = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let t = Double(a[2])!
let gen = AVAssetImageGenerator(asset: asset)
gen.appliesPreferredTrackTransform = true
let s = DispatchSemaphore(value: 0)
Task {
  let cg = try gen.copyCGImage(at: CMTime(seconds: t, preferredTimescale: 600), actualTime: nil)
  let rep = NSBitmapImageRep(cgImage: cg)
  let data = rep.representation(using: .png, properties: [:])!
  try data.write(to: URL(fileURLWithPath: a[3]))
  print("ok")
  s.signal()
}
s.wait()
