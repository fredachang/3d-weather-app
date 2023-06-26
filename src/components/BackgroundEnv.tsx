import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { PlasticPlate } from "./PlasticPlate";
import { useRef } from "react";
import * as THREE from "three";

function Rig({ children }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      (state.mouse.x * Math.PI) / 20,
      0.05
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      (state.mouse.y * Math.PI) / 20,
      0.05
    );
  });
  return <group ref={ref}>{children}</group>;
}

export function BackgroundEnv() {
  return (
    <Canvas>
      <Environment files="./public/sky.hdr" background blur={0.01} />
      <axesHelper args={[5]} />
      <OrbitControls enableZoom={false} />
      <Rig>
        <PlasticPlate position={[0, 0, 0]} scale={4.5} />
      </Rig>
    </Canvas>
  );
}
