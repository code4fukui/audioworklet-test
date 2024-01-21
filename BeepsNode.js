export class BeepsNode extends AudioWorkletNode {
  static async create(context) {
    await context.audioWorklet.addModule("beeps-processor.js");
    return new BeepsNode(context);
  }
  constructor(context) {
    super(context, "beeps-processor");
  }
  setVolume(idx, vol) {
    this.port.postMessage({ idx, vol });
  }
  setFreq(idx, freq) {
    this.port.postMessage({ idx, freq });
  }
  setFreqVolume(idx, freq, vol) {
    this.port.postMessage({ idx, freq, vol });
  }
};
