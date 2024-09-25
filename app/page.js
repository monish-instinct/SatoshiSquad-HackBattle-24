import React from 'react';
import { LandingPage } from '@/components/landing-page'; // Ensure this matches the exported component name

export default function Page() { 
  return (
    <main className='min-h-screen'>
      <LandingPage /> {/* Change Animation to LandingPage */}
    </main>
  );
}
