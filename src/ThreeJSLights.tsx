import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";

export const RectArealightWithHelper = ({
  position,
  color,
  intensity,
  width,
  height,
}: {
  position: [number, number, number];
  color: string;
  intensity: number;
  width: number;
  height: number;
}) => {
  const { scene } = useThree();

  RectAreaLightUniformsLib.init();

  const rectLight = new THREE.RectAreaLight(color, intensity, width, height);
  rectLight.position.set(position[0], position[1], position[2]);
  scene.add(rectLight);
  scene.add(new RectAreaLightHelper(rectLight));

  return null;
};

export const DirLightWithHelper = ({
  position,
  color,
  intensity,
}: {
  position: [number, number, number];
  color: string;
  intensity: number;
}) => {
  const { scene } = useThree();

  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(position[0], position[1], position[2]);
  scene.add(light);
  const helper = new THREE.DirectionalLightHelper(light, 5);
  scene.add(helper);

  return null;
};

export const PointLightWithHelper = ({
  position,
  color,
  intensity,
  distance,
  decay,
}: {
  position: [number, number, number];
  color: string;
  intensity: number;
  distance: number;
  decay: number; //amount the light dims along the distance default is 2
}) => {
  const { scene } = useThree();

  const pointLight = new THREE.PointLight(color, intensity, distance, decay);
  pointLight.position.set(position[0], position[1], position[2]);
  scene.add(pointLight);

  const sphereSize = 1;
  const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
  scene.add(pointLightHelper);

  return null;
};

export const SpotLightWithHelper = ({
  position,
  color,
  intensity,
  distance,
  penumbra, //0 - 1
  angle,
  decay,
}: {
  position: [number, number, number];
  color: string;
  intensity: number;
  distance: number;
  decay: number; //amount the light dims along the distance
  angle: number;
  penumbra: number;
}) => {
  const { scene } = useThree();

  const spotLight = new THREE.SpotLight(
    color,
    intensity,
    distance,
    angle, //upper bound is Math.PI/2
    penumbra, //0-1
    decay
  );
  spotLight.position.set(position[0], position[1], position[2]);
  scene.add(spotLight);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);

  return null;
};
