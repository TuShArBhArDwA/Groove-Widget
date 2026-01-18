// Mock data for the music player demo

export const mockTracks = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: 200, // seconds
        albumArt: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
        color: "#e11d48", // Dominant color for background
        lyrics: [
            { time: 0, text: "♪ Instrumental ♪" },
            { time: 12, text: "I've been tryna call" },
            { time: 15, text: "I've been on my own for long enough" },
            { time: 19, text: "Maybe you can show me how to love, maybe" },
            { time: 24, text: "I'm going through withdrawals" },
            { time: 28, text: "You don't even have to do too much" },
            { time: 32, text: "You can turn me on with just a touch, baby" },
            { time: 37, text: "I look around and" },
            { time: 40, text: "Sin City's cold and empty" },
            { time: 44, text: "No one's around to judge me" },
            { time: 48, text: "I can't see clearly when you're gone" },
            { time: 54, text: "I said, ooh, I'm blinded by the lights" },
            { time: 60, text: "No, I can't sleep until I feel your touch" },
            { time: 66, text: "I said, ooh, I'm drowning in the night" },
            { time: 72, text: "Oh, when I'm like this, you're the one I trust" },
            { time: 78, text: "Hey, hey, hey" },
            { time: 84, text: "I'm running out of time" },
            { time: 88, text: "'Cause I can see the sun light up the sky" },
            { time: 92, text: "So I hit the road in overdrive, baby" },
            { time: 98, text: "Oh, the city's cold and empty" },
            { time: 102, text: "No one's around to judge me" },
            { time: 106, text: "I can't see clearly when you're gone" },
        ]
    },
    {
        id: 2,
        title: "Starboy",
        artist: "The Weeknd ft. Daft Punk",
        album: "Starboy",
        duration: 230,
        albumArt: "https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a",
        color: "#7c3aed",
        lyrics: [
            { time: 0, text: "♪ Instrumental ♪" },
            { time: 8, text: "I'm tryna put you in the worst mood, ah" },
            { time: 12, text: "P1 cleaner than your church shoes, ah" },
            { time: 16, text: "Milli point two just to hurt you, ah" },
            { time: 20, text: "All red Lamb' just to tease you, ah" },
            { time: 24, text: "None of these toys on lease too, ah" },
            { time: 28, text: "Made your whole year in a week too, yeah" },
        ]
    },
    {
        id: 3,
        title: "Save Your Tears",
        artist: "The Weeknd",
        album: "After Hours",
        duration: 215,
        albumArt: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
        color: "#dc2626",
        lyrics: [
            { time: 0, text: "♪ Instrumental ♪" },
            { time: 10, text: "I saw you dancing in a crowded room" },
            { time: 14, text: "You look so happy when I'm not with you" },
            { time: 18, text: "But then you saw me, caught you by surprise" },
            { time: 22, text: "A single teardrop falling from your eye" },
        ]
    },
    {
        id: 4,
        title: "Die For You",
        artist: "The Weeknd",
        album: "Starboy",
        duration: 260,
        albumArt: "https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a",
        color: "#8b5cf6",
        lyrics: [
            { time: 0, text: "♪ Instrumental ♪" },
            { time: 8, text: "I'm findin' ways to articulate" },
            { time: 12, text: "The feeling I'm goin' through" },
            { time: 16, text: "I just can't say I don't love you" },
            { time: 20, text: "'Cause I love you, yeah" },
        ]
    },
    {
        id: 5,
        title: "Take My Breath",
        artist: "The Weeknd",
        album: "Dawn FM",
        duration: 340,
        albumArt: "https://i.scdn.co/image/ab67616d0000b273c8b420cd7d7dab4c2b7fe0c2",
        color: "#0ea5e9",
        lyrics: [
            { time: 0, text: "♪ Instrumental ♪" },
            { time: 15, text: "I saw the fire in your eyes" },
            { time: 19, text: "I saw the fire when I look into your eyes" },
            { time: 24, text: "You tell me things you wanna try" },
            { time: 28, text: "I know temptation is the devil in disguise" },
        ]
    }
];

export const getNextTrack = (currentId, tracks = mockTracks) => {
    const currentIndex = tracks.findIndex(t => t.id === currentId);
    const nextIndex = (currentIndex + 1) % tracks.length;
    return tracks[nextIndex];
};

export const getPrevTrack = (currentId, tracks = mockTracks) => {
    const currentIndex = tracks.findIndex(t => t.id === currentId);
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    return tracks[prevIndex];
};

export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getCurrentLyric = (lyrics, currentTime) => {
    if (!lyrics || lyrics.length === 0) return null;

    let currentLyric = lyrics[0];
    for (const lyric of lyrics) {
        if (lyric.time <= currentTime) {
            currentLyric = lyric;
        } else {
            break;
        }
    }
    return currentLyric;
};

export const getUpcomingLyrics = (lyrics, currentTime, count = 2) => {
    if (!lyrics) return [];

    const currentIndex = lyrics.findIndex((lyric, i) => {
        const next = lyrics[i + 1];
        return lyric.time <= currentTime && (!next || next.time > currentTime);
    });

    if (currentIndex === -1) return lyrics.slice(0, count);
    return lyrics.slice(currentIndex + 1, currentIndex + 1 + count);
};
