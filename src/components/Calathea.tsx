import { animated, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";

interface Props {
  staticScale: number[];
  hoverScale: number[];
}

export function Calathea(props: Props) {
  const { staticScale, hoverScale } = props;
  const { nodes, materials } = useGLTF("/Models/calathea.gltf");
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.calathea_Leaves.geometry}
        material={materials.calathea_orbifolia_01}
        position={[-0.014, 0.186, 0]}
        rotation={[0, -0.396, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ceramic_pot.geometry}
        material={materials["Ceramic Glazed"]}
        position={[0, 0.111, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plastic_pot.geometry}
        material={materials.Plastic}
        position={[0.001, 0.19, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Soil.geometry}
        material={materials["Procedural Dirt"]}
        position={[-0.001, 0.187, -0.002]}
      />
    </animated.group>
  );
}

useGLTF.preload("/Models/calathea.gltf");
