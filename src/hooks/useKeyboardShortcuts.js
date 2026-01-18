import { useEffect, useCallback } from 'react';

const useKeyboardShortcuts = ({
    onPlayPause,
    onNext,
    onPrev,
    onSeekForward,
    onSeekBackward,
    onVolumeUp,
    onVolumeDown,
    onToggleMute,
    onToggleLyrics,
    onToggleQueue,
    onToggleShuffle,
    onToggleRepeat,
}) => {
    const handleKeyDown = useCallback((event) => {
        // Don't trigger shortcuts if user is typing in an input
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        const key = event.key.toLowerCase();
        const isCtrl = event.ctrlKey || event.metaKey;

        switch (key) {
            case ' ':
                event.preventDefault();
                onPlayPause?.();
                break;
            case 'arrowright':
                event.preventDefault();
                if (isCtrl) {
                    onNext?.();
                } else {
                    onSeekForward?.();
                }
                break;
            case 'arrowleft':
                event.preventDefault();
                if (isCtrl) {
                    onPrev?.();
                } else {
                    onSeekBackward?.();
                }
                break;
            case 'arrowup':
                event.preventDefault();
                onVolumeUp?.();
                break;
            case 'arrowdown':
                event.preventDefault();
                onVolumeDown?.();
                break;
            case 'm':
                event.preventDefault();
                onToggleMute?.();
                break;
            case 'l':
                event.preventDefault();
                onToggleLyrics?.();
                break;
            case 'q':
                event.preventDefault();
                onToggleQueue?.();
                break;
            case 's':
                event.preventDefault();
                onToggleShuffle?.();
                break;
            case 'r':
                event.preventDefault();
                onToggleRepeat?.();
                break;
            case 'n':
                if (isCtrl) {
                    event.preventDefault();
                    onNext?.();
                }
                break;
            case 'p':
                if (isCtrl) {
                    event.preventDefault();
                    onPrev?.();
                }
                break;
            default:
                break;
        }
    }, [
        onPlayPause, onNext, onPrev, onSeekForward, onSeekBackward,
        onVolumeUp, onVolumeDown, onToggleMute, onToggleLyrics,
        onToggleQueue, onToggleShuffle, onToggleRepeat
    ]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
};

export default useKeyboardShortcuts;
