"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Turbine({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) {
  const rotor = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (rotor.current) rotor.current.rotation.z -= d * speed; });
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.5, 0]}><cylinderGeometry args={[0.05, 0.1, 3, 12]} /><meshStandardMaterial color="#e6f2fa" metalness={0.4} roughness={0.3} /></mesh>
      <group ref={rotor} position={[0, 3, 0.12]}>
        <mesh><sphereGeometry args={[0.12, 16, 16]} /><meshStandardMaterial color="#ffffff" /></mesh>
        {[0, 1, 2].map((i) => (
          <group key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
            <mesh position={[0, 0.8, 0]}><boxGeometry args={[0.09, 1.6, 0.02]} /><meshStandardMaterial color="#f5fbff" /></mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

function Network() {
  const g = useRef<THREE.Group>(null);
  const { points, lines } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 60; i++) {
      const r = 3 + Math.random() * 0.4, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
      pts.push(new THREE.Vector3(r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p)));
    }
    const seg: number[] = [];
    pts.forEach((a, i) => pts.forEach((b, j) => { if (j > i && a.distanceTo(b) < 1.7) seg.push(a.x, a.y, a.z, b.x, b.y, b.z); }));
    const lg = new THREE.BufferGeometry(); lg.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
    const pg = new THREE.BufferGeometry().setFromPoints(pts);
    return { points: pg, lines: lg };
  }, []);
  useFrame((s, d) => { if (g.current) { g.current.rotation.y += d * 0.08; g.current.rotation.x = s.pointer.y * 0.15; } });
  return (
    <group ref={g}>
      <lineSegments geometry={lines}><lineBasicMaterial color="#00a1f1" transparent opacity={0.35} /></lineSegments>
      <points geometry={points}><pointsMaterial color="#7fd3ff" size={0.08} /></points>
      <mesh><icosahedronGeometry args={[2.2, 2]} /><meshStandardMaterial color="#1480d0" wireframe transparent opacity={0.12} /></mesh>
    </group>
  );
}

function Grid() {
  return <gridHelper args={[40, 40, "#1480d0", "#0b3a5c"]} position={[0, -2.6, 0]} />;
}

export default function HeroScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.5, 9], fov: 45 }} gl={{ antialias: true, powerPreference: "low-power" }} aria-hidden>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-4, 2, 3]} color="#00a1f1" intensity={20} />
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}><group position={[2.6, 0.3, 0]}><Network /></group></Float>
      <Turbine position={[-1.5, -2.6, -2]} scale={0.9} speed={1.2} />
      <Turbine position={[-3.2, -2.6, -4]} scale={0.8} speed={0.9} />
      <Turbine position={[0.3, -2.6, -5]} scale={0.7} speed={1.5} />
      <Grid />
      <fog attach="fog" args={["#082f49", 6, 18]} />
    </Canvas>
  );
}
