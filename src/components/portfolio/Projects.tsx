import { useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Layers3 } from "lucide-react";
import { PROJECTS, type Project } from "@/data/portfolio";
import { Section } from "./Section";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

function TiltCard({ project, onOpen, index }: { project: Project; onOpen: () => void; index: number }) {
  const [style, setStyle] = useState<{ transform: string }>({ transform: "" });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setStyle({ transform: `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-6px)` });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setStyle({ transform: "" })}
      style={style}
      className="glass group flex flex-col rounded-3xl p-6 transition-shadow duration-300 will-change-transform hover:glow-cyan"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold">{project.title}</h3>
          <p className="mt-1 text-xs text-cyan">{project.tagline}</p>
        </div>
        <Layers3 className="h-4 w-4 shrink-0 text-violet opacity-70" />
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((t) => (
          <span
            key={t}
            className="rounded-full border border-cyan/25 bg-cyan/5 px-2.5 py-0.5 font-mono text-[10px] text-cyan/90 transition-shadow group-hover:shadow-[0_0_12px_-2px_oklch(0.82_0.15_195/45%)]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2">
        <button
          onClick={onOpen}
          className="rounded-full border border-glass-border bg-white/[0.04] px-3.5 py-1.5 text-xs text-foreground transition-all hover:bg-white/[0.09]"
        >
          Architecture
        </button>
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-glass-border px-3.5 py-1.5 text-xs text-muted-foreground transition-all hover:text-cyan"
          >
            <Github className="h-3.5 w-3.5" /> Repo
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-glass-border px-3.5 py-1.5 text-xs text-muted-foreground transition-all hover:text-emerald"
          >
            Live <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Section id="projects" eyebrow="Projects" title={<>Systems I&apos;ve <span className="text-aurora">designed and shipped</span></>}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <TiltCard key={p.title} project={p} index={i} onOpen={() => setActive(p)} />
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="glass max-h-[85vh] overflow-y-auto border-glass-border sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-aurora">{active?.title}</DialogTitle>
            <DialogDescription className="text-cyan">{active?.tagline}</DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed text-muted-foreground">{active?.summary}</p>

          <div className="mt-2">
            <h4 className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">System design</h4>
            <ul className="mt-3 space-y-2.5">
              {active?.architecture.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2">
            <h4 className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">Highlights</h4>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {active?.highlights.map((h) => (
                <span key={h} className="rounded-full border border-emerald/25 bg-emerald/5 px-2.5 py-0.5 text-[11px] text-emerald">
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {active?.stack.map((t) => (
              <span key={t} className="rounded-full border border-glass-border px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </Section>
  );
}
