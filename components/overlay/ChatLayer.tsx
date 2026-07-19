"use client"

import { useOverlay } from "@/context/OverlayProvider"

export function ChatLayer() {
  const { chatList } = useOverlay()

  return (
    <div className="flex w-72 flex-col justify-end gap-1.5">
      {chatList.map((chat) => (
        <div
          key={chat.id}
          className="animate-chat w-fit max-w-full rounded-lg bg-black/55 px-3 py-1.5 text-sm text-white backdrop-blur"
        >
          <span className="font-semibold text-violet-300">{chat.user}</span>
          <span className="text-white/50"> · </span>
          <span className="break-words text-white/95">{chat.message}</span>
        </div>
      ))}
    </div>
  )
}
