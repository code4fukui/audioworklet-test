class BeepProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.vol = 0;
    this.period = sampleRate / 440 / 2;
    this.cnt = 0;
    this.state = 1;
    this.port.onmessage = e => {
      if (e.data.vol) {
        this.vol = e.data.vol;
      }
      if (e.data.freq) {
        this.period = sampleRate / e.data.freq / 2;
      }
    };
  }
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const chlen = output.length;
    const len = output[0].length;
    for (let i = 0; i < len; i++) {
      const vol = this.state * this.vol;
      for (let j = 0; j < chlen; j++) {
        output[j][i] = vol;
      }
      if (this.cnt++ > this.period) {
        this.state = 1 - this.state;
        this.cnt = 0;
      }
    }
    return true;
  }
}

registerProcessor("beep-processor", BeepProcessor);
