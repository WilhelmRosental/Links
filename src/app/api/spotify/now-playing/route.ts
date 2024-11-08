import { NextResponse } from 'next/server';
import type {
    SpotifyCurrentlyPlayingResponse,
    SpotifyNowPlayingProgressResponse,
    SpotifyTokenResponse
} from '@/types/spotify';

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

async function getAccessToken(refresh_token: string): Promise<SpotifyTokenResponse> {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!client_id || !client_secret) {
        throw new Error('Missing Spotify credentials');
    }

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token,
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    return response.json();
}

async function getNowPlaying(refresh_token: string): Promise<Response> {
    const { access_token } = await getAccessToken(refresh_token);

    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
}

export async function GET(): Promise<NextResponse> {
    try {
        const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

        if (!refresh_token) {
            return NextResponse.json(
                { error: 'Missing refresh token' },
                { status: 500 }
            );
        }

        const response = await getNowPlaying(refresh_token);

        if (response.status === 204 || response.status > 400) {
            return NextResponse.json({
                isPlaying: false,
                progress_ms: 0,
                duration_ms: 0,
                title: '',
                artist: '',
                album: '',
                albumImageUrl: '',
                songUrl: ''
            });
        }

        const data = await response.json() as SpotifyCurrentlyPlayingResponse;

        if (!data.item) {
            return NextResponse.json({
                isPlaying: false,
                progress_ms: 0,
                duration_ms: 0,
                title: '',
                artist: '',
                album: '',
                albumImageUrl: '',
                songUrl: ''
            });
        }

        const nowPlaying: SpotifyNowPlayingProgressResponse = {
            isPlaying: data.is_playing,
            progress_ms: data.progress_ms,
            duration_ms: data.item.duration_ms,
            title: data.item.name,
            artist: data.item.artists.map((artist) => artist.name).join(', '),
            album: data.item.album.name,
            albumImageUrl: data.item.album.images[0]?.url,
            songUrl: data.item.external_urls.spotify
        };

        return NextResponse.json(nowPlaying);

    } catch (error) {
        console.error('Error getting now playing:', error);
        return NextResponse.json(
            { error: 'Failed to fetch now playing data' },
            { status: 500 }
        );
    }
}