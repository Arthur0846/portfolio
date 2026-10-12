"use client";

import { useEffect, useRef } from "react";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Tooltip,
} from "chart.js";
import type { Post } from "./lab-client";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

export default function PostsChart({ posts }: { posts: Post[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const styles = getComputedStyle(document.documentElement);
    const token = (name: string) => styles.getPropertyValue(name).trim();
    const signal = token("--signal");
    const signalHover = token("--signal-hover");
    const inkRaised = token("--ink-raised");
    const inkLine = token("--ink-line");
    const paper = token("--paper");
    const muted = token("--muted");
    const fontFamily = token("--font-plex-sans");

    const counts = new Map<number, number>();
    for (const post of posts) {
      counts.set(post.userId, (counts.get(post.userId) ?? 0) + 1);
    }
    const userIds = [...counts.keys()].sort((a, b) => a - b);

    chartRef.current?.destroy();
    chartRef.current = new Chart(canvas, {
      type: "bar",
      data: {
        labels: userIds.map((id) => `usuário ${id}`),
        datasets: [
          {
            label: "Postagens",
            data: userIds.map((id) => counts.get(id) ?? 0),
            backgroundColor: signal,
            hoverBackgroundColor: signalHover,
            borderRadius: 3,
            maxBarThickness: 34,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 500 },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: inkRaised,
            borderColor: inkLine,
            borderWidth: 1,
            titleColor: paper,
            bodyColor: muted,
            padding: 10,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { color: inkLine },
            ticks: {
              color: muted,
              font: { family: fontFamily, size: 11 },
            },
          },
          y: {
            beginAtZero: true,
            grid: { color: inkLine },
            border: { display: false },
            ticks: {
              color: muted,
              precision: 0,
              font: { family: fontFamily, size: 11 },
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [posts]);

  return <canvas ref={canvasRef} />;
}
