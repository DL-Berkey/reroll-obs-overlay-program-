export type ChatMessage = {
  id: string
  user: string
  message: string
}

export type Donation = {
  id: string
  user: string
  amount: number
  message: string
}

export type OverlayState = {
  chatList: ChatMessage[]
  alertQueue: Donation[]
  currentAlert: Donation | null
  goalTotal: number
  goalTarget: number
}

export type OverlayEvent =
  | { type: "chat"; message: ChatMessage }
  | { type: "donation"; donation: Donation }
  | { type: "goal-target"; target: number }
  | { type: "reset" }

export type OverlayAction = OverlayEvent | { type: "alert-end" }
