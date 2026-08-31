/* =========================================================================
   Rotating dot sphere

   Dots sit on latitude rings; their longitude advances each frame so the ball
   genuinely turns rather than a flat disc spinning in place.

   Interaction (opt in with `interactive`):
     • drag spins it, with real momentum on release
     • hover leans it toward the cursor and speeds the idle drift up
     • click / tap / Enter fires a pulse: the dots swell and a ripple runs
       through the surface from front to back
     • arrow keys spin and tilt it

   Perf: writing cx/cy/r/opacity to ~350 <circle> nodes is ~1400 attribute
   changes per frame and drops frames. Dots are bucketed by brightness and we
   emit one <path> per bucket — 8 attribute writes per sphere per frame.
   A single shared rAF drives every mounted sphere and stops when none are
   visible, so unmounting is always clean.
   ========================================================================= */

const NS = "http://www.w3.org/2000/svg";
const TAU = Math.PI * 2;
const BUCKETS = 8;
const CX = 100;
const CY = 100;
const R = 92;
const DOT = 5.4;
const TILT = (-13 * Math.PI) / 180;
const ST = Math.sin(TILT);
const CT = Math.cos(TILT);
const MAX_PITCH = 0.55;

export type SphereOptions = {
  rings?: number;
  density?: number;
  /** seconds for one idle revolution */
  spin?: number;
  fill?: string;
  interactive?: boolean;
  /** publish the current spin speed to --db-spd on <html> */
  drive?: boolean;
  label?: string;
};

type Dot = [number, number, number];

export type SphereInstance = {
  el: SVGSVGElement;
  render: () => void;
  destroy: () => void;
  pulse: () => void;
  /** current yaw in radians — used by the loader hand-off so the globe never jumps */
  getSpin: () => number;
  setSpin: (v: number) => void;
};

type Internal = SphereInstance & {
  dots: Dot[];
  paths: SVGPathElement[];
  buf: string[];
  auto: number;
  spin: number;
  vel: number;
  pitch: number;
  pitchGoal: number;
  yaw: number;
  yawGoal: number;
  boost: number;
  boostGoal: number;
  pulseAmt: number;
  pulseT: number;
  drag: boolean;
  vis: boolean;
  drive: boolean;
  lastSpd: number;
};

const list: Internal[] = [];
let raf = 0;
let last = 0;
let io: IntersectionObserver | null = null;

const mq = (q: string) => (typeof window === "undefined" ? false : window.matchMedia(q).matches);
const reduced = () => mq("(prefers-reduced-motion: reduce)");
const fine = () => mq("(hover: hover) and (pointer: fine)");
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const now = () => (typeof performance !== "undefined" ? performance.now() : Date.now());

function ensureObserver() {
  if (io || typeof IntersectionObserver === "undefined") return;
  io = new IntersectionObserver(
    (recs) => {
      for (const rec of recs) {
        const hit = list.find((it) => it.el === rec.target);
        if (hit) hit.vis = rec.isIntersecting;
      }
    },
    { rootMargin: "120px" },
  );
}

function step(it: Internal, dt: number) {
  if (!it.drag) {
    const target = it.auto * it.boost;
    // a hard fling decays slower than a nudge
    const pull = Math.abs(it.vel) > Math.abs(target) * 3 ? 1.1 : 3.2;
    it.vel += (target - it.vel) * Math.min(1, dt * pull);
    it.spin += it.vel * dt;
  }
  it.boost += (it.boostGoal - it.boost) * Math.min(1, dt * 5);
  it.pitch += (it.pitchGoal - it.pitch) * Math.min(1, dt * 6);
  it.yaw += (it.yawGoal - it.yaw) * Math.min(1, dt * 6);
  if (it.pulseAmt > 0) {
    it.pulseT += dt;
    it.pulseAmt = Math.max(0, it.pulseAmt - dt * 1.7);
  }
  if (it.spin > TAU) it.spin -= TAU;
  else if (it.spin < -TAU) it.spin += TAU;

  if (it.drive) {
    const m = clamp(Math.abs(it.vel) / Math.max(0.08, it.auto), 1, 4);
    if (Math.abs(m - it.lastSpd) > 0.04) {
      document.documentElement.style.setProperty("--db-spd", m.toFixed(2));
      it.lastSpd = m;
    }
  }
}

