import React, { useEffect, useRef } from 'react';

type ParticleType = 'petal' | 'butterfly' | 'pollen';

interface FloralParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  type: ParticleType;
  wingPhase?: number;
  wingSpeed?: number;
}

export const SparkleClickEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<FloralParticle[]>([]);
  const isLoopingRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Draw miniature fluttering butterfly on tap
    const drawMiniButterfly = (
      c: CanvasRenderingContext2D,
      p: FloralParticle
    ) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rotation);
      c.globalAlpha = Math.max(0, p.alpha);

      const s = p.size;
      const flap = Math.sin(p.wingPhase || 0);

      // Wing scale with flap
      c.fillStyle = p.color;
      c.strokeStyle = '#ffffff';
      c.lineWidth = 0.6;

      // Right Wing
      c.save();
      c.scale(1, Math.abs(flap) * 0.75 + 0.25);
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(s * 0.6, -s * 0.9, s * 1.2, -s * 0.3, 0, s * 0.3);
      c.bezierCurveTo(s * 0.9, s * 0.7, s * 0.3, s * 0.8, 0, 0);
      c.fill();
      c.stroke();
      c.restore();

      // Left Wing
      c.save();
      c.scale(1, -(Math.abs(flap) * 0.75 + 0.25));
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(s * 0.6, -s * 0.9, s * 1.2, -s * 0.3, 0, s * 0.3);
      c.bezierCurveTo(s * 0.9, s * 0.7, s * 0.3, s * 0.8, 0, 0);
      c.fill();
      c.stroke();
      c.restore();

      // Tiny white body
      c.fillStyle = '#ffffff';
      c.beginPath();
      c.ellipse(0, 0, s * 0.3, s * 0.12, 0, 0, Math.PI * 2);
      c.fill();

      c.restore();
    };

    // Draw botanical flower petal on tap
    const drawMiniPetal = (
      c: CanvasRenderingContext2D,
      p: FloralParticle
    ) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rotation);
      c.globalAlpha = Math.max(0, p.alpha);
      c.fillStyle = p.color;

      const s = p.size;
      c.beginPath();
      c.moveTo(0, -s);
      c.bezierCurveTo(s * 0.7, -s * 0.5, s * 0.8, s * 0.5, 0, s);
      c.bezierCurveTo(-s * 0.8, s * 0.5, -s * 0.7, -s * 0.5, 0, -s);
      c.fill();

      // Subtle delicate vein
      c.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      c.lineWidth = 0.5;
      c.beginPath();
      c.moveTo(0, -s * 0.6);
      c.lineTo(0, s * 0.5);
      c.stroke();

      c.restore();
    };

    // Draw glowing floral pollen spark
    const drawPollen = (
      c: CanvasRenderingContext2D,
      p: FloralParticle
    ) => {
      c.save();
      c.globalAlpha = Math.max(0, p.alpha);
      c.fillStyle = p.color;
      c.beginPath();
      c.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
      c.fill();

      // Soft glow aura
      c.fillStyle = 'rgba(255, 255, 255, 0.4)';
      c.beginPath();
      c.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
      c.fill();

      c.restore();
    };

    const animate = () => {
      if (particlesRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isLoopingRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.type === 'butterfly') {
          p.vy -= 0.04; // Butterflies flutter upwards!
          p.vx *= 0.98;
          p.wingPhase = (p.wingPhase || 0) + (p.wingSpeed || 0.2);
        } else if (p.type === 'petal') {
          p.vy += 0.03; // Petals drift gently down
          p.vx *= 0.96;
          p.vy *= 0.97;
        } else {
          p.vx *= 0.94;
          p.vy *= 0.94;
        }

        p.rotation += p.rotationSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        if (p.type === 'butterfly') {
          drawMiniButterfly(ctx, p);
        } else if (p.type === 'petal') {
          drawMiniPetal(ctx, p);
        } else {
          drawPollen(ctx, p);
        }
      }

      requestAnimationFrame(animate);
    };

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') {
        return;
      }

      const styles = getComputedStyle(document.documentElement);
      const glowColor = styles.getPropertyValue('--color-resplandor-glow').trim() || '#e879f9';
      const secColor = styles.getPropertyValue('--color-acento-secundario').trim() || '#c084fc';
      const metalColor = styles.getPropertyValue('--color-metal-acento').trim() || '#f5d0fe';

      const colors = ['#ffffff', glowColor, secColor, metalColor, '#fbcfe8', '#e9d5ff'];
      const count = 16 + Math.floor(Math.random() * 6);
      const newParticles: FloralParticle[] = [];

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 3.4 + 1.2;
        const color = colors[Math.floor(Math.random() * colors.length)];

        let type: ParticleType = 'pollen';
        const rand = Math.random();
        if (rand < 0.28) {
          type = 'butterfly';
        } else if (rand < 0.65) {
          type = 'petal';
        }

        newParticles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          size: type === 'butterfly' ? Math.random() * 5 + 9 : type === 'petal' ? Math.random() * 4 + 7 : Math.random() * 3 + 2,
          alpha: 1,
          decay: type === 'butterfly' ? 0.016 : Math.random() * 0.02 + 0.015,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.08,
          color,
          type,
          wingPhase: Math.random() * Math.PI * 2,
          wingSpeed: Math.random() * 0.18 + 0.15,
        });
      }

      particlesRef.current.push(...newParticles);

      if (!isLoopingRef.current) {
        isLoopingRef.current = true;
        requestAnimationFrame(animate);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      aria-hidden="true"
    />
  );
};
