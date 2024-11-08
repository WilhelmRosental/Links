"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Progress } from "@radix-ui/themes";
import type { SpotifyNowPlayingProgressResponse } from "@/types/spotify";

export default function SpotifyProgress() {
  const [data, setData] = useState<SpotifyNowPlayingProgressResponse | null>(
    null
  );
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const fetchNowPlaying = useCallback(async () => {
    try {
      const response = await fetch("/api/spotify/now-playing");
      if (!response.ok) throw new Error("Failed to fetch");
      const newData = await response.json();
      setData(newData);
      if (newData.isPlaying) {
        setProgress(newData.progress_ms);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    if (data?.isPlaying) {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= data.duration_ms) {
            clearInterval(progressInterval);
            fetchNowPlaying();
            return 0;
          }
          return prev + 1000;
        });
      }, 1000);
    }

    return () => clearInterval(progressInterval);
  }, [data?.isPlaying, data?.duration_ms, fetchNowPlaying]);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div className="animate-pulse">Loading...</div>;

  const progressPercentage = (progress / data.duration_ms) * 100;

  return (
    <Card
      variant="surface"
      className="w-full max-w-md p-4 rounded-lg shadow-lg"
    >
      <div className="flex items-center space-x-4 mb-4">
        {data.albumImageUrl && (
          <img
            src={data.albumImageUrl}
            alt={data.album}
            className="w-16 h-16 rounded-md shadow-sm"
          />
        )}
        <div className="flex-1 min-w-0">
          <a
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-lg truncate block"
          >
            {data.title}
          </a>
          <p className="text-sm truncate">{data.artist}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Progress
          className="w-full h-full transition-transform duration-500 ease-in-out"
          value={progressPercentage}
        />

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <span>{formatTime(progress)}</span>
          </div>
          <span>{formatTime(data.duration_ms)}</span>
        </div>
      </div>
    </Card>
  );
}
