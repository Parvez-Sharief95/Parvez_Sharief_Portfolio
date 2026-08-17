import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-28 px-5 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="glass inline-flex rounded-full px-3.5 py-1 font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
