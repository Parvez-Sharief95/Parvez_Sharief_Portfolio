import { motion } from "framer-motion";
import { SKILLS } from "@/data/portfolio";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title={<>My <span className="text-aurora">tech ecosystem</span></>}>
      <div className="grid gap-5 md:grid-cols-2">
        {SKILLS.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: (gi % 2) * 0.08 }}
            className="glass gloss card-lift rounded-3xl p-6"
          >
            <h3 className="relative z-10 font-mono text-[11px] tracking-[0.16em] text-primary uppercase">{group.category}</h3>
            <div className="relative z-10 mt-4 flex flex-wrap gap-2">
              {group.items.map((s) => (
                <span
                  key={s}
                  className="glass-soft cursor-default rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:text-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
