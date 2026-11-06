import React, { useEffect, useRef, useState } from 'react';

export interface AxialBeamProps {
  /** Array of colors for the rays */
  colors?: string[];
  /** Color behind the light, or "transparent" */
  backgroundColor?: string;
  /** Blending mode: "add" (light on dark) or "ink" (shading on light) */
  blend?: 'add' | 'ink';
  /** Horizontal position of the light source (0 = left, 1 = right, default: 0.5) */
  originX?: number;
  /** Vertical position of the light source (0 = bottom, 1 = top; negative pushes beyond frame, default: -0.7) */
  originY?: number;
  /** Direction the rays travel in degrees (0 = points up, 180 = down, default: 0) */
  angle?: number;
  /** Perspective tilt/lean in degrees (default: 20) */
  tilt?: number;
  /** Half-width of the fan of rays in degrees (default: 34) */
  spread?: number;
  /** Number of rays in the fan (1 to 16, default: 10) */
  rays?: number;
  /** Multiplier for the width of every ray (default: 1) */
  rayWidth?: number;
  /** How far light travels into the frame before fading, in frame heights (default: 1.1) */
  reach?: number;
  /** How far rays drift from their resting angles (0 holds still, default: 1) */
  swing?: number;
  /** Strength of fade in/out over time (0 to 1, default: 0.6) */
  flicker?: number;
  /** Soft light scattered between and along rays (default: 1) */
  haze?: number;
  /** Overall brightness of the effect (default: 1) */
  intensity?: number;
  /** Animation speed multiplier (0 freezes frame, default: 1) */
  speed?: number;
  /** Lights up rays dynamically as the pointer passes over them (default: true) */
  interactive?: boolean;
  /** How brightly a ray flares when the pointer lines up with it (default: 1) */
  cursorBoost?: number;
  /** Angular reach of the pointer in degrees (default: 5) */
  cursorWidth?: number;
  /** Film grain modifier (default: 0) */
  grain?: number;
  /** Random seed changing arrangement and timing pattern (default: 0) */
  seed?: number;
  /** Freezes the drifting animation (default: false) */
  paused?: boolean;
  /** Upper bound for device pixel ratio (default: 1.5) */
  dpr?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const AxialBeam: React.FC<AxialBeamProps> = ({
  colors = ['#0284c7', '#38bdf8', '#0ea5e9', '#818cf8', '#67e8f9'],
  backgroundColor = 'transparent',
  blend = 'add',
  originX = 0.5,
  originY = -0.7,
  angle = 0,
  tilt = 20,
  spread = 34,
  rays = 10,
  rayWidth = 1,
  reach = 1.1,
  swing = 1,
  flicker = 0.6,
  haze = 1,
  intensity = 1,
  speed = 1,
  interactive = true,
  cursorBoost = 1,
  cursorWidth = 6,
  grain = 0,
  seed = 0,
  paused = false,
  dpr = 1.5,
  className = '',
  style,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = performance.now();

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, dpr);
      canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio));
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);

    const numRays = Math.max(1, Math.min(16, Math.round(rays)));

    // Parse color string to rgb tuple
    const parseRgb = (color: string): [number, number, number] => {
      const temp = document.createElement('canvas').getContext('2d');
      if (!temp) return [56, 189, 248];
      temp.fillStyle = color;
      const computed = temp.fillStyle;
      if (computed.startsWith('#')) {
        const hex = computed.slice(1);
        const bigint = parseInt(hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex, 16);
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
      }
      const match = computed.match(/\d+/g);
      if (match && match.length >= 3) {
        return [Number(match[0]), Number(match[1]), Number(match[2])];
      }
      return [56, 189, 248];
    };

    const parsedColors = colors.map(parseRgb);

    const render = (now: number) => {
      if (!paused) {
        // Continue animation
      }
      const t = paused ? 0 : ((now - startTime) / 1000) * speed;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      if (backgroundColor && backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.save();
      ctx.globalCompositeOperation = blend === 'ink' ? 'multiply' : 'screen';

      // Origin coordinates in pixels
      // originY: 0 = bottom, 1 = top. Negative values push below bottom
      const ox = originX * w;
      const oy = h - originY * h;

      // Pointer angle calculation
      let cursorAngle: number | null = null;
      if (interactive && mouseRef.current.active) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dx = mx - ox;
        const dy = my - oy;
        // 0 degrees is up (-Y)
        cursorAngle = Math.atan2(dx, -dy) * (180 / Math.PI);
      }

      const maxDist = h * reach;

      // Ambient Haze at base
      if (haze > 0) {
        const hazeRadius = Math.max(w, h) * 0.85;
        const hazeGrad = ctx.createRadialGradient(ox, oy, 10, ox, oy, hazeRadius);
        const primaryColor = parsedColors[0] || [56, 189, 248];
        const hazeAlpha = 0.22 * haze * intensity;
        hazeGrad.addColorStop(0, `rgba(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]}, ${hazeAlpha})`);
        hazeGrad.addColorStop(0.4, `rgba(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]}, ${hazeAlpha * 0.4})`);
        hazeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = hazeGrad;
        ctx.beginPath();
        ctx.arc(ox, oy, hazeRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render individual volumetric light rays
      for (let i = 0; i < numRays; i++) {
        const norm = numRays === 1 ? 0 : (i / (numRays - 1) - 0.5) * 2;
        const baseAngle = angle + norm * spread;

        // Subtle drifting sway
        const drift = Math.sin(t * 0.8 + seed + i * 1.618) * swing * (spread * 0.12);
        const currentAngle = baseAngle + drift;

        // Dynamic flicker
        const currentFlicker = 1.0 - flicker * 0.35 * (0.5 + 0.5 * Math.sin(t * 1.5 + i * 2.3 + seed));

        // Cursor boost flare
        let boost = 1.0;
        if (cursorAngle !== null) {
          const diff = Math.abs(currentAngle - cursorAngle);
          if (diff <= cursorWidth) {
            const proximity = 1.0 - diff / cursorWidth;
            boost = 1.0 + cursorBoost * 1.8 * Math.pow(proximity, 1.5);
          }
        }

        const rayIntensity = Math.min(1.5, intensity * currentFlicker * boost);
        const color = parsedColors[i % parsedColors.length];

        const rad = (currentAngle * Math.PI) / 180;
        // Direction vector pointing up at angle 0
        const dirX = Math.sin(rad);
        const dirY = -Math.cos(rad);

        // Ray tip position
        const targetX = ox + dirX * maxDist;
        const targetY = oy + dirY * maxDist;

        // Perpendicular vector for ray width
        const perpX = -dirY;
        const perpY = dirX;

        // Perspective fan width expansion: wider near top/reach, narrower near origin
        const baseWidth = (14 + Math.abs(norm) * 8) * rayWidth;
        const endWidth = baseWidth * (1.8 + (tilt / 45));

        ctx.beginPath();
        ctx.moveTo(ox - perpX * (baseWidth * 0.2), oy - perpY * (baseWidth * 0.2));
        ctx.lineTo(targetX - perpX * endWidth, targetY - perpY * endWidth);
        ctx.lineTo(targetX + perpX * endWidth, targetY + perpY * endWidth);
        ctx.lineTo(ox + perpX * (baseWidth * 0.2), oy + perpY * (baseWidth * 0.2));
        ctx.closePath();

        // Linear gradient from origin to reach distance
        const rayGrad = ctx.createLinearGradient(ox, oy, targetX, targetY);
        const alpha = Math.min(1, 0.42 * rayIntensity);
        rayGrad.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.95})`);
        rayGrad.addColorStop(0.2, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.75})`);
        rayGrad.addColorStop(0.55, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.35})`);
        rayGrad.addColorStop(0.85, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.08})`);
        rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = rayGrad;
        ctx.fill();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [
    colors,
    backgroundColor,
    blend,
    originX,
    originY,
    angle,
    tilt,
    spread,
    rays,
    rayWidth,
    reach,
    swing,
    flicker,
    haze,
    intensity,
    speed,
    interactive,
    cursorBoost,
    cursorWidth,
    grain,
    seed,
    paused,
    dpr,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
      {children && <div className="relative z-10 w-full h-full">{children}</div>}
    </div>
  );
};

export default AxialBeam;
