'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Play, Heart, DollarSign, Headphones } from 'lucide-react'

// Mock data for trending playlists
const trendingPlaylists = [
  {
    id: 1,
    name: "Summer Vibes 2024",
    coverArt: "https://rnwvfxlxmvvmzgbcbqbr.supabase.co/storage/v1/object/public/images/summer-vibes-2024.jpg",
    plays: 1500000,
    likes: 75000,
    donations: 5000,
    stats: [
      { name: 'Mon', plays: 200000, likes: 10000, donations: 700 },
      { name: 'Tue', plays: 220000, likes: 11000, donations: 750 },
      { name: 'Wed', plays: 250000, likes: 12500, donations: 800 },
      { name: 'Thu', plays: 280000, likes: 14000, donations: 900 },
      { name: 'Fri', plays: 300000, likes: 15000, donations: 1000 },
      { name: 'Sat', plays: 150000, likes: 7500, donations: 500 },
      { name: 'Sun', plays: 100000, likes: 5000, donations: 350 },
    ]
  },
  {
    id: 2,
    name: "Chill Lofi Beats",
    coverArt: "https://rnwvfxlxmvvmzgbcbqbr.supabase.co/storage/v1/object/public/images/chill-lofi-beats.jpg",
    plays: 1200000,
    likes: 60000,
    donations: 4000,
    stats: [
      { name: 'Mon', plays: 150000, likes: 7500, donations: 500 },
      { name: 'Tue', plays: 180000, likes: 9000, donations: 600 },
      { name: 'Wed', plays: 200000, likes: 10000, donations: 700 },
      { name: 'Thu', plays: 220000, likes: 11000, donations: 750 },
      { name: 'Fri', plays: 250000, likes: 12500, donations: 800 },
      { name: 'Sat', plays: 120000, likes: 6000, donations: 400 },
      { name: 'Sun', plays: 80000, likes: 4000, donations: 250 },
    ]
  },
  {
    id: 3,
    name: "Workout Motivation",
    coverArt: "https://rnwvfxlxmvvmzgbcbqbr.supabase.co/storage/v1/object/public/images/workout-motivation.jpg",
    plays: 1000000,
    likes: 50000,
    donations: 3000,
    stats: [
      { name: 'Mon', plays: 180000, likes: 9000, donations: 600 },
      { name: 'Tue', plays: 160000, likes: 8000, donations: 550 },
      { name: 'Wed', plays: 140000, likes: 7000, donations: 500 },
      { name: 'Thu', plays: 150000, likes: 7500, donations: 525 },
      { name: 'Fri', plays: 170000, likes: 8500, donations: 575 },
      { name: 'Sat', plays: 120000, likes: 6000, donations: 400 },
      { name: 'Sun', plays: 80000, likes: 4000, donations: 250 },
    ]
  },
]

export function Page() {
  const [activePlaylist, setActivePlaylist] = useState(trendingPlaylists[0])
  const router = useRouter()

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }

  const handlePlaylistClick = (playlist) => {
    router.push(`/listen?playlist=${playlist.id}`)
  }

  return (
    (<div
      className="min-h-screen bg-gradient-to-b from-background to-secondary p-6">
      <header className="flex justify-between items-center mb-8">
        <Link href="/" className="text-2xl font-bold text-primary">
          MusicHub
        </Link>
        <nav className="space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/upload">
            <Button variant="ghost">Upload</Button>
          </Link>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Trending Playlists</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingPlaylists.map((playlist) => (
            <Card
              key={playlist.id}
              className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handlePlaylistClick(playlist)}
              onMouseEnter={() => setActivePlaylist(playlist)}>
              <CardHeader>
                <Avatar className="w-full h-48 rounded-md">
                  <AvatarImage src={playlist.coverArt} alt={playlist.name} className="object-cover" />
                  <AvatarFallback>{playlist.name[0]}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">{playlist.name}</CardTitle>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Headphones className="w-4 h-4 mr-1" />
                    {formatNumber(playlist.plays)}
                  </span>
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {formatNumber(playlist.likes)}
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {formatNumber(playlist.donations)}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Play className="mr-2 h-4 w-4" /> Play Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-background p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{activePlaylist.name} - Weekly Stats</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activePlaylist.stats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="plays" fill="#8884d8" name="Plays" />
              <Bar dataKey="likes" fill="#82ca9d" name="Likes" />
              <Bar dataKey="donations" fill="#ffc658" name="Donations" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>)
  );
}