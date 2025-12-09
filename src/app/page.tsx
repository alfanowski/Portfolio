"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import "./home.css";

// --- Funzioni di supporto (corrette) ---

const pad = (n: number): string => (n < 10 ? "0" + n : String(n));
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatAsUnixLike(date: Date): string {
  const dayName = dayNames[date.getDay()];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const hours = pad(date.getHours());
  const mins = pad(date.getMinutes());
  const secs = pad(date.getSeconds());
  const year = date.getFullYear();
  return `${dayName} ${month} ${day} ${hours}:${mins}:${secs} ${year}`;
}

// --- Componente Home ---

export default function Home() {
  const openDate = useMemo(() => new Date(), []);
  const formattedOpenDate = useMemo(() => formatAsUnixLike(openDate), [openDate]);

  // Tipizzazione esplicita per terminalLines
  const terminalLines: string[] = useMemo(() => [
    "andrea@kali:~$ ssh andrea@portfolio",
    "andrea@portfolio's password:",
    "Password incorrect. Retrying...",
    "andrea@portfolio's password:",
    "Access granted.",
    `Last login: ${formattedOpenDate} from 192.168.1.10`,
    "Welcome to Andrea's digital portfolio!",
  ], [formattedOpenDate]);

  // Tipizzazione esplicita per useState
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPasswordTyping, setIsPasswordTyping] = useState(false);
  const [passwordTyped, setPasswordTyped] = useState("");

  useEffect(() => {
    if (!isTyping || lineIndex >= terminalLines.length) {
      setIsTyping(false);
      return;
    }

    const line = terminalLines[lineIndex];

    if (line.toLowerCase().includes("password:")) {
      if (!isPasswordTyping) {
        setIsPasswordTyping(true);
        setCurrentLine(line);
      }
      if (passwordTyped.length < 8) {
        const timeout = setTimeout(() => {
          setPasswordTyped((prev) => prev + "*");
        }, 50); // Velocità password
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => [...prev, line, passwordTyped]);
          setCurrentLine("");
          setPasswordTyped("");
          setLineIndex((prev) => prev + 1);
          setIsPasswordTyping(false);
        }, 500); // Ritardo post-password
        return () => clearTimeout(timeout);
      }
    } else {
      const charIndex = currentLine.length;
      if (charIndex < line.length) {
        const timeout = setTimeout(() => {
          setCurrentLine((prev) => prev + line[charIndex]);
          // Velocità digitazione: 40ms per 'incorrect', 20ms standard
        }, line.includes("incorrect") ? 40 : 20); 
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => [...prev, currentLine]);
          setCurrentLine("");
          setLineIndex((prev) => prev + 1);
        }, 500); // Ritardo tra le righe
        return () => clearTimeout(timeout);
      }
    }
  }, [lineIndex, currentLine, isTyping, isPasswordTyping, passwordTyped, terminalLines]);


  // RISOLUZIONE: renderLine definita all'interno del componente prima del return
  const renderLine = (line: string): React.ReactNode => {
    if (line.includes("andrea@kali:~$")) {
      const parts = line.split("andrea@kali:~$");
      const command = parts[1];
      return (
        <>
          <span className="text-red-500">andrea@kali:</span>
          <span className="text-gray-400">~</span>
          <span className="text-red-500">$</span>
          <span className="text-gray-300">{command}</span>
        </>
      );
    }
    // Colori per i messaggi di sistema
    if (line.includes("incorrect")) {
        return <span className="text-red-400">{line}</span>;
    }
    if (line.includes("Access granted")) {
        return <span className="text-green-400">{line}</span>;
    }

    return <span className="text-gray-300">{line}</span>;
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 bg-black text-gray-100 font-mono">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8, y: -40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-6xl md:text-7xl font-extrabold text-cyan-400 mb-10 tracking-tight text-center glitch"
      >
        alfanowski
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="w-full max-w-2xl bg-[#1e1e1e] border border-[#3c3c3c] rounded-xl shadow-lg mb-10 overflow-hidden"
      >
        <div className="flex items-center p-3 bg-[#333333] border-b border-[#4d4d4d] relative">
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-[#ff5f56] rounded-full"></span>
            <span className="w-3 h-3 bg-[#ffbd2e] rounded-full"></span>
            <span className="w-3 h-3 bg-[#27c93f] rounded-full"></span>
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 text-gray-400 text-sm">
            andrea@kali: ~
          </span>
        </div>
        <div className="p-6 text-[#f5f5f5] text-sm md:text-base leading-relaxed">
          {displayedLines.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap">
              {renderLine(line)}
            </div>
          ))}
          {isTyping && (
            <div className="whitespace-pre-wrap">
              {isPasswordTyping ? (
                <>
                  <span className="text-gray-300">{currentLine}</span>
                  <br />
                  <span className="text-gray-300">{passwordTyped}</span>
                </>
              ) : (
                renderLine(currentLine)
              )}
              <span className="cursor-blink text-[#27c93f]">█</span>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="flex gap-6 flex-wrap justify-center"
      >
        <a
          href="https://github.com/alfanowski"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-cyan-400 text-cyan-400 px-6 py-2 rounded-lg hover:bg-cyan-400 hover:text-black transition-colors font-semibold shadow"
        >
          <FaGithub size={20} />
          GitHub
        </a>
        <Link
          href="/projects"
          className="flex items-center gap-2 border border-gray-700 px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-gray-300 shadow"
        >
          Projects
          {/* Soluzione: Usa un wrapper <span> per applicare il margine  */}
          <span className="ml-1">
            <FaArrowRight size={16} /> 
          </span>
        </Link>
        <Link
          href="/about"
          className="flex items-center gap-2 border border-gray-700 px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-gray-300 shadow"
        >
          About
        </Link>
      </motion.div>
    </main>
  );
}