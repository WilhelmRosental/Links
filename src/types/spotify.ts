// types/spotify.ts

// Response types pour l'authentification
export interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
}

export interface SpotifyError {
    error: string;
    error_description?: string;
}

// Types pour Now Playing
export interface SpotifyNowPlayingResponse {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    album?: string;
    albumImageUrl?: string;
    songUrl?: string;
}

export interface SpotifyNowPlayingProgressResponse extends SpotifyNowPlayingResponse {
    progress_ms: number;
    duration_ms: number;
}

// Types pour l'API Spotify
export interface SpotifyArtist {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: 'artist';
    uri: string;
}

export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

export interface SpotifyAlbum {
    album_type: string;
    artists: SpotifyArtist[];
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: 'album';
    uri: string;
}

export interface SpotifyTrack {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: 'track';
    uri: string;
}

export interface SpotifyCurrentlyPlayingResponse {
    timestamp: number;
    context: {
        external_urls: {
            spotify: string;
        };
        href: string;
        type: string;
        uri: string;
    } | null;
    progress_ms: number;
    item: SpotifyTrack;
    currently_playing_type: 'track' | 'episode' | 'ad';
    actions: {
        disallows: {
            [key: string]: boolean;
        };
    };
    is_playing: boolean;
}

// Types utilitaires
export interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface RefreshTokenResponse extends TokenResponse {
    scope: string;
    refresh_token?: string;
}