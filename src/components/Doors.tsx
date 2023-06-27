import { animated, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";

export function Doors(props) {
  const { nodes, materials } = useGLTF("/Models/door.gltf");

  return (
    <animated.group {...props} dispose={null}>
      <group position={[1.973, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.door_frame.geometry}
          material={materials["steel door"]}
          position={[0, -1.55, -0.053]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.top_mirror.geometry}
          material={materials.glass}
          position={[0, 0.945, -0.032]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bottom_mirro.geometry}
          material={materials.glass}
          position={[0, -0.846, -0.032]}
        />
      </group>
      <group position={[6.192, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.door_frame001.geometry}
          material={materials["steel door"]}
          position={[-2.114, -1.55, -0.004]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.top_mirror001.geometry}
          material={materials.glass}
          position={[-2.114, 0.945, -0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bottom_mirro001.geometry}
          material={materials.glass}
          position={[-2.114, -0.846, -0.019]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.door_frame_1.geometry}
        material={materials["steel door"]}
        position={[0, -1.55, -0.053]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.top_mirror_1.geometry}
        material={materials.glass}
        position={[0, 0.945, -0.032]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottom_mirro_1.geometry}
        material={materials.glass}
        position={[0, -0.846, -0.032]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.door_frame001_1.geometry}
        material={materials["steel door"]}
        position={[-2.114, -1.55, -0.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.top_mirror001_1.geometry}
        material={materials.glass}
        position={[-2.114, 0.945, -0.019]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottom_mirro001_1.geometry}
        material={materials.glass}
        position={[-2.114, -0.846, -0.019]}
      />
    </animated.group>
  );
}

useGLTF.preload("/Models/door.gltf");