function frame(t: number) {
  const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
  last = t;
  for (let i = 0; i < list.length; i++) {
    const it = list[i];
    if (!it.el.isConnected) {
      list.splice(i, 1);
      i--;
      continue;
    }
    if (!it.vis || document.hidden) continue;
    step(it, dt);
    it.render();
  }
  raf = list.length ? requestAnimationFrame(frame) : 0;
}

function kick() {
  if (!raf && list.length) {
    last = 0;
    raf = requestAnimationFrame(frame);
  }
}

function ringBurst(el: SVGSVGElement) {
  if (reduced()) return;
  const r = el.getBoundingClientRect();
  const node = document.createElement("span");
  node.className = "db-globe-ring";
  node.style.left = `${r.left + r.width / 2}px`;
  node.style.top = `${r.top + r.height / 2}px`;
  document.body.appendChild(node);
  requestAnimationFrame(() => node.classList.add("is-live"));
  window.setTimeout(() => node.remove(), 900);
}

export function createSphere(el: SVGSVGElement, opts: SphereOptions = {}): SphereInstance {
  const rings = opts.rings ?? 15;
  const density = opts.density ?? 25;
  const secs = opts.spin ?? 22;
  const fillColor = opts.fill ?? "#fff";
  const soft = reduced();

  const dots: Dot[] = [];
  for (let i = 1; i < rings; i++) {
    const lat = -Math.PI / 2 + (Math.PI * i) / rings;
    const cl = Math.cos(lat);
    const sl = Math.sin(lat);
    const n = Math.max(4, Math.round(cl * density));
    for (let j = 0; j < n; j++) dots.push([cl, sl, (TAU * j) / n]);
  }

  while (el.firstChild) el.removeChild(el.firstChild);
  const paths: SVGPathElement[] = [];
  const buf: string[] = [];
  for (let b = 0; b < BUCKETS; b++) {
    const p = document.createElementNS(NS, "path");
    p.setAttribute("fill", fillColor);
    p.setAttribute("opacity", ((b + 0.5) / BUCKETS).toFixed(3));
    el.appendChild(p);
    paths.push(p);
    buf.push("");
  }

  const it: Internal = {
    el,
    dots,
    paths,
    buf,
    auto: soft ? 0 : TAU / secs,
    spin: 0,
    vel: soft ? 0 : TAU / secs,
    pitch: 0,
    pitchGoal: 0,
    yaw: 0,
    yawGoal: 0,
    boost: 1,
    boostGoal: 1,
    pulseAmt: 0,
    pulseT: 0,
    drag: false,
    vis: true,
    drive: !!opts.drive,
    lastSpd: -1,
    render: () => {},
    destroy: () => {},
    pulse: () => {},
    getSpin: () => it.spin,
    setSpin: (v: number) => {
      it.spin = v;
    },
  };

  it.render = () => {
    const sp = it.spin + it.yaw;
    const cp = Math.cos(it.pitch);
    const sq = Math.sin(it.pitch);
    const pu = it.pulseAmt;
    const pt = it.pulseT;
    for (let q = 0; q < BUCKETS; q++) buf[q] = "";

    for (let k = 0; k < dots.length; k++) {
      const d = dots[k];
      const lon = d[2] + sp;
      const x = d[0] * Math.sin(lon);
      const y = -d[1];
      const z = d[0] * Math.cos(lon);
      const y2 = y * cp - z * sq;
      const depth = y * sq + z * cp;

      const front = depth > 0;
      let r = front ? DOT * (0.34 + 0.66 * depth) : DOT * (0.2 + 0.16 * (1 + depth));
      let o = front ? 0.44 + 0.56 * depth : 0.09 + 0.11 * (1 + depth);

      if (pu > 0.001) {
        r *= 1 + pu * (0.42 + 0.38 * Math.sin(depth * 5.2 - pt * 9));
        o = Math.min(1, o + pu * 0.28);
      }

      let bi = (o * BUCKETS) | 0;
      if (bi > BUCKETS - 1) bi = BUCKETS - 1;
      if (bi < 0) bi = 0;

      const sx = R * x;
      const sy = R * y2;
      const px = Math.round((CX + sx * CT - sy * ST) * 10) / 10;
      const py = Math.round((CY + sx * ST + sy * CT) * 10) / 10;
      const rr = Math.round(r * 100) / 100;
      const d2 = rr * 2;
      buf[bi] += `M${px - rr} ${py}a${rr} ${rr} 0 1 0 ${d2} 0a${rr} ${rr} 0 1 0 ${-d2} 0`;
    }
    for (let w = 0; w < BUCKETS; w++) paths[w].setAttribute("d", buf[w]);
  };

  it.pulse = () => {
    it.pulseAmt = 1;
    it.pulseT = 0;
    it.vel += (it.auto || 1.2) * 5;
    el.classList.remove("is-pulse");
    void el.getBoundingClientRect();
    el.classList.add("is-pulse");
    window.setTimeout(() => el.classList.remove("is-pulse"), 760);
    ringBurst(el);
  };

  /* ---- interaction ------------------------------------------------------ */
  const off: Array<() => void> = [];
  if (opts.interactive) {
    let down = false;
    let moved = 0;
    let lx = 0;
    let ly = 0;
    let lt = 0;

    el.classList.add("db-globe");
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "img");
    el.removeAttribute("aria-hidden");
    el.setAttribute(
      "aria-label",
      opts.label ?? "DatabaseBuilder globe. Drag to spin it, press Enter for a pulse.",
    );

    const onDown = (e: PointerEvent) => {
      if (e.button > 0) return;
      down = true;
      moved = 0;
      lx = e.clientX;
      ly = e.clientY;
      lt = now();
      it.drag = true;
      it.vel = 0;
      el.classList.add("is-grabbing");
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* older browsers */
      }
      e.preventDefault();
      e.stopPropagation();
    };

    const onMove = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      if (down) {
        const t = now();
        const dt = Math.max(8, t - lt) / 1000;
        const dx = e.clientX - lx;
        const dy = e.clientY - ly;
        moved += Math.abs(dx) + Math.abs(dy);
        const k = TAU / Math.max(120, box.width);
        it.spin += dx * k;
        it.pitchGoal = clamp(it.pitchGoal + dy * k * 0.55, -MAX_PITCH, MAX_PITCH);
        it.vel = soft ? 0 : (dx * k) / dt;
        lx = e.clientX;
        ly = e.clientY;
        lt = t;
        e.preventDefault();
      } else if (fine()) {
        const px = (e.clientX - box.left) / box.width - 0.5;
        const py = (e.clientY - box.top) / box.height - 0.5;
        it.yawGoal = px * 0.55;
        it.pitchGoal = clamp(-py * 0.5, -MAX_PITCH, MAX_PITCH);
      }
    };

    const release = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      it.drag = false;
      el.classList.remove("is-grabbing");
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* older browsers */
      }
      if (moved < 7) it.pulse();
    };

    const onEnter = () => {
      if (!soft) it.boostGoal = 2.4;
    };
    const onLeave = () => {
      it.boostGoal = 1;
      if (!down) {
        it.yawGoal = 0;
        it.pitchGoal = 0;
      }
    };
    const onClick = (e: MouseEvent) => e.stopPropagation();
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (k === "ArrowLeft") {
        it.vel -= 1.8;
        e.preventDefault();
      } else if (k === "ArrowRight") {
        it.vel += 1.8;
        e.preventDefault();
      } else if (k === "ArrowUp") {
        it.pitchGoal = clamp(it.pitchGoal - 0.14, -MAX_PITCH, MAX_PITCH);
        e.preventDefault();
      } else if (k === "ArrowDown") {
        it.pitchGoal = clamp(it.pitchGoal + 0.14, -MAX_PITCH, MAX_PITCH);
        e.preventDefault();
      } else if (k === "Enter" || k === " ") {
        it.pulse();
        e.preventDefault();
      }
    };
    const onFocus = () => {
      if (!soft) it.boostGoal = 2.4;
    };
    const onBlur = () => {
      it.boostGoal = 1;
      it.yawGoal = 0;
      it.pitchGoal = 0;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", release);
    el.addEventListener("pointercancel", release);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("click", onClick);
    el.addEventListener("keydown", onKey);
    el.addEventListener("focus", onFocus);
    el.addEventListener("blur", onBlur);

    off.push(() => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", release);
      el.removeEventListener("pointercancel", release);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("click", onClick);
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("focus", onFocus);
      el.removeEventListener("blur", onBlur);
    });
  }

  it.destroy = () => {
    const i = list.indexOf(it);
    if (i > -1) list.splice(i, 1);
    io?.unobserve(el);
    off.forEach((fn) => fn());
    if (!list.length && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  list.push(it);
  ensureObserver();
  io?.observe(el);
  it.render();
  kick();

  return it;
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      last = 0;
      kick();
    }
  });
}
