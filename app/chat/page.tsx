"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  Image as ImageIcon,
  Copy,
  Check,
  RotateCcw,
  CloudSun,
  TrendingUp,
  Tractor,
  FileText,
  Volume2,
  VolumeX,
  ExternalLink,
  Bot,
  User,
  Wrench,
  Database,
  ArrowRight,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  language?: string;
  toolsCalled?: Array<{ toolName: string; args: any; resultSummary: string }>;
  sources?: Array<{ name: string; timestamp: string; status: string }>;
  cards?: Array<{ type: string; data: any }>;
  suggestedActions?: Array<{ labelEn: string; labelTa: string; query: string }>;
  createdAt: string;
}

function ChatContent() {
  const { language, t } = useLanguage();
  const { profile } = useAuth();
  const searchParams = useSearchParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize initial welcome message
  useEffect(() => {
    const initialQuery = searchParams.get("q");

    const welcomeMsg: Message = {
      id: "msg-welcome",
      role: "assistant",
      content:
        language === "ta"
          ? `வணக்கம் ${profile?.farmerName || "விவசாயி அவர்களே"}! நான் உங்கள் Farmer AI உதவியாளர்.\n\nவானிலை, பயிர் பாதுகாப்பு, உர அளவு, சந்தை விற்பனை விலைகள் மற்றும் விவசாய இயந்திரங்கள் குறித்து எதையும் என்னிடம் கேட்கலாம்.\n\n💡 *உதாரணமாக: "இன்று மழை வருமா?", "நெல் எங்கே விற்கலாம்?", அல்லது "அறுவடை இயந்திரம் வாடகைக்கு வேண்டுமா?"*`
          : `Hello ${profile?.farmerName || "Farmer"}! I am your Farmer AI assistant.\n\nAsk me anything regarding current weather spraying alerts, crop diseases, fertilizer dosage, fair market net-prices, or farm machinery rentals.\n\n💡 *Try: "Will it rain today?", "Where can I sell my paddy?", or "Need a combine harvester nearby".*`,
      language: language,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([welcomeMsg]);

    if (initialQuery) {
      sendMessage(initialQuery);
    }
  }, [language, profile?.farmerName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: queryText,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: queryText,
          context: {
            farmerName: profile?.farmerName,
            district: profile?.district || "Thanjavur",
            village: profile?.village,
            crops: profile?.mainCrops,
            landSizeAcres: profile?.landSizeAcres,
            irrigationType: profile?.irrigationType,
            preferredLang: language,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Chat API returned an error");
      }

      const data = await res.json();

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.message,
        language: data.language,
        toolsCalled: data.toolsCalled,
        sources: data.sources,
        cards: data.cards,
        suggestedActions: data.suggestedActions,
        createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorBotMsg: Message = {
        id: `bot-err-${Date.now()}`,
        role: "assistant",
        content:
          language === "ta"
            ? "மன்னிக்கவும், தகவல் சேவையில் தற்காலிக தடை ஏற்பட்டுள்ளது. தயவுசெய்து சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்."
            : "Farmer AI is temporarily unavailable. Please verify connection and try again.",
        createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorBotMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Browser Web Speech API setup for voice input
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceNotice(t("chat.voiceUnsupported"));
      setTimeout(() => setVoiceNotice(null), 4000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === "ta" ? "ta-IN" : "en-IN";
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceNotice(t("chat.listening"));
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        setVoiceNotice(t("chat.speechError"));
        setTimeout(() => setVoiceNotice(null), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
        setVoiceNotice(null);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error("Speech initialization error:", e);
      setVoiceNotice(t("chat.voiceUnsupported"));
      setTimeout(() => setVoiceNotice(null), 3000);
    }
  };

  // Text to Speech
  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown characters for pleasant audio
    const clean = text.replace(/[*#_`]/g, "");
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = language === "ta" ? "ta-IN" : "en-IN";
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    const welcomeMsg: Message = {
      id: `msg-${Date.now()}`,
      role: "assistant",
      content:
        language === "ta"
          ? "புதிய உரையாடல் தொடங்கப்பட்டது. உங்கள் விவசாயம் குறித்து எதை வேண்டுமானாலும் கேளுங்கள்!"
          : "Started a fresh conversation. Ask me any farming or agriculture question!",
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([welcomeMsg]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-5rem)] flex flex-col">
      {/* Chat Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-2">
              Farmer AI Assistant
              <Badge variant="success">Tool-Enabled</Badge>
            </h1>
            <p className="text-[11px] text-stone-500 hidden sm:block">
              {language === "ta" ? "தமிழ், English மற்றும் Tanglish புரிந்துகொள்ளும் திறன் கொண்டது" : "Understands Tamil, English, and Tanglish with local tools"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearChat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t("chat.newChat")}</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2 mb-4">
        {messages.map((msg) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 sm:gap-3 ${
                isUser ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  isUser
                    ? "bg-stone-800 text-white"
                    : "bg-emerald-600 text-white"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-sm space-y-3 ${
                  isUser
                    ? "bg-emerald-700 text-white rounded-tr-none"
                    : "bg-white border border-stone-200 text-stone-900 rounded-tl-none"
                }`}
              >
                {/* Text Content */}
                <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed font-sans">
                  {msg.content}
                </div>

                {/* Embedded Tool Data Cards (Weather, Market, Machinery, Scheme) */}
                {msg.cards?.map((card, cIdx) => (
                  <div key={cIdx} className="pt-2">
                    {card.type === "weather" && (
                      <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-2">
                        <div className="flex items-center justify-between font-bold">
                          <span className="flex items-center gap-1.5">
                            <CloudSun className="w-4 h-4 text-blue-700" />
                            {card.data.district} Live Snapshot
                          </span>
                          <span className="text-lg font-extrabold">{card.data.current.temperature}°C</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-blue-800">
                          <span>Rain: {card.data.current.rainProbability}%</span>
                          <span>Humidity: {card.data.current.humidity}%</span>
                          <span>Wind: {card.data.current.windSpeed} km/h</span>
                        </div>
                      </div>
                    )}

                    {card.type === "market" && Array.isArray(card.data) && (
                      <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-2">
                        <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-emerald-700" />
                          <span>Nearby Mandi Comparison</span>
                        </div>
                        <div className="space-y-1.5">
                          {card.data.slice(0, 2).map((m: any, mIdx: number) => (
                            <div
                              key={mIdx}
                              className="p-2 rounded-lg bg-white border border-emerald-200 flex items-center justify-between text-[11px]"
                            >
                              <div>
                                <span className="font-bold text-stone-900 block">{m.marketName}</span>
                                <span className="text-stone-500">{m.distanceKm} km • ₹{m.pricePerUnit}/{m.unit}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] text-stone-400 block">Estimated Net:</span>
                                <span className="font-bold text-emerald-800">₹{m.estimatedNetTakeHome.toLocaleString("en-IN")}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Tool Metadata Drawer */}
                {!isUser && msg.toolsCalled && msg.toolsCalled.length > 0 && (
                  <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-1.5 text-[10px] text-stone-500">
                    <span className="font-semibold flex items-center gap-1 text-emerald-700">
                      <Wrench className="w-3 h-3" />
                      Tools:
                    </span>
                    {msg.toolsCalled.map((t, idx) => (
                      <span key={idx} className="bg-stone-100 px-2 py-0.5 rounded text-stone-700 font-mono">
                        {t.toolName}
                      </span>
                    ))}
                  </div>
                )}

                {/* Sources & Transparency Info */}
                {!isUser && msg.sources && msg.sources.length > 0 && (
                  <div className="text-[10px] text-stone-400 flex items-center gap-1">
                    <Database className="w-3 h-3" />
                    <span>Grounding: {msg.sources.map((s) => `${s.name} (${s.status})`).join(", ")}</span>
                  </div>
                )}

                {/* Action Buttons: Suggested follow-ups */}
                {!isUser && msg.suggestedActions && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {msg.suggestedActions.map((act, aIdx) => (
                      <button
                        key={aIdx}
                        type="button"
                        onClick={() => sendMessage(act.query)}
                        className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>{language === "ta" ? act.labelTa : act.labelEn}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Bubble Footer: Timestamp, Text to Speech, Copy */}
                {!isUser && (
                  <div className="pt-1 flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-100">
                    <span>{msg.createdAt}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => speakText(msg.content)}
                        className="p-1 hover:text-emerald-700 transition-colors"
                        title="Read out loud"
                        aria-label="Read out loud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(msg.id, msg.content)}
                        className="p-1 hover:text-emerald-700 transition-colors"
                        title="Copy message"
                        aria-label="Copy message"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2 text-xs text-stone-500">
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>{language === "ta" ? "Farmer AI ஆய்வு செய்து பதிலளிக்கிறது..." : "Farmer AI is analyzing tools and calculating guidance..."}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Notification Banner */}
      {voiceNotice && (
        <div className="mb-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 text-center font-medium animate-pulse">
          {voiceNotice}
        </div>
      )}

      {/* Input Form Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-2 shadow-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-2"
        >
          {/* Microphone Voice Button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              isListening
                ? "bg-rose-600 text-white ring-4 ring-rose-100 animate-pulse"
                : "text-stone-500 hover:text-emerald-700 hover:bg-stone-100"
            }`}
            title="Speak query"
            aria-label="Voice input"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Image Upload shortcut button */}
          <Link
            href="/disease-detection"
            className="p-2.5 rounded-xl text-stone-500 hover:text-emerald-700 hover:bg-stone-100 transition-colors"
            title="Scan crop photo"
            aria-label="Scan crop photo"
          >
            <ImageIcon className="w-5 h-5" />
          </Link>

          {/* Text Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("chat.inputPlaceholder")}
            disabled={loading}
            className="flex-1 px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none placeholder:text-stone-400"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold text-emerald-800">Loading Farmer AI Chat...</div>}>
      <ChatContent />
    </Suspense>
  );
}
