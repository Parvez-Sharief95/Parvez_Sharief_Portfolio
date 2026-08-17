import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { PROFILE } from "@/data/portfolio";

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length] ?? "";
    const done = text === word;
    const delay = deleting ? 35 : done ? 1600 : 70;
    const t = setTimeout(() => {
      if (!deleting && done) return setDeleting(true);
      if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
        return;
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(PROFILE.specializations);

  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center px-5 pt-28 pb-20">
      <div className="mx-auto w-full max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan" />
          B.Tech AI &amp; ML · Open to 2026 engineering roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="mt-7 font-display text-5xl leading-[1.05] font-semibold sm:text-6xl md:text-7xl"
        >
          <span className="text-aurora">{PROFILE.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-5 font-mono text-base text-cyan sm:text-lg"
        >
          {typed}
          <span className="animate-caret ml-0.5">|</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          I build production AI systems, multi-agent architectures and enterprise platforms — bridging
          software engineering, analytics and CRM development to solve real business problems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-glass-border bg-cyan/15 px-6 py-3 text-sm font-medium text-cyan backdrop-blur-xl transition-all hover:bg-cyan/25 hover:glow-cyan"
          >
            Explore Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition-all hover:glow-violet"
          >
            <Mail className="h-4 w-4 text-violet" />
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
