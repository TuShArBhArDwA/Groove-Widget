import { memo, useMemo } from 'react';
import { getCurrentLyric, getUpcomingLyrics } from '../data/mockData';
import './MiniLyrics.css';

const MiniLyrics = memo(({ lyrics, currentTime, isVisible }) => {
  const currentLyric = useMemo(() => 
    getCurrentLyric(lyrics, currentTime),
    [lyrics, currentTime]
  );

  const upcomingLyrics = useMemo(() => 
    getUpcomingLyrics(lyrics, currentTime, 2),
    [lyrics, currentTime]
  );

  if (!isVisible || !lyrics || lyrics.length === 0) {
    return null;
  }

  return (
    <div className="mini-lyrics">
      <div className="lyrics-container">
        {/* Current lyric */}
        <div className="lyric-line current" key={currentLyric?.time}>
          {currentLyric?.text || '♪'}
        </div>
        
        {/* Upcoming lyrics */}
        {upcomingLyrics.map((lyric, index) => (
          <div 
            key={lyric.time} 
            className={`lyric-line upcoming delay-${index + 1}`}
          >
            {lyric.text}
          </div>
        ))}
      </div>
      
      {/* Decorative elements */}
      <div className="lyrics-fade top" />
      <div className="lyrics-fade bottom" />
    </div>
  );
});

MiniLyrics.displayName = 'MiniLyrics';

export default MiniLyrics;
