import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { WeatherBalloonLogo } from "./WeatherBalloonLogo";

export function ThreeLogoCanvas() {
  return (
    <Canvas shadows>
      <Environment files="clear.hdr" />
      <WeatherBalloonLogo scale={300} />
    </Canvas>
  );
}
