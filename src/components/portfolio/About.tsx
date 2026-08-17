import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Building2, GraduationCap, Layers } from "lucide-react";
import { PROFILE, ROLES } from "@/data/portfolio";
import { Section } from "./Section";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1200);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-display text-3xl font-semibold text-aurora">
      {n}
      {suffix}
    </span>
  );
}

const PILLARS = [
  { icon: BrainCircuit, title: "AI Systems", copy: "Agentic architectures, RAG pipelines and LLM integrations built for real workloads." },
  { icon: Layers, title: "Software Engineering", copy: "REST APIs, microservices, testing and CI/CD with an ownership mindset." },
  { icon: Building2, title: "Enterprise & CRM", copy: "Salesforce platform development, automation and access-controlled apps." },
  { icon: GraduationCap, title: "Analytics", copy: "SQL, Databricks and Power BI turning millions of records into decisions." },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title={<>Engineering across <span className="text-aurora">AI, data and enterprise</span></>}>
      <div className="grid gap-6 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-7 lg:col-span-3"
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            I&apos;m a B.Tech graduate in Artificial Intelligence &amp; Machine Learning from Aditya College of
            Engineering and Technology, with hands-on experience across software engineering, business
            analytics, AI, data analytics and Salesforce development.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            My work spans enterprise analytics at Myntra, Salesforce platform development, and building
            production-ready AI systems — multi-agent architectures, enterprise knowledge platforms, browser
            extensions, CRM systems and analytics dashboards.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            <span className="text-foreground">Engineering philosophy:</span> rather than specializing in one
            technology, I deliberately built an interdisciplinary stack — engineering, AI/ML, cloud, analytics
            and product thinking — so I can read a problem from both the technical and business side and design
            solutions that actually scale.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <span
                key={r}
                className="rounded-full border border-glass-border bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {r}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-4 lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass grid grid-cols-2 gap-4 rounded-3xl p-6"
          >
            {PROFILE.metrics.map((m) => (
              <div key={m.label}>
                <Counter value={m.value} suffix={m.suffix} />
                <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                className="glass-soft rounded-2xl p-4 transition-all hover:glow-cyan"
              >
                <p.icon className="h-4 w-4 text-cyan" />
                <h3 className="mt-3 text-sm font-medium">{p.title}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{p.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
