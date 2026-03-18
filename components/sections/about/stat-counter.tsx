"use client";

import { useState, useEffect } from "react";

interface StatCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  active: boolean;
}

export function StatCounter({ target, suffix = "", duration = 1600, active }: StatCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.floor(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return (
    <span>
      ~{count}
      {suffix}
    </span>
  );
}
