"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    id: "time-saved",
    percentage: 75,
    label: "Tijdsbesparing op administratie",
  },
  {
    id: "accuracy",
    percentage: 95,
    label: "Nauwkeurigheid in verslaglegging",
  },
  {
    id: "satisfaction",
    percentage: 88,
    label: "Tevredenheid zorgverleners",
  },
];

interface CircularProgressProps {
  percentage: number;
  label: string;
  isVisible: boolean;
}

function CircularProgress({ percentage, label, isVisible }: CircularProgressProps) {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (isVisible) {
      let current = 0;
      const increment = percentage / 80;
      const timer = setInterval(() => {
        current += increment;
        if (current >= percentage) {
          setDisplayPercentage(percentage);
          clearInterval(timer);
        } else {
          setDisplayPercentage(Math.floor(current));
        }
      }, 15);

      return () => clearInterval(timer);
    }
  }, [isVisible, percentage]);

  const offset = circumference - (displayPercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-40 w-40">
        <svg className="h-full w-full -rotate-90 transform">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="rgba(119, 45, 7, 0.15)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#772d07"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1200 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-slate-800">
            {displayPercentage}%
          </span>
        </div>
      </div>
      <p className="mt-4 text-center text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cream-50 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-800 sm:text-4xl lg:text-5xl">
            Bewezen resultaten
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            ZorgNotitie levert meetbare verbeteringen in efficiëntie, kwaliteit en tevredenheid
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 sm:grid-cols-3">
          {stats.map((stat) => (
            <CircularProgress
              key={stat.id}
              percentage={stat.percentage}
              label={stat.label}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
