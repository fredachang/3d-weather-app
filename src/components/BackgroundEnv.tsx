import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Loader } from "@react-three/drei";
import * as THREE from "three";
import { ReactNode, Suspense, useRef, useState } from "react";
import { CurrentWeatherData, ForecastWeatherData } from "../Api";
import { DrapePlant } from "./RoomObjects/DrapePlant";
import { Willow } from "./RoomObjects/Willow";
import { PaperPotFlower } from "./RoomObjects/PaperPotFlower";
import { GluedPoster } from "./RoomObjects/GluedPosterv2";
import { PosterForecast } from "./RoomObjects/PosterForecast";
import { RoomWithIvy } from "./RoomObjects/RoomWithIvy";
const scaleArray = (scale: number) => [scale, scale, scale];

const loaderStyles = {
  container: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    backgroundColor: "white",
    borderRadius: "10%",
  },
  bar: {
    backgroundColor: "black",
    height: "50px",
  },
  data: {
    color: "white",
    fontSize: "20px",
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
  forecastWeather: ForecastWeatherData | null;
}

const lightColours = {
  warmYellow: "rgb(247, 191, 126)",
  lightBlue: "rgb(171, 203, 255)",
};

export function BackgroundEnv(props: Props) {
  const { currentWeather, forecastWeather } = props;
  const [showForecast, setShowForecast] = useState<boolean>(false);

  const handleShowForecast = () => {
    setShowForecast(true);
  };
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
            <RoomWithIvy scale={2} position={[-0.5, 0.2, -0.4]} />
            <Willow
              staticScale={scaleArray(4)}
              hoverScale={scaleArray(4.5 * 1.1)}
              initialPosition={[2.5, -3.5, 0]}
            />

            <PaperPotFlower
              staticScale={scaleArray(4)}
              hoverScale={scaleArray(4.5 * 1.1)}
              initialPosition={[-4.5, -2.8, 0]}
            />

            <DrapePlant
              staticScale={scaleArray(3)}
              hoverScale={scaleArray(3 * 1.1)}
              initialPosition={[1, 3.6, 0]}
            />

            <GluedPoster
              handleShowForecast={handleShowForecast}
              currentWeather={currentWeather}
              staticScale={scaleArray(2)}
              hoverScale={scaleArray(2 * 1.1)}
              initialPosition={[-4, 1, 0]}
            />
            {showForecast && (
              <PosterForecast
                forecastWeather={forecastWeather}
                staticScale={scaleArray(2)}
                hoverScale={scaleArray(2 * 1.1)}
                initialPosition={[4.5, 1, 0]}
              />
            )}
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
