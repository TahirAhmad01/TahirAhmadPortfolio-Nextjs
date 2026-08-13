// Web Audio API cat sound generator for cute meow and purr sound effects

export function playMeow() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Pitch envelope: Start around 450Hz, pitch sweep up to ~750Hz, then bend down to ~500Hz
    const baseFreq = 450 + Math.random() * 80;
    osc.type = "sine";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, now + 0.35);

    // Gain envelope: Fade in quickly, sustain briefly, fade out gently
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 500);
  } catch (e) {
    console.error("Audio error:", e);
  }
}

export function playPurr() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const now = ctx.currentTime;
    const duration = 1.2;

    // Low pitch rumble with low pass filter
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(70, now);

    // LFO purr modulation (~25Hz pulse)
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(24, now);
    lfoGain.gain.setValueAtTime(0.15, now);

    lfo.connect(gain.gain);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    lfo.start(now);
    osc.stop(now + duration);
    lfo.stop(now + duration);

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 1400);
  } catch (e) {
    console.error("Audio error:", e);
  }
}
