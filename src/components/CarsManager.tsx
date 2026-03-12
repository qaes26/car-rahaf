"use client";

import React, { useMemo } from 'react';
import Car from './Car';

export default function CarsManager() {
    const cars = useMemo(() => {
        const list = [];
        const numCars = 6;
        let currentZ = -10;

        for (let i = 0; i < numCars; i++) {
            // Alternate lanes: right (+2.5) and left (-2.5) slightly randomized
            const laneX = (i % 2 === 0 ? 2 : -2) + (Math.random() * 1 - 0.5);
            const speed = 6 + Math.random() * 4;

            list.push({
                id: i,
                position: [laneX, 0, currentZ] as [number, number, number],
                speed,
                messageIndex: i
            });

            currentZ -= 20 + Math.random() * 20; // Spread cars out on the Z-axis
        }

        return list;
    }, []);

    return (
        <group>
            {cars.map(car => (
                <Car
                    key={car.id}
                    position={car.position}
                    speed={car.speed}
                    messageIndex={car.messageIndex}
                />
            ))}
        </group>
    );
}
