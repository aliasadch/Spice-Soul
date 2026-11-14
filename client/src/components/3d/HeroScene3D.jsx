import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Steam Particle Cloud
function SteamParticles({ intensity = 1.0 }) {
  const count = 35;
  const particlesRef = useRef([]);

  useFrame((state, delta) => {
    particlesRef.current.forEach((p, i) => {
      if (p) {
        p.position.y += delta * (0.8 + (i % 5) * 0.15) * intensity;
        p.position.x += Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.003;
        p.rotation.z += delta * 0.4;
        
        // Reset when rising past boundary
        if (p.position.y > 2.8) {
          p.position.y = 0.5 + Math.random() * 0.2;
          p.position.x = (Math.random() - 0.5) * 0.9;
          p.position.z = (Math.random() - 0.5) * 0.9;
        }

        // Dynamic fade out near top
        const opacity = Math.max(0, 1 - (p.position.y - 0.5) / 2.3) * 0.35 * intensity;
        if (p.material) {
          p.material.opacity = opacity;
        }
      }
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          ref={el => particlesRef.current[i] = el}
          position={[
            (Math.random() - 0.5) * 0.8,
            0.5 + Math.random() * 2.0,
            (Math.random() - 0.5) * 0.8
          ]}
        >
          <sphereGeometry args={[0.09 + (i % 3) * 0.04, 12, 12]} />
          <meshBasicMaterial
            color="#9ca3af"
            transparent
            opacity={0.25}
            blending={THREE.NormalBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// 3D Star Anise (Floating Spice)
function StarAnise({ position, rotationSpeed = 0.5 }) {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed;
      meshRef.current.rotation.y += delta * (rotationSpeed * 0.7);
    }
  });

  return (
    <group ref={meshRef} position={position} scale={0.4}>
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI) / 3;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.35, 0, Math.sin(angle) * 0.35]}
            rotation={[0, -angle, 0.2]}
          >
            <coneGeometry args={[0.16, 0.55, 5]} />
            <meshStandardMaterial color="#5c2607" roughness={0.7} metalness={0.1} />
          </mesh>
        );
      })}
      <mesh>
        <sphereGeometry args={[0.2, 10, 10]} />
        <meshStandardMaterial color="#451a03" roughness={0.8} />
      </mesh>
    </group>
  );
}

// 3D Cardamom Pod (Floating Spice)
function CardamomPod({ position }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.6;
      ref.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.002;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={[0.18, 0.36, 0.18]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial color="#4d7c0f" roughness={0.6} />
    </mesh>
  );
}

