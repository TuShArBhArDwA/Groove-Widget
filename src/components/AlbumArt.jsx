import { useState, useEffect, memo } from 'react';
import './AlbumArt.css';

const AlbumArt = memo(({ src, alt, color, isPlaying }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    if (src !== currentSrc) {
      setIsLoaded(false);
      const img = new Image();
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoaded(true);
      };
      img.src = src;
    }
  }, [src, currentSrc]);

  return (
    <div className={`album-art-container ${isPlaying ? 'playing' : ''}`}>
      {/* Dynamic background blur */}
      <div 
        className="album-art-bg"
        style={{ 
          backgroundImage: `url(${currentSrc})`,
          backgroundColor: color 
        }}
      />
      
      {/* Main album art */}
      <div className={`album-art-wrapper ${isLoaded ? 'loaded' : ''}`}>
        <img
          src={currentSrc}
          alt={alt}
          className="album-art-image"
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Vinyl effect overlay when playing */}
        <div className="album-art-vinyl" />
        
        {/* Reflection effect */}
        <div className="album-art-shine" />
      </div>
      
      {/* Pulsing ring when playing */}
      {isPlaying && (
        <div className="album-art-pulse">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
  );
});

AlbumArt.displayName = 'AlbumArt';

export default AlbumArt;
