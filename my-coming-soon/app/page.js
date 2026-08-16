'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const targetDate = new Date().getTime() + 15 * 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: days < 10 ? '0' + days : String(days),
          hours: hours < 10 ? '0' + hours : String(hours),
          minutes: minutes < 10 ? '0' + minutes : String(minutes),
          seconds: seconds < 10 ? '0' + seconds : String(seconds),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let particles = [];
    const particleCount = 45;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 - distance / 1200})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="bg-[#09090b] text-zinc-100 min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden selection:bg-indigo-500 selection:text-white font-sans">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />

      <div className="absolute w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-25 bg-indigo-600 top-0 left-1/4" />
      <div className="absolute w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-25 bg-purple-600 bottom-0 right-1/4" />

      <main className="relative z-10 max-w-2xl w-full">
        <div className="bg-[#121217]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center space-y-8 shadow-2xl">
          
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Something extraordinary is in the works.
            </h1>
            <p className="text-zinc-400 text-sm md:text-base font-normal max-w-lg mx-auto leading-relaxed">
              We&apos;re working hard to give you the best experience possible. Subscribe below to get notified when we go live!
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto">
            <div className="bg-zinc-900/80 border border-zinc-800 p-3 md:p-4 rounded-2xl">
              <span className="block text-2xl md:text-4xl font-extrabold text-white">{timeLeft.days}</span>
              <span className="text-[10px] md:text-xs font-medium text-zinc-500 uppercase tracking-wider">Days</span>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 p-3 md:p-4 rounded-2xl">
              <span className="block text-2xl md:text-4xl font-extrabold text-white">{timeLeft.hours}</span>
              <span className="text-[10px] md:text-xs font-medium text-zinc-500 uppercase tracking-wider">Hours</span>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 p-3 md:p-4 rounded-2xl">
              <span className="block text-2xl md:text-4xl font-extrabold text-white">{timeLeft.minutes}</span>
              <span className="text-[10px] md:text-xs font-medium text-zinc-500 uppercase tracking-wider">Mins</span>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 p-3 md:p-4 rounded-2xl">
              <span className="block text-2xl md:text-4xl font-extrabold text-white">{timeLeft.seconds}</span>
              <span className="text-[10px] md:text-xs font-medium text-zinc-500 uppercase tracking-wider">Secs</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-indigo-600/20 shrink-0"
              >
                Notify Me
              </button>
            </div>
            {submitted && (
              <p className="text-xs text-emerald-400 font-medium">
                ✨ Thank you! We&apos;ll notify you as soon as we launch.
              </p>
            )}
          </form>

          <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <span>&copy; {new Date().getFullYear()} Brand, Inc. All rights reserved.</span>
            <div className="flex items-center gap-4 font-medium">
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}