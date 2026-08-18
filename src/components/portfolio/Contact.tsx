import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, FileText } from "lucide-react";
import { toast } from "sonner";
import { PROFILE } from "@/data/portfolio";
import { Section } from "./Section";
import resumeAsset from "@/assets/resume.pdf.asset.json";

type Fields = { name: string; email: string; message: string };

const validate = (f: Fields) => {
  const e: Partial<Fields> = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (f.message.trim().length < 12) e.message = "Tell me a bit more (12+ characters).";
  return e;
};

export function Contact() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const set = (key: keyof Fields, value: string) => {
    const next = { ...fields, [key]: value };
    setFields(next);
    if (touched[key as string]) setErrors(validate(next));
  };

  const blur = (key: keyof Fields) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(fields));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(found).length) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${fields.name}`);
    const body = encodeURIComponent(`${fields.message}\n\n— ${fields.name} (${fields.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your mail client — thanks for reaching out!");
    setFields({ name: "", email: "", message: "" });
    setTouched({});
  };

  const inputClass = (key: keyof Fields) =>
    `w-full rounded-2xl border bg-white/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none backdrop-blur-xl transition-all focus:border-primary/40 focus:bg-white/80 ${
      errors[key] && touched[key as string] ? "border-destructive/60" : "border-border"
    }`;

  return (
    <Section id="contact" eyebrow="Contact" title={<>Let&apos;s build <span className="text-aurora">something intelligent</span></>}>
      <div className="grid gap-5 lg:grid-cols-5">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass space-y-4 rounded-3xl p-7 lg:col-span-3"
          noValidate
        >
          <div>
            <label htmlFor="name" className="mb-2 block font-mono text-[11px] tracking-[0.16em] text-primary uppercase">
              Name
            </label>
            <input
              id="name"
              value={fields.name}
              onChange={(e) => set("name", e.target.value)}
              onBlur={() => blur("name")}
              placeholder="Your name"
              className={inputClass("name")}
            />
            {errors.name && touched["name"] && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-mono text-[11px] tracking-[0.16em] text-primary uppercase">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={fields.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => blur("email")}
              placeholder="you@company.com"
              className={inputClass("email")}
            />
            {errors.email && touched["email"] && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block font-mono text-[11px] tracking-[0.16em] text-primary uppercase">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={fields.message}
              onChange={(e) => set("message", e.target.value)}
              onBlur={() => blur("message")}
              placeholder="What are you building?"
              className={`${inputClass("message")} resize-none`}
            />
            {errors.message && touched["message"] && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/12 px-6 py-3 text-sm font-medium text-primary transition-all hover:-translate-y-0.5 hover:bg-primary/18"
          >
            Send message <Send className="h-4 w-4" />
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-4 lg:col-span-2"
        >
          {[
            { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
            { icon: Github, label: "GitHub", value: "Parvez-Sharief95", href: PROFILE.github },
            { icon: Linkedin, label: "LinkedIn", value: "parvez-sharief", href: PROFILE.linkedin },
            { icon: FileText, label: "Resume", value: "Download PDF", href: resumeAsset.url },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="glass gloss card-lift flex items-center gap-4 rounded-2xl p-5"
            >
              <span className="glass-soft relative z-10 rounded-full p-2.5">
                <c.icon className="h-4 w-4 text-primary" />
              </span>
              <span className="relative z-10">
                <span className="block font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">{c.label}</span>
                <span className="block text-sm text-foreground">{c.value}</span>
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="px-5 pb-10">
      <div className="glass mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 rounded-3xl px-7 py-5">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.role}
        </p>
        <div className="flex items-center gap-3">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary">
            <Github className="h-4 w-4" />
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href={`mailto:${PROFILE.email}`} aria-label="Email" className="text-muted-foreground hover:text-primary">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
