"use client"

import { createContext, useContext, useEffect, useReducer } from "react"
import { CHANNEL_NAME } from "@/lib/channel"
import { initialState, overlayReducer } from "@/lib/reducer"
import type { OverlayEvent, OverlayState } from "@/lib/types"

const ALERT_DURATION = 4500

const OverlayContext = createContext<OverlayState | null>(null)

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(overlayReducer, initialState)

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME)
    channel.onmessage = (event: MessageEvent<OverlayEvent>) =>
      dispatch(event.data)
    return () => channel.close()
  }, [])

  useEffect(() => {
    if (!state.currentAlert) return
    const timer = setTimeout(() => dispatch({ type: "alert-end" }), ALERT_DURATION)
    return () => clearTimeout(timer)
  }, [state.currentAlert])

  return (
    <OverlayContext.Provider value={state}>{children}</OverlayContext.Provider>
  )
}

export function useOverlay() {
  const state = useContext(OverlayContext)
  if (!state) throw new Error("useOverlay must be used within OverlayProvider")
  return state
}
