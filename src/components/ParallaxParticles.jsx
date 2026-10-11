import React, { useEffect, useRef } from 'react';

export default function ParallaxParticles({ scrollY = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create 45 ambient golden particles/light motes
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      depth: Math.random() * 0.8 + 0.2 // Depth factor for parallax
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.pulse += 0.02;
        p.y -= p.speedY;
        p.x += p.speedX;

        // Wrap around screen
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Apply scroll parallax shift based on particle depth
        const parallaxY = (p.y - (window.scrollY * p.depth * 0.15) % height + height) % height;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

        const grad = ctx.createRadialGradient(p.x, parallaxY, 0, p.x, parallaxY, p.size * 2.2);
        grad.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.95})`);
        grad.addColorStop(0.45, `rgba(235, 242, 255, ${currentOpacity * 0.6})`);
        grad.addColorStop(1, 'rgba(215, 230, 255, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, parallaxY, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
