import { PAPU } from "https://taisukef.github.io/jsnes/src/papu.js";

const AUDIO_BUFFERING = 512;
const SAMPLE_COUNT = 4 * 1024;
const SAMPLE_MASK = SAMPLE_COUNT - 1;

class PAPUProcessor extends AudioWorkletProcessor {
  constructor() {
    super();

    this.audio_samples_L = new Float32Array(SAMPLE_COUNT);
    this.audio_samples_R = new Float32Array(SAMPLE_COUNT);
    this.audio_write_cursor = 0;
    this.audio_read_cursor = 0;

    //const sampleRate = 44100;
    const sampleRate = 48000;
    const nes = {
      opts: {
        sampleRate,
        preferredFrameRate: 60,
        onAudioSample: (l, r) => {
          this.audio_samples_L[this.audio_write_cursor] = l;
          this.audio_samples_R[this.audio_write_cursor] = r;
          this.audio_write_cursor = (this.audio_write_cursor + 1) & SAMPLE_MASK;
        },
      }
    };
    this.papu = new PAPU(nes);
    this.papu.reset();

    this.port.onmessage = e => {
      this.papu.writeReg(e.data.addr, e.data.value);
    };
  }
  audio_remain() {
    return (this.audio_write_cursor - this.audio_read_cursor) & SAMPLE_MASK;
  }
  process(inputs, outputs, parameters) {
    if (!this.audio_samples_L) {
      return true;
    }
		while (this.audio_remain() < AUDIO_BUFFERING) {
			const cycles = 8;
			this.papu.clockFrameCounter(cycles);
		}

    const chlen = outputs.length;
    const len = outputs[0][0].length;
    for (let j = 0; j < chlen; j++) {
      const channel = outputs[j][0];
      for (let i = 0; i < len; i++) {
        const src_idx = (this.audio_read_cursor + i) & SAMPLE_MASK;
        channel[i] = this.audio_samples_R[src_idx];
      }
    }
    this.audio_read_cursor = (this.audio_read_cursor + len) & SAMPLE_MASK;
    return true;
  }
}

registerProcessor("papu-processor", PAPUProcessor);
