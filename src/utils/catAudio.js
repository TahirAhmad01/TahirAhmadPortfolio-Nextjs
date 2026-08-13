// Web Audio API cat sound generator for cute meow and purr sound effects

export function playMeow(type = "random") {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const styles = ["standard", "squeak", "chirp", "expressive"];
    const chosenType = type === "random" ? styles[Math.floor(Math.random() * styles.length)] : type;

    let duration = 0.45;
    let baseFreq = 420 + Math.random() * 40;
    let formantStart = 2000;
    let formantEnd = 800;
    let freqRamps = []; 
    let gainRamps = []; 
    let useVibrato = false;
    let vibratoFreq = 7;
    let vibratoGain = 10;
    let vibratoFadeTime = 0.3; 

    switch (chosenType) {
      case "squeak":
        duration = 0.22;
        baseFreq = 680 + Math.random() * 50;
        formantStart = 2800;
        formantEnd = 1200;
        freqRamps = [
          { time: 0.06, freq: baseFreq * 1.25 },
          { time: 0.18, freq: baseFreq * 0.95 },
          { time: 0.22, freq: baseFreq * 0.9 }
        ];
        gainRamps = [
          { time: 0.04, gain: 0.18 },
          { time: 0.12, gain: 0.1 },
          { time: 0.22, gain: 0.001 }
        ];
        break;

      case "chirp":
        duration = 0.14;
        baseFreq = 380 + Math.random() * 30;
        formantStart = 1600;
        formantEnd = 1100;
        freqRamps = [
          { time: 0.04, freq: baseFreq * 1.5 },
          { time: 0.1, freq: baseFreq * 1.2 },
          { time: 0.14, freq: baseFreq * 1.1 }
        ];
        gainRamps = [
          { time: 0.02, gain: 0.22 },
          { time: 0.08, gain: 0.15 },
          { time: 0.14, gain: 0.001 }
        ];
        useVibrato = true;
        vibratoFreq = 16;
        vibratoGain = 25;
        vibratoFadeTime = 0.14;
        break;

      case "expressive":
        duration = 0.75;
        baseFreq = 350 + Math.random() * 30;
        formantStart = 2200;
        formantEnd = 700;
        freqRamps = [
          { time: 0.15, freq: baseFreq * 0.9 }, 
          { time: 0.35, freq: baseFreq * 1.55 },
          { time: 0.6, freq: baseFreq * 1.15 },
          { time: 0.75, freq: baseFreq * 0.85 }
        ];
        gainRamps = [
          { time: 0.15, gain: 0.15 }, 
          { time: 0.38, gain: 0.24 }, 
          { time: 0.6, gain: 0.15 },
          { time: 0.75, gain: 0.001 }
        ];
        useVibrato = true;
        vibratoFreq = 22; 
        vibratoGain = 18;
        vibratoFadeTime = 0.25; 
        break;

      case "standard":
      default:
        duration = 0.45;
        baseFreq = 420 + Math.random() * 40;
        formantStart = 2100;
        formantEnd = 800;
        freqRamps = [
          { time: 0.12, freq: baseFreq * 1.55 },
          { time: 0.35, freq: baseFreq * 1.05 },
          { time: 0.45, freq: baseFreq * 0.95 }
        ];
        gainRamps = [
          { time: 0.08, gain: 0.2 },
          { time: 0.25, gain: 0.15 },
          { time: 0.45, gain: 0.001 }
        ];
        break;
    }

    // Mixer
    const mixer = ctx.createGain();
    mixer.gain.setValueAtTime(1.0, now);

    // Main carrier (Triangle wave)
    const osc1 = ctx.createOscillator();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(baseFreq, now);

    // Subtle second harmonic (Sine wave)
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(baseFreq * 2, now);
    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.12, now);
    osc2.connect(osc2Gain);
    osc2Gain.connect(mixer);

    // Subtle buzz/throat harmonic (Sawtooth wave)
    const osc3 = ctx.createOscillator();
    osc3.type = "sawtooth";
    osc3.frequency.setValueAtTime(baseFreq, now);
    const osc3Gain = ctx.createGain();
    osc3Gain.gain.setValueAtTime(0.025, now);
    osc3.connect(osc3Gain);
    osc3Gain.connect(mixer);

    // Connect fundamental oscillator
    osc1.connect(mixer);

    // Pitch sweep
    freqRamps.forEach((ramp) => {
      osc1.frequency.exponentialRampToValueAtTime(ramp.freq, now + ramp.time);
      osc2.frequency.exponentialRampToValueAtTime(ramp.freq * 2, now + ramp.time);
      osc3.frequency.exponentialRampToValueAtTime(ramp.freq, now + ramp.time);
    });

    // Optional Vibrato / Tremolo LFO
    if (useVibrato) {
      const vibrato = ctx.createOscillator();
      const vibratoGainNode = ctx.createGain();
      vibrato.type = "sine";
      vibrato.frequency.setValueAtTime(vibratoFreq, now);
      
      vibratoGainNode.gain.setValueAtTime(vibratoGain, now);
      vibratoGainNode.gain.exponentialRampToValueAtTime(0.001, now + vibratoFadeTime);

      vibrato.connect(vibratoGainNode);
      vibratoGainNode.connect(osc1.frequency);
      vibrato.start(now);
      vibrato.stop(now + duration);
    }

    // Formant Peaking Filter
    const formantFilter = ctx.createBiquadFilter();
    formantFilter.type = "peaking";
    formantFilter.Q.value = 3.5;
    formantFilter.gain.value = 12.0; 
    formantFilter.frequency.setValueAtTime(formantStart, now);
    formantFilter.frequency.exponentialRampToValueAtTime(formantEnd, now + duration * 0.75);

    // Gain Envelope
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainRamps.forEach((ramp) => {
      if (ramp.gain === 0.001) {
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + ramp.time);
      } else {
        gainNode.gain.linearRampToValueAtTime(ramp.gain, now + ramp.time);
      }
    });

    // Routing
    mixer.connect(formantFilter);
    formantFilter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Start & Stop
    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + duration);
    osc2.stop(now + duration);
    osc3.stop(now + duration);

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, duration * 1000 + 200);
  } catch (e) {
    console.error("Audio error in playMeow:", e);
  }
}

