import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    balloon: THREE.Mesh;
    rod: THREE.Mesh;
    rod_red: THREE.Mesh;
    box: THREE.Mesh;
  };
  materials: {
    ["Transparent balloon"]: THREE.MeshPhysicalMaterial;
    ["Metal.001"]: THREE.MeshStandardMaterial;
    Metal: THREE.MeshStandardMaterial;
  };
};

export function FloatingWeatherBalloon(props: any) {
  const { nodes, materials } = useGLTF(
    "/weather_balloon-transformed.glb"
  ) as GLTFResult;

  const rotatingBalloon = useRef<THREE.Object3D>(null!);
  const initialPosition = useRef<THREE.Vector3 | null>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    // Rotation
    const rotationSpeed = props.rotationSpeed || 0.2; // Default rotation speed
    const rotation = elapsedTime * rotationSpeed;
    rotatingBalloon.current!.rotation.y = rotation;

    // Floating Animation
    const floatingAmplitude = 0.4; // Adjust the amplitude of the floating animation
    const floatingSpeed = 1; // Adjust the speed of the floating animation

    if (!initialPosition.current) {
      // Store the initial position when it's not set
      initialPosition.current = rotatingBalloon.current!.position.clone();
    }

    const yPosition =
      initialPosition.current.y +
      Math.sin(elapsedTime * floatingSpeed) * floatingAmplitude;

    rotatingBalloon.current!.position.setY(yPosition);
  });

  return (
    <group {...props} dispose={null} ref={rotatingBalloon}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.balloon.geometry}
        material={materials["Transparent balloon"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rod.geometry}
        material={materials["Metal.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rod_red.geometry}
        material={materials.Metal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.box.geometry}
        material={materials["Metal.001"]}
      />
    </group>
  );
}

useGLTF.preload("/weather_balloon-transformed.glb");
