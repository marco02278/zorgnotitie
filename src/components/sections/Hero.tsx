"use client";

import { useState, useEffect } from "react";
import { Mic, FileText, Pencil, ArrowRight, Clock, CheckCircle2, Sparkles } from "lucide-react";

// Feature showcase phases
const phases = [
  {
    id: "record",
    icon: Mic,
    label: "Opnemen",
    color: "text-red-500",
    bgColor: "bg-red-50",
    ringColor: "ring-red-200",
  },
  {
    id: "report",
    icon: FileText,
    label: "Verslag",
    color: "text-[#772d07]",
    bgColor: "bg-[#772d07]/5",
    ringColor: "ring-[#772d07]/20",
  },
  {
    id: "edit",
    icon: Pencil,
    label: "Aanpassen",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    ringColor: "ring-emerald-200",
  },
];

// Mini animated feature demo
const FeatureShowcase = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [innerStep, setInnerStep] = useState(0);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      while (mounted) {
        // Phase 0: Recording
        setActivePhase(0);
        setInnerStep(0);
        await new Promise(r => setTimeout(r, 600)); if (!mounted) break;
        setInnerStep(1); // recording active
        await new Promise(r => setTimeout(r, 2500)); if (!mounted) break;
        setInnerStep(2); // done recording
        await new Promise(r => setTimeout(r, 800)); if (!mounted) break;

        // Phase 1: AI Report
        setActivePhase(1);
        setInnerStep(0);
        await new Promise(r => setTimeout(r, 400)); if (!mounted) break;
        setInnerStep(1); // generating
        await new Promise(r => setTimeout(r, 1800)); if (!mounted) break;
        setInnerStep(2); // report ready
        await new Promise(r => setTimeout(r, 2500)); if (!mounted) break;

        // Phase 2: Edit
        setActivePhase(2);
        setInnerStep(0);
        await new Promise(r => setTimeout(r, 400)); if (!mounted) break;
        setInnerStep(1); // editing
        await new Promise(r => setTimeout(r, 1800)); if (!mounted) break;
        setInnerStep(2); // saved
        await new Promise(r => setTimeout(r, 2500));
      }
    };
    run();
    return () => { mounted = false; };
  }, []);

  // Waveform bars for recording
  const waveDelays = [0, 0.15, 0.3, 0.05, 0.2, 0.35, 0.1, 0.25, 0, 0.15, 0.3, 0.05, 0.2, 0.35, 0.1, 0.25];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl">
      {/* Top bar - simulated app chrome */}
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-5 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="ml-3 flex items-center gap-2 rounded-lg bg-white px-3 py-1 text-[11px] text-slate-400 border border-slate-100">
          <span className="font-medium text-slate-500">app.zorgnotitie.nl</span>
        </div>
      </div>

      {/* Phase indicator steps */}
      <div className="flex items-center justify-center gap-2 px-5 py-4 border-b border-slate-50">
        {phases.map((phase, i) => (
          <div key={phase.id} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all duration-500 ${
              i === activePhase
                ? `${phase.bgColor} ring-1 ${phase.ringColor}`
                : i < activePhase
                  ? 'bg-emerald-50'
                  : 'bg-slate-50'
            }`}>
              {i < activePhase ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <phase.icon className={`h-3.5 w-3.5 transition-colors duration-300 ${
                  i === activePhase ? phase.color : 'text-slate-300'
                }`} />
              )}
              <span className={`text-[11px] font-semibold transition-colors duration-300 ${
                i === activePhase ? 'text-slate-700' : i < activePhase ? 'text-emerald-600' : 'text-slate-300'
              }`}>
                {phase.label}
              </span>
            </div>
            {i < phases.length - 1 && (
              <ArrowRight className={`h-3 w-3 transition-colors duration-300 ${
                i < activePhase ? 'text-emerald-400' : 'text-slate-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        
        {/* Phase 0: Recording */}
        {activePhase === 0 && (
          <div className="flex flex-col items-center gap-5 animate-[fadeIn_0.4s_ease-out_forwards] w-full">
            {/* Mic button */}
            <div className={`flex h-20 w-20 items-center justify-center rounded-full transition-all duration-500 ${
              innerStep === 1 ? 'bg-red-100 shadow-lg shadow-red-100 scale-110' : 'bg-slate-100'
            }`}>
              <Mic className={`h-9 w-9 transition-colors duration-300 ${
                innerStep === 1 ? 'text-red-500' : 'text-slate-400'
              }`} />
            </div>

            {/* Recording state */}
            {innerStep >= 1 && (
              <div className="flex flex-col items-center gap-3 animate-[fadeIn_0.3s_ease-out_forwards]">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${innerStep === 1 ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`} />
                  <span className="text-sm font-mono font-semibold text-slate-600">
                    {innerStep === 1 ? '00:14' : '00:14'}
                  </span>
                  {innerStep === 2 && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                </div>

                {/* Waveform */}
                {innerStep === 1 && (
                  <div className="flex items-center gap-[3px] h-12 animate-[fadeIn_0.3s_ease-out_forwards]">
                    {waveDelays.map((delay, i) => (
                      <div
                        key={i}
                        className="w-[4px] rounded-full bg-red-400/80 animate-[waveform_1s_ease-in-out_infinite]"
                        style={{ animationDelay: `${delay}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Patient info card */}
            <div className="w-full max-w-[300px] rounded-xl border border-slate-100 bg-slate-50/50 p-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#772d07]/10 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-[#772d07]">MJ</span>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-700">Mw. Jansen</p>
                  <p className="text-[10px] text-slate-400">Consult · Huisarts</p>
                </div>
                <div className="ml-auto">
                  <Clock className="h-3.5 w-3.5 text-slate-300" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 1: AI Report Generation */}
        {activePhase === 1 && (
          <div className="flex flex-col items-center gap-4 w-full animate-[fadeIn_0.4s_ease-out_forwards]">
            {innerStep === 0 && (
              <div className="flex flex-col items-center gap-3">
                <Sparkles className="h-8 w-8 text-[#772d07]" />
                <p className="text-sm font-medium text-slate-500">Template selecteren...</p>
              </div>
            )}

            {innerStep === 1 && (
              <div className="flex flex-col items-center gap-4 animate-[fadeIn_0.3s_ease-out_forwards]">
                <div className="relative">
                  <Sparkles className="h-10 w-10 text-[#772d07] animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-600">SOEP-verslag genereren</p>
                  <p className="text-xs text-slate-400 mt-1">AI analyseert het transcript...</p>
                </div>
                {/* Progress bar */}
                <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#772d07] rounded-full animate-[progressBar_1.8s_ease-out_forwards]" />
                </div>
              </div>
            )}

            {innerStep === 2 && (
              <div className="w-full max-w-[320px] flex flex-col gap-2.5 animate-[fadeIn_0.4s_ease-out_forwards]">
                {['S', 'O', 'E', 'P'].map((letter, i) => (
                  <div
                    key={letter}
                    className="flex items-start gap-2.5 animate-[slideDown_0.4s_ease-out_forwards]"
                    style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'backwards' }}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#772d07] text-[10px] font-bold text-white mt-0.5">
                      {letter}
                    </span>
                    <div className="flex-1">
                      <div className={`h-2 rounded-full bg-slate-200 mb-1.5`} style={{ width: `${85 - i * 10}%` }} />
                      <div className={`h-2 rounded-full bg-slate-100`} style={{ width: `${65 - i * 5}%` }} />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-600">Verslag gereed</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Phase 2: Manual Editing */}
        {activePhase === 2 && (
          <div className="flex flex-col items-center gap-4 w-full animate-[fadeIn_0.4s_ease-out_forwards]">
            <div className="w-full max-w-[320px] flex flex-col gap-2.5">
              {['S', 'O', 'E', 'P'].map((letter, i) => (
                <div key={letter} className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#772d07] text-[10px] font-bold text-white mt-0.5">
                    {letter}
                  </span>
                  <div className={`flex-1 rounded-lg px-2 py-1.5 transition-all duration-500 ${
                    i === 0 && innerStep === 1
                      ? 'bg-amber-50 ring-1 ring-amber-300'
                      : i === 0 && innerStep >= 2
                        ? 'bg-emerald-50/50'
                        : ''
                  }`}>
                    <div className={`h-2 rounded-full mb-1.5 transition-all duration-500 ${
                      i === 0 && innerStep >= 1 ? 'bg-[#772d07]/30' : 'bg-slate-200'
                    }`} style={{ width: `${85 - i * 10}%` }} />
                    <div className={`h-2 rounded-full transition-all duration-500 ${
                      i === 0 && innerStep >= 2 ? 'bg-[#772d07]/20 w-[90%]' : 'bg-slate-100'
                    }`} style={{ width: i === 0 && innerStep >= 2 ? '90%' : `${65 - i * 5}%` }} />
                    {i === 0 && innerStep === 1 && (
                      <span className="inline-block w-0.5 h-3 bg-[#772d07] animate-pulse ml-0.5" />
                    )}
                  </div>
                  {i === 0 && innerStep >= 2 && (
                    <span className="text-[9px] font-semibold text-emerald-500 mt-1 shrink-0">✓</span>
                  )}
                </div>
              ))}
            </div>

            {innerStep >= 2 && (
              <div className="flex items-center gap-2 mt-2 animate-[fadeIn_0.3s_ease-out_forwards]">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-600">Opgeslagen in dossier</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom stats bar */}
      <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-[11px] font-semibold text-slate-500">~2 min</span>
          </div>
          <div className="h-3 w-px bg-slate-200" />
          <span className="text-[11px] text-slate-400">Gemiddelde verwerkingstijd</span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-3 w-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
          <span className="text-[11px] font-bold text-slate-600 ml-1">4.9</span>
        </div>
      </div>
    </div>
  );
};

export default function Hero() {
  return (
    <section className="pt-28 pb-4">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="overflow-hidden rounded-[28px] bg-white">
          <div className="grid lg:grid-cols-2">
            {/* Left content */}
            <div className="flex flex-col justify-center px-10 py-16 sm:px-14 sm:py-20 lg:px-20 lg:py-24">
              <h1
                className="mb-10 text-[56px] font-normal leading-[1.08] tracking-[-0.02em] text-black"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                Automatische gespreksverslagen voor zorgprofessionals.
              </h1>

              <div className="mb-14">
                <a
                  href="/demo"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#772d07] py-[12px] pl-7 pr-[14px] text-[15px] font-semibold text-white transition-all duration-500"
                >
                  <span className="absolute inset-0 z-0 origin-right scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-[#772d07]">
                    Ontdek nu
                  </span>
                  <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm">
                    <svg className="h-4 w-4 text-[#772d07] transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </a>
              </div>

              <div>
                <p
                  className="mb-8 text-[17px] font-semibold text-slate-900"
                  style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                >
                  Neem op, krijg de transcriptie en ontvang direct een gestructureerde samenvatting.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <span className="rounded-full px-5 py-2 text-[13px] font-medium text-slate-700" style={{ backgroundColor: '#fae6bf' }}>
                    AVG
                  </span>
                  <span className="rounded-full px-5 py-2 text-[13px] font-medium text-slate-700" style={{ backgroundColor: '#ffe8f8' }}>
                    NEN 7510
                  </span>
                  <span className="rounded-full px-5 py-2 text-[13px] font-medium text-slate-700" style={{ backgroundColor: '#d7e5ff' }}>
                    Data binnen Europa
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Interactive feature showcase */}
            <div className="flex items-center justify-center p-8 lg:p-12">
              <div className="h-[520px] w-[470px]">
                <FeatureShowcase />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
