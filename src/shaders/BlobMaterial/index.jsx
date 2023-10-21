import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

import vertexShader from "./blobMaterial.vert";
import fragmentShader from "./blobMaterial.frag";

export const BlobMaterial = shaderMaterial(
    {
        uTime: null,
        uFrequency: null,
        uAmplitude: null,
        uLowColor: null,
        uHighColor: null,
    },
    vertexShader,
    fragmentShader,
);

extend({ BlobMaterial })