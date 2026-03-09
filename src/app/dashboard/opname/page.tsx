"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mic, Square, Pause, Play, FileText, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { addGesprek } from "../store";

const specialismen = [
  "Huisartsgeneeskunde",
  "Cardiologie",
  "Neurologie",
  "Psychiatrie",
  "Psychologie",
  "Orthopedie",
  "Dermatologie",
  "Kindergeneeskunde",
  "GGZ",
  "Overig",
];

const verslagtypes = [
  "SOEP-structuur",
  "Intake Verslag",
  "Voortgangsverslag",
  "Afsluitverslag",
  "MDO Verslag",
  "Verwijsbrief",
  "Vrij format",
];

export default function OpnamePage() {
  const router = useRouter();

  // Form fields
  const [patientId, setPatientId] = useState("");
  const [specialisme, setSpecialisme] = useState("Huisartsgeneeskunde");
  const [dossiernummer, setDossiernummer] = useState("");
  const [verslagtype, setVerslagtype] = useState("SOEP-structuur");

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);

  // Audio refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Draw waveform visualization
  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "#faf6f0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#772d07";
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();
  }, []);

  // Draw static waveform when not recording
  const drawStaticWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#faf6f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = hasRecorded ? "#772d07" : "#d4c5b5";
    ctx.beginPath();

    const bars = 80;
    const barWidth = canvas.width / bars;

    for (let i = 0; i < bars; i++) {
      const height = hasRecorded
        ? Math.random() * canvas.height * 0.6 + canvas.height * 0.1
        : canvas.height * 0.05;
      const y = (canvas.height - height) / 2;
      ctx.fillStyle = hasRecorded ? "#772d0740" : "#d4c5b540";
      ctx.fillRect(i * barWidth + 1, y, barWidth - 2, height);
    }

    ctx.stroke();
  }, [hasRecorded]);

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setHasRecorded(true);
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      setIsPaused(false);
      setElapsedTime(0);

      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);

      drawWaveform();
    } catch (err) {
      alert("Kan geen toegang krijgen tot de microfoon. Controleer de machtigingen van uw browser.");
    }
  };

  // Pause recording
  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        timerRef.current = setInterval(() => {
          setElapsedTime((prev) => prev + 1);
        }, 1000);
        drawWaveform();
        setIsPaused(false);
      } else {
        mediaRecorderRef.current.pause();
        if (timerRef.current) clearInterval(timerRef.current);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        setIsPaused(true);
      }
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  // Save as concept
  const saveAsConcept = () => {
    if (!patientId) {
      alert("Vul een Patiënt-ID in.");
      return;
    }

    const now = new Date();
    const date = `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${now.getFullYear()}`;
    const time = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const durationMins = Math.ceil(elapsedTime / 60);

    addGesprek({
      date,
      time,
      patientId,
      patientName: `Patiënt ${patientId}`,
      duration: `${durationMins} min`,
      status: "Concept",
      hasTranscript: false,
      hasSummary: false,
      specialisme,
      verslagtype,
      dossiernummer,
      audioUrl: audioUrl || undefined,
    });

    router.push("/dashboard/gesprekken");
  };

  // Process to report
  const verwerkenNaarVerslag = () => {
    if (!patientId) {
      alert("Vul een Patiënt-ID in.");
      return;
    }

    const now = new Date();
    const date = `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${now.getFullYear()}`;
    const time = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const durationMins = Math.ceil(elapsedTime / 60);

    addGesprek({
      date,
      time,
      patientId,
      patientName: `Patiënt ${patientId}`,
      duration: `${durationMins} min`,
      status: "In Verwerking",
      hasTranscript: false,
      hasSummary: false,
      specialisme,
      verslagtype,
      dossiernummer,
      audioUrl: audioUrl || undefined,
    });

    router.push("/dashboard/gesprekken");
  };

  // Delete recording
  const deleteRecording = () => {
    if (isRecording) stopRecording();
    setAudioUrl(null);
    setHasRecorded(false);
    setElapsedTime(0);
    audioChunksRef.current = [];
    drawStaticWaveform();
  };

  // Draw static waveform on mount
  useEffect(() => {
    drawStaticWaveform();
  }, [drawStaticWaveform]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
        <Link href="/dashboard" className="flex items-center gap-1 transition-colors hover:text-[#772d07]">
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Link>
        <span>/</span>
        <span className="flex items-center gap-1 text-slate-800">
          <Mic className="h-4 w-4" />
          Nieuw gesprek opnemen
        </span>
      </div>

      {/* Main card */}
      <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
        <h2
          className="mb-2 text-2xl font-bold text-slate-900"
          style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
        >
          Nieuw Gesprek Opnemen
        </h2>
        <p className="mb-8 text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
          Opnames zijn versleuteld en worden automatisch verwijderd na 30 dagen.
        </p>

        {/* Form fields - 2 column grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {/* Patiënt-ID */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#772d07]/10 text-[10px] text-[#772d07]">●</span>
              Patiënt-ID
            </label>
            <input
              type="text"
              placeholder="12345"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-[14px] text-slate-700 outline-none transition-all focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            />
          </div>

          {/* Specialisme */}
          <div>
            <label className="mb-2 block text-[13px] font-semibold text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
              Specialisme
            </label>
            <select
              value={specialisme}
              onChange={(e) => setSpecialisme(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[14px] text-slate-700 outline-none transition-all focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              {specialismen.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Dossiernummer */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
              <span className="text-slate-400">#</span>
              Dossiernummer <span className="text-slate-400">(optioneel)</span>
            </label>
            <input
              type="text"
              placeholder="Bijv. D-2024-001"
              value={dossiernummer}
              onChange={(e) => setDossiernummer(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-[14px] text-slate-700 outline-none transition-all focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            />
          </div>

          {/* Verslagtype */}
          <div>
            <label className="mb-2 block text-[13px] font-semibold text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
              Verslagtype
            </label>
            <select
              value={verslagtype}
              onChange={(e) => setVerslagtype(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[14px] text-slate-700 outline-none transition-all focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              {verslagtypes.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Recording controls */}
        <div className="mb-6 flex flex-col items-center">
          <div className="flex items-center gap-4">
            {/* Record / Timer button */}
            {!isRecording && !hasRecorded ? (
              <button
                onClick={startRecording}
                className="flex items-center gap-3 rounded-full bg-[#772d07] px-8 py-4 text-[16px] font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#5a2205] hover:shadow-xl"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                <span className="relative flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40"></span>
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500"></span>
                </span>
                Start Opname
              </button>
            ) : (
              <div className="flex items-center gap-3">
                {/* Timer pill */}
                <div className="flex items-center gap-3 rounded-full bg-red-500 px-6 py-3 text-white shadow-lg">
                  <span className="h-3 w-3 rounded-full bg-white animate-pulse"></span>
                  <span className="text-[18px] font-bold tabular-nums" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    {formatTime(elapsedTime)}
                  </span>
                </div>

                {/* Stop button */}
                <button
                  onClick={stopRecording}
                  disabled={!isRecording}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-red-500 transition-all hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  title="Stop"
                >
                  <Square className="h-5 w-5 fill-current" />
                </button>

                {/* Pause/Resume button */}
                <button
                  onClick={pauseRecording}
                  disabled={!isRecording}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 disabled:opacity-50"
                  title={isPaused ? "Hervat" : "Pauzeer"}
                >
                  {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                </button>
              </div>
            )}
          </div>

          {/* Status text */}
          <p
            className="mt-3 text-[13px] text-slate-400"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            {isRecording && !isPaused && "Opname bezig..."}
            {isRecording && isPaused && "Opname gepauzeerd"}
            {!isRecording && hasRecorded && "Opname voltooid"}
            {!isRecording && !hasRecorded && "Klik op 'Start Opname' om te beginnen"}
          </p>
        </div>

        {/* Waveform canvas */}
        <div className="mb-8 overflow-hidden rounded-xl bg-[#faf6f0] p-4">
          <canvas
            ref={canvasRef}
            width={800}
            height={120}
            className="w-full"
          />
        </div>

        {/* Audio playback if recorded */}
        {audioUrl && !isRecording && (
          <div className="mb-8 flex justify-center">
            <audio controls src={audioUrl} className="w-full max-w-lg rounded-xl" />
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={verwerkenNaarVerslag}
            disabled={!hasRecorded}
            className="flex items-center gap-2 rounded-xl bg-[#772d07] px-8 py-3.5 text-[14px] font-semibold text-white shadow-md transition-all hover:bg-[#5a2205] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            <FileText className="h-4 w-4" />
            Verwerken naar Verslag
          </button>

          <button
            onClick={saveAsConcept}
            disabled={!hasRecorded}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-[14px] font-semibold text-slate-700 transition-all hover:border-[#772d07]/30 hover:text-[#772d07] disabled:cursor-not-allowed disabled:opacity-40"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            <Save className="h-4 w-4" />
            Opslaan als Concept
          </button>

          <button
            onClick={deleteRecording}
            disabled={!hasRecorded && !isRecording}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-8 py-3.5 text-[14px] font-semibold text-red-500 transition-all hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            <Trash2 className="h-4 w-4" />
            Verwijderen
          </button>
        </div>
      </div>
    </div>
  );
}
