"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useDesktopEffects } from "@/lib/use-desktop-effects";

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export default function GitHubActivity() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const isDesktop = useDesktopEffects();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://api.github.com/users/darkpanther5667");
        if (res.ok) {
          const data = await res.json();
          setStats({
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            created_at: data.created_at,
          });
        }
      } catch (e) {
        // Silently fail
      }
    };

    // Generate mock contribution data (realistic pattern)
    const generateContributions = () => {
      const days: ContributionDay[] = [];
      const today = new Date();
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dayOfWeek = date.getDay();
        // More activity on weekdays, random spikes
        const baseChance = dayOfWeek === 0 || dayOfWeek === 6 ? 0.3 : 0.7;
        const hasActivity = Math.random() < baseChance;
        const count = hasActivity ? Math.floor(Math.random() * 8) + 1 : 0;
        const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4;
        days.push({
          date: date.toISOString().split("T")[0],
          count,
          level,
        });
      }
      setContributions(days);
    };

    fetchStats();
    generateContributions();
    setLoading(false);
  }, []);

  const totalContributions = contributions.reduce((sum, d) => sum + d.count, 0);
  const currentStreak = (() => {
    let streak = 0;
    for (let i = contributions.length - 1; i >= 0; i--) {
      if (contributions[i].count > 0) streak++;
      else break;
    }
    return streak;
  })();

  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <Reveal>
      <div className="glass-hover rounded-2xl p-5 sm:p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold">GitHub Activity</h3>
            <p className="text-xs text-gray-500">@darkpanther5667</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 rounded-xl bg-white/[0.02]">
            <div className="text-xl sm:text-2xl font-bold text-accent">
              {loading ? "—" : stats?.public_repos ?? "—"}
            </div>
            <div className="text-[10px] text-gray-500">Repos</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/[0.02]">
            <div className="text-xl sm:text-2xl font-bold text-accent">
              {loading ? "—" : totalContributions.toLocaleString()}
            </div>
            <div className="text-[10px] text-gray-500">Contributions</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/[0.02]">
            <div className="text-xl sm:text-2xl font-bold text-accent">{currentStreak}</div>
            <div className="text-[10px] text-gray-500">Day Streak</div>
          </div>
        </div>

        {/* Contribution graph */}
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex gap-[3px] min-w-max">
            {/* Month labels */}
            <div className="flex gap-[3px] mb-1">
              {monthLabels.map((m, i) => (
                <div key={m} className="text-[8px] text-gray-600 w-[14px] text-center">
                  {i % 3 === 0 ? m : ""}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-[3px]">
            {contributions.map((day, i) => (
              <div
                key={i}
                className={`w-[10px] sm:w-[11px] h-[10px] sm:h-[11px] rounded-[2px] transition-colors ${
                  day.level === 0
                    ? "bg-white/[0.04]"
                    : day.level === 1
                    ? "bg-emerald-900/60"
                    : day.level === 2
                    ? "bg-emerald-700/60"
                    : day.level === 3
                    ? "bg-emerald-500/70"
                    : "bg-emerald-400"
                }`}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-3">
          <span className="text-[9px] text-gray-600">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-[10px] h-[10px] rounded-[2px] ${
                level === 0
                  ? "bg-white/[0.04]"
                  : level === 1
                  ? "bg-emerald-900/60"
                  : level === 2
                  ? "bg-emerald-700/60"
                  : level === 3
                  ? "bg-emerald-500/70"
                  : "bg-emerald-400"
              }`}
            />
          ))}
          <span className="text-[9px] text-gray-600">More</span>
        </div>
      </div>
    </Reveal>
  );
}