export function playPurr() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const duration = 1.6; 

    // Oscillators
    const osc1 = ctx.createOscillator(); 
    const osc2 = ctx.createOscillator(); 

    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(55, now); 

    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(110, now); 
    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.012, now); 
    osc2.connect(osc2Gain);

    // Mix node
    const mixer = ctx.createGain();
    mixer.gain.setValueAtTime(1.0, now);
    osc1.connect(mixer);
    osc2Gain.connect(mixer);

    // Low-pass Filter to keep it warm and remove harsh highs
    const lpFilter = ctx.createBiquadFilter();
    lpFilter.type = "lowpass";
    lpFilter.frequency.setValueAtTime(90, now); 

    // LFO for throat purr vibration (~23Hz)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(23, now);
    lfoGain.gain.setValueAtTime(0.06, now); 

    lfo.connect(lfoGain);

    // Main Gain Node with breath cycle envelope
    const gainNode = ctx.createGain();
    
    // Connect LFO modulation to gainNode gain
    lfoGain.connect(gainNode.gain);

    // Breathing swell envelope
    gainNode.gain.setValueAtTime(0.01, now);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.5); 
    gainNode.gain.linearRampToValueAtTime(0.03, now + 1.0); 
    gainNode.gain.linearRampToValueAtTime(0.07, now + 1.4); 
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Routing
    mixer.connect(lpFilter);
    lpFilter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Start/Stop
    osc1.start(now);
    osc2.start(now);
    lfo.start(now);

    osc1.stop(now + duration);
    osc2.stop(now + duration);
    lfo.stop(now + duration);

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, duration * 1000 + 200);
  } catch (e) {
    console.error("Audio error in playPurr:", e);
  }
}
