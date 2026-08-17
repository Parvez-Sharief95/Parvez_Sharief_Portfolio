import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, FileText, Menu, X } from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import resumeAsset from "@/assets/resume.pdf.asset.json";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [active, setActive] = useState("#about");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="glass flex w-full max-w-5xl items-center gap-2 rounded-full px-3 py-2 backdrop-blur-2xl">
        <a href="#top" className="ml-2 flex items-center gap-2 pr-2 font-display text-sm font-semibold tracking-tight">
          <span className="animate-pulse-node inline-block h-2 w-2 rounded-full bg-cyan" />
          <span className="text-aurora">PS</span>
        </a>

        <div className="mx-auto hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-1.5 text-sm transition-all duration-300 ${
                active === l.href
                  ? "glass-soft text-foreground glow-cyan"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1.5 md:ml-0">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="glass-soft rounded-full p-2 text-muted-foreground transition-all hover:text-cyan hover:glow-cyan"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="glass-soft rounded-full p-2 text-muted-foreground transition-all hover:text-cyan hover:glow-cyan"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={resumeAsset.url}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-glass-border bg-cyan/10 px-3.5 py-1.5 text-sm text-cyan transition-all hover:bg-cyan/20 hover:glow-cyan sm:inline-flex"
          >
            <FileText className="h-3.5 w-3.5" /> Resume
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="glass-soft rounded-full p-2 text-muted-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute top-20 w-[calc(100%-2rem)] max-w-sm rounded-3xl p-3 md:hidden"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
