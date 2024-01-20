class RandomNoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.voldefault = 0.01;
    this.vol = this.voldefault;
    this.port.onmessage = e => this.vol = e.data.vol;
  }
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const chlen = output.length;
    const len = output[0].length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < chlen; j++) {
        const vol = (Math.random() * 2 - 1) * this.vol;
        output[j][i] = vol;
      }
    }
    return true;
  }
}

registerProcessor("random-noise-processor", RandomNoiseProcessor);
