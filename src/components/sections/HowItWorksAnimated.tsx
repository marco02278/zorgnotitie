"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Mic, Brain, FileText, FolderOpen, Loader2, Check, Pencil, ChevronDown } from "lucide-react";

// The animated overlay component for the first step
const RecordingSequence = () => {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stopBtnRef = useRef<HTMLDivElement>(null);
  const [stopBtnPos, setStopBtnPos] = useState({ x: 420, y: 44 });

  // Measure the stop button position relative to the container
  useEffect(() => {
    const measure = () => {
      if (containerRef.current && stopBtnRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const btnRect = stopBtnRef.current.getBoundingClientRect();
        setStopBtnPos({
          x: btnRect.left - containerRect.left + btnRect.width / 2,
          y: btnRect.top - containerRect.top + btnRect.height / 2,
        });
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    let mounted = true;
    const runAnimation = async () => {
      while (mounted) {
        setStep(0); // initial
        await new Promise(r => setTimeout(r, 500)); if (!mounted) break;
        setStep(1); // hover record
        await new Promise(r => setTimeout(r, 800)); if (!mounted) break;
        setStep(2); // click record
        await new Promise(r => setTimeout(r, 300)); if (!mounted) break;
        setStep(3); // recording (waveform)
        await new Promise(r => setTimeout(r, 2500)); if (!mounted) break;
        setStep(4); // hover stop
        await new Promise(r => setTimeout(r, 800)); if (!mounted) break;
        setStep(5); // click stop
        await new Promise(r => setTimeout(r, 400)); if (!mounted) break;
        setStep(6); // processing/loading state
        await new Promise(r => setTimeout(r, 2000)); if (!mounted) break;
        setStep(7); // show transcript
        await new Promise(r => setTimeout(r, 6000));
      }
    };
    runAnimation();
    return () => { mounted = false; };
  }, []);

  const getCursorStyle = useCallback((): React.CSSProperties => {
    const sx = stopBtnPos.x;
    const sy = stopBtnPos.y;
    switch (step) {
      case 0: return { transform: 'translate(200px, 200px) scale(1)', opacity: 0 };
      case 1: return { transform: 'translate(48px, 44px) scale(1)', opacity: 1 };
      case 2: return { transform: 'translate(48px, 44px) scale(0.85)', opacity: 1 };
      case 3: return { transform: 'translate(150px, 200px) scale(1)', opacity: 1 };
      case 4: return { transform: `translate(${sx}px, ${sy}px) scale(1)`, opacity: 1 };
      case 5: return { transform: `translate(${sx}px, ${sy}px) scale(0.85)`, opacity: 1 };
      case 6: return { transform: 'translate(200px, 250px) scale(1)', opacity: 0 };
      case 7: return { transform: 'translate(200px, 250px) scale(1)', opacity: 0 };
      default: return { opacity: 0 };
    }
  }, [step, stopBtnPos]);

  const isRecording = step >= 2 && step <= 4;
  const isProcessing = step === 6;
  const isTranscriptVisible = step >= 7;
  const delays = [0, 0.2, 0.4, 0.1, 0.3, 0.5, 0.2, 0.4, 0, 0.3, 0.1, 0.4, 0.2, 0.5, 0.1, 0.3, 0, 0.2, 0.4, 0.1, 0.3, 0.5, 0.2, 0.4];

  return (
    <div ref={containerRef} className="relative flex flex-col h-full w-full bg-white">
      {/* Header / Controls */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/80">
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${isRecording ? 'bg-red-100 text-red-600 shadow-inner scale-95' : 'bg-white text-slate-400 shadow-sm border border-slate-200 hover:border-slate-300'}`}>
            <Mic className="h-6 w-6" />
          </div>
          <div className="flex items-center gap-3">
            <div className={`h-2.5 w-2.5 rounded-full transition-colors ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`} />
            <span className="text-base font-semibold text-slate-600 font-mono tracking-wide">
              {step < 2 ? '00:00' : isProcessing || isTranscriptVisible ? '00:14' : '00:03'}
            </span>
          </div>
        </div>

        <div ref={stopBtnRef} className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${step === 5 ? 'bg-slate-200 text-slate-800 shadow-inner scale-95' : 'bg-white text-slate-400 shadow-sm border border-slate-200 hover:border-slate-300'}`}>
          <div className="h-4 w-4 bg-current rounded-sm" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center bg-slate-50/30 overflow-hidden relative">
        
        {/* Initial idle state */}
        {step < 2 && !isRecording && !isProcessing && !isTranscriptVisible && (
          <div className="flex flex-col items-center gap-3 text-slate-300">
            <Mic className="h-12 w-12" />
            <p className="text-sm font-medium">Klik op opnemen om te starten</p>
          </div>
        )}

        {/* Waveform Area */}
        {isRecording && (
          <div className="flex items-center gap-[6px] h-28 px-10 animate-[fadeIn_0.3s_ease-out_forwards]">
            {delays.map((delay, i) => (
              <div 
                key={i} 
                className="w-[7px] bg-[#772d07] rounded-full animate-[waveform_1s_ease-in-out_infinite]"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="flex flex-col items-center justify-center gap-4 animate-[fadeIn_0.3s_ease-out_forwards]">
            <Loader2 className="h-10 w-10 text-[#772d07] animate-spin" />
            <p className="text-sm font-semibold text-slate-500 animate-pulse">AI is het transcript aan het genereren...</p>
          </div>
        )}

        {/* Transcript Area */}
        {isTranscriptVisible && (
          <div className="absolute inset-0 flex flex-col justify-start p-5 gap-3 overflow-y-auto bg-white animate-[fadeIn_0.5s_ease-out_forwards]">
            <div className="flex flex-col gap-1 animate-[slideDown_0.5s_ease-out_forwards]" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Arts</span>
              <div className="bg-slate-50 rounded-2xl rounded-tl-none px-5 py-3 w-[88%] border border-slate-100">
                <p className="text-[13px] text-slate-700 leading-relaxed">Goedemorgen mevrouw Jansen. Kunt u aangeven waar de pijn precies zit?</p>
              </div>
            </div>

            <div className="flex flex-col gap-1 items-end animate-[slideDown_0.5s_ease-out_forwards]" style={{ animationDelay: '0.7s', animationFillMode: 'backwards' }}>
              <span className="text-[10px] font-bold text-[#772d07] uppercase tracking-wider mr-1">Patiënt</span>
              <div className="bg-[#772d07]/8 rounded-2xl rounded-tr-none px-5 py-3 w-[88%] border border-[#772d07]/10">
                <p className="text-[13px] text-[#5a2205] leading-relaxed">Het zit vooral onderin mijn rug, sinds gisteravond plotseling ingeschoten.</p>
              </div>
            </div>

            <div className="flex flex-col gap-1 animate-[slideDown_0.5s_ease-out_forwards]" style={{ animationDelay: '1.3s', animationFillMode: 'backwards' }}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Arts</span>
              <div className="bg-slate-50 rounded-2xl rounded-tl-none px-5 py-3 w-[88%] border border-slate-100">
                <p className="text-[13px] text-slate-700 leading-relaxed">Dat klinkt vervelend. Straalt de pijn ook uit naar uw benen of voeten?</p>
              </div>
            </div>

            <div className="flex flex-col gap-1 items-end animate-[slideDown_0.5s_ease-out_forwards]" style={{ animationDelay: '1.9s', animationFillMode: 'backwards' }}>
              <span className="text-[10px] font-bold text-[#772d07] uppercase tracking-wider mr-1">Patiënt</span>
              <div className="bg-[#772d07]/8 rounded-2xl rounded-tr-none px-5 py-3 w-[88%] border border-[#772d07]/10">
                <p className="text-[13px] text-[#5a2205] leading-relaxed">Ja, af en toe voel ik een lichte tinteling in mijn rechterbeen als ik te lang zit.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mouse Cursor */}
      <div 
        className="absolute z-50 transition-all duration-[600ms] ease-out pointer-events-none"
        style={{ top: 0, left: 0, transformOrigin: 'top left', ...getCursorStyle() }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
          <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.8 6.76 21.36L11.44 17.15C11.66 16.95 11.96 16.84 12.26 16.84H18.5C19.16 16.84 19.5 16.06 19.04 15.6L6.54 3.06C6.08 2.6 5.5 2.92 5.5 3.21Z" fill="white" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

// Animation for Step 2: Template selection → AI generates report
const TemplateSequence = () => {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownBarRef = useRef<HTMLDivElement>(null);
  const soepBtnRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ x: 200, y: 100 });
  const [soepPos, setSoepPos] = useState({ x: 120, y: 200 });

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const cRect = containerRef.current.getBoundingClientRect();
        if (dropdownBarRef.current) {
          const dRect = dropdownBarRef.current.getBoundingClientRect();
          setDropdownPos({
            x: dRect.left - cRect.left + dRect.width / 2,
            y: dRect.top - cRect.top + dRect.height / 2,
          });
        }
        if (soepBtnRef.current) {
          const bRect = soepBtnRef.current.getBoundingClientRect();
          setSoepPos({
            x: bRect.left - cRect.left + bRect.width / 2,
            y: bRect.top - cRect.top + bRect.height / 2,
          });
        }
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Re-measure when dropdown opens so we can find the 3rd option's position
  useEffect(() => {
    if (step === 3) {
      // Small delay to let the dropdown items render in the DOM
      const timer = setTimeout(() => {
        if (containerRef.current && soepBtnRef.current) {
          const cRect = containerRef.current.getBoundingClientRect();
          const bRect = soepBtnRef.current.getBoundingClientRect();
          setSoepPos({
            x: bRect.left - cRect.left + bRect.width / 2,
            y: bRect.top - cRect.top + bRect.height / 2,
          });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      while (mounted) {
        setStep(0); await new Promise(r => setTimeout(r, 600)); if (!mounted) break;
        setStep(1); await new Promise(r => setTimeout(r, 800)); if (!mounted) break; // cursor moves to dropdown
        setStep(2); await new Promise(r => setTimeout(r, 400)); if (!mounted) break; // click dropdown
        setStep(3); await new Promise(r => setTimeout(r, 300)); if (!mounted) break; // dropdown opens, cursor stays
        setStep(4); await new Promise(r => setTimeout(r, 1700)); if (!mounted) break; // cursor moves down to 3rd option
        setStep(5); await new Promise(r => setTimeout(r, 400)); if (!mounted) break; // click 3rd option
        setStep(6); await new Promise(r => setTimeout(r, 2200)); if (!mounted) break; // AI generating
        setStep(7); await new Promise(r => setTimeout(r, 5000)); // report visible
      }
    };
    run();
    return () => { mounted = false; };
  }, []);

  const dropdownOpen = step >= 3 && step <= 4;
  const templateSelected = step >= 5;
  const isGenerating = step === 6;
  const reportVisible = step >= 7;

  const getCursorStyle = useCallback((): React.CSSProperties => {
    switch (step) {
      case 0: return { transform: 'translate(200px, 300px) scale(1)', opacity: 0 };
      case 1: return { transform: `translate(${dropdownPos.x}px, ${dropdownPos.y}px) scale(1)`, opacity: 1 };
      case 2: return { transform: `translate(${dropdownPos.x}px, ${dropdownPos.y}px) scale(0.85)`, opacity: 1 };
      case 3: return { transform: `translate(${dropdownPos.x}px, ${dropdownPos.y}px) scale(1)`, opacity: 1 };
      case 4: return { transform: `translate(${soepPos.x}px, ${soepPos.y}px) scale(1)`, opacity: 1 };
      case 5: return { transform: `translate(${soepPos.x}px, ${soepPos.y}px) scale(0.85)`, opacity: 1 };
      case 6: return { transform: 'translate(200px, 300px) scale(1)', opacity: 0 };
      case 7: return { transform: 'translate(200px, 300px) scale(1)', opacity: 0 };
      default: return { opacity: 0 };
    }
  }, [step, soepPos, dropdownPos]);

  const templates = [
    { name: 'SOEP-verslag', desc: 'Subjectief, Objectief, Evaluatie, Plan' },
    { name: 'DAP-notitie', desc: 'Data, Assessment, Plan' },
    { name: 'Intake verslag', desc: 'Gestructureerd intakeverslag' },
    { name: 'Voortgangsnotitie', desc: 'Behandelvoortgang rapportage' },
    { name: 'Ontslagbrief', desc: 'Samenvatting bij ontslag' },
    { name: 'Vrij verslag', desc: 'Ongestructureerd verslag' },
  ];

  return (
    <div ref={containerRef} className="relative flex flex-col h-full w-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
        <div className="flex items-center gap-3">
          <Brain className="h-5 w-5 text-[#772d07]" />
          <span className="text-sm font-semibold text-slate-700">Verslag genereren</span>
        </div>
        {templateSelected && (
          <span className="text-xs font-medium text-[#772d07] bg-[#772d07]/10 px-3 py-1 rounded-full animate-[fadeIn_0.3s_ease-out_forwards]">
            Intake verslag
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Template selector area */}
        {!reportVisible && (
          <div className="p-5 animate-[fadeIn_0.3s_ease-out_forwards]">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Kies een template</p>
            
            {/* Dropdown */}
            <div className="relative">
              <div ref={dropdownBarRef} className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                dropdownOpen || templateSelected 
                  ? 'border-[#772d07] bg-[#772d07]/5' 
                  : 'border-slate-200 bg-white'
              }`}>
                <span className={`text-sm ${templateSelected ? 'font-semibold text-[#772d07]' : 'text-slate-400'}`}>
                  {templateSelected ? 'Intake verslag' : 'Selecteer template...'}
                </span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Dropdown options */}
              <div className={`absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden transition-all duration-300 z-20 ${
                dropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}>
                {templates.map((t, i) => (
                  <div 
                    key={i}
                    ref={i === 2 ? soepBtnRef : undefined}
                    className={`px-4 py-3 border-b border-slate-50 last:border-0 transition-colors ${
                      i === 2 && step >= 4 ? 'bg-[#772d07]/5' : 'hover:bg-slate-50'
                    }`}
                  >
                    <p className="text-sm font-semibold text-slate-700">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Generating state */}
        {isGenerating && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-[fadeIn_0.3s_ease-out_forwards]">
            <Loader2 className="h-10 w-10 text-[#772d07] animate-spin" />
            <p className="text-sm font-semibold text-slate-500 animate-pulse">AI genereert intake verslag...</p>
          </div>
        )}

        {/* Generated report */}
        {reportVisible && (
          <div className="flex-1 flex flex-col p-5 gap-4 overflow-y-auto animate-[fadeIn_0.5s_ease-out_forwards]">
            {[
              { label: 'S', title: 'Subjectief', text: 'Patiënte (46 jr) presenteert zich met acute lage rugpijn sinds gisteravond, plotseling ingeschoten. Af en toe tintelingen in het rechterbeen bij langdurig zitten.' },
              { label: 'O', title: 'Objectief', text: 'Drukpijn L4-L5 paravertebraal rechts. Lasègue rechts positief bij 60°. Geen neurologische uitval. Reflexen symmetrisch.' },
              { label: 'E', title: 'Evaluatie', text: 'Waarschijnlijk lumbale radiculopathie rechts, DD hernia nuclei pulposi L4-L5. Alarmsymptomen afwezig.' },
              { label: 'P', title: 'Plan', text: 'Pijnstilling (paracetamol + naproxen). Fysiotherapie verwijzing. Controle over 2 weken, eerder bij verergering.' },
            ].map((section, i) => (
              <div key={i} className="animate-[slideDown_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 0.3}s`, animationFillMode: 'backwards' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#772d07] text-[10px] font-bold text-white">{section.label}</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{section.title}</span>
                </div>
                <p className="text-[13px] text-slate-700 leading-relaxed pl-8">{section.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mouse Cursor */}
      <div 
        className="absolute z-50 transition-all duration-[600ms] ease-out pointer-events-none"
        style={{ top: 0, left: 0, transformOrigin: 'top left', ...getCursorStyle() }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
          <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.8 6.76 21.36L11.44 17.15C11.66 16.95 11.96 16.84 12.26 16.84H18.5C19.16 16.84 19.5 16.06 19.04 15.6L6.54 3.06C6.08 2.6 5.5 2.92 5.5 3.21Z" fill="white" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

// Animation for Step 3: Manually editing the report
const EditSequence = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      while (mounted) {
        setStep(0); await new Promise(r => setTimeout(r, 500)); if (!mounted) break;
        setStep(1); await new Promise(r => setTimeout(r, 1200)); if (!mounted) break; // show report
        setStep(2); await new Promise(r => setTimeout(r, 800)); if (!mounted) break; // cursor moves to text
        setStep(3); await new Promise(r => setTimeout(r, 400)); if (!mounted) break; // click on text (highlight)
        setStep(4); await new Promise(r => setTimeout(r, 1500)); if (!mounted) break; // typing correction
        setStep(5); await new Promise(r => setTimeout(r, 800)); if (!mounted) break; // cursor moves to second edit
        setStep(6); await new Promise(r => setTimeout(r, 400)); if (!mounted) break; // click
        setStep(7); await new Promise(r => setTimeout(r, 1500)); if (!mounted) break; // typing second correction
        setStep(8); await new Promise(r => setTimeout(r, 4000)); // final view with checkmark
      }
    };
    run();
    return () => { mounted = false; };
  }, []);

  const isEditing1 = step >= 3 && step <= 4;
  const edited1 = step >= 4;
  const isEditing2 = step >= 6 && step <= 7;
  const edited2 = step >= 7;
  const allDone = step >= 8;

  const getCursorStyle = useCallback((): React.CSSProperties => {
    switch (step) {
      case 0: return { transform: 'translate(200px, 350px) scale(1)', opacity: 0 };
      case 1: return { transform: 'translate(200px, 350px) scale(1)', opacity: 0 };
      case 2: return { transform: 'translate(250px, 148px) scale(1)', opacity: 1 };
      case 3: return { transform: 'translate(250px, 148px) scale(0.85)', opacity: 1 };
      case 4: return { transform: 'translate(300px, 148px) scale(1)', opacity: 1 };
      case 5: return { transform: 'translate(180px, 290px) scale(1)', opacity: 1 };
      case 6: return { transform: 'translate(180px, 290px) scale(0.85)', opacity: 1 };
      case 7: return { transform: 'translate(230px, 290px) scale(1)', opacity: 1 };
      case 8: return { transform: 'translate(300px, 400px) scale(1)', opacity: 0 };
      default: return { opacity: 0 };
    }
  }, [step]);

  const sections = [
    {
      label: 'S', title: 'Subjectief',
      original: 'Patiënte (46 jr) met acute lage rugpijn sinds gisteravond.',
      edited: 'Patiënte (46 jr) met acute lage rugpijn sinds gisteravond, na het tillen van een zware doos.',
    },
    {
      label: 'O', title: 'Objectief',
      original: 'Drukpijn L4-L5 paravertebraal rechts. Lasègue rechts positief bij 60°.',
      edited: 'Drukpijn L4-L5 paravertebraal rechts. Lasègue rechts positief bij 60°.',
    },
    {
      label: 'E', title: 'Evaluatie',
      original: 'Waarschijnlijk lumbale radiculopathie rechts.',
      edited: 'Waarschijnlijk lumbale radiculopathie rechts.',
    },
    {
      label: 'P', title: 'Plan',
      original: 'Pijnstilling (paracetamol + naproxen). Controle over 2 weken.',
      edited: 'Pijnstilling (paracetamol + naproxen). Controle over 1 week, eerder bij verergering.',
    },
  ];

  return (
    <div className="relative flex flex-col h-full w-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
        <div className="flex items-center gap-3">
          <Pencil className="h-5 w-5 text-[#772d07]" />
          <span className="text-sm font-semibold text-slate-700">Verslag aanpassen</span>
        </div>
        {allDone && (
          <div className="flex items-center gap-1.5 text-emerald-600 animate-[fadeIn_0.3s_ease-out_forwards]">
            <Check className="h-4 w-4" />
            <span className="text-xs font-semibold">Opgeslagen</span>
          </div>
        )}
      </div>

      {/* Report content */}
      <div className="flex-1 flex flex-col p-5 gap-4 overflow-y-auto">
        {step >= 1 && sections.map((s, i) => (
          <div key={i} className="animate-[slideDown_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'backwards' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#772d07] text-[10px] font-bold text-white">{s.label}</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{s.title}</span>
              {/* Edit indicator */}
              {((i === 0 && edited1) || (i === 3 && edited2)) && (
                <span className="ml-auto text-[10px] font-medium text-emerald-500 animate-[fadeIn_0.3s_ease-out_forwards]">aangepast</span>
              )}
            </div>
            <div className={`relative rounded-lg px-3 py-2 ml-8 transition-all duration-300 ${
              (i === 0 && isEditing1) || (i === 3 && isEditing2)
                ? 'bg-amber-50 ring-2 ring-amber-300'
                : (i === 0 && edited1) || (i === 3 && edited2)
                  ? 'bg-emerald-50/50'
                  : 'bg-transparent'
            }`}>
              <p className="text-[13px] text-slate-700 leading-relaxed">
                {(i === 0 && edited1) ? s.edited : (i === 3 && edited2) ? s.edited : s.original}
              </p>
              {/* Typing cursor indicator */}
              {((i === 0 && isEditing1) || (i === 3 && isEditing2)) && (
                <span className="inline-block w-0.5 h-4 bg-[#772d07] animate-pulse ml-0.5 -mb-0.5" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mouse Cursor */}
      <div 
        className="absolute z-50 transition-all duration-[600ms] ease-out pointer-events-none"
        style={{ top: 0, left: 0, transformOrigin: 'top left', ...getCursorStyle() }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
          <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.8 6.76 21.36L11.44 17.15C11.66 16.95 11.96 16.84 12.26 16.84H18.5C19.16 16.84 19.5 16.06 19.04 15.6L6.54 3.06C6.08 2.6 5.5 2.92 5.5 3.21Z" fill="white" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

const steps = [
  {
    icon: Mic,
    step: 1,
    title: "Gesprek opnemen",
    description:
      "Start de opname tijdens het consult. ZorgNotitie luistert mee en legt het gesprek veilig vast — op elk apparaat.",
    detail:
      "Werkt op telefoon, tablet of desktop. De opname start met één klik en wordt direct versleuteld verzonden naar onze beveiligde servers in Nederland.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Brain,
    step: 2,
    title: "Template kiezen & verslag genereren",
    description:
      "Kies een template zoals SOEP of DAP en laat de AI het transcript automatisch samenvatten tot een gestructureerd verslag.",
    detail:
      "Het taalmodel is specifiek getraind op Nederlandse medische terminologie en vult alle velden automatisch in op basis van het gesprek.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: FileText,
    step: 3,
    title: "Verslag handmatig aanpassen",
    description:
      "Controleer het AI-verslag en pas details handmatig aan voor de laatste verbeteringen.",
    detail:
      "Voeg ontbrekende context toe of corrigeer details. Het verslag wordt direct opgeslagen na uw aanpassingen.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: FolderOpen,
    step: 4,
    title: "Dossiervorming",
    description:
      "De verslaglegging wordt automatisch gekoppeld aan het cliëntdossier, conform Nederlandse zorgstandaarden.",
    detail:
      "Directe integratie met EPD-systemen zoals HiX, Chipsoft en Medicom. Eén klik om de samenvatting over te nemen in het dossier.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
  },
];

export default function HowItWorksAnimated() {
  const [activeStep, setActiveStep] = useState(0);
  const ActiveIcon = steps[activeStep].icon;

  return (
    <section id="hoe-werkt-het" className="bg-white py-24 lg:py-32">
      <Container>
        <SectionHeading
          title="Hoe werkt het?"
          subtitle="Van gesprek naar compleet dossier in vier eenvoudige stappen."
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: Step selector - 4 steps stacked */}
          <div className="flex flex-col gap-4">
            {steps.map((item, index) => (
              <button
                key={item.step}
                onClick={() => setActiveStep(index)}
                className={`group flex w-full cursor-pointer items-start gap-4 rounded-2xl border p-6 text-left transition-all duration-300 ${
                  activeStep === index
                    ? "border-[#772d07] bg-[#772d07] shadow-lg"
                    : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                    activeStep === index
                      ? "bg-white text-[#772d07]"
                      : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-semibold transition-colors ${
                      activeStep === index
                        ? "text-white"
                        : "text-slate-700"
                    }`}
                  >
                    Stap {item.step}: {item.title}
                  </h3>
                  <p
                    className={`mt-1 text-sm leading-relaxed transition-colors ${
                      activeStep === index
                        ? "text-white/90"
                        : "text-slate-400"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Full-height detail panel */}
          <div className="flex">
            {activeStep <= 2 ? (
              <div key={activeStep} className="animate-fade-in-up w-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg relative" style={{ minHeight: '560px' }}>
                {activeStep === 0 && <RecordingSequence />}
                {activeStep === 1 && <TemplateSequence />}
                {activeStep === 2 && <EditSequence />}
              </div>
            ) : (
              <div
                key={activeStep}
                className="animate-fade-in-up flex w-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg"
              >
                {/* Image on top */}
                <div className="relative h-[280px] w-full overflow-hidden">
                  <Image
                    src={steps[activeStep].image}
                    alt={steps[activeStep].title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content below image */}
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#772d07] text-white">
                    <ActiveIcon className="h-7 w-7" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    {steps[activeStep].title}
                  </h3>

                  <p className="mt-4 flex-1 text-base leading-relaxed text-slate-600">
                    {steps[activeStep].detail}
                  </p>

                  {/* Step counter at bottom */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                    <p className="text-sm font-medium text-slate-400">
                      Stap {activeStep + 1} van {steps.length}
                    </p>
                    {/* Progress dots */}
                    <div className="flex gap-2">
                      {steps.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveStep(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            activeStep === index
                              ? "w-8 bg-[#772d07]"
                              : "w-2 bg-slate-200 hover:bg-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
