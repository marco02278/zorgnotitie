"use client";

import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mic, Square, Pause, Play, FileText, Save, Trash2, Copy, CheckCheck, ChevronDown, ChevronUp, Download } from "lucide-react";
import Link from "next/link";
import { addGesprek, updateGesprek, getGesprekken, subscribe } from "../store";

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
  "SOEP",
  "ADHD Interview",
  "Autisme Interview",
  "Depressieve Stoornis",
  "EMDR",
  "Huisartsbrief",
  "Intake",
  "MDO",
  "Ontwikkelingsanamnese",
  "Patiëntnotitie",
  "Rapportage",
  "Samenvatting",
  "SCID-5-P",
  "Verpleegkundige Anamnese",
  "Verwijsbrief",
  "Vrij format",
];

// Session storage key
const SESSION_KEY = "opname_session_data";

const MOCK_TRANSCRIPT = `[00:00:04] Therapeut: Goedemiddag, fijn dat u er bent. Hoe heeft u de afgelopen week ervaren?

[00:00:12] Patiënt: Het was wisselend eerlijk gezegd. De eerste paar dagen ging het redelijk goed, ik had minder last van de piekermomenten. Maar donderdag was er iets op het werk wat me echt heeft geraakt.

[00:00:28] Therapeut: Kunt u iets meer vertellen over wat er op het werk is gebeurd?

[00:00:34] Patiënt: Ja, mijn leidinggevende had kritiek op een project waar ik heel hard aan had gewerkt. Het was niet eens zo'n grote kritiek, maar ik voelde direct die vertrouwde paniek. Mijn hart ging sneller slaan, ik kon me niet meer concentreren. Ik moest even naar het toilet om tot mezelf te komen.

[00:01:02] Therapeut: Dat klinkt als een heftige reactie. Heeft u de ademhalingstechnieken die we vorige week hebben besproken kunnen toepassen?

[00:01:11] Patiënt: Ja, dat heb ik geprobeerd. Het hielp wel een beetje, maar niet zo snel als ik had gehoopt. Ik was daarna de hele middag toch aangeslagen.

[00:01:24] Therapeut: Het is goed dat u de techniek heeft toegepast, ook al voelde het effect minder sterk. Bij stressreacties die al lang bestaan, duurt het altijd even voordat nieuwe strategieën vanzelfsprekend worden. Hoe was uw slaap die nacht?

[00:01:42] Patiënt: Slecht. Ik lag lang wakker en bleef het gesprek met mijn leidinggevende maar herspelen in mijn hoofd. Steeds die gedachte: had ik het anders moeten aanpakken?

[00:01:58] Therapeut: Die herhalende gedachten zijn een patroon dat we vaker hebben besproken. Wat zegt u nu, terugkijkend, over de kritiek die u ontving?

[00:02:09] Patiënt: Rationeel gezien snap ik dat het constructief bedoeld was. Maar in het moment voelt het alsof ik heb gefaald. Alsof ik niet goed genoeg ben.

[00:02:22] Therapeut: En dat gevoel, niet goed genoeg zijn — wanneer herkent u dat gevoel voor het eerste?

[00:02:30] Patiënt: Dat is al heel oud. Al vanaf de middelbare school eigenlijk. Ik herinner me dat mijn vader... nou ja, hij was nooit echt tevreden. Wat ik ook deed, het kon altijd beter.

[00:02:46] Therapeut: We hebben dit thema eerder aangestipt. Het lijkt erop dat de reactie op uw leidinggevende rechtstreeks verbonden is met die vroege ervaringen. Hoe voelt u dat in uw lijf als we het hier nu over hebben?

[00:03:02] Patiënt: Er komt iets omhoog. Een soort druk op mijn borst.

[00:03:08] Therapeut: Dat is een belangrijke waarneming. Laten we daar even bij stilstaan.`;

