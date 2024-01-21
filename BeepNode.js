export class BeepNode extends AudioWorkletNode {
  static async create(context) {
    await context.audioWorklet.addModule("beep-processor.js");
    return new BeepNode(context);
  }
  constructor(context) {
    super(context, "beep-processor");
  }
  setVolume(vol) {
    this.port.postMessage({ vol });
  }
  setFreq(freq) {
    this.port.postMessage({ freq });
  }
  setFreqVolume(freq, vol) {
    this.port.postMessage({ freq, vol });
  }
};
