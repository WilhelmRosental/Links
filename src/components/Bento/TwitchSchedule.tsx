"use client";

import { useState, useEffect } from "react";

interface ScheduleSegment {
  start_time: string;
  end_time: string;
  title: string;
  category?: {
    name?: string;
  };
}

interface ScheduleResponse {
  data: {
    segments: ScheduleSegment[];
  };
}

export default function TwitchSchedule() {
  const [schedule, setSchedule] = useState<ScheduleSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await fetch("/api/twitch/twitch-schedule");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ScheduleResponse = await response.json();
        console.log("Données reçues:", data); // Pour le debug
        setSchedule(data.data.segments || []);
      } catch (err) {
        console.error("Erreur:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    fetchSchedule();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">Erreur: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Programme des streams</h2>
      {schedule.length === 0 ? (
        <p>Aucun programme prévu</p>
      ) : (
        <div className="space-y-4">
          {schedule.map((segment, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <h3 className="font-bold">{segment.title}</h3>
              <p className="text-gray-600">
                {new Date(segment.start_time).toLocaleString()} -
                {new Date(segment.end_time).toLocaleString()}
              </p>
              {/* Vérification de l'existence de category et name */}
              {segment.category?.name && (
                <p className="text-sm text-gray-500">{segment.category.name}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
