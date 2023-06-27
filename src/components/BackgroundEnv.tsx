import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Doors } from "./Doors";
import { useRef } from "react";
import { CottonFlower, WeepingWillow } from "./WeepingWillow";
import { Cactus } from "./Cactus";
import { Calathea } from "./Calathea";

const scaleArray = (scale: number) => [scale, scale, scale];

function getWeatherHDR(currentWeather?: string) {
  switch (currentWeather) {
    case "Clear":
      return "clear.hdr";
    case "Clouds":
      return "cloudy.hdr";
    case "snow":
      return "snow.hdr";
    default:
      return "gloomy.hdr";
  }
}

function Rig({ children }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      (state.mouse.x * Math.PI) / 60,
      0.03
    );
    //20 controls how much it sways, 0.05 is the delay/speed
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      (state.mouse.y * Math.PI) / 60,
      0.03
    );
  });
  return <group ref={ref}>{children}</group>;
}

export function BackgroundEnv(props: Props) {
  const { currentWeather } = props;

  return (
    <Canvas>
      <Environment
        files={getWeatherHDR(currentWeather?.condition)}
        background
        blur={0.01}
      />
      <axesHelper args={[5]} />
      {/* <OrbitControls enableZoom={false} /> */}
      <Rig>
        <Doors scale={1.8} position={[-2, -0.2, -0.4]} />
        <CottonFlower
          staticScale={scaleArray(5.5)}
          hoverScale={scaleArray(6)}
        />
        <Calathea staticScale={scaleArray(5)} hoverScale={scaleArray(6)} />
      </Rig>
    </Canvas>
  );
}
