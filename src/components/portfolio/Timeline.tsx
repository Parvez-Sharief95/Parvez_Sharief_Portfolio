import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Trophy } from "lucide-react";
import { TIMELINE } from "@/data/portfolio";
import { Section } from "./Section";

const ICONS = { work: Briefcase, education: GraduationCap, milestone: Trophy };

export function Timeline() {
  return (
    <Section id="timeline" eyebrow="Timeline" title={<>Experience &amp; <span className="text-aurora">milestones</span></>}>
      <div className="relative pl-8 sm:pl-12">
        <div
          className="absolute top-2 bottom-2 left-[11px] w-px sm:left-[19px]"
          style={{ background: "linear-gradient(180deg, oklch(0.58 0.15 258 / 45%), oklch(0.62 0.13 295 / 35%), transparent)" }}
        />
        <div className="space-y-6">
          {TIMELINE.map((item, i) => {
            const Icon = ICONS[item.kind];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="relative"
              >
                <span className="animate-pulse-node glass-soft absolute top-6 -left-8 flex h-6 w-6 items-center justify-center rounded-full border-primary/25 sm:-left-12">
                  <Icon className="h-3 w-3 text-primary" />
                </span>
                <div className="glass gloss card-lift rounded-3xl p-6">
                  <p className="relative z-10 font-mono text-[11px] tracking-wide text-primary">{item.period}</p>
                  <h3 className="relative z-10 mt-2 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="relative z-10 text-xs text-accent">{item.org}</p>
                  <ul className="relative z-10 mt-4 space-y-2">
                    {item.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
