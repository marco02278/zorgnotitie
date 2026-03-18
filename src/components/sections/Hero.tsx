"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, FileText, Pencil, ArrowRight, Clock, CheckCircle2, Loader2, Check, ChevronDown, Brain, Download } from "lucide-react";

const phases = [
  { id: "record", icon: Mic, label: "Opnemen", color: "text-red-500", bgColor: "bg-red-50", ringColor: "ring-red-200" },
  { id: "report", icon: FileText, label: "Verslag", color: "text-orange-700", bgColor: "bg-orange-50", ringColor: "ring-orange-200" },
  { id: "edit", icon: Pencil, label: "Aanpassen", color: "text-amber-600", bgColor: "bg-amber-50", ringColor: "ring-amber-200" },
  { id: "export", icon: Download, label: "Exporteren", color: "text-blue-600", bgColor: "bg-blue-50", ringColor: "ring-blue-200" },
];

const soepSections = [
  { label: "S", title: "Subjectief", original: "Patiënte (46 jr) met acute lage rugpijn sinds gisteravond.", edited: "Patiënte (46 jr) met acute lage rugpijn, na het tillen van een zware doos." },
  { label: "O", title: "Objectief", original: "Drukpijn L4-L5 paravertebraal rechts. Lasègue positief bij 60°." },
  { label: "E", title: "Evaluatie", original: "Waarschijnlijk lumbale radiculopathie rechts." },
  { label: "P", title: "Plan", original: "Pijnstilling + fysiotherapie. Controle over 2 weken." },
];

const templates = [
  { name: "SOEP-verslag", desc: "Subjectief, Objectief, Evaluatie, Plan" },
  { name: "DAP-notitie", desc: "Data, Assessment, Plan" },
  { name: "Intake verslag", desc: "Gestructureerd intakeverslag" },
];

const waveDelays = [0, 0.2, 0.4, 0.1, 0.3, 0.5, 0.2, 0.4, 0, 0.3, 0.1, 0.4, 0.2, 0.5, 0.1, 0.3, 0, 0.2, 0.4, 0.1];
const commentText = "Oorzaak toevoegen: pijn begon na tillen";

