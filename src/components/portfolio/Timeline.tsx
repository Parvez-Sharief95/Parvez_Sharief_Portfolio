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
          style={{ background: "linear-gradient(180deg, oklch(0.82 0.15 195 / 60%), oklch(0.68 0.2 300 / 50%), transparent)" }}
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
                <span className="animate-pulse-node absolute top-6 -left-8 flex h-6 w-6 items-center justify-center rounded-full border border-cyan/40 bg-cyan/15 sm:-left-12">
                  <Icon className="h-3 w-3 text-cyan" />
                </span>
                <div className="glass rounded-3xl p-6 transition-all hover:glow-violet">
                  <p className="font-mono text-[11px] tracking-wide text-cyan">{item.period}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold">{item.title}</h3>
                  <p className="text-xs text-violet">{item.org}</p>
                  <ul className="mt-4 space-y-2">
                    {item.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald/70" />
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
