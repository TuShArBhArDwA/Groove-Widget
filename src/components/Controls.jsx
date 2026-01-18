import { memo } from 'react';
import './Controls.css';

// SVG Icons as components for better maintainability
const Icons = {
  Play: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  ),
  Pause: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
  ),
  Previous: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
    </svg>
  ),
  Next: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
    </svg>
  ),
  Shuffle: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
    </svg>
  ),
  Repeat: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
    </svg>
  ),
  RepeatOne: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"/>
    </svg>
  ),
  VolumeHigh: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </svg>
  ),
  VolumeLow: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
    </svg>
  ),
  VolumeMute: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
    </svg>
  ),
  Heart: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  HeartOutline: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
    </svg>
  ),
  Lyrics: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 6h16v2H4zm0 4h10v2H4zm0 4h16v2H4zm0 4h10v2H4z"/>
    </svg>
  ),
  Queue: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
    </svg>
  ),
};

const Controls = memo(({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  shuffle,
  onToggleShuffle,
  repeat, // 'off', 'all', 'one'
  onToggleRepeat,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
  isLiked,
  onToggleLike,
  showLyrics,
  onToggleLyrics,
  showQueue,
  onToggleQueue,
}) => {

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <Icons.VolumeMute />;
    if (volume < 0.5) return <Icons.VolumeLow />;
    return <Icons.VolumeHigh />;
  };

  const getRepeatIcon = () => {
    if (repeat === 'one') return <Icons.RepeatOne />;
    return <Icons.Repeat />;
  };

  return (
    <div className="controls-container">
      {/* Secondary controls row */}
      <div className="controls-secondary">
        <button
          className={`control-btn small ${shuffle ? 'active' : ''}`}
          onClick={onToggleShuffle}
          aria-label={shuffle ? 'Disable shuffle' : 'Enable shuffle'}
          title="Shuffle (S)"
        >
          <Icons.Shuffle />
        </button>
        
        <button
          className={`control-btn small ${repeat !== 'off' ? 'active' : ''}`}
          onClick={onToggleRepeat}
          aria-label={`Repeat: ${repeat}`}
          title="Repeat (R)"
        >
          {getRepeatIcon()}
        </button>
      </div>

      {/* Main playback controls */}
      <div className="controls-main">
        <button
          className="control-btn medium"
          onClick={onPrevious}
          aria-label="Previous track"
          title="Previous (Ctrl+←)"
        >
          <Icons.Previous />
        </button>

        <button
          className={`control-btn play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={onPlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          title="Play/Pause (Space)"
        >
          {isPlaying ? <Icons.Pause /> : <Icons.Play />}
        </button>

        <button
          className="control-btn medium"
          onClick={onNext}
          aria-label="Next track"
          title="Next (Ctrl+→)"
        >
          <Icons.Next />
        </button>
      </div>

      {/* Extra controls row */}
      <div className="controls-extra">
        <button
          className={`control-btn small ${isLiked ? 'liked' : ''}`}
          onClick={onToggleLike}
          aria-label={isLiked ? 'Remove from liked' : 'Add to liked'}
          title="Like"
        >
          {isLiked ? <Icons.Heart /> : <Icons.HeartOutline />}
        </button>

        <button
          className={`control-btn small ${showLyrics ? 'active' : ''}`}
          onClick={onToggleLyrics}
          aria-label={showLyrics ? 'Hide lyrics' : 'Show lyrics'}
          title="Lyrics (L)"
        >
          <Icons.Lyrics />
        </button>

        <button
          className={`control-btn small ${showQueue ? 'active' : ''}`}
          onClick={onToggleQueue}
          aria-label={showQueue ? 'Hide queue' : 'Show queue'}
          title="Queue (Q)"
        >
          <Icons.Queue />
        </button>

        {/* Volume control */}
        <div className="volume-control">
          <button
            className="control-btn small"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            title="Mute (M)"
          >
            {getVolumeIcon()}
          </button>
          <input
            type="range"
            className="volume-slider"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => onVolumeChange?.(parseFloat(e.target.value))}
            aria-label="Volume"
            title={`Volume: ${Math.round(volume * 100)}%`}
          />
        </div>
      </div>
    </div>
  );
});

Controls.displayName = 'Controls';

export default Controls;
