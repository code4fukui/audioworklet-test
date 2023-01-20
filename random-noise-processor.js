class RandomNoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.voldefault = 0.01;
    this.vol = this.voldefault;
    this.port.onmessage = e => this.vol = e.data.vol;
  }
  process(inputs, outputs, parameters) {
    const chlen = outputs.length;
    for (let j = 0; j < chlen; j++) {
      const channel = outputs[j][0];
      const len = channel.length;
      for (let i = 0; i < len; i++) {
        channel[i] = (Math.random() * 2 - 1) * this.vol;
      }
    }
    return true;
  }
}

registerProcessor("random-noise-processor", RandomNoiseProcessor);
