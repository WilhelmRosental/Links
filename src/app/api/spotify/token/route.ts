import { NextResponse } from 'next/server';
import axios from 'axios';

const clientId = process.env.SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN as string;

export async function GET() {
    try {
        if (!clientId || !clientSecret || !refreshToken) {
            console.error('Missing clientId, clientSecret, or refreshToken');
            throw new Error('Missing required environment variables');
        }

        const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            }).toString(),
            {
                headers: {
                    Authorization: `Basic ${authString}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const data = response.data;
        console.log('Token response:', data); // Log pour vérifier la réponse

        if (!data.access_token) {
            console.error('No access token in response:', data);
            throw new Error('Access token not found');
        }

        return NextResponse.json({ access_token: data.access_token });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching Spotify token with refresh token:', error.response?.data || error.message);
        } else {
            console.error('Error fetching Spotify token with refresh token:', error);
        }
        return NextResponse.json({ error: 'Failed to fetch token' }, { status: 500 });
    }
}
