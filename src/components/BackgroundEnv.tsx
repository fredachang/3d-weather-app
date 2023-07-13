import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Loader } from "@react-three/drei";
import * as THREE from "three";
import { ReactNode, Suspense, useRef } from "react";
import { Poster } from "./RoomObjects/Poster";
import { CurrentWeatherData } from "../Api";
import { DrapePlant } from "./RoomObjects/DrapePlant";
import { Room } from "./RoomObjects/Room";
import { Willow } from "./RoomObjects/Willow";
import { Calathea } from "./RoomObjects/Calathea";
const scaleArray = (scale: number) => [scale, scale, scale];

const loaderStyles = {
  container: {
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    backgroundColor: "red",
    borderRadius: "10%",
  },
  bar: {
    backgroundColor: "black",
    height: "50px",
  },
  data: {
    color: "black",
    fontSize: "30px",
  },
};

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

const lightColours = {
  warmYellow: "rgb(247, 191, 126)",
  lightBlue: "rgb(171, 203, 255)",
};

export function BackgroundEnv(props: Props) {
  const { currentWeather } = props;

  return (
    <>
      <Canvas>
        <Environment
          files={getWeatherHDR(currentWeather?.condition)}
          background
          blur={0.01}
        />
        <axesHelper args={[5]} />

        <ambientLight color={lightColours.warmYellow} intensity={0.3} />
        <hemisphereLight
          color={lightColours.lightBlue}
          groundColor={lightColours.warmYellow}
          intensity={0.6}
          position={[0, 5, 3]}
        />

        {/* <OrbitControls enableZoom={true} /> */}
        <Suspense fallback={null}>
          <Rig>
            <Room scale={2} position={[-0.5, 0.2, -0.4]} />
            <Willow
              staticScale={scaleArray(4)}
              hoverScale={scaleArray(4.5 * 1.1)}
              initialPosition={[-2, -4, 0]}
            />
            <DrapePlant
              staticScale={scaleArray(3)}
              hoverScale={scaleArray(3 * 1.1)}
              initialPosition={[1, 4, 0]}
            />
            <Calathea
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
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={loaderStyles.container}
        innerStyles={loaderStyles.inner}
        barStyles={loaderStyles.bar}
        dataStyles={loaderStyles.data}
        dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
      />
    </>
  );
}
