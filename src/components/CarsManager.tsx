"use client";

import React, { useMemo } from 'react';
import Car from './Car';

export default function CarsManager() {
    const cars = useMemo(() => {
        const list = [];
        const numCars = 10;

        for (let i = 0; i < numCars; i++) {
            // Alternate lanes: right (+2.5) and left (-2.5) slightly randomized
            const laneX = (i % 2 === 0 ? 2.2 : -2.2) + (Math.random() * 0.6 - 0.3);
            const speed = 5 + Math.random() * 5;
            // Spread cars from -10 to -90 along Z so they're immediately visible
            const startZ = -10 - i * 12;

            list.push({
                id: i,
                position: [laneX, 0, startZ] as [number, number, number],
                speed,
                messageIndex: i
            });
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
