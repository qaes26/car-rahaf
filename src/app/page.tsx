"use client";

import dynamic from 'next/dynamic';
import UIOverlay from '@/components/UIOverlay';

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-20">
      <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="w-full h-screen bg-black overflow-hidden relative">
      <UIOverlay />
      <Scene />
    </main>
  );
}
