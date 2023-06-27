import { animated, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";

interface Props {
  staticScale: number[];
  hoverScale: number[];
}

export function CottonFlower(props: Props) {
  const { staticScale, hoverScale } = props;
  const { nodes, materials } = useGLTF("/Models/cotton_flower.gltf");
  const { size, viewport } = useThree();

  const aspect = size.width / viewport.width;

  const [spring, set] = useSpring(() => ({
    scale: staticScale,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    config: { friction: 10 },
  }));

  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) =>
      set({
        position: [x / aspect, -y / aspect, 0],
        // rotation: [y / aspect, x / aspect, 0],
      }),
    onHover: ({ hovering }) =>
      set({ scale: hovering ? hoverScale : staticScale }),
  });

  return (
    <animated.group {...props} {...spring} {...bind()} dispose={null}>
      <group rotation={[Math.PI / 2, 0, Math.PI]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cotton_1.geometry}
          material={materials.wood_procedural_bumped}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cotton_2.geometry}
          material={materials["cotton_leaf.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cotton_3.geometry}
          material={materials.cotton_leaf}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cotton_flowers.geometry}
        material={materials.cotton_flower}
        position={[-0.018, 0.324, 0.017]}
        rotation={[Math.PI / 2, 0, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.vaze002.geometry}
        material={materials.ceramic_bumped_grey}
        rotation={[Math.PI / 2, 0, Math.PI]}
      />
    </animated.group>
  );
}

useGLTF.preload("/Models/cotton_flower.gltf");
