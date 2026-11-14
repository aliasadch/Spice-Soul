import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Model: Tandoori Platter
function TandooriPlatterMesh() {
  const group = useRef();
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* Sizzling Cast Iron Oval Skillet */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.4, 0.15, 32]} scale={[1.3, 1, 0.9]} />
        <meshStandardMaterial color="#262626" roughness={0.65} metalness={0.8} />
      </mesh>
      {/* Wooden Base Under-liner */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[1.65, 1.6, 0.12, 32]} scale={[1.35, 1, 0.95]} />
        <meshStandardMaterial color="#78350f" roughness={0.8} />
      </mesh>
      {/* Bed of Sizzling Charred Onions */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 24]} scale={[1.2, 0.8, 1]} />
        <meshStandardMaterial color="#854d0e" roughness={0.6} />
      </mesh>
      {/* Charred Seekh Kebabs */}
      {[-0.4, 0, 0.4].map((z, i) => (
        <group key={i} position={[0, 0.24, z]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.13, 0.13, 1.6, 16]} />
            <meshStandardMaterial color="#451a03" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <torusGeometry args={[0.135, 0.015, 8, 16]} />
            <meshStandardMaterial color="#171717" roughness={0.9} />
          </mesh>
        </group>
      ))}
      {/* Fresh Lemon Wedge */}
      <mesh position={[0.7, 0.2, 0.5]} rotation={[0.4, 0.8, 0.2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#facc15" roughness={0.3} />
      </mesh>
      {/* Coriander Sprig */}
      <mesh position={[-0.6, 0.22, -0.4]}>
        <sphereGeometry args={[0.15, 8, 8]} scale={[1, 0.2, 1.2]} />
        <meshStandardMaterial color="#16a34a" roughness={0.6} />
      </mesh>
    </group>
  );
}

// 3D Model: Truffle Garlic Naan
function TruffleNaanMesh() {
  const group = useRef();
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* White & Gold Porcelain Plate */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.6, 1.5, 0.08, 32]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.1} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <torusGeometry args={[1.55, 0.04, 16, 40]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} />
      </mesh>

      {/* Puffed Flatbread Naan */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2 + 0.1, 0, 0.2]} scale={[1.3, 1.8, 0.15]}>
        <sphereGeometry args={[0.8, 24, 24]} />
        <meshStandardMaterial color="#d97706" roughness={0.6} />
      </mesh>
      {/* Charred Tandoor Blisters */}
      {[
        [-0.3, 0.15, 0.2],
        [0.2, 0.18, -0.3],
        [-0.1, 0.17, -0.1],
        [0.4, 0.14, 0.3]
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} scale={[0.12, 0.04, 0.12]}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#271506" roughness={0.9} />
        </mesh>
      ))}
      {/* Truffle Oil Butter Glaze */}
      <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.9, 1.1, 1]}>
        <circleGeometry args={[0.65, 24]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.15} metalness={0.3} transparent opacity={0.65} />
      </mesh>
      {/* Green Parsley flakes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[(Math.sin(i) * 0.4), 0.17, (Math.cos(i) * 0.45)]}
          scale={[0.04, 0.01, 0.04]}
        >
          <sphereGeometry args={[1, 6, 6]} />
          <meshStandardMaterial color="#15803d" />
        </mesh>
      ))}
    </group>
  );
}

// 3D Model: Saffron Tres Leches Dessert
function DessertMesh() {
  const group = useRef();
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={group} position={[0, -0.1, 0]}>
      {/* Crystal Glass Dessert Dish */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.5, 0.8, 0.2, 32]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.1} metalness={0.2} transparent opacity={0.6} />
      </mesh>
      {/* Rich Saffron Milk Pool */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.3, 32]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} />
      </mesh>
      {/* Square Sponge Cake Block */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.2, 0.5, 1.2]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.7} />
      </mesh>
      {/* Whipped Saffron Cream Frosting */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[1.24, 0.12, 1.24]} />
        <meshStandardMaterial color="#fef9c3" roughness={0.3} />
      </mesh>
      {/* Edible 24K Gold Leaf */}
      <mesh position={[0, 0.63, 0]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.3]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.99} roughness={0.1} />
      </mesh>
      {/* Crushed Pistachio Dots */}
      {[-0.35, 0.35].map((x, idx) => (
        <mesh key={idx} position={[x, 0.62, 0.2]}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshStandardMaterial color="#4d7c0f" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// 3D Model: Johar Sunset Mocktail
function MocktailMesh() {
  const group = useRef();
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      {/* Marble Coaster */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.05, 32]} />
        <meshStandardMaterial color="#e7e5e4" metalness={0.2} roughness={0.3} />
      </mesh>
      {/* Frosted Tall Glass */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.55, 0.42, 1.9, 32, 1, true]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Lower Ruby Red Layer */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.47, 0.41, 0.95, 24]} />
        <meshStandardMaterial color="#be123c" roughness={0.2} transparent opacity={0.85} />
      </mesh>
      {/* Upper Glowing Orange Layer */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.52, 0.47, 0.75, 24]} />
        <meshStandardMaterial color="#f97316" roughness={0.2} transparent opacity={0.85} />
      </mesh>
      {/* Ice Cubes */}
      <mesh position={[0.1, 1.3, 0.1]} rotation={[0.4, 0.5, 0.2]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#e0f2fe" roughness={0.1} transparent opacity={0.6} />
      </mesh>
      {/* Lime Wheel Garnish */}
      <mesh position={[0.52, 1.85, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 16]} />
        <meshStandardMaterial color="#84cc16" roughness={0.3} />
      </mesh>
      {/* Straw */}
      <mesh position={[-0.15, 1.5, 0]} rotation={[0.15, 0, -0.15]}>
        <cylinderGeometry args={[0.03, 0.03, 1.6, 12]} />
        <meshStandardMaterial color="#292524" roughness={0.5} />
      </mesh>
    </group>
  );
}

