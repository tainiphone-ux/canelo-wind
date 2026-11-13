# Mezcla la voz (WAV de `say`), el mar (ruido marrón suave) y los clics de los toques.
# python3 mezcla.py guion.json salida.wav   (guion.json: {"dur": 52, "voces": [["v0.wav", 0.4], ...], "clics": [9.7, ...]})
import array, json, math, random, sys, wave

g = json.load(open(sys.argv[1]))
SR = 44100; DUR = g["dur"]; N = int(SR * DUR)
out = [0.0] * N
for f, t0 in g["voces"]:
    w = wave.open(f); n = w.getnframes(); ch = w.getnchannels(); d = array.array("h", w.readframes(n))
    if ch == 2: d = d[::2]
    s = int(t0 * SR)
    for k, v in enumerate(d):
        if s + k < N: out[s + k] += v / 32768 * 0.95
random.seed(5); b = 0.0
for k in range(N):  # mar: bajo, para que no tape la voz
    b = (b + random.uniform(-1, 1) * 0.02) * 0.998
    t = k / SR; lfo = 0.55 + 0.45 * math.sin(2 * math.pi * t / 7.5) ** 2
    out[k] += b * 0.13 * lfo * min(1, t / 1.5, (DUR - t) / 2.0)
for tc in g.get("clics", []):
    s = int(tc * SR)
    for k in range(int(0.04 * SR)):
        if s + k < N: out[s + k] += 0.35 * math.sin(2 * math.pi * 1800 * k / SR) * math.exp(-k / (0.006 * SR))
m = max(abs(x) for x in out); gan = 0.95 / m if m > 0.95 else 1
a = array.array("h", [int(max(-1, min(1, x * gan)) * 32767) for x in out])
w = wave.open(sys.argv[2], "w"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(a.tobytes()); w.close()
print("mezcla ok")
