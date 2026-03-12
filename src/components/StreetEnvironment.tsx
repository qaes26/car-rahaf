"use client";

import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane, Box, MeshReflectorMaterial, useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function StreetEnvironment() {
    const roadLength = 200;

    // Procedural buildings along the road
    const buildings = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 40; i++) {
            const isLeft = i % 2 === 0;
            const x = isLeft ? -10 - Math.random() * 5 : 10 + Math.random() * 5;
            const z = -Math.random() * roadLength;
            const width = 4 + Math.random() * 6;
            const depth = 4 + Math.random() * 6;
            const height = 10 + Math.random() * 40;
            arr.push({ x, z, width, depth, height });
        }
        return arr;
    }, []);

    // Street Lamps
    const lamps = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 15; i++) {
            const z = - (i * 15);
            arr.push({ x: -4.5, z });
            arr.push({ x: 4.5, z });
        }
        return arr;
    }, []);

    return (
        <group>
            {/* Road */}
            <Plane
                args={[8, roadLength, 64, 64]}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, -roadLength / 2 + 10]}
            >
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={512}
                    mixBlur={1}
                    mixStrength={80}
                    roughness={0.8}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#151515"
                    metalness={0.5}
                />
            </Plane>

            {/* Sidewalk Left */}
            <Box args={[3, 0.2, roadLength]} position={[-5.5, 0.1, -roadLength / 2 + 10]}>
                <meshStandardMaterial color="#222" roughness={0.9} />
            </Box>

            {/* Sidewalk Right */}
            <Box args={[3, 0.2, roadLength]} position={[5.5, 0.1, -roadLength / 2 + 10]}>
                <meshStandardMaterial color="#222" roughness={0.9} />
            </Box>

            {/* Ground plane outside sidewalks */}
            <Plane args={[100, roadLength]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -roadLength / 2 + 10]}>
                <meshStandardMaterial color="#050505" roughness={1} />
            </Plane>

            {/* Buildings */}
            {buildings.map((b, idx) => (
                <Box
                    key={idx}
                    args={[b.width, b.height, b.depth]}
                    position={[b.x, b.height / 2, b.z]}
                >
                    <meshStandardMaterial color="#0a0a0f" roughness={0.9} metalness={0.1} />
                </Box>
            ))}

            {/* Street Lamps */}
            {lamps.map((l, idx) => (
                <group key={`lamp-${idx}`} position={[l.x, 0, l.z]}>
                    {/* Lamp Post */}
                    <Box args={[0.2, 5, 0.2]} position={[0, 2.5, 0]}>
                        <meshStandardMaterial color="#111" metalness={0.8} />
                    </Box>
                    {/* Lamp Head */}
                    <Box args={[0.8, 0.2, 0.4]} position={[l.x < 0 ? 0.4 : -0.4, 5, 0]}>
                        <meshBasicMaterial color="#ffeedd" />
                    </Box>
                </group>
            ))}

            {/* Fog to hide the road's end */}
            <fog attach="fog" args={['#020205', 10, 80]} />
        </group>
    );
}
