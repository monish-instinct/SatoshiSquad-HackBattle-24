'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
import Link from "next/link"

const genres = [
  "Pop", "Rock", "Hip Hop", "R&B", "Country", "Electronic", "Jazz", "Classical", "Reggae", "Folk"
]

export function Page() {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [genre, setGenre] = useState('')
  const [description, setDescription] = useState('')
  const [audioFile, setAudioFile] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const audioRef = useRef(null)

  const handleAudioFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0])
    }
  }

  const handleImageFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!audioFile) {
      toast({
        title: "Error",
        description: "Please select an audio file to upload.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    // Simulating upload process
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    setIsUploading(false)

    toast({
      title: "Upload Successful",
      description: "Your track has been uploaded successfully!",
    })
  }

  return (
    (<div
      className="min-h-screen bg-gradient-to-b from-background to-secondary p-6">
      <header className="flex justify-between items-center mb-8">
        <Link href="/" className="text-2xl font-bold text-primary">
          MusicHub
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </header>
      <main className="max-w-4xl mx-auto bg-background p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Upload Your Music</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Song Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="artist">Artist Name</Label>
              <Input
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description or Lyrics</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description or lyrics for your song"
              rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="audio">Audio File</Label>
            <div className="flex items-center space-x-4">
              <Input
                id="audio"
                type="file"
                accept="audio/*"
                onChange={handleAudioFileChange}
                className="hidden" />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('audio')?.click()}>
                <Upload className="mr-2 h-4 w-4" /> Select Audio File
              </Button>
              {audioFile && (
                <span className="text-sm text-muted-foreground">
                  {audioFile.name}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Album Artwork</Label>
            <div className="flex items-center space-x-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden" />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image')?.click()}>
                <ImageIcon className="mr-2 h-4 w-4" /> Select Image
              </Button>
              {imageFile && (
                <span className="text-sm text-muted-foreground">
                  {imageFile.name}
                </span>
              )}
            </div>
          </div>

          {audioFile && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <audio ref={audioRef} controls className="w-full">
                <source src={URL.createObjectURL(audioFile)} type={audioFile.type} />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {isUploading && (
            <div className="space-y-2">
              <Label>Upload Progress</Label>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          <div className="flex items-center space-x-4">
            <Button type="submit" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Submit'}
            </Button>
            <div className="flex items-center text-sm text-muted-foreground">
              <AlertCircle className="mr-2 h-4 w-4" />
              Max file size: 50MB
            </div>
          </div>
        </form>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Upload Guidelines</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Accepted audio formats: MP3, WAV, FLAC</li>
            <li>Maximum audio file size: 50MB</li>
            <li>Accepted image formats: JPG, PNG</li>
            <li>Recommended image size: 3000x3000 pixels</li>
            <li>Ensure you have the rights to upload and distribute the content</li>
          </ul>
        </div>
      </main>
    </div>)
  );
}