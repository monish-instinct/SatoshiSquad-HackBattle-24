'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Play, Pause, SkipForward, SkipBack, Volume2, Shuffle, Repeat, Heart, Share2, DollarSign } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Mock data for the current song and playlist
const currentSong = {
  title: "Neon Dreams",
  artist: "Luna Echo",
  album: "Midnight Synthwave",
  cover: "https://picsum.photos/600/600?random=8",
  duration: 237, // duration in seconds
}

const playlist = [
  { title: "Neon Dreams", artist: "Luna Echo", duration: 237 },
  { title: "Cyber Punk", artist: "Luna Echo", duration: 184 },
  { title: "Retro Future", artist: "Luna Echo", duration: 210 },
  { title: "Digital Love", artist: "Luna Echo", duration: 225 },
  { title: "Synth City", artist: "Luna Echo", duration: 198 },
]

const Page = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const [donationAmount, setDonationAmount] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= currentSong.duration) {
            setIsPlaying(false)
            return 0
          }
          return prevTime + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval);
  }, [isPlaying])

  const togglePlay = () => setIsPlaying(!isPlaying)
  const toggleShuffle = () => setIsShuffled(!isShuffled)
  const toggleRepeat = () => setIsRepeating(!isRepeating)

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  const handleDonation = () => {
    if (donationAmount && !isNaN(Number(donationAmount))) {
      toast({
        title: "Thank you for your support!",
        description: `You've donated $${donationAmount} to Luna Echo.`,
      })
      setDonationAmount('')
    } else {
      toast({
        title: "Invalid donation amount",
        description: "Please enter a valid number.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-6 md:p-12">
      <header className="mb-12">
        <Link href="/" className="text-2xl font-bold text-primary">
          MusicHub
        </Link>
      </header>
      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Music Player */}
          <div className="md:col-span-2 bg-background p-6 rounded-lg shadow-lg">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="w-64 h-64 mb-4">
                <AvatarImage src={currentSong.cover} alt={`${currentSong.album} cover`} />
                <AvatarFallback>{currentSong.artist[0]}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{currentSong.title}</h2>
              <p className="text-muted-foreground">{currentSong.artist}</p>
            </div>

            <div className="mb-4">
              <Slider
                value={[currentTime]}
                max={currentSong.duration}
                step={1}
                onValueChange={(value) => setCurrentTime(value[0])}
                className="w-full" />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(currentSong.duration)}</span>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-4 mb-6">
              <Button size="icon" variant="ghost" onClick={toggleShuffle}>
                <Shuffle className={`h-6 w-6 ${isShuffled ? 'text-primary' : ''}`} />
                <span className="sr-only">Shuffle</span>
              </Button>
              <Button size="icon" variant="ghost">
                <SkipBack className="h-6 w-6" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button size="icon" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
              </Button>
              <Button size="icon" variant="ghost">
                <SkipForward className="h-6 w-6" />
                <span className="sr-only">Next</span>
              </Button>
              <Button size="icon" variant="ghost" onClick={toggleRepeat}>
                <Repeat className={`h-6 w-6 ${isRepeating ? 'text-primary' : ''}`} />
                <span className="sr-only">Repeat</span>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
                className="w-full" />
            </div>
          </div>

          {/* Playlist and Fan Interaction */}
          <div className="space-y-6">
            <div className="bg-background p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Playlist</h3>
              <ul className="space-y-2">
                {playlist.map((song, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-2 hover:bg-muted rounded transition-colors">
                    <div>
                      <p className="font-medium">{song.title}</p>
                      <p className="text-sm text-muted-foreground">{song.artist}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatTime(song.duration)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Support the Artist</h3>
              <div className="flex space-x-2 mb-4">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)} />
                <Button onClick={handleDonation}>
                  <DollarSign className="mr-2 h-4 w-4" />
                  Donate
                </Button>
              </div>
              <div className="flex justify-center space-x-4">
                <Button variant="outline">
                  <Heart className="mr-2 h-4 w-4" />
                  Like
                </Button>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;
