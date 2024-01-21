export class MMLBeepNode extends AudioWorkletNode {
  static async create(context) {
    await context.audioWorklet.addModule("mml-beep-processor.js");
    return new MMLBeepNode(context);
  }
  constructor(context) {
    super(context, "mml-beep-processor");
  }
  setVolume(vol) {
    this.port.postMessage({ vol });
  }
  setMML(mml) {
    this.port.postMessage({ mml });
  }
};
