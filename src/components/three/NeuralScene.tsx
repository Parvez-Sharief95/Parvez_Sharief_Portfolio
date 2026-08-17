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
        if (nodes[i].distanceTo(nodes[j]) < 1.15) {
          positions.push(...nodes[i].toArray(), ...nodes[j].toArray());
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
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.16} />
      </Icosahedron>
      <Icosahedron args={[1.2, 1]}>
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.14} />
      </Icosahedron>
      <lineSegments geometry={linkGeometry}>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.24} />
      </lineSegments>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.033, 8, 8]} />
          <meshBasicMaterial color={i % 5 === 0 ? "#34d399" : i % 3 === 0 ? "#c084fc" : "#67e8f9"} />
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
      <PointMaterial transparent color="#7dd3fc" size={0.035} sizeAttenuation depthWrite={false} opacity={0.7} />
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
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 3, 5]} intensity={30} color="#22d3ee" />
      <pointLight position={[-5, -2, 3]} intensity={22} color="#a855f7" />
      <NeuralMesh quality={quality} />
      <ParticleField count={lowPower ? 300 : 900} />
      <ScrollCamera />
    </Canvas>
  );
}
