"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);

  return count;
}

const stats = [
  { value: 75, suffix: "%", label: "Clients satisfaction" },
  { value: 12, suffix: "+", label: "Years Of Experience" },
  { value: 16, suffix: "+", label: "Advanced Member" },
];

export default function VideoStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-8 lg:py-12">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Subtitle + Mission text */}
        <div className="mx-auto mb-24 max-w-4xl text-center">
          <p
            className="mb-4 text-[14px] font-semibold uppercase tracking-wider text-[#772d07]"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Meer tijd voor de cliënt
          </p>
          <p
            className="text-[20px] leading-relaxed text-slate-700"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Zorgprofessionals besteden te veel tijd aan handmatige verslaglegging. Onze tool neemt die last weg: gesprekken worden veilig opgenomen, automatisch getranscribeerd en samengevat in overzichtelijke zorgverslagen. Zo houd je meer tijd en focus voor je cliënt.
          </p>
        </div>

        {/* Even smaller pill-shaped video with very round corners */}
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[150px] shadow-lg">
          <div className="relative aspect-[16/7] w-full overflow-hidden">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80"
            >
              <source
                src="https://videos.pexels.com/video-files/5721225/5721225-uhd_2560_1440_30fps.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        {/* Stats row directly below */}
        <div ref={sectionRef} className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:mt-28">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p
                className="mb-4 text-[56px] font-normal leading-none text-[#772d07] sm:text-[64px]"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                <CountUpValue
                  target={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </p>
              <div className="mx-auto mb-3 h-[1px] w-16 bg-slate-200" />
              <p
                className="text-[15px] font-medium text-slate-500"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUpValue({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const count = useCountUp(target, 2000, isVisible);
  return (
    <>
      {count}
      {suffix}
    </>
  );
}