// 3D Model: Handi Mesh (Reused for Showcase)
function HandiShowcaseMesh() {
  const group = useRef();
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={group} position={[0, -0.3, 0]}>
      {/* Polished Brass & Marble Charger */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.8, 1.7, 0.1, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Terracotta Handi Pot */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[1.1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshStandardMaterial color="#9a3412" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.9, 0.98, 0.2, 32]} />
        <meshStandardMaterial color="#ea580c" roughness={0.3} />
      </mesh>
      {/* Gravy */}
      <mesh position={[0, 0.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.85, 24]} />
        <meshStandardMaterial color="#991b1b" emissive="#7f1d1d" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

export default function DishViewer3D({ modelType = 'handi' }) {
  const renderDishMesh = () => {
    switch (modelType) {
      case 'platter':
      case 'bbq':
        return <TandooriPlatterMesh />;
      case 'naan':
        return <TruffleNaanMesh />;
      case 'dessert':
        return <DessertMesh />;
      case 'drink':
        return <MocktailMesh />;
      case 'handi':
      case 'karahi':
      case 'biryani':
      case 'steak':
      default:
        return <HandiShowcaseMesh />;
    }
  };

  return (
    <div className="relative w-full h-[360px] md:h-[430px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#faf7f0] to-[#ede5d6] border border-stone-200/90 shadow-md">
      <Canvas
        camera={{ position: [0, 1.8, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1.8} color="#fef3c7" />
        <directionalLight position={[3, 6, 4]} intensity={2.6} color="#ffffff" castShadow />
        <pointLight position={[-2, 2, -2]} intensity={1.2} color="#fbbf24" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          {renderDishMesh()}
        </Float>

        <ContactShadows position={[0, -0.6, 0]} opacity={0.3} scale={5} blur={2} far={2} color="#451a03" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
          rotateSpeed={0.8}
        />
      </Canvas>

      {/* Interactive Helper Text */}
      <div className="absolute bottom-3 left-3 text-[11px] text-stone-600 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-stone-200 shadow-xs font-medium">
        ⇄ Drag 360° to inspect details
      </div>
    </div>
  );
}
