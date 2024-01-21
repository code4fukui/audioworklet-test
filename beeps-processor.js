class Beep {
  constructor() {
    this.state = 1;
    this.vol = 0.1;
    this.period = 0;
  }
  set(vol, period) {
    this.setVolume(vol);
    this.setPeriod(period);
  }
  setVolume(vol) {
    this.vol = vol;
  }
  setPeriod(period) {    
    this.period = period;
    if (this.period != period) {
      this.cnt = this.period;
      this.state = 1;
    }
  }
  tick() {
    if (!this.period) return 0;
    const v = this.state * this.vol;
    this.cnt--;
    if (!this.cnt) {
      this.state = 1 - this.state;
      this.cnt = this.period;
    }
    return v;
  }
}

class BeepsProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.beeps = {};
    const getBeep = (idx) => {
      const beep = this.beeps[idx];
      if (beep) return beep;
      return this.beeps[idx] = new Beep();
    };
    this.port.onmessage = e => {
      const idx = e.data.idx;
      if (idx === undefined) return;
      const beep = getBeep(idx);
      if (e.data.vol) {
        beep.setVolume(e.data.vol);
      }
      if (e.data.freq) {
        beep.setPeriod((sampleRate / e.data.freq / 2) >> 0);
      }
    };
  }
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const chlen = output.length;
    const len = output[0].length;
    const beeps = Object.values(this.beeps);
    for (let i = 0; i < len; i++) {
      const vol = beeps.reduce((v, i) => v + i.tick(), 0);
      for (let j = 0; j < chlen; j++) {
        output[j][i] = vol;
      }
    }
    return true;
  }
}

registerProcessor("beeps-processor", BeepsProcessor);
