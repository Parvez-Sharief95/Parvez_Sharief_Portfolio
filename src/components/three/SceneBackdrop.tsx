import { ClientOnly } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const NeuralScene = lazy(() => import("./NeuralScene"));

export function SceneBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 0%, #071127 0%, #050816 55%, #030712 100%)" }} />
      <div className="flare left-[-10%] top-[-10%] h-[38rem] w-[38rem]" style={{ background: "oklch(0.82 0.15 195 / 35%)" }} />
      <div className="flare right-[-15%] top-[20%] h-[34rem] w-[34rem]" style={{ background: "oklch(0.68 0.2 300 / 30%)" }} />
      <div className="flare bottom-[-15%] left-[25%] h-[32rem] w-[32rem]" style={{ background: "oklch(0.78 0.16 165 / 22%)" }} />
      <ClientOnly>
        <Suspense fallback={null}>
          <NeuralScene />
        </Suspense>
      </ClientOnly>
    </div>
  );
}
