"use client";

import { useRef, useEffect } from "react";

const clients = [
  { name: "Medi-Mere" },
  { name: "Medrie" },
  { name: "Hadoks" },
  { name: "Maasstad Ziekenhuis" },
  { name: "Rijnstate" },
  { name: "Amsterdam UMC" },
  { name: "Erasmus MC" },
  { name: "Radboudumc" },
  { name: "GGZ Rivierduinen" },
  { name: "Buurtzorg" },
  { name: "Lentis GGZ" },
  { name: "Isala Ziekenhuis" },
];

function LogoCard({ name }: { name: string }) {
  return (
    <div className="mx-4 flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/80 px-6">
      <span className="whitespace-nowrap text-sm font-semibold text-slate-400">
        {name}
      </span>
    </div>
  );
}

export default function ClientLogos() {
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, startPos: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.5;

    const animate = () => {
      if (!dragRef.current.active) {
        positionRef.current += speed;
        const halfWidth = track.scrollWidth / 2;
        if (positionRef.current >= halfWidth) positionRef.current = 0;
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragRef.current = { active: true, startX: e.clientX, startPos: positionRef.current };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.active || !trackRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const track = trackRef.current;
    const halfWidth = track.scrollWidth / 2;
    let newPos = dragRef.current.startPos - dx;
    // wrap around
    if (newPos < 0) newPos += halfWidth;
    if (newPos >= halfWidth) newPos -= halfWidth;
    positionRef.current = newPos;
    track.style.transform = `translateX(-${newPos}px)`;
  };

  const onMouseUp = () => { dragRef.current.active = false; };
  const onMouseLeave = () => { dragRef.current.active = false; };

  return (
    <section className="overflow-hidden py-14">
      <div className="mb-8 px-4 text-center">
        <p
          className="text-sm font-medium uppercase tracking-widest text-slate-400"
          style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
        >
          Vertrouwd door zorgorganisaties door heel Nederland
        </p>
      </div>

      <div
        className="relative select-none"
        style={{ cursor: dragRef.current.active ? "grabbing" : "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#fefcf8] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#fefcf8] to-transparent" />

        <div ref={trackRef} className="flex w-max will-change-transform">
          {clients.map((c, i) => <LogoCard key={`a-${i}`} name={c.name} />)}
          {clients.map((c, i) => <LogoCard key={`b-${i}`} name={c.name} />)}
        </div>
      </div>
    </section>
  );
}
