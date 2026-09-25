"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  type AgentAvatarProfile,
  createDefaultAgentAvatarProfile,
} from "@/lib/avatars/profile";
import { RunningAvatarLoader } from "@/features/agents/components/RunningAvatarLoader";

const PreviewFigure = ({
  profile,
  onFirstFrame,
}: {
  profile: AgentAvatarProfile;
  onFirstFrame: () => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const reportedReadyRef = useRef(false);

  useEffect(() => {
    reportedReadyRef.current = false;
  }, [profile]);

  useFrame((state) => {
    if (!reportedReadyRef.current) {
      reportedReadyRef.current = true;
      onFirstFrame();
    }
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.35 + 0.25;
  });

  const skin = profile.body.skinTone;
  const topColor = profile.clothing.topColor;
  const bottomColor = profile.clothing.bottomColor;
  const shoeColor = profile.clothing.shoesColor;
  const hairColor = profile.hair.color;
  const accessoryColor = topColor;
  const sleeveColor = profile.clothing.topStyle === "jacket" ? "#dbe4ff" : topColor;
  const cuffColor = profile.clothing.topStyle === "hoodie" ? "#d1d5db" : sleeveColor;

  return (
    <group ref={groupRef} position={[0, -0.72, 0]} scale={[1.45, 1.45, 1.45]}>
      {/* Soft Ground Shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.24, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
      </mesh>

      {/* Smooth Backpack */}
      {profile.accessories.backpack ? (
        <group position={[0, 0.31, -0.09]}>
          <mesh>
            <capsuleGeometry args={[0.065, 0.12, 16, 16]} />
            <meshStandardMaterial color={accessoryColor} roughness={0.5} />
          </mesh>
          <mesh position={[-0.05, 0.02, 0.04]} rotation={[0, 0, 0]}>
            <capsuleGeometry args={[0.008, 0.14, 8, 8]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
          </mesh>
          <mesh position={[0.05, 0.02, 0.04]} rotation={[0, 0, 0]}>
            <capsuleGeometry args={[0.008, 0.14, 8, 8]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
          </mesh>
        </group>
      ) : null}

      {/* Right Leg */}
      <group position={[-0.05, 0.12, 0]}>
        {profile.clothing.bottomStyle === "shorts" ? (
          <>
            <mesh position={[0, 0.03, 0]}>
              <capsuleGeometry args={[0.032, 0.05, 16, 16]} />
              <meshStandardMaterial color={bottomColor} roughness={0.6} />
            </mesh>
            <mesh position={[0, -0.035, 0]}>
              <capsuleGeometry args={[0.028, 0.05, 16, 16]} />
              <meshStandardMaterial color={skin} roughness={0.7} />
            </mesh>
          </>
        ) : (
          <mesh position={[0, 0, 0]}>
            <capsuleGeometry args={[0.032, 0.11, 16, 16]} />
            <meshStandardMaterial color={bottomColor} roughness={0.6} />
          </mesh>
        )}
        <mesh position={[0, -0.09, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.032, 0.06, 16, 16]} />
          <meshStandardMaterial color={shoeColor} roughness={0.4} />
        </mesh>
      </group>

      {/* Left Leg */}
      <group position={[0.05, 0.12, 0]}>
        {profile.clothing.bottomStyle === "shorts" ? (
          <>
            <mesh position={[0, 0.03, 0]}>
              <capsuleGeometry args={[0.032, 0.05, 16, 16]} />
              <meshStandardMaterial color={bottomColor} roughness={0.6} />
            </mesh>
            <mesh position={[0, -0.035, 0]}>
              <capsuleGeometry args={[0.028, 0.05, 16, 16]} />
              <meshStandardMaterial color={skin} roughness={0.7} />
            </mesh>
          </>
        ) : (
          <mesh position={[0, 0, 0]}>
            <capsuleGeometry args={[0.032, 0.11, 16, 16]} />
            <meshStandardMaterial color={bottomColor} roughness={0.6} />
          </mesh>
        )}
        <mesh position={[0, -0.09, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.032, 0.06, 16, 16]} />
          <meshStandardMaterial color={shoeColor} roughness={0.4} />
        </mesh>
      </group>

      {/* Smooth Torso / Body */}
      <mesh position={[0, 0.29, 0]}>
        <capsuleGeometry args={[0.092, 0.12, 24, 24]} />
        <meshStandardMaterial color={topColor} roughness={0.6} />
      </mesh>

      {/* Hoodie Details */}
      {profile.clothing.topStyle === "hoodie" ? (
        <>
          <mesh position={[0, 0.38, -0.04]} rotation={[0.4, 0, 0]}>
            <torusGeometry args={[0.075, 0.024, 16, 24]} />
            <meshStandardMaterial color={topColor} roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.23, 0.075]} rotation={[0, 0, 0]}>
            <capsuleGeometry args={[0.024, 0.06, 16, 16]} />
            <meshStandardMaterial color={cuffColor} roughness={0.5} />
          </mesh>
        </>
      ) : null}

      {/* Jacket Details */}
      {profile.clothing.topStyle === "jacket" ? (
        <>
          <mesh position={[0, 0.29, 0.02]}>
            <capsuleGeometry args={[0.096, 0.115, 24, 24]} />
            <meshStandardMaterial color="#1f2937" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.29, 0.08]} rotation={[0, 0, 0]}>
            <capsuleGeometry args={[0.012, 0.16, 12, 12]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
        </>
      ) : null}

      {/* Right Arm */}
      <group position={[-0.13, 0.3, 0]}>
        <mesh position={[0, -0.07, 0]}>
          <capsuleGeometry args={[0.026, 0.12, 16, 16]} />
          <meshStandardMaterial color={sleeveColor} roughness={0.6} />
        </mesh>
        {profile.clothing.topStyle === "hoodie" ? (
          <mesh position={[0, -0.13, 0]}>
            <torusGeometry args={[0.028, 0.008, 12, 16]} />
            <meshStandardMaterial color={cuffColor} roughness={0.5} />
          </mesh>
        ) : null}
        <mesh position={[0, -0.155, 0]}>
          <sphereGeometry args={[0.026, 16, 16]} />
          <meshStandardMaterial color={skin} roughness={0.7} />
        </mesh>
      </group>

      {/* Left Arm */}
      <group position={[0.13, 0.3, 0]}>
        <mesh position={[0, -0.07, 0]}>
          <capsuleGeometry args={[0.026, 0.12, 16, 16]} />
          <meshStandardMaterial color={sleeveColor} roughness={0.6} />
        </mesh>
        {profile.clothing.topStyle === "hoodie" ? (
          <mesh position={[0, -0.13, 0]}>
            <torusGeometry args={[0.028, 0.008, 12, 16]} />
            <meshStandardMaterial color={cuffColor} roughness={0.5} />
          </mesh>
        ) : null}
        <mesh position={[0, -0.155, 0]}>
          <sphereGeometry args={[0.026, 16, 16]} />
          <meshStandardMaterial color={skin} roughness={0.7} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 0.41, 0]}>
        <cylinderGeometry args={[0.032, 0.038, 0.05, 20]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>

      {/* Smooth Head */}
      <mesh position={[0, 0.51, 0]} scale={[1, 1.06, 0.96]}>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>

      {/* Smooth Hair Styles */}
      {profile.hair.style === "short" ? (
        <mesh position={[0, 0.545, -0.008]} scale={[1.04, 1.05, 1.04]}>
          <sphereGeometry args={[0.091, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.85]} />
          <meshStandardMaterial color={hairColor} roughness={0.75} />
        </mesh>
      ) : null}

      {profile.hair.style === "parted" ? (
        <group position={[0, 0.545, 0]}>
          <mesh position={[0, 0, -0.008]} scale={[1.04, 1.05, 1.04]}>
            <sphereGeometry args={[0.091, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.85]} />
            <meshStandardMaterial color={hairColor} roughness={0.75} />
          </mesh>
          <mesh position={[-0.03, 0.03, 0.055]} rotation={[0.2, 0, -0.3]}>
            <capsuleGeometry args={[0.016, 0.055, 16, 16]} />
            <meshStandardMaterial color={hairColor} roughness={0.75} />
          </mesh>
        </group>
      ) : null}

      {profile.hair.style === "spiky" ? (
        <group position={[0, 0.545, 0]}>
          <mesh position={[0, 0, -0.008]} scale={[1.03, 1.03, 1.03]}>
            <sphereGeometry args={[0.091, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.85]} />
            <meshStandardMaterial color={hairColor} roughness={0.75} />
          </mesh>
          <mesh position={[-0.038, 0.065, 0.025]} rotation={[-0.2, 0, -0.35]}>
            <coneGeometry args={[0.022, 0.065, 16]} />
            <meshStandardMaterial color={hairColor} roughness={0.75} />
          </mesh>
          <mesh position={[0, 0.08, 0.015]} rotation={[-0.15, 0, 0]}>
            <coneGeometry args={[0.026, 0.075, 16]} />
            <meshStandardMaterial color={hairColor} roughness={0.75} />
          </mesh>
          <mesh position={[0.038, 0.065, 0.025]} rotation={[-0.2, 0, 0.35]}>
            <coneGeometry args={[0.022, 0.065, 16]} />
            <meshStandardMaterial color={hairColor} roughness={0.75} />
          </mesh>
        </group>
      ) : null}

      {profile.hair.style === "bun" ? (
        <group position={[0, 0.545, 0]}>
          <mesh position={[0, 0, -0.008]} scale={[1.04, 1.05, 1.04]}>
            <sphereGeometry args={[0.091, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.85]} />
            <meshStandardMaterial color={hairColor} roughness={0.75} />
          </mesh>
          <mesh position={[0, 0.075, -0.055]}>
            <sphereGeometry args={[0.038, 20, 20]} />
            <meshStandardMaterial color={hairColor} roughness={0.75} />
          </mesh>
        </group>
      ) : null}

      {/* Smooth Accessories */}
      {profile.accessories.hatStyle === "cap" ? (
        <group position={[0, 0.56, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.095, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
            <meshStandardMaterial color={accessoryColor} roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.01, 0.075]} rotation={[0.2, 0, 0]}>
            <cylinderGeometry args={[0.065, 0.07, 0.008, 24, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color={accessoryColor} roughness={0.6} />
          </mesh>
        </group>
      ) : null}

      {profile.accessories.hatStyle === "beanie" ? (
        <mesh position={[0, 0.555, 0]} scale={[1.05, 1.14, 1.05]}>
          <sphereGeometry args={[0.093, 24, 24, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
          <meshStandardMaterial color={accessoryColor} roughness={0.9} />
        </mesh>
      ) : null}

      {profile.accessories.headset ? (
        <group position={[0, 0.515, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.102, 0.008, 12, 32, Math.PI]} />
            <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[-0.098, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.024, 0.024, 0.018, 18]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
          <mesh position={[0.098, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.024, 0.024, 0.018, 18]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
        </group>
      ) : null}

      {/* Smooth Glossy Eyes */}
      <group position={[-0.035, 0.515, 0.082]}>
        <mesh>
          <sphereGeometry args={[0.013, 16, 16]} />
          <meshStandardMaterial color="#111827" roughness={0.2} />
        </mesh>
        <mesh position={[0.003, 0.003, 0.008]}>
          <sphereGeometry args={[0.004, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
      <group position={[0.035, 0.515, 0.082]}>
        <mesh>
          <sphereGeometry args={[0.013, 16, 16]} />
          <meshStandardMaterial color="#111827" roughness={0.2} />
        </mesh>
        <mesh position={[0.003, 0.003, 0.008]}>
          <sphereGeometry args={[0.004, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Glasses */}
      {profile.accessories.glasses ? (
        <group position={[0, 0.515, 0.088]}>
          <mesh position={[-0.035, 0, 0]}>
            <torusGeometry args={[0.02, 0.0028, 12, 24]} />
            <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.035, 0, 0]}>
            <torusGeometry args={[0.02, 0.0028, 12, 24]} />
            <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.002, 0.002, 0.026, 8]} />
            <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ) : null}

      {/* Smooth Smile */}
      <mesh position={[0, 0.472, 0.085]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.0035, 0.018, 12, 12]} />
        <meshStandardMaterial color="#c2410c" roughness={0.6} />
      </mesh>
    </group>
  );
};

export const AgentAvatarPreview3D = ({
  profile,
  className = "",
}: {
  profile: AgentAvatarProfile | null | undefined;
  className?: string;
}) => {
  const resolvedProfile = useMemo(
    () => profile ?? createDefaultAgentAvatarProfile("preview"),
    [profile]
  );
  const profileKey = useMemo(() => JSON.stringify(resolvedProfile), [resolvedProfile]);
  const [readyProfileKey, setReadyProfileKey] = useState<string | null>(null);
  const isReady = readyProfileKey === profileKey;

  return (
    <div className={`relative ${className}`}>
      {!isReady ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#070b16] text-white/70">
          <RunningAvatarLoader size={26} trackWidth={72} label="Loading avatar..." />
        </div>
      ) : null}
      <Canvas key={profileKey} camera={{ position: [0, 0.7, 2.5], fov: 34 }}>
        <color attach="background" args={["#070b16"]} />
        <ambientLight intensity={1.4} />
        <directionalLight position={[3, 4, 5]} intensity={2.4} />
        <directionalLight position={[-4, 2, 3]} intensity={0.9} color="#89a6ff" />
        <PreviewFigure
          profile={resolvedProfile}
          onFirstFrame={() => {
            setReadyProfileKey(profileKey);
          }}
        />
        <Environment preset="city" />
        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={1.8} minPolarAngle={1.1} />
      </Canvas>
    </div>
  );
};
