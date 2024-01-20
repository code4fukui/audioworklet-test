export class PAPUNode extends AudioWorkletNode {
  static async create(context) {
    await context.audioWorklet.addModule("papu-processor.js");
    return new PAPUNode(context);
  }
  constructor(context) {
    super(context, "papu-processor");
  }
  writeReg(addr, value) {
    this.port.postMessage({ addr, value });
  }
};
