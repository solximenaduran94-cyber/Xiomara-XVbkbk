import React, { useEffect, useRef } from 'react';

interface FloatingButterfly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  wingPhase: number;
  wingSpeed: number;
  alpha: number;
  color: string;
}

interface FloatingPetal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  swayPhase: number;
  alpha: number;
  color: string;
}

interface FireflyPollen {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  pulseSpeed: number;
  phase: number;
  vx: number;
  vy: number;
}

interface NebulaCloud {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  colorType: 1 | 2;
}

export const StarrySkyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initAll();
    };

    window.addEventListener('resize', handleResize);

    // 1. Floating Butterflies
    let butterflies: FloatingButterfly[] = [];
    const initButterflies = () => {
      butterflies = [];
      const count = Math.max(6, Math.floor(width / 240));
      for (let i = 0; i < count; i++) {
        butterflies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.3) * 0.8 + 0.3, // gently gliding right
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 8 + 14,
          wingPhase: Math.random() * Math.PI * 2,
          wingSpeed: Math.random() * 0.12 + 0.08,
          alpha: Math.random() * 0.4 + 0.35,
          color: Math.random() < 0.6 ? '#d8b4fe' : '#fbcfe8',
        });
      }
    };

    // 2. Floating Botanical Petals
    let petals: FloatingPetal[] = [];
    const initPetals = () => {
      petals = [];
      const count = Math.max(12, Math.floor(width / 120));
      for (let i = 0; i < count; i++) {
        petals.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.random() * 0.5 + 0.2,
          vy: Math.random() * 0.4 + 0.3, // gently drifting downwards
          size: Math.random() * 6 + 6,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          swayPhase: Math.random() * Math.PI * 2,
          alpha: Math.random() * 0.35 + 0.25,
          color: Math.random() < 0.5 ? '#e9d5ff' : '#fce7f3',
        });
      }
    };

    // 3. Glowing Pollen & Fireflies (Gentle luminous specks, NO stars)
    let fireflies: FireflyPollen[] = [];
    const initFireflies = () => {
      fireflies = [];
      const count = Math.floor(Math.min(width, 1920) / 22);
      for (let i = 0; i < count; i++) {
        fireflies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.8,
          baseAlpha: Math.random() * 0.4 + 0.2,
          pulseSpeed: Math.random() * 0.025 + 0.01,
          phase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
        });
      }
    };

    // 4. Soft Lilac Nebula Clouds
    let clouds: NebulaCloud[] = [];
    const initClouds = () => {
      clouds = [
        {
          x: width * 0.2,
          y: height * 0.25,
          radius: Math.max(width, height) * 0.42,
          vx: 0.07,
          vy: 0.04,
          alpha: 0.25,
          colorType: 1,
        },
        {
          x: width * 0.78,
          y: height * 0.55,
          radius: Math.max(width, height) * 0.46,
          vx: -0.05,
          vy: 0.06,
          alpha: 0.22,
          colorType: 2,
        },
        {
          x: width * 0.45,
          y: height * 0.82,
          radius: Math.max(width, height) * 0.38,
          vx: 0.04,
          vy: -0.04,
          alpha: 0.2,
          colorType: 1,
        },
      ];
    };

    const initAll = () => {
      initButterflies();
      initPetals();
      initFireflies();
      initClouds();
    };

    initAll();

    // Helper: Draw Fluttering Butterfly
    const drawButterfly = (b: FloatingButterfly) => {
      ctx.save();
      ctx.translate(b.x, b.y);

      // Tilt slightly toward movement vector
      const angle = Math.atan2(b.vy, b.vx);
      ctx.rotate(angle * 0.3);

      const wingScale = Math.sin(b.wingPhase); // Flapping from -1 to 1
      ctx.globalAlpha = Math.max(0.1, Math.min(0.85, b.alpha));

      // Wing outline and fill in lilac glow
      ctx.fillStyle = b.color;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.5;

      const s = b.size;

      // Right Wing (with flap scaling on Y axis)
      ctx.save();
      ctx.scale(1, Math.abs(wingScale) * 0.8 + 0.2);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(s * 0.5, -s * 0.9, s * 1.3, -s * 0.4, 0, s * 0.2);
      ctx.bezierCurveTo(s * 1.0, s * 0.6, s * 0.4, s * 0.9, 0, 0);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Left Wing
      ctx.save();
      ctx.scale(1, -(Math.abs(wingScale) * 0.8 + 0.2));
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(s * 0.5, -s * 0.9, s * 1.3, -s * 0.4, 0, s * 0.2);
      ctx.bezierCurveTo(s * 1.0, s * 0.6, s * 0.4, s * 0.9, 0, 0);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Delicate body
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.4, s * 0.1, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Helper: Draw Falling Petal
    const drawPetal = (p: FloatingPetal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;

      // Organic curved petal shape
      const s = p.size;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.7, -s * 0.5, s * 0.8, s * 0.5, 0, s);
      ctx.bezierCurveTo(-s * 0.8, s * 0.5, -s * 0.7, -s * 0.5, 0, -s);
      ctx.fill();

      // Petal central delicate vein
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.7);
      ctx.lineTo(0, s * 0.6);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      const styles = getComputedStyle(document.documentElement);
      const bgBase = styles.getPropertyValue('--color-fondo-base').trim() || '#0b0518';
      const grad1 = styles.getPropertyValue('--color-fondo-grad-1').trim() || '#1e0b38';
      const grad2 = styles.getPropertyValue('--color-fondo-grad-2').trim() || '#3f156d';
      const glowRgb = styles.getPropertyValue('--color-resplandor-glow-rgb').trim() || '216, 180, 254';
      const secRgb = styles.getPropertyValue('--color-acento-secundario-rgb').trim() || '168, 85, 247';

      // 1. Clear frame to keep canvas transparent for background video
      ctx.clearRect(0, 0, width, height);

      // 2. Soft Lilac Nebula & Ambient Clouds
      clouds.forEach((cloud) => {
        cloud.x += cloud.vx;
        cloud.y += cloud.vy;
        if (cloud.x < -cloud.radius) cloud.x = width + cloud.radius;
        if (cloud.x > width + cloud.radius) cloud.x = -cloud.radius;
        if (cloud.y < -cloud.radius) cloud.y = height + cloud.radius;
        if (cloud.y > height + cloud.radius) cloud.y = -cloud.radius;

        const cloudGrad = ctx.createRadialGradient(
          cloud.x,
          cloud.y,
          0,
          cloud.x,
          cloud.y,
          cloud.radius
        );
        cloudGrad.addColorStop(0, `rgba(${glowRgb}, ${cloud.alpha * 1.2})`);
        cloudGrad.addColorStop(
          0.5,
          cloud.colorType === 1 ? `rgba(${secRgb}, 0.18)` : `rgba(${glowRgb}, 0.15)`
        );
        cloudGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = cloudGrad;
        ctx.fillRect(0, 0, width, height);
      });

      // 3. Glowing Pollen / Fireflies (Soft organic spheres, NO stars)
      fireflies.forEach((f) => {
        f.phase += f.pulseSpeed;
        f.x += f.vx;
        f.y += f.vy;

        if (f.x < 0) f.x = width;
        if (f.x > width) f.x = 0;
        if (f.y < 0) f.y = height;
        if (f.y > height) f.y = 0;

        const currentAlpha = Math.max(0.08, Math.min(0.7, f.baseAlpha + Math.sin(f.phase) * 0.25));

        ctx.save();
        ctx.fillStyle = `rgba(${glowRgb}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();

        // Soft aura halo around brighter pollen
        if (currentAlpha > 0.4) {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.35})`;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // 4. Drifting Botanical Petals
      petals.forEach((p) => {
        p.swayPhase += 0.02;
        p.x += p.vx + Math.sin(p.swayPhase) * 0.6;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;

        drawPetal(p);
      });

      // 5. Floating Fluttering Butterflies
      butterflies.forEach((b) => {
        b.wingPhase += b.wingSpeed;
        b.x += b.vx;
        b.y += b.vy + Math.sin(b.wingPhase * 0.5) * 0.4;

        if (b.x > width + 50) {
          b.x = -50;
          b.y = Math.random() * height;
        }
        if (b.y < -30) b.y = height + 20;
        if (b.y > height + 30) b.y = -20;

        drawButterfly(b);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
};
