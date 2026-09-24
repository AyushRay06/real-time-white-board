// Native Web Audio API Sound Effects Synthesizer (Zero external dependencies)

class SoundFX {
  private ctx: AudioContext | null = null
  private muted: boolean = false

  private initCtx() {
    if (typeof window === "undefined") return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume()
    }
    return this.ctx
  }

  public setMuted(muted: boolean) {
    this.muted = muted
  }

  public isMuted(): boolean {
    return this.muted
  }

  public playConnect() {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(440, now)
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12)

    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.12)
  }

  public playSimulateStart() {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "triangle"
    osc.frequency.setValueAtTime(320, now)
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.18)
    osc.frequency.exponentialRampToValueAtTime(960, now + 0.3)

    gain.gain.setValueAtTime(0.1, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.3)
  }

  public playChaos() {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sawtooth"
    osc.frequency.setValueAtTime(280, now)
    osc.frequency.linearRampToValueAtTime(140, now + 0.25)

    gain.gain.setValueAtTime(0.12, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.25)
  }

  public playStep() {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(580, now)
    osc.frequency.exponentialRampToValueAtTime(720, now + 0.08)

    gain.gain.setValueAtTime(0.06, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.08)
  }
}

export const sfx = new SoundFX()
