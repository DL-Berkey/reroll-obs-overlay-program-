"use client"

import { useOverlay } from "@/context/OverlayProvider"
import { formatWon } from "@/lib/format"

export function GoalGauge() {
  const { goalTotal, goalTarget } = useOverlay()
  const percent = goalTarget > 0 ? Math.min((goalTotal / goalTarget) * 100, 100) : 0

  return (
    <div className="w-80 rounded-xl bg-black/55 px-4 py-3 text-white backdrop-blur">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-semibold tracking-wide text-white/80">
          목표 후원
        </span>
        <span className="text-xs tabular-nums text-white/60">
          {percent.toFixed(0)}%
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500 transition-[width] duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-1.5 text-right text-sm tabular-nums">
        <span className="font-bold">{formatWon(goalTotal)}</span>
        <span className="text-white/50"> / {formatWon(goalTarget)}</span>
      </div>
    </div>
  )
}
