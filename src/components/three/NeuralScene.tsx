import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function useMouseTarget() {
  const ref = useRef({ x: 0, y: 0 });
  const { size } = useThree();
  useFrame(({ pointer }) => {
    ref.current.x += (pointer.x - ref.current.x) * 0.05;
    ref.current.y += (pointer.y - ref.current.y) * 0.05;
  });
  void size;
  return ref;
}

function NeuralMesh({ quality }: { quality: number }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useMouseTarget();

  const nodes = useMemo(() => {
    const count = quality > 1 ? 48 : 26;
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(1.72));
    }
    return pts;
  }, [quality]);

  const linkGeometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        if (a && b && a.distanceTo(b) < 1.15) {
          positions.push(...a.toArray(), ...b.toArray());
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [nodes]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.14;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, mouse.current.y * 0.45, 0.06);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, mouse.current.x * 0.2, 0.06);
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.035;
    g.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <Icosahedron args={[1.72, quality > 1 ? 3 : 2]}>
        <meshBasicMaterial color="#6b8cd6" wireframe transparent opacity={0.07} />
      </Icosahedron>
      <Icosahedron args={[1.2, 1]}>
        <meshBasicMaterial color="#a29ad6" wireframe transparent opacity={0.06} />
      </Icosahedron>
      <lineSegments geometry={linkGeometry}>
        <lineBasicMaterial color="#7d97d8" transparent opacity={0.1} />
      </lineSegments>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.026, 8, 8]} />
          <meshBasicMaterial
            transparent
            opacity={0.4}
            color={i % 3 === 0 ? "#9a92d4" : "#7b95d4"}
          />
        </mesh>
      ))}
    </group>
  );
}

function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.25;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#8fa6da" size={0.028} sizeAttenuation depthWrite={false} opacity={0.35} />
    </Points>
  );
}

function ScrollCamera() {
  const { camera } = useThree();
  useFrame(() => {
    const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const p = Math.min(1, window.scrollY / max);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6 + p * 3.2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, p * 1.4, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function NeuralScene() {
  const lowPower =
    typeof window !== "undefined" &&
    (window.innerWidth < 768 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (navigator.hardwareConcurrency ?? 8) <= 4);
  const quality = lowPower ? 1 : 2;

  return (
    <Canvas
      dpr={lowPower ? [1, 1.25] : [1, 1.8]}
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: !lowPower, powerPreference: "high-performance", alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[4, 3, 5]} intensity={18} color="#93b4f5" />
      <pointLight position={[-5, -2, 3]} intensity={14} color="#b9a8ee" />
      <NeuralMesh quality={quality} />
      <ParticleField count={lowPower ? 200 : 600} />
      <ScrollCamera />
    </Canvas>
  );
}