const FeatureShowcase = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [step, setStep] = useState(0);
  const [typedChars, setTypedChars] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const micBtnRef = useRef<HTMLDivElement>(null);
  const stopBtnRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const soepOptionRef = useRef<HTMLDivElement>(null);
  const sBtnRef = useRef<HTMLDivElement>(null);
  const toepassenBtnRef = useRef<HTMLDivElement>(null);
  const exportBtnRef = useRef<HTMLDivElement>(null);

  const [micPos, setMicPos] = useState({ x: 60, y: 55 });
  const [stopPos, setStopPos] = useState({ x: 400, y: 55 });
  const [dropPos, setDropPos] = useState({ x: 200, y: 130 });
  const [soepPos, setSoepPos] = useState({ x: 180, y: 210 });
  const [sPos, setSPos] = useState({ x: 200, y: 200 });
  const [toepassenPos, setToepassenPos] = useState({ x: 420, y: 400 });
  const [exportPos, setExportPos] = useState({ x: 230, y: 420 });

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const pos = (ref: React.RefObject<HTMLDivElement | null>, fx = 0.5, fy = 0.5) => {
      if (!ref.current) return null;
      const r = ref.current.getBoundingClientRect();
      return { x: r.left - cRect.left + r.width * fx, y: r.top - cRect.top + r.height * fy };
    };
    const m = pos(micBtnRef); if (m) setMicPos(m);
    const s = pos(stopBtnRef); if (s) setStopPos(s);
    const d = pos(dropdownRef); if (d) setDropPos(d);
    const so = pos(soepOptionRef, 0.5, 0.5); if (so) setSoepPos(so);
    const sb = pos(sBtnRef, 0.4, 0.5); if (sb) setSPos(sb);
    const tb = pos(toepassenBtnRef, 0.5, 0.5); if (tb) setToepassenPos(tb);
    const eb = pos(exportBtnRef, 0.5, 0.5); if (eb) setExportPos(eb);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    const t1 = setTimeout(measure, 50);
    const t2 = setTimeout(measure, 200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [activePhase, step, measure]);

  useEffect(() => {
    if (activePhase === 2 && step === 4) {
      setTypedChars(0);
      let i = 0;
      const iv = setInterval(() => { i++; setTypedChars(i); if (i >= commentText.length) clearInterval(iv); }, 55);
      return () => clearInterval(iv);
    }
  }, [activePhase, step]);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      while (mounted) {
        // Phase 0: Recording
        setActivePhase(0); setStep(0);
        await new Promise(r => setTimeout(r, 700)); if (!mounted) break;
        setStep(1); await new Promise(r => setTimeout(r, 900)); if (!mounted) break;
        setStep(2); await new Promise(r => setTimeout(r, 300)); if (!mounted) break;
        setStep(3); await new Promise(r => setTimeout(r, 2500)); if (!mounted) break;
        setStep(4); await new Promise(r => setTimeout(r, 800)); if (!mounted) break;
        setStep(5); await new Promise(r => setTimeout(r, 300)); if (!mounted) break;
        setStep(6); await new Promise(r => setTimeout(r, 1600)); if (!mounted) break;
        setStep(7); await new Promise(r => setTimeout(r, 3500)); if (!mounted) break;

        // Phase 1: Report
        setActivePhase(1); setStep(0);
        await new Promise(r => setTimeout(r, 500)); if (!mounted) break;
        setStep(1); await new Promise(r => setTimeout(r, 900)); if (!mounted) break;
        setStep(2); await new Promise(r => setTimeout(r, 400)); if (!mounted) break;
        setStep(3); await new Promise(r => setTimeout(r, 300)); if (!mounted) break;
        setStep(4); await new Promise(r => setTimeout(r, 900)); if (!mounted) break;
        setStep(5); await new Promise(r => setTimeout(r, 400)); if (!mounted) break;
        setStep(6); await new Promise(r => setTimeout(r, 1800)); if (!mounted) break;
        setStep(7); await new Promise(r => setTimeout(r, 4000)); if (!mounted) break;

        // Phase 2: Edit
        setActivePhase(2); setStep(0);
        await new Promise(r => setTimeout(r, 800)); if (!mounted) break;
        setStep(1); await new Promise(r => setTimeout(r, 900)); if (!mounted) break;
        setStep(2); await new Promise(r => setTimeout(r, 400)); if (!mounted) break;
        setStep(3); await new Promise(r => setTimeout(r, 500)); if (!mounted) break;
        setStep(4); await new Promise(r => setTimeout(r, 3200)); if (!mounted) break;
        setStep(5); await new Promise(r => setTimeout(r, 900)); if (!mounted) break;
        setStep(6); await new Promise(r => setTimeout(r, 400)); if (!mounted) break;
        setStep(7); await new Promise(r => setTimeout(r, 800)); if (!mounted) break;
        setStep(8); await new Promise(r => setTimeout(r, 1200)); if (!mounted) break;

        // Phase 3: Export
        setActivePhase(3); setStep(0);
        await new Promise(r => setTimeout(r, 1000)); if (!mounted) break;
        setStep(1); await new Promise(r => setTimeout(r, 1000)); if (!mounted) break;
        setStep(2); await new Promise(r => setTimeout(r, 400)); if (!mounted) break;
        setStep(3); await new Promise(r => setTimeout(r, 2000)); if (!mounted) break;
        setStep(4); await new Promise(r => setTimeout(r, 4000)); if (!mounted) break;
      }
    };
    run();
    return () => { mounted = false; };
  }, []);

  const getCursorStyle = useCallback((): React.CSSProperties => {
    // Phase 0: Recording — click mic, then click stop
    if (activePhase === 0) {
      switch (step) {
        case 0: return { transform: `translate(${micPos.x}px,${micPos.y}px)`, opacity: 0 };
        case 1: return { transform: `translate(${micPos.x}px,${micPos.y}px)`, opacity: 1 };
        case 2: return { transform: `translate(${micPos.x}px,${micPos.y}px) scale(0.85)`, opacity: 1 };
        case 3: return { transform: `translate(${micPos.x}px,${micPos.y}px)`, opacity: 0 };
        case 4: return { transform: `translate(${stopPos.x}px,${stopPos.y}px)`, opacity: 1 };
        case 5: return { transform: `translate(${stopPos.x}px,${stopPos.y}px) scale(0.85)`, opacity: 1 };
        default: return { transform: `translate(${stopPos.x}px,${stopPos.y}px)`, opacity: 0 };
      }
    }
    // Phase 1: Report — click dropdown, then click SOEP option
    if (activePhase === 1) {
      switch (step) {
        case 0: return { transform: `translate(${dropPos.x}px,${dropPos.y}px)`, opacity: 0 };
        case 1: return { transform: `translate(${dropPos.x}px,${dropPos.y}px)`, opacity: 1 };
        case 2: return { transform: `translate(${dropPos.x}px,${dropPos.y}px) scale(0.85)`, opacity: 1 };
        case 3: return { transform: `translate(${dropPos.x}px,${dropPos.y}px)`, opacity: 1 };
        case 4: return { transform: `translate(${soepPos.x}px,${soepPos.y}px)`, opacity: 1 };
        case 5: return { transform: `translate(${soepPos.x}px,${soepPos.y}px) scale(0.85)`, opacity: 1 };
        default: return { transform: `translate(${soepPos.x}px,${soepPos.y}px)`, opacity: 0 };
      }
    }
    // Phase 2: Edit — click S section, type comment, click Toepassen
    if (activePhase === 2) {
      switch (step) {
        case 0: return { transform: `translate(${sPos.x}px,${sPos.y}px)`, opacity: 0 };
        case 1: return { transform: `translate(${sPos.x}px,${sPos.y}px)`, opacity: 1 };
        case 2: return { transform: `translate(${sPos.x}px,${sPos.y}px) scale(0.85)`, opacity: 1 };
        case 3: return { transform: `translate(${sPos.x}px,${sPos.y}px)`, opacity: 0 };
        case 4: return { transform: `translate(${sPos.x}px,${sPos.y}px)`, opacity: 0 };
        case 5: return { transform: `translate(${toepassenPos.x}px,${toepassenPos.y}px)`, opacity: 1 };
        case 6: return { transform: `translate(${toepassenPos.x}px,${toepassenPos.y}px) scale(0.85)`, opacity: 1 };
        default: return { transform: `translate(${toepassenPos.x}px,${toepassenPos.y}px)`, opacity: 0 };
      }
    }
    // Phase 3: Export — click export button
    if (activePhase === 3) {
      switch (step) {
        case 0: return { transform: `translate(${exportPos.x}px,${exportPos.y}px)`, opacity: 0 };
        case 1: return { transform: `translate(${exportPos.x}px,${exportPos.y}px)`, opacity: 1 };
        case 2: return { transform: `translate(${exportPos.x}px,${exportPos.y}px) scale(0.85)`, opacity: 1 };
        default: return { transform: `translate(${exportPos.x}px,${exportPos.y}px)`, opacity: 0 };
      }
    }
    return { opacity: 0 };
  }, [activePhase, step, micPos, stopPos, dropPos, soepPos, sPos, toepassenPos, exportPos]);

  const isRecording = activePhase === 0 && step >= 2 && step <= 4;
  const isProcessing = activePhase === 0 && step === 6;
  const transcriptVisible = activePhase === 0 && step >= 7;
  const dropdownOpen = activePhase === 1 && step >= 3 && step <= 4;
  const templateSelected = activePhase === 1 && step >= 5;
  const isGenerating = activePhase === 1 && step === 6;
  const reportVisible = activePhase === 1 && step >= 7;
  const sSelected = activePhase === 2 && step >= 2 && step <= 6;
  const panelOpen = activePhase === 2 && step >= 3 && step <= 6;
  const toepassenClicked = activePhase === 2 && step >= 6;
  const edited = activePhase === 2 && step >= 7;
  const allSaved = activePhase === 2 && step >= 8;
  const isExporting = activePhase === 3 && step === 3;
  const exportDone = activePhase === 3 && step >= 4;

  return (
    <div ref={containerRef} className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl">
      {/* Top bar */}
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

      {/* Phase indicator */}
      <div className="flex items-center justify-center gap-1 px-3 py-2.5 border-b border-slate-50">
        {phases.map((phase, i) => (
          <div key={phase.id} className="flex items-center gap-1">
            <div className={`flex items-center gap-1 rounded-full px-2 py-1 transition-all duration-500 ${
              i === activePhase ? `${phase.bgColor} ring-1 ${phase.ringColor}` : i < activePhase ? "bg-emerald-50" : "bg-slate-50"
            }`}>
              {i < activePhase ? <CheckCircle2 className="h-3 w-3 text-emerald-500" /> : (
                <phase.icon className={`h-3 w-3 transition-colors duration-300 ${i === activePhase ? phase.color : "text-slate-300"}`} />
              )}
              <span className={`text-[10px] font-semibold transition-colors duration-300 ${
                i === activePhase ? "text-slate-700" : i < activePhase ? "text-emerald-600" : "text-slate-300"
              }`}>{phase.label}</span>
            </div>
            {i < phases.length - 1 && (
              <ArrowRight className={`h-2.5 w-2.5 transition-colors duration-300 ${i < activePhase ? "text-emerald-400" : "text-slate-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">

        {/* ===== PHASE 0: Recording ===== */}
        {activePhase === 0 && (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-3">
                <div ref={micBtnRef} className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${isRecording ? "bg-red-100 text-red-600 scale-95 shadow-inner" : "bg-white text-slate-400 shadow-sm border border-slate-200"}`}>
                  <Mic className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full transition-colors ${isRecording ? "bg-red-500 animate-pulse" : "bg-slate-300"}`} />
                  <span className="text-sm font-mono font-semibold text-slate-600">{step < 2 ? "00:00" : isProcessing || transcriptVisible ? "00:14" : "00:06"}</span>
                </div>
              </div>
              <div ref={stopBtnRef} className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${step === 5 ? "bg-slate-200 scale-95 shadow-inner" : "bg-white shadow-sm border border-slate-200"}`}>
                <div className="h-3.5 w-3.5 bg-slate-400 rounded-sm" />
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-slate-50/30">
              {step < 2 && (
                <div className="flex flex-col items-center gap-3 text-slate-300">
                  <Mic className="h-10 w-10" />
                  <p className="text-sm font-medium">Klik op opnemen om te starten</p>
                </div>
              )}
              {isRecording && (
                <div className="flex items-center gap-[5px] h-20 px-8 animate-[fadeIn_0.3s_ease-out_forwards]">
                  {waveDelays.map((delay, i) => (
                    <div key={i} className="w-[6px] bg-[#772d07] rounded-full animate-[waveform_1s_ease-in-out_infinite]" style={{ animationDelay: `${delay}s` }} />
                  ))}
                </div>
              )}
              {isProcessing && (
                <div className="flex flex-col items-center gap-3 animate-[fadeIn_0.3s_ease-out_forwards]">
                  <Loader2 className="h-9 w-9 text-[#772d07] animate-spin" />
                  <p className="text-sm font-semibold text-slate-500 animate-pulse">Transcript genereren...</p>
                </div>
              )}
              {transcriptVisible && (
                <div className="absolute inset-0 flex flex-col p-4 gap-3 overflow-y-auto bg-white animate-[fadeIn_0.5s_ease-out_forwards]">
                  <div className="flex flex-col gap-1 animate-[slideDown_0.5s_ease-out_forwards]" style={{ animationFillMode: "backwards" }}>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Arts</span>
                    <div className="bg-slate-50 rounded-2xl rounded-tl-none px-4 py-2.5 w-[85%] border border-slate-100">
                      <p className="text-[12px] text-slate-700 leading-relaxed">Goedemorgen mevrouw Jansen. Kunt u aangeven waar de pijn precies zit?</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-end animate-[slideDown_0.5s_ease-out_forwards]" style={{ animationDelay: "0.6s", animationFillMode: "backwards" }}>
                    <span className="text-[10px] font-bold text-[#772d07] uppercase tracking-wider mr-1">Patiënt</span>
                    <div className="bg-[#772d07]/5 rounded-2xl rounded-tr-none px-4 py-2.5 w-[85%] border border-[#772d07]/10">
                      <p className="text-[12px] text-[#5a2205] leading-relaxed">Het zit onderin mijn rug, sinds gisteravond plotseling ingeschoten.</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 animate-[slideDown_0.5s_ease-out_forwards]" style={{ animationDelay: "1.2s", animationFillMode: "backwards" }}>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Arts</span>
                    <div className="bg-slate-50 rounded-2xl rounded-tl-none px-4 py-2.5 w-[85%] border border-slate-100">
                      <p className="text-[12px] text-slate-700 leading-relaxed">Straalt de pijn ook uit naar uw benen of voeten?</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== PHASE 1: Template & Report ===== */}
        {activePhase === 1 && (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-3">
                <Brain className="h-4 w-4 text-[#772d07]" />
                <span className="text-sm font-semibold text-slate-700">Verslag genereren</span>
              </div>
              {templateSelected && (
                <span className="text-xs font-medium text-[#772d07] bg-[#772d07]/10 px-3 py-1 rounded-full animate-[fadeIn_0.3s_ease-out_forwards]">SOEP-verslag</span>
              )}
            </div>
            <div className="flex-1 flex flex-col overflow-hidden relative">
              {!reportVisible && !isGenerating && (
                <div className="p-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Kies een template</p>
                  <div className="relative">
                    <div ref={dropdownRef} className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer ${dropdownOpen || templateSelected ? "border-[#772d07] bg-[#772d07]/5" : "border-slate-200 bg-white"}`}>
                      <span className={`text-sm ${templateSelected ? "font-semibold text-[#772d07]" : "text-slate-400"}`}>
                        {templateSelected ? "SOEP-verslag" : "Selecteer template..."}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                    </div>
                    <div className={`absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden transition-all duration-300 z-20 ${dropdownOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
                      {templates.map((t, i) => (
                        <div key={i} ref={i === 0 ? soepOptionRef : undefined} className={`px-4 py-3 border-b border-slate-50 last:border-0 transition-colors ${i === 0 && step >= 4 ? "bg-[#772d07]/5" : "hover:bg-slate-50"}`}>
                          <p className="text-sm font-semibold text-slate-700">{t.name}</p>
                          <p className="text-xs text-slate-400">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {isGenerating && (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-[fadeIn_0.3s_ease-out_forwards]">
                  <Loader2 className="h-9 w-9 text-[#772d07] animate-spin" />
                  <p className="text-sm font-semibold text-slate-500 animate-pulse">AI genereert SOEP-verslag...</p>
                </div>
              )}
              {reportVisible && (
                <div className="flex-1 flex flex-col p-4 gap-3 overflow-y-auto animate-[fadeIn_0.5s_ease-out_forwards]">
                  {soepSections.map((s, i) => (
                    <div key={i} className="animate-[slideDown_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 0.25}s`, animationFillMode: "backwards" }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#772d07] text-[9px] font-bold text-white">{s.label}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{s.title}</span>
                      </div>
                      <p className="text-[12px] text-slate-700 leading-relaxed pl-7">{s.original}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== PHASE 2: Edit ===== */}
        {activePhase === 2 && (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-3">
                <Pencil className="h-4 w-4 text-[#772d07]" />
                <span className="text-sm font-semibold text-slate-700">Verslag aanpassen</span>
              </div>
              {allSaved && (
                <div className="flex items-center gap-1.5 text-emerald-600 animate-[fadeIn_0.3s_ease-out_forwards]">
                  <Check className="h-4 w-4" />
                  <span className="text-xs font-semibold">Opgeslagen</span>
                </div>
              )}
            </div>
            <div className="flex-1 flex overflow-hidden">
              <div className={`flex-1 flex flex-col p-4 gap-2.5 overflow-y-auto transition-all duration-500 ${panelOpen ? "pr-2" : "pr-4"}`}>
                {soepSections.map((s, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#772d07] text-[9px] font-bold text-white">{s.label}</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{s.title}</span>
                      {i === 0 && edited && <span className="ml-auto text-[9px] font-medium text-emerald-500 animate-[fadeIn_0.3s_ease-out_forwards]">aangepast</span>}
                    </div>
                    <div ref={i === 0 ? sBtnRef : undefined} className={`relative rounded-lg px-2.5 py-1.5 ml-6 transition-all duration-300 ${
                      i === 0 && sSelected && !edited ? "bg-amber-50 ring-2 ring-amber-300" : i === 0 && edited ? "bg-emerald-50/50" : ""
                    }`}>
                      <p className="text-[12px] text-slate-700 leading-relaxed">
                        {i === 0 && edited ? s.edited : s.original}
                      </p>
                      {i === 0 && step === 3 && <span className="inline-block w-0.5 h-3 bg-[#772d07] animate-pulse ml-0.5" />}
                    </div>
                  </div>
                ))}
              </div>
              <div className={`border-l border-slate-200 bg-slate-50 flex flex-col transition-all duration-500 ease-out overflow-hidden ${panelOpen ? "w-[155px] opacity-100" : "w-0 opacity-0"}`}>
                <div className="p-3 flex flex-col h-full min-w-[155px]">
                  <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-slate-200">
                    <Pencil className="h-3 w-3 text-[#772d07]" />
                    <span className="text-[10px] font-bold text-slate-600">Opmerking</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded bg-[#772d07] text-[8px] font-bold text-white">S</span>
                    <span className="text-[9px] font-semibold text-slate-500">Subjectief</span>
                  </div>
                  <div className="flex-1 bg-white rounded-lg border border-slate-200 p-2 mb-2">
                    <p className="text-[11px] text-slate-700 leading-relaxed break-words">
                      {step >= 4 ? commentText.slice(0, typedChars) : ""}
                      {step === 4 && typedChars < commentText.length && <span className="inline-block w-0.5 h-3 bg-[#772d07] animate-pulse ml-px -mb-0.5" />}
                    </p>
                    {step < 4 && <p className="text-[10px] text-slate-300 italic">Typ een opmerking...</p>}
                  </div>
                  <div ref={toepassenBtnRef}>
                    <button className={`w-full py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-300 ${toepassenClicked ? "bg-[#772d07] text-white scale-95" : step >= 5 ? "bg-[#772d07] text-white" : "bg-slate-200 text-slate-400"}`}>
                      Toepassen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ===== PHASE 3: Export ===== */}
        {activePhase === 3 && (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-3">
                <Download className="h-4 w-4 text-[#772d07]" />
                <span className="text-sm font-semibold text-slate-700">Verslag exporteren</span>
              </div>
              {exportDone && (
                <div className="flex items-center gap-1.5 text-emerald-600 animate-[fadeIn_0.3s_ease-out_forwards]">
                  <Check className="h-4 w-4" />
                  <span className="text-xs font-semibold">Geëxporteerd</span>
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
              {!exportDone && !isExporting && (
                <div className="flex-1 flex flex-col p-4 gap-2.5 overflow-y-auto animate-[fadeIn_0.4s_ease-out_forwards]">
                  {soepSections.map((s, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#772d07] text-[9px] font-bold text-white">{s.label}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{s.title}</span>
                      </div>
                      <p className="text-[12px] text-slate-700 leading-relaxed pl-7">
                        {i === 0 ? s.edited : s.original}
                      </p>
                    </div>
                  ))}
                  <div ref={exportBtnRef} className="mt-auto">
                    <button
                      className={`w-full rounded-xl py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all ${step === 2 ? "scale-95 brightness-90" : ""}`}
                      style={{ backgroundColor: '#772d07' }}
                    >
                      <Download className="h-4 w-4" />
                      Exporteren
                    </button>
                  </div>
                </div>
              )}
              {isExporting && (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-[fadeIn_0.3s_ease-out_forwards]">
                  <Loader2 className="h-9 w-9 text-[#772d07] animate-spin" />
                  <p className="text-sm font-semibold text-slate-500 animate-pulse">Exporteren...</p>
                </div>
              )}
              {exportDone && (
                <div className="flex-1 flex flex-col items-center justify-center gap-5 p-6 animate-[fadeIn_0.5s_ease-out_forwards]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                    <Check className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-base font-bold text-slate-800">Verslag geëxporteerd</p>
                    <p className="mt-1 text-xs text-slate-500">Toegevoegd aan het dossier van mw. Jansen</p>
                  </div>
                  <div className="w-full rounded-xl bg-slate-50 border border-slate-100 p-4 flex flex-col gap-2">
                    {[
                      { label: "Format", value: "SOEP-verslag" },
                      { label: "Datum", value: "17 mrt 2026, 10:42" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between text-xs">
                        <span className="text-slate-400">{label}</span>
                        <span className="font-semibold text-slate-700">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[11px] font-bold text-slate-600 ml-1">4.9</span>
        </div>
      </div>

      {/* Mouse cursor */}
      <div
        className="absolute z-50 transition-all duration-[600ms] ease-out pointer-events-none"
        style={{ top: 0, left: 0, transformOrigin: "top left", ...getCursorStyle() }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
          <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.8 6.76 21.36L11.44 17.15C11.66 16.95 11.96 16.84 12.26 16.84H18.5C19.16 16.84 19.5 16.06 19.04 15.6L6.54 3.06C6.08 2.6 5.5 2.92 5.5 3.21Z" fill="white" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

export default function Hero() {
  return (
    <section className="pt-28 pb-4">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="relative z-10 overflow-hidden rounded-[28px] bg-white shadow-[0_2px_40px_rgba(119,45,7,0.06)]">
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
                  href="#hoe-werkt-het"
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
              <div className="h-[520px] w-[540px]">
                <FeatureShowcase />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
