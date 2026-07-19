import type { OverlayEvent } from "./types"

export const CHANNEL_NAME = "reroll-overlay"

let channel: BroadcastChannel | null = null

function getChannel() {
  if (typeof window === "undefined") return null
  if (!channel) channel = new BroadcastChannel(CHANNEL_NAME)
  return channel
}

export function sendEvent(event: OverlayEvent) {
  getChannel()?.postMessage(event)
}
