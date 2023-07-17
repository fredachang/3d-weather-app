/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 PhillipsTV.gltf --transform -types
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { Object3DNode, extend } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import jgs7 from "../../assets/jgs7_Regular.json";

type GLTFResult = GLTF & {
  nodes: {
    accordion: THREE.Mesh;
    base: THREE.Mesh;
    cable_cap: THREE.Mesh;
    cables: THREE.Mesh;
    Circle015: THREE.Mesh;
    Circle015_1: THREE.Mesh;
    logo: THREE.Mesh;
    logo_cap: THREE.Mesh;
    screem_cover: THREE.Mesh;
    speaker_mesh: THREE.Mesh;
    speaker_base: THREE.Mesh;
    speaker_mesh001: THREE.Mesh;
    speaker_base001: THREE.Mesh;
    Cylinder: THREE.Mesh;
    Cylinder001: THREE.Mesh;
  };
  materials: {
    ["black shiny plastic"]: THREE.MeshStandardMaterial;
    metal: THREE.MeshStandardMaterial;
    ["dark grey metal"]: THREE.MeshStandardMaterial;
    screen: THREE.MeshPhysicalMaterial;
    ["SVGMat.001"]: THREE.MeshStandardMaterial;
    ["black plastic.001"]: THREE.MeshStandardMaterial;
    ["black metal"]: THREE.MeshStandardMaterial;
  };
};

extend({ TextGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}

const font = new FontLoader().parse(jgs7);
const fontColour = new THREE.Color("#bef264");
const emissiveMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#50e2d9"),
  emissive: new THREE.Color("#404454"),
  emissiveIntensity: 3,
  roughness: 0.3,
  transparent: true,
  opacity: 0.2,
  metalness: 0.8,
});

export function TV(props: any) {
  const { nodes, materials } = useGLTF(
    "/PhillipsTV-transformed.glb"
  ) as GLTFResult;

  const { loading } = props;

  const loadingText = loading ? "Loading..." : "";
  return (
    <group {...props} dispose={null} rotation={[0, Math.PI / -1.2, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.accordion.geometry}
        material={materials["black shiny plastic"]}
        position={[0.11, 2.13, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.84}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.base.geometry}
          material={materials["black shiny plastic"]}
          position={[-0.17, 0, 0.49]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cable_cap.geometry}
          material={materials.metal}
          position={[-0.76, -0.34, -0.9]}
          rotation={[-1.72, -0.01, 0.09]}
          scale={0.01}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cables.geometry}
          material={materials.metal}
          position={[-0.7, -0.21, -0.2]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <group position={[0.47, 0, -0.04]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle015.geometry}
            material={materials["dark grey metal"]}
          />

          <mesh
            position={[0.95, 0, -0.1]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          >
            <textGeometry
              args={[loadingText, { font, size: 0.07, height: 0 }]}
            />
            <meshBasicMaterial attach="material" color={fontColour} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle015_1.geometry}
            material={loading ? emissiveMaterial : materials.screen}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.logo.geometry}
          material={materials["SVGMat.001"]}
          position={[0.46, 0.02, -0.63]}
          rotation={[0, 0.36, -Math.PI / 2]}
          scale={1.46}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.logo_cap.geometry}
          material={materials["black plastic.001"]}
          position={[0.24, 0.02, -0.65]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.22}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.screem_cover.geometry}
          material={materials["black shiny plastic"]}
          position={[0.47, 0, -0.04]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.speaker_mesh.geometry}
          material={materials["black metal"]}
          position={[0.32, -0.52, 0.31]}
          scale={0.13}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.speaker_base.geometry}
            material={materials["dark grey metal"]}
            position={[-0.02, -0.15, -0.01]}
            scale={1.1}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.speaker_mesh001.geometry}
          material={materials["black metal"]}
          position={[0.32, 0.51, 0.31]}
          rotation={[-Math.PI, 0, 0]}
          scale={0.13}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.speaker_base001.geometry}
            material={materials["dark grey metal"]}
            position={[-0.02, -0.15, -0.01]}
            scale={1.1}
          />
        </mesh>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials["black metal"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials["black metal"]}
      />
    </group>
  );
}

useGLTF.preload("/PhillipsTV-transformed.glb");
