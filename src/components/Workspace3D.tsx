"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useDesktopEffects } from "@/lib/use-desktop-effects";

function Monitor() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.3, 0]}>
      {/* Screen */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[2.2, 1.4, 0.05]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>

      {/* Screen glow */}
      <mesh position={[0, 0.6, 0.026]}>
        <planeGeometry args={[2.0, 1.2]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.3} transparent opacity={0.8} />
      </mesh>

      {/* Screen content - code lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[-0.7 + i * 0.15, 0.3 + i * 0.15, 0.027]}>
          <planeGeometry args={[0.8 + Math.random() * 0.4, 0.03]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#3b82f6" : "#8b5cf6"}
            emissive={i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#3b82f6" : "#8b5cf6"}
            emissiveIntensity={0.4}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* Stand */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.08, 0.5, 0.08]} />
        <meshStandardMaterial color="#2a2a3e" />
      </mesh>

      {/* Base */}
      <mesh position={[0, -0.35, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.04, 32]} />
        <meshStandardMaterial color="#2a2a3e" />
      </mesh>
    </group>
  );
}

function Keyboard() {
  return (
    <group position={[0, -0.35, 0.6]}>
      {/* Keyboard body */}
      <mesh>
        <boxGeometry args={[1.6, 0.04, 0.5]} />
        <meshStandardMaterial color="#1e1e2e" />
      </mesh>
      {/* Keys */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[-0.65 + col * 0.11, 0.025, -0.18 + row * 0.055]}
          >
            <boxGeometry args={[0.09, 0.01, 0.04]} />
            <meshStandardMaterial color="#2a2a3e" />
          </mesh>
        ))
      )}
    </group>
  );
}

function Mouse() {
  return (
    <group position={[1.1, -0.35, 0.5]}>
      <mesh>
        <capsuleGeometry args={[0.04, 0.08, 8, 16]} />
        <meshStandardMaterial color="#2a2a3e" />
      </mesh>
    </group>
  );
}

function CoffeeMug() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group position={[-1.2, -0.15, 0.2]}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh ref={ref}>
          <cylinderGeometry args={[0.1, 0.08, 0.2, 16]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
        {/* Handle */}
        <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.05, 0.01, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
        {/* Steam */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.02, 0.04, 0.1, 8]} />
          <meshStandardMaterial color="white" transparent opacity={0.15} />
        </mesh>
      </Float>
    </group>
  );
}

function Plant() {
  return (
    <group position={[1.3, -0.15, -0.2]}>
      <Float speed={1} rotationIntensity={0.05} floatIntensity={0.2}>
        {/* Pot */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.1, 0.08, 0.15, 16]} />
          <meshStandardMaterial color="#8b5a3c" />
        </mesh>
        {/* Plant leaves */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 5) * Math.PI * 2) * 0.06,
              0.08 + i * 0.02,
              Math.sin((i / 5) * Math.PI * 2) * 0.06,
            ]}
            rotation={[
              Math.random() * 0.5 - 0.25,
              (i / 5) * Math.PI * 2,
              Math.random() * 0.3,
            ]}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#10b981" />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

function DeskLamp() {
  return (
    <group position={[-1.3, 0, -0.3]}>
      <Float speed={0.8} rotationIntensity={0.02} floatIntensity={0.1}>
        {/* Base */}
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.02, 16]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        {/* Arm */}
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.02, 0.4, 0.02]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        {/* Shade */}
        <mesh position={[0, 0.05, 0]} rotation={[0.3, 0, 0]}>
          <coneGeometry args={[0.08, 0.1, 16]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
        </mesh>
        {/* Light */}
        <pointLight position={[0, 0, 0.1]} intensity={0.5} color="#fbbf24" distance={2} />
      </Float>
    </group>
  );
}

function MonitorLight() {
  return (
    <pointLight position={[0, 0.8, 1]} intensity={0.3} color="#0ea5e9" distance={3} />
  );
}

function WorkspaceScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1 + 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Desk surface */}
      <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 2.5]} />
        <meshStandardMaterial color="#1e1e2e" />
      </mesh>

      <Monitor />
      <Keyboard />
      <Mouse />
      <CoffeeMug />
      <Plant />
      <DeskLamp />
      <MonitorLight />

      {/* Ambient light */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />
    </group>
  );
}

export default function Workspace3D() {
  const isDesktop = useDesktopEffects();

  if (!isDesktop) return null;

  return (
    <div className="w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden glass border border-white/[0.06]">
      <Canvas camera={{ position: [0, 0.5, 3.5], fov: 45 }}>
        <WorkspaceScene />
      </Canvas>
    </div>
  );
}