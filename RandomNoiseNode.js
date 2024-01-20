export class RandomNoiseNode extends AudioWorkletNode {
  static async create(context) {
    await context.audioWorklet.addModule("random-noise-processor.js");
    return new RandomNoiseNode(context);
  }
  constructor(context) {
    super(context, "random-noise-processor");
  }
  setVolume(vol) {
    this.port.postMessage({ vol });
  }
};
