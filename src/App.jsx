import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";

function App() {
    return (
        <>
            <Leva />
            <Canvas
                camera={{
                    position: [5, 5, 5],
                }}
            >
                <Experience />
            </Canvas>
        </>
    );
}

export default App;