export default function OpnamePage() {
  const router = useRouter();
  const gesprekken = useSyncExternalStore(subscribe, getGesprekken, getGesprekken);

  // Form fields
  const [patientId, setPatientId] = useState("");
  const [specialisme, setSpecialisme] = useState("Huisartsgeneeskunde");
  const [dossiernummer, setDossiernummer] = useState("");
  const [verslagtype, setVerslagtype] = useState("SOEP");

  // Transcript phase: 'recording' | 'transcribing' | 'transcript' | 'verslag'
  const [transcriptPhase, setTranscriptPhase] = useState<"recording" | "transcribing" | "transcript" | "verslag">("recording");
  const [copied, setCopied] = useState(false);
  const [transcriptCopied, setTranscriptCopied] = useState(false);
  
  // Report generation state
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [report, setReport] = useState("");
  const [isEditingReport, setIsEditingReport] = useState(false);
  const [editedReport, setEditedReport] = useState("");
  const [expandedSection, setExpandedSection] = useState<'transcript' | 'report'>('report');
  
  // Track if we're resuming an existing gesprek
  const [resumeGesprekId, setResumeGesprekId] = useState<number | null>(null);

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
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  
  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
      // Clear any previous session data when starting fresh
      sessionStorage.removeItem(SESSION_KEY);
      setResumeGesprekId(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = stream;

      // Close any previous AudioContext
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
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
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
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

    const durationMins = Math.ceil(elapsedTime / 60);

    if (resumeGesprekId) {
      // Update existing gesprek
      updateGesprek(resumeGesprekId, {
        status: "Concept",
        hasTranscript: transcriptPhase === "transcript" || transcriptPhase === "verslag",
        hasSummary: false,
        specialisme,
        verslagtype,
        dossiernummer,
        audioUrl: audioUrl || undefined,
        duration: `${durationMins} min`,
      });
    } else {
      const now = new Date();
      const date = `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.${now.getFullYear()}`;
      const time = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

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
        dossiernummer,
        audioUrl: audioUrl || undefined,
      });
    }

    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem('opname_returning');
    router.push("/dashboard/verslagen");
  };

  // Process to report — show transcript inline
  const verwerkenNaarVerslag = () => {
    if (!patientId) {
      alert("Vul een Patiënt-ID in.");
      return;
    }
    // Mark that we're in an active session
    sessionStorage.setItem('opname_returning', 'true');
    setTranscriptPhase("transcribing");
    setTimeout(() => setTranscriptPhase("transcript"), 2800);
  };

  // Generate report inline (no navigation)
  const saveNaarGesprekken = () => {
    setTranscriptPhase("verslag");
    setIsGeneratingReport(true);
    setExpandedSection('report');
    
    // Mark that we're in an active session
    sessionStorage.setItem('opname_returning', 'true');
    
    // Simulate report generation
    setTimeout(() => {
      const generatedReport = generateReport(verslagtype, patientId);
      setReport(generatedReport);
      setEditedReport(generatedReport);
      setIsGeneratingReport(false);
    }, 1800);
  };
  
  const generateReport = (template: string, patId: string): string => {
    const reports: Record<string, string> = {
      "SOEP": `SOEP VERSLAG\n\nPatiënt: ${patId}\nDatum: ${new Date().toLocaleDateString('nl-NL')}\n\nSUBJECTIEF\nDe patiënt meldt wisselende ervaringen in de afgelopen week. De eerste dagen verliepen redelijk, met minder piekermomenten. Op donderdag ontstond een stressvolle situatie op het werk naar aanleiding van kritiek van de leidinggevende op een project. De patiënt ervoer direct een paniekachtige reactie met hartkloppingen en concentratieproblemen. Ademhalingstechnieken werden toegepast, maar het effect was beperkt. De rest van de middag bleef de patiënt aangeslagen.\n\nDie nacht sliep de patiënt slecht en bleef het gesprek met de leidinggevende zich herhalen in gedachten. De patiënt herkent een patroon van zelfkritiek en het gevoel "niet goed genoeg te zijn", dat teruggaat tot de middelbare school en de relatie met de vader, die nooit tevreden leek.\n\nOBJECTIEF\nTijdens het gesprek toont de patiënt emotionele betrokkenheid bij het bespreken van de werkervaring. Bij exploratie van vroege ervaringen met de vader wordt een fysieke reactie waargenomen: druk op de borst. De patiënt is zich bewust van deze lichamelijke sensatie en kan deze benoemen.\n\nEVALUATIE\nEr is sprake van een duidelijk patroon waarbij actuele stressoren (kritiek van leidinggevende) gekoppeld zijn aan vroege gehechtheidservaringen (kritische vader). De patiënt vertoont een verhoogde stressreactiviteit met somatische klachten. De toegepaste ademhalingstechnieken worden ingezet, maar de effectiviteit is nog beperkt, wat past bij de verwachting dat nieuwe copingstrategieën tijd nodig hebben om te integreren.\n\nPLAN\n- Voortzetten van ademhalings- en grounding-technieken, met nadruk op regelmatige oefening buiten stressmomenten\n- Verdieping van de link tussen vroege ervaringen en huidige reactiepatronen in volgende sessie\n- Mogelijk starten met EMDR-voorbereiding voor verwerking van vroege gehechtheidstrauma\n- Evaluatie slaapkwaliteit en eventuele interventies indien noodzakelijk\n- Vervolgafspraak over 1 week`,
      "Intake": `INTAKEVERSLAG\n\nIDENTIFICATIEGEGEVENS\nPatiënt-ID: ${patId}\nDatum intake: ${new Date().toLocaleDateString('nl-NL')}\nBehandelaar: [Naam behandelaar]\n\nHULPVRAAG\nDe patiënt meldt zich aan met klachten van verhoogde stress en angst, met name in werksituaties. De directe aanleiding is een recente situatie waarbij kritiek van een leidinggevende leidde tot een acute stressreactie met paniekklachten.\n\nANAMNESE\nDe patiënt beschrijft een patroon van piekeren en zelfkritiek dat al langere tijd bestaat. In de afgelopen week waren er enkele betere dagen, maar een werkgerelateerde gebeurtenis (kritiek op een project) leidde tot een sterke emotionele en fysieke reactie: hartkloppingen, concentratieproblemen, en de noodzaak om zich terug te trekken.\n\nDe patiënt heeft geprobeerd ademhalingstechnieken toe te passen die eerder zijn besproken, maar het effect was beperkt. De nacht na de gebeurtenis was de slaap slecht, met herhaaldelijke gedachten over het gesprek en zelfverwijt.\n\nBij exploratie blijkt dat het gevoel "niet goed genoeg te zijn" al vanaf de middelbare school bestaat. De patiënt beschrijft een vader die nooit tevreden leek, ongeacht de prestaties.\n\nPSYCHIATRISCH ONDERZOEK\nBewustzijn: helder\nOriëntatie: volledig georiënteerd\nStemming: licht gedrukt, angstig\nAffect: congruent, emotioneel betrokken\nDenken: geen formele denkstoornissen, wel ruminatieve gedachten\n\nDIAGNOSTISCHE INDRUK\nVoorlopige diagnose: Aanpassingsstoornis met gemengde angst en depressieve stemming\n\nBEHANDELPLAN\n1. Cognitieve gedragstherapie\n2. Mogelijk EMDR voor verwerking van vroege trauma's\n3. Wekelijkse sessies, evaluatie na 8 sessies`,
    };
    return reports[template] || `VERSLAG - ${template}\n\nPatiënt: ${patId}\nDatum: ${new Date().toLocaleDateString('nl-NL')}\n\n[Verslag wordt gegenereerd op basis van het transcript en de geselecteerde template...]`;
  };

  // Save session data
  const saveSessionData = () => {
    const data = {
      patientId,
      specialisme,
      dossiernummer,
      verslagtype,
      elapsedTime,
      audioUrl,
      hasRecorded,
      transcriptPhase,
      report,
      isEditingReport,
      editedReport,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  };

  // Load session data
  const loadSessionData = () => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        // Only load if there's actual recording data
        if (data.hasRecorded || data.audioUrl) {
          setPatientId(data.patientId || "");
          setSpecialisme(data.specialisme || "Huisartsgeneeskunde");
          setDossiernummer(data.dossiernummer || "");
          setVerslagtype(data.verslagtype || "SOEP");
          setElapsedTime(data.elapsedTime || 0);
          setAudioUrl(data.audioUrl || null);
          setHasRecorded(data.hasRecorded || false);
          setTranscriptPhase(data.transcriptPhase || "recording");
          if (data.report) {
            setReport(data.report);
            setEditedReport(data.editedReport || data.report);
          }
        }
      } catch (e) {
        console.error("Failed to load session data", e);
      }
    }
  };

  const copyTranscript = () => {
    navigator.clipboard.writeText(MOCK_TRANSCRIPT);
    setTranscriptCopied(true);
    setTimeout(() => setTranscriptCopied(false), 2000);
  };
  
  const copyReport = () => {
    navigator.clipboard.writeText(isEditingReport ? editedReport : report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const saveReportEdits = () => {
    setReport(editedReport);
    setIsEditingReport(false);
  };
  
  const cancelReportEdits = () => {
    setEditedReport(report);
    setIsEditingReport(false);
  };
  
  const handleTemplateChange = (newTemplate: string) => {
    setVerslagtype(newTemplate);
    if (transcriptPhase === "verslag") {
      setIsGeneratingReport(true);
      setIsEditingReport(false);
      setTimeout(() => {
        const newReport = generateReport(newTemplate, patientId);
        setReport(newReport);
        setEditedReport(newReport);
        setIsGeneratingReport(false);
      }, 1200);
    }
  };

  // Delete recording
  const deleteRecording = () => {
    if (isRecording) stopRecording();
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }
    setAudioUrl(null);
    setHasRecorded(false);
    setElapsedTime(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setTranscriptPhase("recording");
    setReport("");
    setEditedReport("");
    setIsEditingReport(false);
    audioChunksRef.current = [];
    sessionStorage.removeItem(SESSION_KEY);
    drawStaticWaveform();
  };
  
  // Audio playback handlers
  const togglePlayPause = () => {
    if (!audioPlayerRef.current) return;
    
    if (isPlaying) {
      audioPlayerRef.current.pause();
    } else {
      audioPlayerRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioPlayerRef.current) return;
    const effectiveDur = (isFinite(duration) && duration > 0) ? duration : elapsedTime;
    if (!effectiveDur) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newTime = percentage * effectiveDur;
    
    audioPlayerRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Update current time as audio plays
  useEffect(() => {
    const audio = audioPlayerRef.current;
    if (!audio) return;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => { setIsPlaying(false); setCurrentTime(0); };
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  // Draw static waveform on mount
  useEffect(() => {
    drawStaticWaveform();
  }, [drawStaticWaveform]);

  // Load session data on mount - but only if returning from navigation
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    
    // Check if we're resuming an existing gesprek
    const storedResumeId = sessionStorage.getItem('resume_gesprek_id');
    
    if (storedResumeId) {
      // Load the existing gesprek data
      const gId = parseInt(storedResumeId);
      const gesprek = gesprekken.find(g => g.id === gId);
      
      if (gesprek) {
        // Remember which gesprek we're resuming
        setResumeGesprekId(gId);
        
        // Populate form fields
        setPatientId(gesprek.patientId);
        setSpecialisme(gesprek.specialisme || "Huisartsgeneeskunde");
        setDossiernummer(gesprek.dossiernummer || "");
        setVerslagtype(gesprek.verslagtype || "SOEP");
        
        // Set recording state
        if (gesprek.audioUrl) {
          setAudioUrl(gesprek.audioUrl);
          setHasRecorded(true);
          const durationMatch = gesprek.duration.match(/(\d+)/);
          if (durationMatch) {
            setElapsedTime(parseInt(durationMatch[1]) * 60);
          }
        }
        
        // Check if we're in edit mode (from detail page edit buttons)
        const editMode = sessionStorage.getItem('edit_mode');
        
        // Determine which phase to show
        if (editMode === 'verslag' && gesprek.hasSummary) {
          // Edit verslag mode - go directly to verslag phase
          setTranscriptPhase("verslag");
          setExpandedSection('report');
        } else if (editMode === 'transcript' && gesprek.hasTranscript) {
          // Edit transcript mode - stay in transcript phase
          setTranscriptPhase("transcript");
        } else if (gesprek.hasTranscript) {
          // Normal resume - show transcript
          setTranscriptPhase("transcript");
        } else {
          // Start with transcribing then go to transcript
          setTranscriptPhase("transcribing");
          setTimeout(() => setTranscriptPhase("transcript"), 2800);
        }
        
        // Clear edit mode flag
        sessionStorage.removeItem('edit_mode');
      }
      
      sessionStorage.removeItem('resume_gesprek_id');
    } else {
      const isReturning = sessionStorage.getItem('opname_returning');
      
      if (isReturning === 'true') {
        loadSessionData();
        sessionStorage.removeItem('opname_returning');
      } else {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const isSplit = transcriptPhase !== "recording";
  const isVerslagPhase = transcriptPhase === "verslag";
  
  const toggleTranscript = () => {
    setExpandedSection(expandedSection === 'transcript' ? 'report' : 'transcript');
  };
  
  const downloadReport = () => {
    const blob = new Blob([isEditingReport ? editedReport : report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `verslag-${patientId}-${verslagtype}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const finalizeReport = () => {
    const durationMins = Math.ceil(elapsedTime / 60);

    if (resumeGesprekId) {
      // Update the existing gesprek instead of creating a new one
      updateGesprek(resumeGesprekId, {
        status: "Definitief",
        hasTranscript: true,
        hasSummary: true,
        specialisme,
        verslagtype,
        dossiernummer,
        audioUrl: audioUrl || undefined,
        duration: `${durationMins} min`,
      });
    } else {
      // Create a new gesprek
      const now = new Date();
      const date = `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.${now.getFullYear()}`;
      const time = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      addGesprek({
        date,
        time,
        patientId,
        patientName: `Patiënt ${patientId}`,
        duration: `${durationMins} min`,
        status: "Definitief",
        hasTranscript: true,
        hasSummary: true,
        specialisme,
        verslagtype,
        dossiernummer,
        audioUrl: audioUrl || undefined,
      });
    }

    // Clear all session storage
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem('opname_returning');
    router.push("/dashboard/verslagen");
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
        {isSplit ? (
          <button onClick={() => setTranscriptPhase("recording")} className="flex items-center gap-1 transition-colors hover:text-[#772d07]">
            <ArrowLeft className="h-4 w-4" />
            Terug naar opname
          </button>
        ) : (
          <Link href="/dashboard" className="flex items-center gap-1 transition-colors hover:text-[#772d07]">
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        )}
        <span>/</span>
        <span className="flex items-center gap-1 text-slate-800">
          <Mic className="h-4 w-4" />
          {isVerslagPhase ? "Verslag genereren" : isSplit ? "Transcript" : "Nieuw gesprek opnemen"}
        </span>
      </div>

      {/* Split-view container */}
      <div className="flex items-start gap-6">

        {/* LEFT: Recording card — shrinks when transcript/verslag opens */}
        <div
          className="shrink-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ width: isSplit ? "28%" : "100%" }}
        >
          <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
            {!isSplit ? (
              // Full recording UI
              <>
                <h2 className="mb-2 text-2xl font-bold text-slate-900" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                  Nieuw Gesprek Opnemen
                </h2>
                <p className="mb-8 text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                  Opnames zijn versleuteld en worden automatisch verwijderd na 30 dagen.
                </p>

                {/* Form fields */}
                <div className="mb-8 grid gap-6 md:grid-cols-3">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#772d07]/10 text-[10px] text-[#772d07]">●</span>
                      Patiënt-ID
                    </label>
                    <input type="text" placeholder="12345" value={patientId} onChange={(e) => setPatientId(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-[14px] text-slate-700 outline-none transition-all focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
                      style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }} />
                  </div>
                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Specialisme</label>
                    <select value={specialisme} onChange={(e) => setSpecialisme(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[14px] text-slate-700 outline-none transition-all focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
                      style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                      {specialismen.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                      <span className="text-slate-400">#</span>
                      Dossiernummer <span className="text-slate-400">(optioneel)</span>
                    </label>
                    <input type="text" placeholder="Bijv. D-2024-001" value={dossiernummer} onChange={(e) => setDossiernummer(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-[14px] text-slate-700 outline-none transition-all focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
                      style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }} />
                  </div>
                </div>

                {/* Recording controls */}
                <div className="mb-6 flex flex-col items-center">
                  <div className="flex items-center gap-4">
                    {!isRecording && !hasRecorded ? (
                      <button onClick={startRecording}
                        className="flex items-center gap-3 rounded-full bg-[#772d07] px-8 py-4 text-[16px] font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#5a2205] hover:shadow-xl"
                        style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                        <span className="relative flex h-4 w-4">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40" />
                          <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500" />
                        </span>
                        Start Opname
                      </button>
                    ) : isRecording ? (
                      // Active recording controls
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3 rounded-full bg-red-500 px-6 py-3 text-white shadow-lg">
                          <span className="h-3 w-3 animate-pulse rounded-full bg-white" />
                          <span className="text-[18px] font-bold tabular-nums" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>{formatTime(elapsedTime)}</span>
                        </div>
                        <button onClick={stopRecording}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-red-500 transition-all hover:bg-red-50 hover:text-red-600" title="Stop">
                          <Square className="h-5 w-5 fill-current" />
                        </button>
                        <button onClick={pauseRecording}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-slate-200"
                          title={isPaused ? "Hervat" : "Pauzeer"}>
                          {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                        </button>
                      </div>
                    ) : (
                      // Completed — green pill + restart option
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3 rounded-full bg-emerald-500 px-6 py-3 text-white shadow-lg">
                          <span className="h-3 w-3 rounded-full bg-white" />
                          <span className="text-[18px] font-bold tabular-nums" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>{formatTime(elapsedTime)}</span>
                        </div>
                        <button onClick={deleteRecording}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-red-500 transition-all hover:bg-red-50" title="Opname verwijderen">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-[13px] text-slate-400" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    {isRecording && !isPaused && "Opname bezig..."}
                    {isRecording && isPaused && "Opname gepauzeerd"}
                    {!isRecording && hasRecorded && "Opname voltooid — klaar voor verwerking"}
                    {!isRecording && !hasRecorded && "Klik op 'Start Opname' om te beginnen"}
                  </p>
                </div>

                {/* Audio Player with Waveform */}
                {audioUrl && !isRecording ? (
                  <div className="mb-8">
                    <audio ref={audioPlayerRef} src={audioUrl} className="hidden" />
                    {(() => {
                      const effectiveDur = (isFinite(duration) && duration > 0) ? duration : elapsedTime;
                      const pct = effectiveDur > 0 ? Math.min(100, (currentTime / effectiveDur) * 100) : 0;
                      return (
                        <>
                          {/* Waveform with playhead */}
                          <div
                            className="relative mb-3 cursor-pointer overflow-hidden rounded-xl bg-[#faf6f0]"
                            onClick={handleSeek}
                          >
                            <canvas ref={canvasRef} width={800} height={120} className="w-full block" />
                            {/* Played region tint */}
                            <div
                              className="pointer-events-none absolute inset-0 bg-[#772d07]/15"
                              style={{ width: `${pct}%` }}
                            />
                            {/* Playhead line */}
                            {pct > 0 && (
                              <div
                                className="pointer-events-none absolute bottom-0 top-0 w-[2px] bg-[#772d07]"
                                style={{ left: `${pct}%` }}
                              />
                            )}
                          </div>

                          {/* Controls row */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={togglePlayPause}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#772d07] text-white transition-all hover:bg-[#5a2205]"
                            >
                              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-px" />}
                            </button>
                            <span className="w-10 shrink-0 text-[12px] tabular-nums text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                              {formatTime(Math.floor(currentTime))}
                            </span>
                            {/* Seekbar with dot */}
                            <div
                              className="relative flex-1 cursor-pointer"
                              onClick={handleSeek}
                            >
                              <div className="h-1 rounded-full bg-slate-200">
                                <div className="h-full rounded-full bg-[#772d07]" style={{ width: `${pct}%` }} />
                              </div>
                              <div
                                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#772d07] shadow-sm"
                                style={{ left: `${pct}%` }}
                              />
                            </div>
                            <span className="w-10 shrink-0 text-right text-[12px] tabular-nums text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                              {formatTime(Math.floor(effectiveDur))}
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="mb-8 overflow-hidden rounded-xl bg-[#faf6f0]">
                    <canvas ref={canvasRef} width={800} height={120} className="block w-full" />
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button onClick={verwerkenNaarVerslag} disabled={!hasRecorded}
                    className="flex items-center gap-2 rounded-xl bg-[#772d07] px-8 py-3.5 text-[14px] font-semibold text-white shadow-md transition-all hover:bg-[#5a2205] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    <FileText className="h-4 w-4" />
                    Verwerken naar Verslag
                  </button>
                  <button onClick={saveAsConcept} disabled={!hasRecorded}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-[14px] font-semibold text-slate-700 transition-all hover:border-[#772d07]/30 hover:text-[#772d07] disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    <Save className="h-4 w-4" />
                    Opslaan als Concept
                  </button>
                </div>
              </>
            ) : (
              // Compact summary when split view is active
              <div className="flex flex-col gap-5">
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#772d07]" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Sessie</p>
                  <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Patiënt {patientId}</h3>
                </div>
                <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-[13px]" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                  <div className="flex justify-between"><span className="text-slate-400">Specialisme</span><span className="font-medium text-slate-700">{specialisme}</span></div>
                  {dossiernummer && <div className="flex justify-between"><span className="text-slate-400">Dossier</span><span className="font-medium text-slate-700">{dossiernummer}</span></div>}
                  <div className="flex justify-between"><span className="text-slate-400">Duur</span><span className="font-medium text-slate-700">{formatTime(elapsedTime)}</span></div>
                </div>
                {audioUrl && (() => {
                  const effectiveDur = (isFinite(duration) && duration > 0) ? duration : elapsedTime;
                  const pct = effectiveDur > 0 ? Math.min(100, (currentTime / effectiveDur) * 100) : 0;
                  return (
                    <div>
                      <p className="mb-2 text-[12px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Opname</p>
                      <audio ref={audioPlayerRef} src={audioUrl} className="hidden" />
                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={togglePlayPause}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#772d07] text-white transition-all hover:bg-[#5a2205]"
                          >
                            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 translate-x-px" />}
                          </button>
                          <span className="w-8 shrink-0 text-[11px] tabular-nums text-slate-500">{formatTime(Math.floor(currentTime))}</span>
                          <div className="relative flex-1 cursor-pointer" onClick={handleSeek}>
                            <div className="h-1 rounded-full bg-slate-200">
                              <div className="h-full rounded-full bg-[#772d07]" style={{ width: `${pct}%` }} />
                            </div>
                            <div
                              className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#772d07] shadow-sm"
                              style={{ left: `${pct}%` }}
                            />
                          </div>
                          <span className="w-8 shrink-0 text-right text-[11px] tabular-nums text-slate-500">{formatTime(Math.floor(effectiveDur))}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
                <button onClick={() => setTranscriptPhase("recording")}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-[13px] font-semibold text-slate-600 transition-all hover:border-[#772d07]/30 hover:text-[#772d07]"
                  style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                  <ArrowLeft className="h-4 w-4" />
                  Terug naar opname
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Transcript/Verslag panel — slides in */}
        <div
          className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            flex: isSplit ? "1" : "0",
            opacity: isSplit ? 1 : 0,
            pointerEvents: isSplit ? "auto" : "none",
            minWidth: 0,
          }}
        >
          {transcriptPhase === "transcribing" && (
            <div className="rounded-2xl border border-slate-200/60 bg-white shadow-sm" style={{ minHeight: "500px" }}>
              <div className="flex h-full min-h-[500px] flex-col items-center justify-center gap-6 p-8">
                <div className="relative">
                  <div className="h-20 w-20 animate-spin rounded-full border-4 border-slate-100 border-t-[#772d07]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Mic className="h-8 w-8 text-[#772d07]" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Bezig met transcriberen...</p>
                  <p className="mt-2 text-[14px] text-slate-400" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Uw opname wordt omgezet naar tekst.</p>
                </div>
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#772d07]/40"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {transcriptPhase === "transcript" && (
            <div className="rounded-2xl border border-slate-200/60 bg-white shadow-sm" style={{ minHeight: "500px" }}>
              <div className="p-8">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>
                      <span className="text-[13px] font-semibold text-emerald-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Transcriptie voltooid</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Transcript</h2>
                    <p className="mt-1 text-[13px] text-slate-400" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>{specialisme} · {formatTime(elapsedTime)}</p>
                  </div>
                  <button onClick={copyTranscript}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-[13px] font-semibold text-slate-600 transition-all hover:border-[#772d07]/30 hover:text-[#772d07]"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    {copied ? <CheckCheck className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Gekopieerd" : "Kopiëren"}
                  </button>
                </div>

                {/* Transcript text */}
                <div className="mb-6 max-h-[240px] overflow-y-auto rounded-xl border border-slate-100 bg-slate-50 p-5">
                  <pre className="whitespace-pre-wrap text-[13px] leading-[1.9] text-slate-700"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    {MOCK_TRANSCRIPT}
                  </pre>
                </div>

                {/* Template selector */}
                <div className="mb-6">
                  <label className="mb-3 block text-[13px] font-semibold text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Selecteer verslagtype
                  </label>
                  <select
                    value={verslagtype}
                    onChange={(e) => handleTemplateChange(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] text-slate-700 outline-none transition-all focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                  >
                    {verslagtypes.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                {/* Actions */}
                <button onClick={saveNaarGesprekken}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#772d07] px-8 py-3.5 text-[14px] font-semibold text-white shadow-md transition-all hover:bg-[#5a2205] hover:shadow-lg"
                  style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                  <FileText className="h-4 w-4" />
                  Verwerken naar Verslag
                </button>
              </div>
            </div>
          )}

          {/* VERSLAG PHASE: Collapsible transcript + report */}
          {isVerslagPhase && (
            <div className="space-y-4">
              {/* Collapsible Transcript */}
              <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all duration-500">
                <button
                  onClick={toggleTranscript}
                  className="flex w-full items-center justify-between p-6 transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Transcript</h3>
                      <p className="text-[13px] text-slate-400" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Originele gespreksopname</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {expandedSection === 'transcript' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); copyTranscript(); }}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-[12px] font-semibold text-slate-600 transition-all hover:border-[#772d07]/30 hover:text-[#772d07]"
                        style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                      >
                        {transcriptCopied ? <CheckCheck className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                        {transcriptCopied ? "Gekopieerd" : "Kopiëren"}
                      </button>
                    )}
                    {expandedSection === 'transcript' ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: expandedSection === 'transcript' ? '500px' : '0px',
                    opacity: expandedSection === 'transcript' ? 1 : 0,
                  }}
                >
                  <div className="border-t border-slate-100 p-6">
                    <div className="max-h-[400px] overflow-y-auto rounded-xl border border-slate-100 bg-slate-50 p-5">
                      <pre className="whitespace-pre-wrap text-[13px] leading-[1.9] text-slate-700"
                        style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                        {MOCK_TRANSCRIPT}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Collapsible Report */}
              <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all duration-500">
                <button
                  onClick={toggleTranscript}
                  className="flex w-full items-center justify-between p-6 transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                      <FileText className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>{verslagtype}</h3>
                      <p className="text-[13px] text-slate-400" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                        {isGeneratingReport ? "Bezig met genereren..." : isEditingReport ? "Bezig met bewerken" : "Gegenereerd verslag"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {expandedSection === 'report' && !isGeneratingReport && (
                      <>
                        {isEditingReport ? (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); cancelReportEdits(); }}
                              className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-[12px] font-semibold text-slate-600 transition-all hover:border-slate-300"
                              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                            >
                              Annuleren
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); saveReportEdits(); }}
                              className="flex items-center gap-2 rounded-xl bg-[#772d07] px-3 py-1.5 text-[12px] font-semibold text-white transition-all hover:bg-[#5a2205]"
                              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                            >
                              <Save className="h-3.5 w-3.5" />
                              Opslaan
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); copyReport(); }}
                              className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-[12px] font-semibold text-slate-600 transition-all hover:border-[#772d07]/30 hover:text-[#772d07]"
                              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                            >
                              {copied ? <CheckCheck className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                              {copied ? "Gekopieerd" : "Kopiëren"}
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); setIsEditingReport(true); }}
                              className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-[12px] font-semibold text-slate-600 transition-all hover:border-[#772d07]/30 hover:text-[#772d07]"
                              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                            >
                              Bewerken
                            </button>
                          </>
                        )}
                      </>
                    )}
                    {expandedSection === 'report' ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: expandedSection === 'report' ? '700px' : '0px',
                    opacity: expandedSection === 'report' ? 1 : 0,
                  }}
                >
                  <div className="border-t border-slate-100 p-6">
                    {isGeneratingReport ? (
                      <div className="flex min-h-[300px] items-center justify-center">
                        <div className="text-center">
                          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-100 border-t-[#772d07]" />
                          <p className="text-[14px] text-slate-400" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Verslag wordt gegenereerd...</p>
                        </div>
                      </div>
                    ) : isEditingReport ? (
                      <textarea
                        value={editedReport}
                        onChange={(e) => setEditedReport(e.target.value)}
                        className="h-[500px] w-full resize-none rounded-xl border border-slate-200 bg-white p-5 text-[13.5px] leading-[1.9] text-slate-700 outline-none transition-all focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
                        style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                      />
                    ) : (
                      <div className="max-h-[500px] overflow-y-auto rounded-xl border border-slate-100 bg-slate-50 p-5">
                        <pre className="whitespace-pre-wrap text-[13.5px] leading-[1.9] text-slate-700"
                          style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                          {report}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom actions */}
              <div className="flex items-center justify-end rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <button
                    onClick={downloadReport}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-2.5 text-[14px] font-semibold text-slate-600 transition-all hover:border-[#772d07]/30 hover:text-[#772d07]"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                  >
                    <Download className="h-4 w-4" />
                    Downloaden
                  </button>
                  <button
                    onClick={finalizeReport}
                    className="flex items-center gap-2 rounded-xl bg-[#772d07] px-8 py-2.5 text-[14px] font-semibold text-white shadow-md transition-all hover:bg-[#5a2205] hover:shadow-lg"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                  >
                    <FileText className="h-4 w-4" />
                    Opslaan en afronden
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
