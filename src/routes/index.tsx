import { createFileRoute } from "@tanstack/react-router";
import { SceneBackdrop } from "@/components/three/SceneBackdrop";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Timeline } from "@/components/portfolio/Timeline";
import { Contact, Footer } from "@/components/portfolio/Contact";

const title = "Parvez Sharief — AI & Software Engineer Portfolio";
const description =
  "Portfolio of Parvez Sharief: AI/ML engineer building multi-agent systems, RAG platforms, enterprise Salesforce apps and analytics products.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SceneBackdrop />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
