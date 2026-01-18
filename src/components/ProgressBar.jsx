import { useState, useRef, useCallback, memo } from 'react';
import { formatTime } from '../data/mockData';
import './ProgressBar.css';

const ProgressBar = memo(({ 
  currentTime, 
  duration, 
  onSeek,
  buffered = 0 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(0);
  const progressRef = useRef(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedProgress = duration > 0 ? (buffered / duration) * 100 : 0;

  const calculateTime = useCallback((clientX) => {
    if (!progressRef.current || duration === 0) return 0;
    
    const rect = progressRef.current.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    const clampedPosition = Math.max(0, Math.min(1, position));
    return clampedPosition * duration;
  }, [duration]);

  const handleMouseMove = useCallback((e) => {
    if (!progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    setHoverPosition(Math.max(0, Math.min(100, position * 100)));
    setHoverTime(calculateTime(e.clientX));
    
    if (isDragging) {
      onSeek?.(calculateTime(e.clientX));
    }
  }, [isDragging, calculateTime, onSeek]);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    onSeek?.(calculateTime(e.clientX));
  }, [calculateTime, onSeek]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverTime(null);
    setIsDragging(false);
  }, []);

  const handleKeyDown = useCallback((e) => {
    const step = duration * 0.02; // 2% of duration
    if (e.key === 'ArrowLeft') {
      onSeek?.(Math.max(0, currentTime - step));
    } else if (e.key === 'ArrowRight') {
      onSeek?.(Math.min(duration, currentTime + step));
    }
  }, [currentTime, duration, onSeek]);

  return (
    <div className="progress-container">
      {/* Time display */}
      <span className="progress-time current">{formatTime(currentTime)}</span>
      
      {/* Progress bar track */}
      <div
        ref={progressRef}
        className={`progress-track ${isDragging ? 'dragging' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
        aria-valuetext={formatTime(currentTime)}
      >
        {/* Background */}
        <div className="progress-bg" />
        
        {/* Buffered indicator */}
        <div 
          className="progress-buffered"
          style={{ width: `${bufferedProgress}%` }}
        />
        
        {/* Progress fill */}
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
        
        {/* Hover preview */}
        {hoverTime !== null && (
          <div 
            className="progress-hover"
            style={{ left: `${hoverPosition}%` }}
          >
            <span className="progress-hover-time">{formatTime(hoverTime)}</span>
          </div>
        )}
        
        {/* Thumb */}
        <div 
          className="progress-thumb"
          style={{ left: `${progress}%` }}
        />
      </div>
      
      {/* Duration display */}
      <span className="progress-time duration">{formatTime(duration)}</span>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
