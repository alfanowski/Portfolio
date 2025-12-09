"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaGithub, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence, Variants } from "framer-motion"; 

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const menuVariants: Variants = { 
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: { 
        when: "afterChildren",
        duration: 0.2 
      } 
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { 
        when: "beforeChildren",
        duration: 0.3, 
        ease: "easeInOut",
        staggerChildren: 0.07, 
        delayChildren: 0.1 
      } 
    },
  };
  
  const itemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };


  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  return (
    <>
      <header ref={navbarRef} className="w-full border-b border-gray-800 fixed top-0 bg-black z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-cyan-400 text-lg font-bold">
            alfanowski
          </Link>

          {/* Menu Desktop (Omesso per brevità, nessun cambio) */}
          <nav className="hidden md:flex gap-8 items-center text-gray-300">
            <Link href="/" className="relative hover:text-cyan-300 transition-colors group">
              Home
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link href="/about" className="relative hover:text-cyan-300 transition-colors group">
              About
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link href="/projects" className="relative hover:text-cyan-300 transition-colors group">
              Projects
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link href="/contact" className="relative hover:text-cyan-300 transition-colors group">
              Contact
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <a
              href="https://github.com/alfanowski"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-cyan-400 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-400 hover:text-black transition-colors"
            >
              <FaGithub size={18} />
              GitHub
            </a>
          </nav>

          {/* Menu Mobile Button (Nessuna modifica) */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-gray-300 z-50" aria-label="menu">
            <AnimatePresence mode="wait">
              <motion.div
                key={open ? "open" : "close"}
                initial={{ rotate: 0 }}
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <FaTimes size={24} /> : <FaBars size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        {/* CONTENITORE MENU MOBILE */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants} // menuVariants tipizzato
              className="md:hidden border-t border-gray-800 bg-black/90 overflow-hidden" 
            >
              <div 
                className="px-6 py-4 flex flex-col gap-4 text-gray-300 text-lg font-medium items-center"
              >
                {/* Applichiamo itemVariants ai singoli motion.div */}
                <motion.div variants={itemVariants}>
                  <Link href="/" onClick={() => setOpen(false)} className="hover:text-cyan-300 transition-colors">Home</Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link href="/about" onClick={() => setOpen(false)} className="hover:text-cyan-300 transition-colors">About</Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link href="/projects" onClick={() => setOpen(false)} className="hover:text-cyan-300 transition-colors">Projects</Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-cyan-300 transition-colors">Contact</Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <a href="https://github.com/alfanoandrea" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                    <FaGithub size={20} />
                    GitHub
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* OVERLAY SEMI-TRASPARENTE (Nessuna modifica) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}