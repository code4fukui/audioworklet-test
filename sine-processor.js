class SineProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.vol = 0;
    this.vol2 = 0;
    this.th = 0;
    this.port.onmessage = e => {
      if (e.data.vol !== undefined) {
        this.vol2 = e.data.vol;
      }
      if (e.data.freq !== undefined) {
        this.freq = e.data.freq / sampleRate * Math.PI * 2;
      }
    };
  }
  process(inputs, outputs, parameters) {
    if (!this.freq || (!this.vol && !this.vol2)) return true;
    const output = outputs[0];
    const chlen = output.length;
    const len = output[0].length;
    const dv = (this.vol2 - this.vol) / len;
    let v = this.vol;
    this.vol = this.vol2;
    for (let i = 0; i < len; i++) {
      this.th += this.freq;
      v += dv;
      const vol = Math.sin(this.th) * v;
      for (let j = 0; j < chlen; j++) {
        output[j][i] = vol;
      }
    }
    return true;
  }
}

registerProcessor("sine-processor", SineProcessor);
