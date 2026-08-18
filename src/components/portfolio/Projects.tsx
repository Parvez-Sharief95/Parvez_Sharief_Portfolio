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
      className="glass gloss card-lift group flex flex-col rounded-3xl p-6 will-change-transform"
    >
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">{project.title}</h3>
          <p className="mt-1 text-xs text-primary">{project.tagline}</p>
        </div>
        <Layers3 className="h-4 w-4 shrink-0 text-accent opacity-80" />
      </div>

      <p className="relative z-10 mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

      <div className="relative z-10 mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((t) => (
          <span
            key={t}
            className="rounded-full border border-primary/18 bg-primary/8 px-2.5 py-0.5 font-mono text-[10px] text-primary"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="relative z-10 mt-6 flex items-center gap-2">
        <button
          onClick={onOpen}
          className="glass-soft rounded-full px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/25 hover:text-primary"
        >
          Architecture
        </button>
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/25 hover:text-primary"
          >
            <Github className="h-3.5 w-3.5" /> Repo
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground transition-all hover:border-accent/25 hover:text-accent"
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
        <DialogContent className="glass max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-aurora">{active?.title}</DialogTitle>
            <DialogDescription className="text-primary">{active?.tagline}</DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed text-muted-foreground">{active?.summary}</p>

          <div className="mt-2">
            <h4 className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">System design</h4>
            <ul className="mt-3 space-y-2.5">
              {active?.architecture.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2">
            <h4 className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">Highlights</h4>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {active?.highlights.map((h) => (
                <span key={h} className="rounded-full border border-accent/20 bg-accent/8 px-2.5 py-0.5 text-[11px] text-accent">
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {active?.stack.map((t) => (
              <span key={t} className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </Section>
  );
}
