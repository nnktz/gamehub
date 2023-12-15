'use client'

import { useTracks } from '@livekit/components-react'
import { Participant, Track } from 'livekit-client'
import { useEffect, useRef, useState } from 'react'
import { useEventListener } from 'usehooks-ts'

import { FullscreenControl } from './fullscreen-control'
import { VolumeControl } from './volume-control'

export const LiveVideo = ({ participant }: { participant: Participant }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [volume, setVolume] = useState(0)

  const onVolumeChange = (value: number) => {
    setVolume(+value)

    if (videoRef.current) {
      videoRef.current.muted = value === 0
      videoRef.current.volume = +value * 0.01
    }
  }

  const toggleMute = () => {
    const isMuted = volume === 0

    setVolume(isMuted ? 50 : 0)

    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      videoRef.current.volume = isMuted ? 0.5 : 0
    }
  }

  useEffect(() => {
    onVolumeChange(0)
  }, [])

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen()
      setIsFullscreen(false)
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen()
      setIsFullscreen(true)
    }
  }

  const handleFullscreenChange = () => {
    const isCurrentFullscreen = document.fullscreenElement !== null
    setIsFullscreen(isCurrentFullscreen)
  }

  useEventListener('fullscreenchange', handleFullscreenChange, wrapperRef)

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current)
      }
    })

  return (
    <div ref={wrapperRef} className="relative flex h-full">
      <video ref={videoRef} src="" width="100%" />

      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl onChange={onVolumeChange} onToggle={toggleMute} value={volume} />
          <FullscreenControl isFullscreen={isFullscreen} onToggle={toggleFullscreen} />
        </div>
      </div>
    </div>
  )
}