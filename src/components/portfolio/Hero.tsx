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
          className="glass gloss mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground"
        >
          <Sparkles className="relative z-10 h-3.5 w-3.5 text-primary" />
          <span className="relative z-10">
          B.Tech AI &amp; ML · Open to 2026 engineering roles
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="mt-7 font-display text-5xl leading-[1.05] font-semibold text-foreground sm:text-6xl md:text-7xl"
        >
          {PROFILE.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.14 }}
          className="mt-4 font-display text-xl font-medium text-foreground sm:text-2xl"
        >
          Software Engineering · <span className="text-aurora">AI</span> ·{" "}
          <span className="text-aurora">Data</span> · <span className="text-aurora">Enterprise</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-5 font-mono text-base text-primary sm:text-lg"
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
          B.Tech graduate in Artificial Intelligence &amp; Machine Learning building multi-agent systems, RAG
          knowledge platforms, Salesforce enterprise apps and analytics pipelines — with business analytics
          experience at Myntra and Salesforce development experience at Technical Hub.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/12 px-6 py-3 text-sm font-medium text-primary backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-primary/18"
          >
            Explore Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="glass gloss card-lift inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground"
          >
            <Mail className="relative z-10 h-4 w-4 text-accent" />
            <span className="relative z-10">Get in Touch</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
