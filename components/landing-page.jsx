'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Pause, SkipForward, SkipBack, Volume2, Search, Repeat, Shuffle, Menu } from "lucide-react";
import Link from "next/link"
import { Transition } from "@headlessui/react"
import { signIn, signOut, useSession } from "next-auth/react";

const songs = [
  { title: "Bohemian Rhapsody", artist: "Queen", cover: "https://picsum.photos/200/200?random=1" },
  { title: "Imagine", artist: "John Lennon", cover: "https://picsum.photos/200/200?random=2" },
  { title: "Like a Rolling Stone", artist: "Bob Dylan", cover: "https://picsum.photos/200/200?random=3" },
]

const artists = [
  { name: "Queen", image: "https://picsum.photos/200/200?random=4" },
  { name: "John Lennon", image: "https://picsum.photos/200/200?random=5" },
  { name: "Bob Dylan", image: "https://picsum.photos/200/200?random=6" },
  { name: "The Beatles", image: "https://picsum.photos/200/200?random=7" },
]

export function LandingPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [volume, setVolume] = useState(50)
  const [progress, setProgress] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const togglePlay = () => setIsPlaying(!isPlaying)

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length)
    setProgress(0)
  }

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length)
    setProgress(0)
  }

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            nextSong()
            return 0
          }
          return prevProgress + 1
        })
      }, 1000) // Update progress every second
    }
    return () => clearInterval(interval);
  }, [isPlaying])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            Satoshi Music
          </Link>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button size="icon" variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
        {/* Search Bar - Hidden on small screens */}
        <div className="hidden md:flex items-center space-x-2 flex-grow mx-4">
          <Input
            type="search"
            placeholder="Search for songs, artists, or albums"
            className="w-full max-w-md" />
          <Button size="icon" variant="ghost">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        {/* Navigation Links - Hidden on small screens */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors">
            Discover
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors">
            Library
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors">
            Radio
          </Link>
        </nav>
        <Button className="hidden md:block">Log In</Button>
      </header>

      {/* Mobile Menu Dropdown */}
      <Transition
        show={isMenuOpen}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="md:hidden bg-background/90 backdrop-blur-md px-4 pt-4 pb-2 space-y-2">
          <nav className="flex flex-col space-y-2">
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors">
              Discover
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors">
              Library
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors">
              Radio
            </Link>
          </nav>
          <div>
            <Input
              type="search"
              placeholder="Search for songs, artists, or albums"
              className="w-full mb-2" />
            <Button size="icon" variant="ghost" className="w-full">
              <Search className="h-5 w-5 mx-auto" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <Button className="w-full">Log In</Button>
        </div>
      </Transition>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center bg-gradient-to-r from-purple-500 to-pink-500">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Your Music, Your Way
          </h1>
          <p className="text-xl text-white mb-8 animate-fade-in-up animation-delay-200">
            Stream millions of songs and podcasts. Start listening for free.
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 animate-fade-in-up animation-delay-400">
            Get Started
          </Button>
        </section>

        {/* Featured Artists */}
        <section className="py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Featured Artists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {artists.map((artist, index) => (
              <div key={index} className="text-center group">
                <Avatar
                  className="w-32 h-32 mx-auto mb-4 transition-transform group-hover:scale-105">
                  <AvatarImage src={artist.image} alt={artist.name} />
                  <AvatarFallback>{artist.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold group-hover:text-primary transition-colors">{artist.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Now Playing */}
        <section className="py-16 px-6 bg-muted">
          <h2 className="text-3xl font-bold text-center mb-10">Now Playing</h2>
          <div className="max-w-md mx-auto bg-background p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">{songs[currentSongIndex].title}</h3>
                <p className="text-sm text-muted-foreground">{songs[currentSongIndex].artist}</p>
              </div>
              <Avatar className="w-16 h-16">
                <AvatarImage src={songs[currentSongIndex].cover} alt="Album Cover" />
                <AvatarFallback>{songs[currentSongIndex].artist[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="mb-4">
              <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Button size="icon" variant="ghost">
                <Shuffle className="h-5 w-5" />
                <span className="sr-only">Shuffle</span>
              </Button>
              <Button size="icon" variant="ghost" onClick={prevSong}>
                <SkipBack className="h-5 w-5" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button size="icon" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
              </Button>
              <Button size="icon" variant="ghost" onClick={nextSong}>
                <SkipForward className="h-5 w-5" />
                <span className="sr-only">Next</span>
              </Button>
              <Button size="icon" variant="ghost">
                <Repeat className="h-5 w-5" />
                <span className="sr-only">Repeat</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5" />
              <Slider
                value={[volume]}
                onValueChange={(newVolume) => setVolume(newVolume[0])}
                max={100}
                step={1}
                className="w-full" />
            </div>
          </div>
        </section>

        {/* Satoshi Music by the Numbers */}
        <section className="py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Satoshi Music by the Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Users', value: '50M+' },
              { label: 'Songs', value: '60M+' },
              { label: 'Playlists', value: '4B+' },
              { label: 'Artists', value: '1M+' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                <p className="text-4xl font-bold mb-2 text-primary">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Jobs</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">For the Record</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Communities</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">For Artists</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Developers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Advertising</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Investors</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Support</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Web Player</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Free Mobile App</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Satoshi Music. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
