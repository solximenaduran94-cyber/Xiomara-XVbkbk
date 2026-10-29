/**
 * Web Audio API procedural synthesizer for the gala waltz
 * "Vals de las Mariposas / Quinceañera Theme"
 * Gentle celesta, harp chords, and ambient harmonic bells
 */

class GalaWaltzSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private masterGain: GainNode | null = null;

  // D Major Quinceañera Waltz Melody & Chords (3/4 time signature)
  // [Bass note, Chord note 1, Chord note 2, Melody note]
  private readonly melodyPattern: Array<{
    beat: number;
    bassFreq: number;
    harmonyFreqs: number[];
    melodyFreq?: number;
  }> = [
    // Measure 1: D Major
    { beat: 1, bassFreq: 146.83, harmonyFreqs: [293.66, 369.99, 440.0], melodyFreq: 587.33 },
    { beat: 2, bassFreq: 0, harmonyFreqs: [369.99, 440.0], melodyFreq: 739.99 },
    { beat: 3, bassFreq: 0, harmonyFreqs: [369.99, 440.0], melodyFreq: 880.0 },

    // Measure 2: B Minor
    { beat: 1, bassFreq: 123.47, harmonyFreqs: [246.94, 293.66, 440.0], melodyFreq: 987.77 },
    { beat: 2, bassFreq: 0, harmonyFreqs: [293.66, 369.99], melodyFreq: 880.0 },
    { beat: 3, bassFreq: 0, harmonyFreqs: [293.66, 369.99], melodyFreq: 739.99 },

    // Measure 3: G Major
    { beat: 1, bassFreq: 98.0, harmonyFreqs: [196.0, 246.94, 293.66], melodyFreq: 783.99 },
    { beat: 2, bassFreq: 0, harmonyFreqs: [246.94, 293.66], melodyFreq: 880.0 },
    { beat: 3, bassFreq: 0, harmonyFreqs: [246.94, 293.66], melodyFreq: 987.77 },

    // Measure 4: A Major (Suspense resolution)
    { beat: 1, bassFreq: 110.0, harmonyFreqs: [220.0, 277.18, 329.63], melodyFreq: 1108.73 },
    { beat: 2, bassFreq: 0, harmonyFreqs: [277.18, 329.63], melodyFreq: 987.77 },
    { beat: 3, bassFreq: 0, harmonyFreqs: [277.18, 329.63], melodyFreq: 880.0 },

    // Measure 5: F# Minor
    { beat: 1, bassFreq: 92.5, harmonyFreqs: [185.0, 220.0, 277.18], melodyFreq: 739.99 },
    { beat: 2, bassFreq: 0, harmonyFreqs: [220.0, 277.18], melodyFreq: 659.25 },
    { beat: 3, bassFreq: 0, harmonyFreqs: [220.0, 277.18], melodyFreq: 587.33 },

    // Measure 6: G Major 7
    { beat: 1, bassFreq: 98.0, harmonyFreqs: [196.0, 246.94, 293.66, 369.99], melodyFreq: 659.25 },
    { beat: 2, bassFreq: 0, harmonyFreqs: [246.94, 293.66], melodyFreq: 739.99 },
    { beat: 3, bassFreq: 0, harmonyFreqs: [246.94, 293.66], melodyFreq: 880.0 },

    // Measure 7: E Minor
    { beat: 1, bassFreq: 82.41, harmonyFreqs: [164.81, 196.0, 246.94], melodyFreq: 739.99 },
    { beat: 2, bassFreq: 0, harmonyFreqs: [196.0, 246.94], melodyFreq: 659.25 },
    { beat: 3, bassFreq: 0, harmonyFreqs: [196.0, 246.94], melodyFreq: 587.33 },

    // Measure 8: A7 to D cadence
    { beat: 1, bassFreq: 110.0, harmonyFreqs: [220.0, 277.18, 329.63, 392.0], melodyFreq: 554.37 },
    { beat: 2, bassFreq: 0, harmonyFreqs: [277.18, 329.63], melodyFreq: 493.88 },
    { beat: 3, bassFreq: 0, harmonyFreqs: [277.18, 329.63], melodyFreq: 440.0 },
  ];

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a soft harp/celesta note with warm envelope
  private playBellNote(ctx: AudioContext, freq: number, duration: number, volume: number = 0.25) {
    if (!this.masterGain || freq <= 0) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Gentle triangle wave with sine warmth
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm lowpass filter to remove harshness
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, ctx.currentTime);

    // Bell/harp pluck envelope
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(volume * 0.4, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  // Deep warm cello/double-bass pizzicato note
  private playBassNote(ctx: AudioContext, freq: number) {
    if (!this.masterGain || freq <= 0) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.3, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.3);
  }

  public play() {
    if (this.isPlaying) return;
    const ctx = this.getAudioContext();
    this.isPlaying = true;
    this.currentStep = 0;

    const stepInterval = 460; // ~130 bpm in 3/4 waltz rhythm

    const tick = () => {
      if (!this.isPlaying) return;
      const stepData = this.melodyPattern[this.currentStep % this.melodyPattern.length];

      // Bass on beat 1
      if (stepData.bassFreq > 0) {
        this.playBassNote(ctx, stepData.bassFreq);
      }

      // Soft accompaniment chord notes
      stepData.harmonyFreqs.forEach((freq, idx) => {
        this.playBellNote(ctx, freq, 0.7, 0.08 / (idx + 1));
      });

      // Melody note
      if (stepData.melodyFreq) {
        this.playBellNote(ctx, stepData.melodyFreq, 1.1, 0.22);
      }

      this.currentStep++;
      this.timerId = window.setTimeout(tick, stepInterval);
    };

    tick();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const galaWaltz = new GalaWaltzSynthesizer();
