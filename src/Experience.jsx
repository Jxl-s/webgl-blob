import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { button, useControls } from "leva";
import * as THREE from "three";

// Shaders
import "./shaders/BlobMaterial";

export default function Experience() {
    const planeMaterial = useRef();
    const sphereGeometry = useRef();

    const [analyser, setAnalyser] = useState(null);
    const [dataArray, setDataArray] = useState([0]);

    const controls = useControls({
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
        uSpeed: {
            value: 1,
            min: 0,
            max: 10,
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
        },
        'Enable Mic Visualization': button(async () => {
            try {
                const audioContext = new AudioContext();

                const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
                const source = audioContext.createMediaStreamSource(mediaStream);

                const analyser = audioContext.createAnalyser();
                source.connect(analyser);

                analyser.fftSize = 256;

                setAnalyser(analyser);
                setDataArray(new Uint8Array(analyser.frequencyBinCount));
            } catch (e) {
                console.log("Microphone disabled");
            }
        })
    });

    useFrame(({ clock }) => {
        if (!planeMaterial.current) return;
        planeMaterial.current.uniforms.uTime.value = clock.getElapsedTime();
    });

    useFrame(() => {
        if (!analyser) return;
        analyser.getByteFrequencyData(dataArray);

        planeMaterial.current.uniforms.uAmplitude.value = controls.uAmplitude + (dataArray[0] / 255 * 5)
    });

    return (
        <>
            <directionalLight position={[1, 3, 2]} />
            <OrbitControls />

            <mesh rotation-x={-Math.PI * 0.5} position-y={-controls.sphereRadius - 1}>
                <planeGeometry args={[100, 100, 32, 32]} />
                <meshBasicMaterial color="white" wireframe />
            </mesh>

            <mesh>
                <sphereGeometry args={[controls.sphereRadius, controls.sphereSegments, controls.sphereSegments]} ref={sphereGeometry} />
                <blobMaterial
                    ref={planeMaterial}
                    {...controls}
                    uAmplitude={controls.uAmplitude}
                    uLowColor={new THREE.Color(controls.uLowColor)}
                    uHighColor={new THREE.Color(controls.uHighColor)}
                />
            </mesh>

        </>
    );
}
