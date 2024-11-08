import { NextResponse } from 'next/server';

type SteamGame = {
    appid: number;
    name: string;
    playtime_forever: number;
    img_icon_url: string;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
    rtime_last_played: number;
};

type FormattedGame = {
    appid: number;
    name: string;
    totalPlaytime: {
        hours: number;
        minutes: number;
    };
    lastPlayed: string;
    iconUrl: string;
};

export async function GET() {
    try {
        const STEAM_API_KEY = process.env.STEAM_API_KEY;
        const STEAM_ID = process.env.STEAM_ID;

        if (!STEAM_API_KEY || !STEAM_ID) {
            return NextResponse.json(
                { error: 'Configuration Steam manquante (API_KEY ou STEAM_ID)' },
                { status: 500 }
            );
        }

        const response = await fetch(
            `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json&include_appinfo=1&include_played_free_games=1`,
            { next: { revalidate: 3600 } }
        );

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des jeux');
        }

        const data = await response.json();
        const games: SteamGame[] = data.response.games || [];

        const topGames = games
            .sort((a, b) => b.playtime_forever - a.playtime_forever)
            .slice(0, 10)
            .map((game): FormattedGame => {
                const totalHours = Math.floor(game.playtime_forever / 60);
                const remainingMinutes = game.playtime_forever % 60;

                const lastPlayed = new Date(game.rtime_last_played * 1000)
                    .toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });

                const iconUrl = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;

                return {
                    appid: game.appid,
                    name: game.name,
                    totalPlaytime: {
                        hours: totalHours,
                        minutes: remainingMinutes
                    },
                    lastPlayed,
                    iconUrl
                };
            });

        return NextResponse.json(topGames);

    } catch (error) {
        console.error('Erreur:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des données Steam' },
            { status: 500 }
        );
    }
}