// 3D Cinnamon Stick (Floating Spice)
function CinnamonStick({ position, rotation }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <cylinderGeometry args={[0.07, 0.07, 1.2, 12, 1, true]} />
        <meshStandardMaterial color="#854d0e" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Detailed 3D Royal Handi & Platter Model - Light Luxury Pedestal
function RoyalHandiModel() {
  const handiRef = useRef();
  const curryRef = useRef();

  useFrame((state) => {
    if (handiRef.current) {
      handiRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (curryRef.current) {
      curryRef.current.material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={handiRef} position={[0, -0.4, 0]}>
      {/* Heavy Italian White Carrara Marble Pedestal */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[2.1, 2.25, 0.18, 48]} />
        <meshStandardMaterial
          color="#f5f2eb"
          roughness={0.2}
          metalness={0.15}
        />
      </mesh>
      {/* Decorative Gold Inlay Rim on Marble Base */}
      <mesh position={[0, -0.05, 0]}>
        <torusGeometry args={[2.08, 0.045, 16, 64]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Handcrafted Terracotta & Hammered Brass Handi Vessel */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[1.3, 36, 36, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        <meshStandardMaterial
          color="#9a3412"
          roughness={0.4}
          metalness={0.45}
        />
      </mesh>
      {/* Hammered Copper Belly Band */}
      <mesh position={[0, 0.55, 0]}>
        <torusGeometry args={[1.29, 0.08, 16, 48]} />
        <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Golden Brass Neck & Rim */}
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[1.05, 1.15, 0.22, 40]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <torusGeometry args={[1.08, 0.07, 16, 48]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Brass Ornamental Handles */}
      {[-1.32, 1.32].map((x, idx) => (
        <group key={idx} position={[x, 0.62, 0]} rotation={[0, 0, idx === 0 ? 0.3 : -0.3]}>
          <mesh>
            <torusGeometry args={[0.22, 0.05, 12, 24]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Rich Saffron Rogan Josh / Handi Gravy Surface */}
      <mesh ref={curryRef} position={[0, 0.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.98, 36]} />
        <meshStandardMaterial
          color="#991b1b"
          emissive="#b91c1c"
          emissiveIntensity={0.25}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Garnish on Gravy: Julienned Ginger & Fresh Cilantro */}
      <group position={[0, 0.81, 0]}>
        <mesh position={[-0.15, 0, 0.1]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[0.3, 0.02, 0.04]} />
          <meshStandardMaterial color="#fef08a" roughness={0.3} />
        </mesh>
        <mesh position={[0.2, 0, -0.05]} rotation={[0, -0.8, 0]}>
          <boxGeometry args={[0.35, 0.02, 0.04]} />
          <meshStandardMaterial color="#fef08a" roughness={0.3} />
        </mesh>
        <mesh position={[0.02, 0, -0.2]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.25, 0.02, 0.04]} />
          <meshStandardMaterial color="#fef08a" roughness={0.3} />
        </mesh>

        {[-0.2, 0, 0.25].map((gx, i) => (
          <mesh key={i} position={[gx, 0.01, (i % 2 === 0 ? -0.1 : 0.15)]} rotation={[-0.2, i, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} scale={[1, 0.2, 1.5]} />
            <meshStandardMaterial color="#16a34a" roughness={0.5} />
          </mesh>
        ))}

        <mesh position={[0.1, 0.02, 0.2]} rotation={[0.1, 0.6, 0.2]}>
          <capsuleGeometry args={[0.05, 0.35, 8, 8]} />
          <meshStandardMaterial color="#dc2626" roughness={0.25} />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroScene3D() {
  const [steamIntensity, setSteamIntensity] = useState(1.1);
  const [lightingMode, setLightingMode] = useState('natural'); // natural, golden, evening

  const lightPresets = {
    natural: { main: '#ffffff', ambient: '#fef3c7', intensity: 2.4 },
    golden: { main: '#fbbf24', ambient: '#fed7aa', intensity: 2.8 },
    evening: { main: '#f97316', ambient: '#ffedd5', intensity: 2.6 }
  };

  const currentLight = lightPresets[lightingMode];

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#faf6ef] via-[#f5efe4] to-[#ede3d1] border border-stone-200/90 shadow-xl group">
      {/* 3D Canvas */}
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <PerspectiveCamera makeDefault position={[0, 2.2, 4.4]} fov={42} />

        {/* Ambient & Studio Lighting */}
        <ambientLight intensity={1.4} color={currentLight.ambient} />
        <directionalLight
          position={[4, 8, 5]}
          intensity={currentLight.intensity}
          color={currentLight.main}
          castShadow
        />
        <pointLight
          position={[-3, 3, -2]}
          intensity={1.2}
          color="#fde047"
        />
        <pointLight
          position={[0, 1.2, 1]}
          intensity={1.0}
          color="#ea580c"
          distance={4}
        />

        {/* Floating Spices Around the Handi */}
        <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.0}>
          <StarAnise position={[-1.8, 1.4, 0.4]} rotationSpeed={0.8} />
          <StarAnise position={[1.9, 0.8, -0.6]} rotationSpeed={0.6} />
          <CardamomPod position={[-1.4, -0.2, 1.2]} />
          <CardamomPod position={[1.5, 1.8, 0.2]} />
          <CinnamonStick position={[1.7, -0.3, 0.8]} rotation={[0.4, 0.2, 0.6]} />
          <CinnamonStick position={[-1.6, 1.6, -0.8]} rotation={[-0.3, 0.5, 0.2]} />
        </Float>

        {/* Main 3D Royal Handi */}
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
          <RoyalHandiModel />
          <SteamParticles intensity={steamIntensity} />
        </Float>

        {/* Ground Floor Shadow */}
        <ContactShadows
          position={[0, -0.65, 0]}
          opacity={0.35}
          scale={6.5}
          blur={2.0}
          far={3}
          color="#451a03"
        />

        {/* 360 Orbit Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
          rotateSpeed={0.7}
        />
      </Canvas>

      {/* Floating Interactive Badge (Overlay UI) */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/90 text-xs text-stone-800 font-bold shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Interactive 3D Dish View</span>
        </div>
        <p className="text-[11px] text-stone-500 font-medium pl-1 hidden sm:block">
          Drag to inspect 360° · Dum Pukht Lamb Handi
        </p>
      </div>

      {/* Control Dials (Ambiance & Steam) */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 text-xs shadow-lg">
        <span className="text-[11px] text-stone-500 font-bold px-1.5 hidden sm:inline">Lighting:</span>
        <button
          onClick={() => setLightingMode('natural')}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
            lightingMode === 'natural'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'hover:bg-stone-100 text-stone-600'
          }`}
        >
          Studio
        </button>
        <button
          onClick={() => setLightingMode('golden')}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
            lightingMode === 'golden'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'hover:bg-stone-100 text-stone-600'
          }`}
        >
          Golden
        </button>
        <button
          onClick={() => setLightingMode('evening')}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
            lightingMode === 'evening'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'hover:bg-stone-100 text-stone-600'
          }`}
        >
          Amber
        </button>

        <div className="h-4 w-px bg-stone-200 mx-1 hidden sm:block" />

        <button
          onClick={() => setSteamIntensity(prev => (prev > 0.2 ? 0 : 1.1))}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all hidden sm:block ${
            steamIntensity > 0.2
              ? 'bg-stone-100 text-stone-800 border border-stone-200'
              : 'bg-stone-50 text-stone-400'
          }`}
        >
          {steamIntensity > 0.2 ? '♨ Steam On' : '♨ Steam Off'}
        </button>
      </div>
    </div>
  );
}
