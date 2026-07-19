"use client"

import { useState } from "react"
import { sendEvent } from "@/lib/channel"
import { formatWon } from "@/lib/format"
import { randomChat, randomDonation } from "@/lib/samples"

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
        <p className="mt-1 text-sm text-white/50">
          이벤트를 보내면 미리보기·오버레이에 실시간 반영됩니다.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        <QuickActions />
        <DonationForm />
        <ChatForm />
        <GoalForm />
      </div>
    </main>
  )
}

function QuickActions() {
  const flood = () => {
    Array.from({ length: 4 }).forEach((_, index) => {
      setTimeout(() => sendEvent({ type: "donation", donation: randomDonation() }), index * 250)
    })
  }

  return (
    <Section title="빠른 테스트">
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => sendEvent({ type: "donation", donation: randomDonation() })}
          className="rounded-lg bg-violet-600 px-3 py-2.5 text-sm font-semibold transition hover:bg-violet-500"
        >
          랜덤 후원
        </button>
        <button
          onClick={flood}
          className="rounded-lg bg-fuchsia-600 px-3 py-2.5 text-sm font-semibold transition hover:bg-fuchsia-500"
        >
          후원 몰아치기 (큐)
        </button>
        <button
          onClick={() => sendEvent({ type: "chat", message: randomChat() })}
          className="rounded-lg bg-white/10 px-3 py-2.5 text-sm font-semibold transition hover:bg-white/15"
        >
          랜덤 채팅
        </button>
        <button
          onClick={() => sendEvent({ type: "reset" })}
          className="rounded-lg bg-white/5 px-3 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10"
        >
          초기화
        </button>
      </div>
    </Section>
  )
}

function DonationForm() {
  const [user, setUser] = useState("")
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = Number(amount)
    if (!user.trim() || !value) return
    sendEvent({
      type: "donation",
      donation: { id: crypto.randomUUID(), user: user.trim(), amount: value, message: message.trim() },
    })
    setAmount("")
    setMessage("")
  }

  return (
    <Section title="후원 보내기">
      <form onSubmit={submit} className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <Input value={user} onChange={setUser} placeholder="닉네임" />
          <Input value={amount} onChange={setAmount} placeholder="금액" type="number" />
        </div>
        <Input value={message} onChange={setMessage} placeholder="후원 메시지 (선택)" />
        <SubmitButton>후원 보내기</SubmitButton>
      </form>
    </Section>
  )
}

function ChatForm() {
  const [user, setUser] = useState("")
  const [message, setMessage] = useState("")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user.trim() || !message.trim()) return
    sendEvent({
      type: "chat",
      message: { id: crypto.randomUUID(), user: user.trim(), message: message.trim() },
    })
    setMessage("")
  }

  return (
    <Section title="채팅 보내기">
      <form onSubmit={submit} className="flex flex-col gap-2">
        <Input value={user} onChange={setUser} placeholder="닉네임" />
        <Input value={message} onChange={setMessage} placeholder="채팅 메시지" />
        <SubmitButton>채팅 보내기</SubmitButton>
      </form>
    </Section>
  )
}

function GoalForm() {
  const [target, setTarget] = useState("100000")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = Number(target)
    if (!value) return
    sendEvent({ type: "goal-target", target: value })
  }

  return (
    <Section title="목표 설정">
      <form onSubmit={submit} className="flex gap-2">
        <Input value={target} onChange={setTarget} placeholder="목표 금액" type="number" />
        <button className="whitespace-nowrap rounded-lg bg-white/10 px-4 text-sm font-semibold transition hover:bg-white/15">
          적용
        </button>
      </form>
      <p className="mt-2 text-xs text-white/40">현재 목표: {formatWon(Number(target) || 0)}</p>
    </Section>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <h2 className="mb-3 text-sm font-semibold text-white/70">{title}</h2>
      {children}
    </section>
  )
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none transition placeholder:text-white/30 focus:border-violet-400/60"
    />
  )
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-lg bg-violet-600 px-3 py-2.5 text-sm font-semibold transition hover:bg-violet-500">
      {children}
    </button>
  )
}
