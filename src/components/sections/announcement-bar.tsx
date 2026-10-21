"use client";

import React, { useEffect, useState } from "react";
import { Check, Ghost, Flame, Lock, Clock, ShieldCheck } from "lucide-react";

interface NotificationItem {
  name: string;
  action: string;
}

const firstNames = [
  "Adrian", "Brianna", "Caleb", "Delilah", "Ezra", "Freya", "Gavin", "Hazel", "Ian", "Jasmine",
  "Kai", "Leilani", "Miles", "Nora", "Oscar", "Piper", "Quinn", "Rowan", "Stella", "Tristan",
  "Uriah", "Violet", "Weston", "Ximena", "Yusuf", "Zoe", "Asher", "Brooke", "Colton", "Dahlia",
  "Emmett", "Fiona", "Graham", "Hadley", "Isaiah", "Juliet", "Kaden", "Lyla", "Milo", "Nina",
  "Orion", "Paige", "Ryder", "Sienna", "Tate", "Vera", "Xander", "Zara", "Holden", "Gemma"
];

const lastInitials = ["B.", "D.", "F.", "H.", "J.", "L.", "M.", "P.", "Q.", "V.", "X.", "Z.", "K.", "N.", "R."];

const actions = [
  "just claimed a $100 Dunkin card!",
  "just claimed a $100 Halloween voucher!",
  "just unlocked reward eligibility!",
  "just completed the review survey!",
  "just verified eligibility!"
];

const notifications: NotificationItem[] = Array.from({ length: 100 }, (_, i) => ({
  name: `${firstNames[(i * 7) % firstNames.length]} ${lastInitials[(i * 5) % lastInitials.length]}`,
  action: actions[i % actions.length]
}));

export default function AnnouncementBar() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [currentNotif, setCurrentNotif] = useState<NotificationItem | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(300);

  // Mount check to eliminate Next.js server/client hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // 5-minute countdown timer hook
  useEffect(() => {
    if (!mounted || timeLeft <= 0) return;
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [mounted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Dynamic social proof toast loop
  useEffect(() => {
    if (!mounted) return;

    const showRandomNotif = () => {
      const randomIndex = Math.floor(Math.random() * notifications.length);
      setCurrentNotif(notifications[randomIndex]);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 3500);
    };

    const initialTimer = setTimeout(() => {
      showRandomNotif();
    }, 1500);

    const interval = setInterval(() => {
      showRandomNotif();
    }, 7000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [mounted]);

  return (
    <>
      {/* Top Banner Bar Container */}
      <div 
        className="sticky top-0 z-50 w-full bg-[#2d124d] border-b border-orange-500/40 pb-2 px-3 sm:px-4 shadow-md min-h-[44px]"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 10px)" }}
      >
        {/* Background Floating Spooky Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <Ghost 
            className="absolute left-[3%] sm:left-[7%] top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300 animate-bounce" 
            strokeWidth={2}
          />
          <Flame 
            className="absolute right-[3%] sm:right-[7%] top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400 animate-pulse" 
            strokeWidth={2}
          />
        </div>

        {/* Content Stack */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-xl mx-auto space-y-1">
          {/* Headline with Live Timer */}
          <div className="flex items-center justify-center gap-1.5 w-full text-center">
            <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-300 shrink-0 -mt-0.5" strokeWidth={2.5} />
            <p className="text-white text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] font-bold tracking-tight leading-none flex items-center gap-1.5 flex-wrap justify-center">
              <span>Your spot is reserved for:</span>
              <span className="inline-flex items-center gap-1 bg-[#1e0b36] border border-orange-500/40 text-orange-300 px-1.5 py-0.5 rounded font-mono text-[9px] xs:text-[10px] sm:text-[11px] font-bold shadow-sm">
                <Clock className="w-2.5 h-2.5 text-orange-400 animate-pulse" />
                <span>{mounted ? formatTime(timeLeft) : "05:00"}</span>
              </span>
            </p>
          </div>

          {/* Subtext Trust Badges */}
          <div className="flex items-center justify-center gap-1.5 text-purple-200/90">
            <span className="text-[7.5px] xs:text-[8px] sm:text-[8.5px] uppercase tracking-wider font-semibold">
              OVER 1,400+ VERIFIED TODAY
            </span>
            <span className="text-purple-300/40 text-[7.5px]">&bull;</span>
            <div className="flex items-center gap-1 text-[7.5px] xs:text-[8px] sm:text-[8.5px] font-semibold text-purple-200/95">
              <ShieldCheck className="w-2.5 h-2.5 text-orange-400" strokeWidth={2.5} />
              <span className="uppercase tracking-wider">256-BIT SSL SECURED</span>
            </div>
          </div>
        </div>

        {/* Bottom Glowing Accent Line */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent w-full opacity-90 overflow-hidden">
          <div className="absolute inset-0 bg-orange-300 animate-shine"></div>
        </div>
      </div>

      {/* Floating Social Proof Toast */}
      {mounted && currentNotif && (
        <div
          className={`fixed top-16 left-3 right-3 sm:left-4 sm:right-auto z-[9999] max-w-[350px] mx-auto sm:mx-0 flex items-center gap-2.5 rounded-full border border-purple-300 bg-[#2d124d] text-white px-3.5 py-2 shadow-2xl transition-all duration-300 ease-in-out pointer-events-none ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0"
          }`}
        >
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-slate-950">
            <Check className="w-3 h-3 text-slate-950" strokeWidth={3} />
          </div>

          <div className="text-[10px] sm:text-[11px] text-white truncate leading-tight">
            <span className="font-extrabold text-orange-300">{currentNotif.name} </span>
            <span className="text-purple-100">{currentNotif.action}</span>
          </div>
        </div>
      )}
    </>
  );
}
