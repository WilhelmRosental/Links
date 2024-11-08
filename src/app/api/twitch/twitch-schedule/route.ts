import { NextResponse } from 'next/server'

async function getAccessToken() {
    try {
        const response = await fetch('https://id.twitch.tv/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret: process.env.TWITCH_CLIENT_SECRET,
                grant_type: 'client_credentials'
            })
        })

        if (!response.ok) {
            throw new Error(`Token error: ${response.status}`)
        }

        const data = await response.json()
        return data.access_token
    } catch (error) {
        console.error('Error getting token:', error)
        throw error
    }
}

async function getSchedule(accessToken: string) {
    try {
        const response = await fetch(
            `https://api.twitch.tv/helix/schedule?broadcaster_id=${process.env.TWITCH_BROADCASTER_ID}`,
            {
                headers: {
                    'Client-ID': process.env.TWITCH_CLIENT_ID!,
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        )

        if (!response.ok) {
            throw new Error(`Schedule error: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Error getting schedule:', error)
        throw error
    }
}

export async function GET() {
    try {
        if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_CLIENT_SECRET || !process.env.TWITCH_BROADCASTER_ID) {
            return NextResponse.json(
                { error: 'Missing environment variables' },
                { status: 500 }
            )
        }

        const accessToken = await getAccessToken()
        const schedule = await getSchedule(accessToken)

        return NextResponse.json(schedule)
    } catch (error) {
        console.error('Error in API route:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}