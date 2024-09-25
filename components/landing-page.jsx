'use client';
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, SkipForward, SkipBack, Volume2 } from "lucide-react";
import Link from "next/link"

export function LandingPage() {
  return (
    (<div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 bg-background">
        <Link href="/" className="text-2xl font-bold">
          MusicHub
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="#" className="text-sm font-medium hover:underline">
            Discover
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline">
            Library
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline">
            Radio
          </Link>
        </nav>
        <Button>Log In</Button>
      </header>
      <main className="flex-grow">
        <section
          className="py-20 px-6 text-center bg-gradient-to-r from-purple-500 to-pink-500">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Music, Your Way
          </h1>
          <p className="text-xl text-white mb-8">
            Stream millions of songs and podcasts. Start listening for free.
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Start Free Trial
          </Button>
        </section>

        <section className="py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Featured Artists</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Artist 1', 'Artist 2', 'Artist 3', 'Artist 4'].map((artist, index) => (
              <div key={index} className="text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src={`/placeholder.svg?height=128&width=128`} alt={artist} />
                  <AvatarFallback>{artist[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{artist}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-6 bg-muted">
          <h2 className="text-3xl font-bold text-center mb-10">Now Playing</h2>
          <div className="max-w-md mx-auto bg-background p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Song Title</h3>
                <p className="text-sm text-muted-foreground">Artist Name</p>
              </div>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Album Cover" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Button size="icon" variant="ghost">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button size="icon">
                <Play className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4" />
              <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
            </div>
          </div>
        </section>

        <section className="py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-10">MusicHub by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Users', value: '50M+' },
              { label: 'Songs', value: '60M+' },
              { label: 'Playlists', value: '4B+' },
              { label: 'Artists', value: '1M+' },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-background py-6 px-6 text-center">
        <p className="text-sm text-muted-foreground">
          © 2024 MusicHub. All rights reserved.
        </p>
      </footer>
    </div>)
  );
}