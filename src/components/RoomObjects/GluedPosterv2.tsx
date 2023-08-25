/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 GluedPosterv2.gltf --transform --types
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Object3DNode, useThree } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import { useGesture } from "@use-gesture/react";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { extend } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import GTPressuraMonoRegular from "../../assets/GTPressura.json";

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh;
  };
  materials: {
    ["Glued Poster  (baked)"]: THREE.MeshStandardMaterial;
  };
};

extend({ TextGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}

const fontColour = new THREE.Color("rgb(0, 0, 0)");
const checkForecastTileColour = new THREE.Color("rgb(0, 0, 0)");

export function GluedPoster(props: any) {
  const { nodes, materials } = useGLTF(
    "/GluedPosterv2-transformed.glb"
  ) as GLTFResult;

  const {
    staticScale,
    hoverScale,
    initialPosition,
    currentWeather,
    handleShowForecast,
  } = props;

  const [position1, setPosition1] = useLocalStorage<number[]>(
    "GluedPosterPos1",
    initialPosition
  );
  const [position2, setPosition2] =
    useLocalStorage<number[]>("GluedPosterPos2");

  useEffect(() => {
    const position1FromStorage = JSON.parse(
      localStorage.getItem("GluedPosterPos1") ?? ""
    );
    setPosition2(
      position1FromStorage === "" ? initialPosition : position1FromStorage
    );
  }, []);

  // const [cityNamePosition, setCityNamePosition] = useState<
  //   THREE.Vector3 | undefined
  // >(new THREE.Vector3(0, 0, 0));

  // useEffect(() => {
  //   const newPosition = new THREE.Vector3(position1[0], 0, 0);
  //   setCityNamePosition(newPosition);
  // }, [position1]);

  const { size, viewport } = useThree();

  const aspect = size.width / viewport.width;

  const [spring, set] = useSpring(() => ({
    scale: staticScale,
    position: position1,
    rotation: [0, 0, 0],
    config: { friction: 10 },
  }));

  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      const defaultPosition = position2 ? position2 : [0, 0, 0];
      const newPosition = [
        defaultPosition[0] + x / aspect,
        defaultPosition[1] - y / aspect,
        defaultPosition[2],
      ];

      set({ position: newPosition });
      setPosition1(newPosition);
    },
    onHover: ({ hovering }) =>
      set({ scale: hovering ? hoverScale : staticScale }),
  });

  const font = new FontLoader().parse(GTPressuraMonoRegular);

  const cityName = currentWeather?.name;

  const currentTemp = currentWeather?.temp;
  const currentCondition = currentWeather?.condition;
  const minTemp = currentWeather?.tempMin;
  const maxTemp = currentWeather?.tempMax;

  const tempString = currentTemp ? `Now ${currentTemp}` : "";
  const minTempString = currentTemp ? `Min ${minTemp}` : "";
  const maxTempString = currentTemp ? `Max ${maxTemp}` : "";
  const forecastString = currentTemp ? `Check forecast` : "";

  const fontSize = 0.06;

  return (
    <animated.group
      {...props}
      {...spring}
      {...bind()}
      dispose={null}
      rotation={[0, 0, 0.01]}
    >
      <mesh position={[-0.2, 0.55, 0.2]}>
        <textGeometry
          args={["Weather Report", { font, size: fontSize, height: 0 }]}
        />
        <meshBasicMaterial attach="material" color={fontColour} />
      </mesh>

      <mesh position={[-0.2, 0.4, 0.2]}>
        <textGeometry
          args={[cityName || "", { font, size: fontSize, height: 0 }]}
        />
        <meshBasicMaterial attach="material" color={fontColour} />
      </mesh>

      <mesh position={[-0.2, 0.3, 0.2]}>
        <textGeometry
          args={[currentCondition || "", { font, size: fontSize, height: 0 }]}
        />
        <meshBasicMaterial attach="material" color={fontColour} />
      </mesh>

      <mesh position={[-0.2, 0.15, 0.2]}>
        <textGeometry
          args={[tempString || "", { font, size: fontSize, height: 0 }]}
        />
        <meshBasicMaterial attach="material" color={fontColour} />
      </mesh>

      <mesh position={[-0.2, 0.05, 0.2]}>
        <textGeometry
          args={[minTempString, { font, size: fontSize, height: 0 }]}
        />
        <meshBasicMaterial attach="material" color={fontColour} />
      </mesh>

      <mesh position={[-0.2, -0.05, 0.2]}>
        <textGeometry
          args={[maxTempString, { font, size: fontSize, height: 0 }]}
        />
        <meshBasicMaterial attach="material" color={fontColour} />
      </mesh>

      <group onClick={handleShowForecast}>
        <mesh position={[-0.2, -0.3, 0.2]}>
          <textGeometry
            args={[forecastString, { font, size: fontSize, height: 0 }]}
          />
          <meshBasicMaterial attach="material" color={fontColour} />
        </mesh>

        {/* this plane is used to increase the clickable area for check forecast */}

        {currentTemp && (
          <mesh position={[0.1, -0.3, 0.2]}>
            <planeGeometry args={[0.6, 0.1]} />
            <meshBasicMaterial
              attach="material"
              color={checkForecastTileColour}
              transparent={true}
              opacity={0}
            />
          </mesh>
        )}
      </group>

      <mesh
        geometry={nodes.Plane.geometry}
        material={materials["Glued Poster  (baked)"]}
      />
    </animated.group>
  );
}

useGLTF.preload("/GluedPosterv2-transformed.glb");
