"use client";
import { useEffect, useState } from "react";

interface WakaTimeData {
  total_seconds: number;
  languages: { name: string; total_seconds: number }[];
}

export default function WakaTimeStats() {
  const [stats, setStats] = useState<WakaTimeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/wakatime");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        setStats(data.data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchStats();
  }, []);

  if (error) return <div>Erreur : {error}</div>;

  if (!stats) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Statistiques des 7 derniers jours</h2>
      <p>Total de secondes codées : {stats.total_seconds}</p>
      <h3>Langages :</h3>
      <ul>
        {stats.languages.map((lang) => (
          <li key={lang.name}>
            {lang.name} : {lang.total_seconds} secondes
          </li>
        ))}
      </ul>
    </div>
  );
}
