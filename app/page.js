import React from 'react';
import { ListenPage } from '@/components/app-listen-page'; // Ensure this matches the exported component name

export default function Page() { 
  return (
    <main className='min-h-screen'>
      <ListenPage /> {/* Change Animation to LandingPage */}
    </main>
  );
}
