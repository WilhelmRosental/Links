"use client";
import { useEffect, useState } from "react";

type SteamGame = {
  appid: number;
  name: string;
  release_date: string;
  header_image: string;
  price: string;
  short_description: string;
};

export default function SteamGames() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch("/api/steam/last-games");

        if (!response.ok) {
          throw new Error("Erreur réseau");
        }

        const games: SteamGame[] = await response.json();
        console.log("Jeux Steam récents:", games);
      } catch (error) {
        console.error("Erreur lors de la récupération des jeux:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  return (
    <div className="p-4">
      {loading ? "Chargement..." : "Données chargées - Regardez la console"}
    </div>
  );
}
