import { memo } from 'react';
import './QueuePreview.css';

const QueuePreview = memo(({ queue, currentTrackId, isVisible, onSelectTrack }) => {
  if (!isVisible || !queue || queue.length === 0) {
    return null;
  }

  // Filter out current track and show next few
  const upcomingTracks = queue.filter(t => t.id !== currentTrackId).slice(0, 4);

  return (
    <div className="queue-preview">
      <div className="queue-header">
        <span className="queue-title">Up Next</span>
        <span className="queue-count">{upcomingTracks.length} tracks</span>
      </div>
      
      <div className="queue-list">
        {upcomingTracks.map((track, index) => (
          <button
            key={track.id}
            className="queue-item"
            onClick={() => onSelectTrack?.(track)}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <img 
              src={track.albumArt} 
              alt={track.album}
              className="queue-item-art"
              loading="lazy"
            />
            <div className="queue-item-info">
              <span className="queue-item-title">{track.title}</span>
              <span className="queue-item-artist">{track.artist}</span>
            </div>
            <span className="queue-item-index">{index + 1}</span>
          </button>
        ))}
      </div>
      
      {queue.length > 4 && (
        <div className="queue-more">
          + {queue.length - 4} more in queue
        </div>
      )}
    </div>
  );
});

QueuePreview.displayName = 'QueuePreview';

export default QueuePreview;
