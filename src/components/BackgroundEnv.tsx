import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { Door } from "./Door";
import { ReactNode, useRef } from "react";
import { Poster } from "./Poster";
import { CurrentWeatherData } from "../Api";
import { CalatheaTest } from "./CalatheaTest";
import { DrapePlant } from "./DrapePlant";

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
function Rig({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        (state.mouse.x * Math.PI) / 60,
        0.03
      );

      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        (state.mouse.y * Math.PI) / 60,
        0.03
      );
    }
  });

  return <group ref={ref}>{children}</group>;
}

interface Props {
  currentWeather: CurrentWeatherData | null;
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
        <Door scale={1.8} position={[-2, -0.2, -0.4]} />

        <DrapePlant
          staticScale={scaleArray(3)}
          hoverScale={scaleArray(3 * 1.1)}
          initialPosition={[1, 4, 0]}
        />

        <CalatheaTest
          staticScale={scaleArray(3)}
          hoverScale={scaleArray(3 * 1.1)}
          initialPosition={[1, -4, 0]}
        />

        <Poster
          currentWeather={currentWeather}
          staticScale={scaleArray(1)}
          hoverScale={scaleArray(1 * 1.1)}
          initialPosition={[-2, 1, 0]}
        />
      </Rig>
    </Canvas>
  );
}
