// src/app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  FaTerminal, FaGithub, FaEnvelope, FaInstagram, FaLinux, FaJava, FaPython, FaGit, FaReact,
  FaCode, FaLock, FaBug, FaSearch, FaShieldAlt, FaLaptopCode, FaGlobe, FaShieldVirus
} from "react-icons/fa";
import {
  SiC, SiCplusplus, SiDotnet, SiHtml5, SiCss3, SiJavascript, SiTypescript, SiSqlite, SiMetasploit, SiAirplayaudio
} from "react-icons/si";
import React from 'react'; // Importa React per la tipizzazione

// Definizione delle skill
const softwareSkills = [
  { name: "C", icon: <SiC size={40} color="#60a5fa" /> },
  { name: "C++", icon: <SiCplusplus size={40} color="#60a5fa" /> },
  { name: "C#", icon: <FaCode size={40} color="#a855f7" /> },
  { name: "Java", icon: <FaJava size={40} color="#fb923c" /> },
  { name: "Python", icon: <FaPython size={40} color="#fde047" /> },
  { name: "Bash", icon: <FaTerminal size={40} color="#4ade80" /> },
  { name: "SQL", icon: <SiSqlite size={40} color="#60a5fa" /> },
  { name: ".NET", icon: <SiDotnet size={40} color="#a855f7" /> },
];

const webSkills = [
  { name: "HTML", icon: <SiHtml5 size={40} color="#fb923c" /> },
  { name: "CSS", icon: <SiCss3 size={40} color="#60a5fa" /> },
  { name: "JavaScript", icon: <SiJavascript size={40} color="#fde047" /> },
  { name: "TypeScript", icon: <SiTypescript size={40} color="#60a5fa" /> },
  { name: "React", icon: <FaReact size={40} color="#22d3ee" /> },
  { name: "Git", icon: <FaGit size={40} color="#fb923c" /> },
];

const cyberSkills = [
  { name: "Linux", icon: <FaLinux size={40} color="#d1d5db" /> },
  { name: "Kali Linux", icon: <FaLinux size={40} color="#22d3ee" /> },
  { name: "Metasploit", icon: <SiMetasploit size={40} color="#ec4899" /> },
  { name: "Aircrack", icon: <SiAirplayaudio size={40} color="#facc15" /> },
  { name: "Cryptography", icon: <FaLock size={40} color="#67e8f9" /> },
  { name: "Nmap", icon: <FaSearch size={40} color="#4ade80" /> },
  { name: "Wireshark", icon: <FaShieldAlt size={40} color="#3b82f6" /> },
  { name: "Phishing", icon: <FaBug size={40} color="#f87171" /> },
];

interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface SkillSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: Skill[];
}

function SkillSection({
  title,
  description,
  icon,
  skills,
}: SkillSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-md border border-cyan-800 rounded-2xl shadow-2xl p-8 flex flex-col items-center mb-8"
    >
      <div className="flex items-center gap-3 mb-2">
        <span style={{ color: "#22d3ee" }}>{icon}</span>
        <h2 className="text-2xl font-bold" style={{ color: "#67e8f9" }}>{title}</h2>
      </div>
      <p className="text-center mb-6" style={{ color: "#9ca3af" }}>{description}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center w-full">
        {skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.4, type: "spring" }}
            className="flex flex-col items-center justify-center rounded-xl shadow-lg w-32 h-32"
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              border: "1px solid #0891b2",
            }}
          >
            {skill.icon}
            <span
              className="mt-2 text-base font-semibold text-center w-full truncate"
              style={{ color: "#a5f3fc" }}
            >
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 font-mono"
      style={{ backgroundColor: "#000000", color: "#f3f4f6" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex flex-col items-center gap-2">
          {/* Correzione dell'errore di tipizzazione: FaTerminal è avvolto in uno span */}
          <span 
            className="drop-shadow-lg mb-2"
            style={{ color: "#22d3ee" }}
          >
            <FaTerminal size={64} />
          </span>

          <h1
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-center drop-shadow-lg mb-2"
            style={{ color: "#22d3ee" }}
          >
            Andrea Alfano
          </h1>
          <span
            className="px-4 py-1 rounded font-semibold text-lg mb-2"
            style={{
              backgroundColor: "rgba(22,78,99,0.4)",
              color: "#a5f3fc",
            }}
          >
            Cybersecurity & AI Enthusiast
          </span>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg text-center max-w-2xl mb-4"
          style={{ color: "#d1d5db" }}
        >
          Sono uno studente di informatica con la passione per la cybersecurity,
          l’intelligenza artificiale e lo sviluppo web. Mi piace sperimentare, imparare
          cose nuove e creare progetti che uniscono creatività e tecnologia.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="flex gap-4 mb-8"
        >
          <a
            href="https://github.com/alfanowski"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow border"
            style={{
              borderColor: "#22d3ee",
              color: "#22d3ee",
            }}
          >
            <FaGithub size={20} />
            GitHub
          </a>
          <a
            href="mailto:alfanowski@gmail.com"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow border"
            style={{
              borderColor: "#374151",
              color: "#d1d5db",
            }}
          >
            <FaEnvelope size={18} />
            Email
          </a>
          <a
            href="https://instagram.com/alfanowski.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow border"
            style={{
              borderColor: "#374151",
              color: "#d1d5db",
            }}
          >
            <FaInstagram size={20} />
            Instagram
          </a>
        </motion.div>
      </motion.div>

      {/* Sezioni Skills */}
      <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto mt-16 mb-10">
        <SkillSection
          title="Software Programming"
          description="Linguaggi e tecnologie che uso per lo sviluppo di software e script."
          icon={<FaLaptopCode size={28} color="#22d3ee" />}
          skills={softwareSkills}
        />
        <SkillSection
          title="Web Developing"
          description="Strumenti e framework per creare applicazioni web moderne e responsive."
          icon={<FaGlobe size={28} color="#22d3ee" />}
          skills={webSkills}
        />
        <SkillSection
          title="Cybersecurity"
          description="Competenze e tool per la sicurezza informatica, analisi e penetration testing."
          icon={<FaShieldVirus size={28} color="#22d3ee" />}
          skills={cyberSkills}
        />
      </div>
    </section>
  );
}