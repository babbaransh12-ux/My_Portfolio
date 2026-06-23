import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO, Bloom } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─── Tech logos ─────────────────────────────────────────── */
const imageUrls = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "https://cdn.simpleicons.org/scikitlearn/F89939",
  "https://cdn.simpleicons.org/pandas/150458",
  "https://cdn.simpleicons.org/matplotlib/11557C",
];

/* ─── Convert SVG/image URL → THREE.Texture via canvas ───── */
function loadTextureFromUrl(url: string): Promise<THREE.CanvasTexture> {
  return new Promise((resolve) => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Dark rounded background
      ctx.fillStyle = "#111827";
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, size / 2);
      ctx.fill();

      // Subtle inner glow ring
      const gradient = ctx.createRadialGradient(
        size / 2, size / 2, size * 0.3,
        size / 2, size / 2, size * 0.5
      );
      gradient.addColorStop(0, "rgba(94,234,212,0)");
      gradient.addColorStop(1, "rgba(94,234,212,0.12)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();

      // Logo centred
      const padding = size * 0.18;
      ctx.drawImage(img, padding, padding, size - padding * 2, size - padding * 2);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      resolve(tex);
    };
    img.onerror = () => {
      // fallback: solid accent circle
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#5eead4";
      ctx.font = `bold ${size * 0.45}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("?", size / 2, size / 2);
      const tex = new THREE.CanvasTexture(canvas);
      resolve(tex);
    };
    img.src = url;
  });
}

const sphereGeometry = new THREE.SphereGeometry(1, 48, 48);

/* 36 balls — 3 per logo (12 logos) for dense coverage */
const NUM_BALLS = 36;
const spheres = Array.from({ length: NUM_BALLS }, (_, i) => ({
  logoIndex: i % imageUrls.length,
  scale: [0.72, 0.88, 1.0, 0.78, 0.95][i % 5],
}));

/* ─── Single sphere ───────────────────────────────────────── */
type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!api.current) return;
    delta = Math.min(0.05, delta);

    // Slow auto-rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.1;
    }

    if (!isActive) return;

    // Gravity-like centripetal force pulling balls to centre
    const pos = api.current.translation();
    const impulse = vec.set(pos.x, pos.y, pos.z)
      .normalize()
      .multiplyScalar(-60 * delta * scale);
    api.current.applyImpulse(impulse, true);
  });

  const r = THREE.MathUtils.randFloatSpread;

  return (
    <RigidBody
      linearDamping={0.45}
      angularDamping={0.1}
      friction={0.05}
      restitution={0.35}
      position={[r(22), r(22) - 30, r(18) - 8]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
      />
    </RigidBody>
  );
}

/* ─── Mouse / touch attractor ─────────────────────────────── */
function Pointer({ isActive }: { isActive: boolean }) {
  const ref = useRef<RapierRigidBody>(null);
  const vec = useRef(new THREE.Vector3());

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    vec.current.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.18
    );
    ref.current.setNextKinematicTranslation(vec.current);
  });

  return (
    <RigidBody
      position={[200, 200, 200]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[3.5]} />
    </RigidBody>
  );
}

/* ─── Main Component ──────────────────────────────────────── */
const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [textures, setTextures] = useState<THREE.CanvasTexture[]>([]);

  /* Load all SVG textures via canvas */
  useEffect(() => {
    Promise.all(imageUrls.map(loadTextureFromUrl)).then(setTextures);
  }, []);

  /* Activate physics when user scrolls to techstack section */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: ".techstack",
      start: "top 95%",
      end: "bottom 5%",
      onToggle: (self) => {
        setIsActive(self.isActive);
      },
    });
    return () => {
      trigger.kill();
    };
  }, []);

  /* Premium glass materials — one per logo */
  const materials = useMemo(() => {
    if (textures.length === 0) return [];
    return textures.map(
      (tex) =>
        new THREE.MeshPhysicalMaterial({
          map: tex,
          // Glass / clearcoat
          metalness: 0.0,
          roughness: 0.08,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          // Iridescence shimmer
          iridescence: 0.6,
          iridescenceIOR: 1.5,
          iridescenceThicknessRange: [100, 400],
          // Subtle transparency
          transmission: 0.08,
          thickness: 0.4,
          // Emissive glow
          emissive: new THREE.Color("#5eead4"),
          emissiveMap: tex,
          emissiveIntensity: 0.18,
          // Env
          envMapIntensity: 1.8,
        })
    );
  }, [textures]);

  if (textures.length === 0) {
    return (
      <div className="techstack">
        <h2>My Techstack</h2>
      </div>
    );
  }

  return (
    <div className="techstack">
      <h2>My Techstack</h2>

      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.8,
        }}
        camera={{ position: [0, 0, 22], fov: 30, near: 0.5, far: 120 }}
        className="tech-canvas"
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <spotLight
          position={[15, 25, 20]}
          penumbra={0.8}
          angle={0.25}
          color="#ffffff"
          intensity={80}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight
          position={[-20, -10, 15]}
          penumbra={1}
          angle={0.3}
          color="#7c3aed"
          intensity={40}
        />
        <directionalLight position={[0, 8, -6]} intensity={1.5} color="#5eead4" />
        <pointLight position={[0, 0, 8]} intensity={20} color="#a78bfa" decay={2} />

        <Physics gravity={[0, 0, 0]} timeStep="vary">
          <Pointer isActive={isActive} />
          {spheres.map((s, i) => {
            const mat = materials[s.logoIndex];
            if (!mat) return null;
            return (
              <SphereGeo
                key={i}
                scale={s.scale}
                material={mat}
                isActive={isActive}
              />
            );
          })}
        </Physics>

        <Environment
          files={`${import.meta.env.BASE_URL}models/char_enviorment.hdr`}
          environmentIntensity={1.2}
          environmentRotation={[0, 4, 2]}
        />

        <EffectComposer enableNormalPass={false}>
          <N8AO color="#060918" aoRadius={2.5} intensity={1.4} />
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.5}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
