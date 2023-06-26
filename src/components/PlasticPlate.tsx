import { useGLTF } from "@react-three/drei";

export function PlasticPlate(props) {
  const { nodes, materials } = useGLTF("/PlasticPlatev3.gltf");

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials["Material.001"]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
      />
    </group>
  );
}

useGLTF.preload("/PlasticPlatev3.gltf");
