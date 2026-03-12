"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Sky, Stars, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { useFrame } from '@react-three/fiber';
import StreetEnvironment from './StreetEnvironment';
import CarsManager from './CarsManager';

function CinematicCamera() {
    useFrame((state, delta) => {
        // Slowly move the camera forward to create a cinematic continuous feel
        state.camera.position.z -= 0.5 * delta;
        // Keep it slightly above the road and looking slightly up
        state.camera.position.y = 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    });
    return null;
}

export default function Scene() {
    return (
        <div className="w-full h-full absolute inset-0 bg-black">
            <Canvas
                shadows
                camera={{ position: [0, 2, 8], fov: 60 }}
                gl={{ antialias: true, powerPreference: "high-performance" }}
            >
                <color attach="background" args={['#020205']} />

                {/* Soft moonlight & ambient lighting */}
                <ambientLight intensity={0.1} />
                <directionalLight
                    castShadow
                    position={[10, 20, -10]}
                    intensity={0.5}
                    color="#a0c0ff"
                    shadow-mapSize={[2048, 2048]}
                />

                <Suspense fallback={null}>
                    <Sky
                        distance={450000}
                        sunPosition={[0, -1, 0]}
                        inclination={0}
                        azimuth={0.25}
                        turbidity={10}
                        rayleigh={2}
                    />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    {/* Floating magical particles */}
                    <Sparkles count={200} scale={20} size={4} speed={0.4} opacity={0.5} color="#ffe4e1" />

                    <CinematicCamera />

                    <StreetEnvironment />
                    <CarsManager />

                    {/* Post Processing for Cinematic Feel */}
                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={0.5}
                            mipmapBlur
                            intensity={1.2}
                        />
                        <DepthOfField
                            focusDistance={0}
                            focalLength={0.02}
                            bokehScale={2}
                            height={480}
                        />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
}
