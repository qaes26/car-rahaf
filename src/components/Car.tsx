"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text } from '@react-three/drei';
import * as THREE from 'three';

const messages = [
    "رهف... أنت أجمل صدفة في حياتي",
    "كل طريق أسلكه يقودني إليك",
    "المدينة كلها تشهد أني أحبك",
    "رهف… وجودك يجعل العالم أجمل",
    "كل سيارة تمر تحمل رسالة حب لك",
    "أنتِ النور في عتمة هذه المدينة"
];

interface CarProps {
    position: [number, number, number];
    speed: number;
    messageIndex: number;
}

export default function Car({ position, speed, messageIndex }: CarProps) {
    const groupRef = useRef<THREE.Group>(null);
    const zStart = position[2];

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.position.z += speed * delta;

            // Reset car when it goes too far
            if (groupRef.current.position.z > 20) {
                groupRef.current.position.z = zStart - 100;
            }
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Car Body (Stylized) */}
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.6, 0.6, 3]} />
                <meshPhysicalMaterial
                    color="#050510"
                    roughness={0.2}
                    metalness={0.8}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </mesh>

            {/* Car Cabin */}
            <mesh position={[0, 0.8, -0.2]} castShadow receiveShadow>
                <boxGeometry args={[1.4, 0.5, 1.5]} />
                <meshPhysicalMaterial
                    color="#000"
                    roughness={0.1}
                    transmission={0.9}
                    thickness={0.5}
                />
            </mesh>

            {/* Headlights */}
            <mesh position={[-0.5, 0.4, 1.51]}>
                <circleGeometry args={[0.15, 16]} />
                <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </mesh>
            <mesh position={[0.5, 0.4, 1.51]}>
                <circleGeometry args={[0.15, 16]} />
                <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </mesh>

            {/* Taillights */}
            <mesh position={[-0.6, 0.4, -1.51]}>
                <boxGeometry args={[0.3, 0.1, 0.02]} />
                <meshBasicMaterial color="#ff0000" toneMapped={false} />
            </mesh>
            <mesh position={[0.6, 0.4, -1.51]}>
                <boxGeometry args={[0.3, 0.1, 0.02]} />
                <meshBasicMaterial color="#ff0000" toneMapped={false} />
            </mesh>

            {/* Floating Glowing Message */}
            <Html
                position={[0, 2.5, 0]}
                center
                transform
                sprite
                distanceFactor={6}
                zIndexRange={[100, 0]}
            >
                <div style={{
                    width: '300px',
                    textAlign: 'center',
                    fontFamily: 'var(--font-cairo), sans-serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#fff',
                    textShadow: '0 0 10px rgba(255,100,150,0.8), 0 0 20px rgba(255,100,150,0.4)',
                    background: 'radial-gradient(ellipse at center, rgba(255,100,150,0.15) 0%, rgba(0,0,0,0) 70%)',
                    padding: '20px',
                    borderRadius: '50%'
                }}>
                    {messages[messageIndex % messages.length]}
                </div>
            </Html>
        </group>
    );
}
