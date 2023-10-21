import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useControls } from "leva";
import * as THREE from "three";

// Shaders
import "./shaders/BlobMaterial";

export default function Experience() {
    const planeMaterial = useRef();
    const sphereGeometry = useRef();

    const { uLowColor, uHighColor, uFrequency, uAmplitude, sphereRadius, sphereSegments } = useControls({
        uLowColor: "#89f2ff",
        uHighColor: "#0ae2ff",
        uFrequency: {
            value: 0.5,
            min: 0,
            max: 2,
            step: 0.01,
        },
        uAmplitude: {
            value: 1.5,
            min: 0,
            max: 5,
            step: 0.01,
        },
        sphereRadius: {
            value: 4,
            min: 0,
            max: 10,
            step: 0.01,
        },
        sphereSegments: {
            value: 1024,
            min: 0,
            max: 4096,
            step: 1,
        }
    });

    useFrame(({ clock }) => {
        if (!planeMaterial) return;
        planeMaterial.current.uniforms.uTime.value = clock.getElapsedTime();
    });

    return (
        <>
            <directionalLight position={[1, 3, 2]} />
            <OrbitControls />

            <mesh rotation-x={-Math.PI * 0.5} position-y={-sphereRadius - 1}>
                <planeGeometry args={[100, 100, 32, 32]} />
                <meshBasicMaterial color="white" wireframe />
            </mesh>

            <mesh>
                <sphereGeometry args={[sphereRadius, sphereSegments, sphereSegments]} ref={sphereGeometry} />
                <blobMaterial
                    ref={planeMaterial}
                    uFrequency={uFrequency}
                    uAmplitude={uAmplitude}
                    uLowColor={new THREE.Color(uLowColor)}
                    uHighColor={new THREE.Color(uHighColor)}
                />
            </mesh>
        </>
    );
}