import { ClientOnly } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const NeuralScene = lazy(() => import("./NeuralScene"));

export function SceneBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, oklch(0.99 0.008 250) 0%, oklch(0.975 0.006 265) 45%, oklch(0.96 0.008 275) 100%)",
        }}
      />
      <div className="flare left-[-12%] top-[-12%] h-[40rem] w-[40rem]" style={{ background: "oklch(0.78 0.09 255 / 45%)" }} />
      <div className="flare right-[-16%] top-[18%] h-[36rem] w-[36rem]" style={{ background: "oklch(0.8 0.08 300 / 38%)" }} />
      <div className="flare bottom-[-18%] left-[22%] h-[34rem] w-[34rem]" style={{ background: "oklch(0.86 0.06 220 / 40%)" }} />
      <ClientOnly>
        <Suspense fallback={null}>
          <NeuralScene />
        </Suspense>
      </ClientOnly>
    </div>
  );
}
