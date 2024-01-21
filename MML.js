export class MML {
  constructor(mml) {
    this.setMML(mml);
  }
  setMML(mml) {
    this.mml = mml;
    this.nmml = 0;
    this.oct = 4;
    this.deflen = 4;
    this.t = 120;
    this.nrepeat = -1;
  }
  getFreqLen() {
    const mml = this.mml;
    if (!mml) return null;

    let n = -2;
    let l = 8;
    let rest = false;
    let loopflg = false;
    for (;;) {
      const c = mml.substring(this.nmml, this.nmml + 1).toUpperCase();
      if (mml.length == this.nmml || c == "'") {
        if (this.nrepeat >= 0) {
          this.nmml = this.nrepeat;
          if (loopflg) {
            return null;
          }
          loopflg = true;
          continue;
        }
        return null;
      }
      this.nmml++;
      if (c == " ") {
        continue;
      }
      if (c == "O") {
        const c2 = mml.substring(this.nmml, this.nmml + 1);
        const no = parseInt(c2);
        if (no > 0) {
          this.nmml++;
          this.oct = no;
        }
        continue;
      }
      if (c == "T") {
        const c2 = mml.substring(this.nmml); //, this.nmml + 1);
        this.t = parseInt(c2);
        continue;
      }
      if (c == "L") {
        const c2 = mml.substring(this.nmml); //, this.nmml + 1);
        const nl = parseInt(c2);
        if (nl > 0) {
          this.deflen = nl;
        }
        continue;
      }
      if (c == ">") {
        this.oct--; // ver 1.2
        continue;
      } else if (c == "<") {
        this.oct++; // ver 1.2
        continue;
      } else if (c == "$") {
        this.nrepeat = this.nmml;
        continue;
      }
      if (c == "N") {
        const c2 = mml.substring(this.nmml);
        const n = parseInt(c2);
        l = 32 / this.deflen;
        const len = (60 * 1000) / (this.t * 8) * l;
        const freq = (60 * 261) / n / 2;
        return { freq, len };
      }
      n = "C D EF G A BR".indexOf(c);
      if (n < 0) continue;
      if (n == 12) rest = true;
      
      const c2 = mml.substring(this.nmml, this.nmml + 1);
      if (c2 == '-') {
        n--;
        this.nmml++;
      } else if (c2 == '+') {
        n++;
        this.nmml++;
      }

      if (this.nmml < mml.length) {
        let nl = this.deflen;
        let nl2 = parseInt(mml.substring(this.nmml, this.nmml + 1));
        if (nl2 > 0) {
          this.nmml++;
          nl = nl2;
          if (nl2 == 1) {
            let nl3 = parseInt(mml.substring(this.nmml, this.nmml + 1));
            if (nl3 > 0) {
              nl = nl2 * 10 + nl3;
            }
          }
        }
        l = 32 / nl;
        const c2 = mml.substring(this.nmml, this.nmml + 1);
        if (c2 == '.') {
          this.nmml++;
          l += l / 2;
        }
      }
      if (n >= 0) {
        n += 3 + (this.oct - 6) * 12;
      }
      break;
    }
    const len = (60 * 1000) / (this.t * 8) * l;
    const freq = rest ? 0 : 440 * Math.pow(2, n / 12);
    return { freq, len };
  };
};
