import { MML } from "./MML.js";

class MMLBeepProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.vol = 0.1;
    this.cnt = 0;
    this.state = 0;
    this.period = 0;

    this.mml = new MML();
    this.cntnext = 0;
    this.mmlon = false;

    this.port.onmessage = e => {
      if (e.data.vol) {
        this.vol = e.data.vol;
      }
      if (e.data.mml) {
        this.mml.setMML(e.data.mml);
        this.mmlon = true;
        this.cntnext = 0;
      }
    };
  }
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const chlen = output.length;
    const len = output[0].length;
    for (let i = 0; i < len; i++) {
      if (this.mmlon) {
        if (!this.cntnext) {
          const fl = this.mml.getFreqLen();
          if (!fl) {
            this.mmlon = false;
            this.state = 0;
            this.period = 0;
          } else {
            this.period = sampleRate / fl.freq / 2;
            this.cnt = 0;
            this.cntnext = (fl.len * sampleRate / 1000) >> 0;
          }
        } else {
          this.cntnext--;
        }
      }
      const vol = this.state * this.vol;
      for (let j = 0; j < chlen; j++) {
        output[j][i] = vol;
      }
      if (this.period && this.cnt++ > this.period) {
        this.state = 1 - this.state;
        this.cnt = 0;
      }
    }
    return true;
  }
}

registerProcessor("mml-beep-processor", MMLBeepProcessor);
