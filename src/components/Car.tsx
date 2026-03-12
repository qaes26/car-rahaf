"use client";

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store';

const messages = [
    "رهف... أنت أجمل صدفة في حياتي",
    "كل طريق أسلكه يقودني إليك",
    "المدينة كلها تشهد أني أحبك",
    "رهف… وجودك يجعل العالم أجمل",
    "كل سيارة تمر تحمل رسالة حب لك",
    "أنتِ النور في عتمة هذه المدينة",
    "لا شيء يضاهي جمال ابتسامتك يا رهف",
    "أنتِ نبض قلبي وسر سعادتي",
    "أحبك بحجم السماء وأكثر",
    "عيناكِ نجمتان تضيئان ليلي",
    "رهف، أنتِ حلمي الذي تحقق",
    "كل نبضة في قلبي تنادي باسمك",
    "أحبك اليوم، وغداً، وإلى الأبد",
    "أنتِ قصيدتي الأجمل يا رهف",
    "في عيناكِ أرى مستقبلي وحياتي",
    "لا تكتمل فرحتي إلا بوجودك",
    "رهف... أنتِ لحن حياتي الجميل",
    "أدمنت تفاصيلك وكل ما فيكِ",
    "يا قمر ليلي وشمس نهاري",
    "أحبك حبّاً لا يوصف بالكلمات",
    "رهف، أنتِ دنيتي وكل ما أملك",
    "قلبي لا ينبض إلا بحبك",
    "أرى فيكِ كل ما تمنيته يوماً",
    "أنتِ الوردة التي زينت بستان عمري",
    "لا معنى لحياتي بدونك يا رهف",
    "أنتِ المعجزة التي غيرت حياتي",
    "كل ليلة أحبك أكثر من التي قبلها",
    "رهف، حبكِ هو ملاذي الآمن",
    "أبتسم بمجرد أن تخطري على بالي",
    "أنتِ وطني واليكِ أنتمي",
    "لا أريد من الدنيا سواكِ",
    "رهف، أنتِ أكسجين حياتي",
    "كل لحظة معك هي قطعة من الجنة",
    "لو كان الحب يعطى بالقلوب لأعطيتك قلبي",
    "عيناك أسراني وحبك أحياني",
    "رهف... أنتِ روحي التي بين ضلوعي",
    "في كل حرف أكتبه أجد اسمك",
    "أحبك بعدد نجوم السماء",
    "يا أجمل قدر كتبه الله لي",
    "رهف، أنتِ قصة حبي الأبدية",
    "أغار عليك من كل شيء حولك",
    "معك أشعر أني امتلكت العالم",
    "أنتِ النجمة التي تضيء دربي",
    "قلبي ينطق باسمك يا رهف",
    "أحبك أكثر مما تتخيلين",
    "أنتِ أول أفكاري وآخرها",
    "رهف... حبك باقٍ في قلبي ما حييت",
    "أرى العالم من خلال عينيك",
    "أنتِ هديتي من السماء",
    "لا شيء يعادل لحظة بقربك"
];

interface CarProps {
    position: [number, number, number];
    speed: number;
    messageIndex: number;
}

export default function Car({ position, speed, messageIndex }: CarProps) {
    const groupRef = useRef<THREE.Group>(null);
    const showPhrases = useStore(state => state.showPhrases);

    // Each car will have its own current message index, initially offset by its prop
    const [currentIndex, setCurrentIndex] = useState(messageIndex);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.position.z += speed * delta;

            // إعادة السيارة للخلف لتبدأ من جديد ودائماً أمام الكاميرا
            if (groupRef.current.position.z > state.camera.position.z + 10) {
                groupRef.current.position.z = state.camera.position.z - 80 - (Math.random() * 40);
                setCurrentIndex(Math.floor(Math.random() * messages.length));
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
            {showPhrases && (
                <Html
                    position={[0, 2.5, 0]}
                    center
                    transform
                    sprite
                    distanceFactor={6}
                    zIndexRange={[100, 0]}
                >
                    <style>
                        {`
                            @keyframes popInFade {
                                0% { opacity: 0; transform: scale(0.8); }
                                100% { opacity: 1; transform: scale(1); }
                            }
                        `}
                    </style>
                    <div
                        style={{
                            width: '300px',
                            textAlign: 'center',
                            fontFamily: 'var(--font-cairo), sans-serif',
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#fff',
                            textShadow: '0 0 10px rgba(255,100,150,0.8), 0 0 20px rgba(255,100,150,0.4)',
                            background: 'radial-gradient(ellipse at center, rgba(255,100,150,0.15) 0%, rgba(0,0,0,0) 70%)',
                            padding: '20px',
                            borderRadius: '50%',
                            pointerEvents: 'auto',
                            animation: 'popInFade 1.5s ease-out forwards'
                        }}
                    >
                        {messages[currentIndex % messages.length]}
                    </div>
                </Html>
            )}
        </group>
    );
}
