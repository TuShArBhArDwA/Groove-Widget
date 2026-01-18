import { useState, useCallback, useEffect, useRef } from 'react';
import AlbumArt from './AlbumArt';
import ProgressBar from './ProgressBar';
import Controls from './Controls';
import MiniLyrics from './MiniLyrics';
import QueuePreview from './QueuePreview';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import { mockTracks, getNextTrack, getPrevTrack } from '../data/mockData';
import './MusicPlayer.css';

const MusicPlayer = () => {
  // Current track state
  const [currentTrack, setCurrentTrack] = useState(mockTracks[0]);
  const [queue] = useState(mockTracks);
  
  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [buffered, setBuffered] = useState(0);
  
  // Control states
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('off'); // 'off', 'all', 'one'
  const [isLiked, setIsLiked] = useState(false);
  const [showLyrics, setShowLyrics] = useState(true);
  const [showQueue, setShowQueue] = useState(false);
  
  // Refs
  const playbackInterval = useRef(null);
  
  // Simulate playback progress
  useEffect(() => {
    if (isPlaying) {
      playbackInterval.current = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 0.1;
          if (next >= currentTrack.duration) {
            // Track ended - handle repeat/next
            if (repeat === 'one') {
              return 0;
            } else {
              handleNext();
              return 0;
            }
          }
          return next;
        });
        
        // Simulate buffering ahead
        setBuffered(prev => Math.min(currentTrack.duration, prev + 0.5));
      }, 100);
    }
    
    return () => {
      if (playbackInterval.current) {
        clearInterval(playbackInterval.current);
      }
    };
  }, [isPlaying, currentTrack.duration, repeat]);
  
  // Reset time when track changes
  useEffect(() => {
    setCurrentTime(0);
    setBuffered(10);
  }, [currentTrack.id]);

  // Handlers
  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleNext = useCallback(() => {
    const nextTrack = shuffle 
      ? queue[Math.floor(Math.random() * queue.length)]
      : getNextTrack(currentTrack.id, queue);
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
  }, [currentTrack.id, queue, shuffle]);

  const handlePrev = useCallback(() => {
    // If more than 3 seconds in, restart the track
    if (currentTime > 3) {
      setCurrentTime(0);
    } else {
      const prevTrack = getPrevTrack(currentTrack.id, queue);
      setCurrentTrack(prevTrack);
    }
  }, [currentTrack.id, currentTime, queue]);

  const handleSeek = useCallback((time) => {
    setCurrentTime(time);
  }, []);

  const handleSeekForward = useCallback(() => {
    setCurrentTime(prev => Math.min(currentTrack.duration, prev + 10));
  }, [currentTrack.duration]);

  const handleSeekBackward = useCallback(() => {
    setCurrentTime(prev => Math.max(0, prev - 10));
  }, []);

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  }, []);

  const handleVolumeUp = useCallback(() => {
    setVolume(prev => Math.min(1, prev + 0.1));
    setIsMuted(false);
  }, []);

  const handleVolumeDown = useCallback(() => {
    setVolume(prev => Math.max(0, prev - 0.1));
  }, []);

  const handleToggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const handleToggleShuffle = useCallback(() => {
    setShuffle(prev => !prev);
  }, []);

  const handleToggleRepeat = useCallback(() => {
    setRepeat(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  }, []);

  const handleToggleLike = useCallback(() => {
    setIsLiked(prev => !prev);
  }, []);

  const handleToggleLyrics = useCallback(() => {
    setShowLyrics(prev => !prev);
  }, []);

  const handleToggleQueue = useCallback(() => {
    setShowQueue(prev => !prev);
  }, []);

  const handleSelectTrack = useCallback((track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setShowQueue(false);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onPlayPause: handlePlayPause,
    onNext: handleNext,
    onPrev: handlePrev,
    onSeekForward: handleSeekForward,
    onSeekBackward: handleSeekBackward,
    onVolumeUp: handleVolumeUp,
    onVolumeDown: handleVolumeDown,
    onToggleMute: handleToggleMute,
    onToggleLyrics: handleToggleLyrics,
    onToggleQueue: handleToggleQueue,
    onToggleShuffle: handleToggleShuffle,
    onToggleRepeat: handleToggleRepeat,
  });

  return (
    <div 
      className="music-player glass-card"
      style={{ '--track-color': currentTrack.color }}
    >
      {/* Top section: Album art + Track info */}
      <div className="player-header">
        <AlbumArt
          src={currentTrack.albumArt}
          alt={`${currentTrack.album} album art`}
          color={currentTrack.color}
          isPlaying={isPlaying}
        />
        
        <div className="track-info">
          <h2 className="track-title">{currentTrack.title}</h2>
          <p className="track-artist">{currentTrack.artist}</p>
          <p className="track-album">{currentTrack.album}</p>
        </div>
      </div>

      {/* Progress bar */}
      <ProgressBar
        currentTime={currentTime}
        duration={currentTrack.duration}
        buffered={buffered}
        onSeek={handleSeek}
      />

      {/* Playback controls */}
      <Controls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onPrevious={handlePrev}
        onNext={handleNext}
        shuffle={shuffle}
        onToggleShuffle={handleToggleShuffle}
        repeat={repeat}
        onToggleRepeat={handleToggleRepeat}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isLiked={isLiked}
        onToggleLike={handleToggleLike}
        showLyrics={showLyrics}
        onToggleLyrics={handleToggleLyrics}
        showQueue={showQueue}
        onToggleQueue={handleToggleQueue}
      />

      {/* Mini lyrics display */}
      <MiniLyrics
        lyrics={currentTrack.lyrics}
        currentTime={currentTime}
        isVisible={showLyrics}
      />

      {/* Queue preview */}
      <QueuePreview
        queue={queue}
        currentTrackId={currentTrack.id}
        isVisible={showQueue}
        onSelectTrack={handleSelectTrack}
      />
    </div>
  );
};

export default MusicPlayer;
