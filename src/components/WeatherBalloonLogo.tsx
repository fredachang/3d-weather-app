import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";

export function WeatherBalloonLogo(props) {
  const { nodes, materials } = useGLTF("/Models/weather_balloon.gltf");

  const rotatingBalloon = React.useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    // Rotation
    const rotationSpeed = props.rotationSpeed || 0.2; // Default rotation speed
    const rotation = elapsedTime * rotationSpeed;
    rotatingBalloon.current.rotation.y = rotation;

    // Floating Animation
    const floatingAmplitude = 0.4; // Adjust the amplitude of the floating animation
    const floatingSpeed = 1; // Adjust the speed of the floating animation

    const yPosition = Math.sin(elapsedTime * floatingSpeed) * floatingAmplitude;

    rotatingBalloon.current.position.y = yPosition;
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

useGLTF.preload("/Models/weather_balloon.gltf");
