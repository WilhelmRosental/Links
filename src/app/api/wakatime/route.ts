import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.WAKATIME_API_KEY;
    const url = 'https://wakatime.com/api/v1/users/current/stats/last_7_days';

    if (!apiKey) {
        console.error('API key is missing');
        return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
    }

    try {
        const res = await fetch(url, {
            headers: {
                Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`,
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('API response error:', res.status, errorText);
            throw new Error(`Failed to fetch WakaTime stats: ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
