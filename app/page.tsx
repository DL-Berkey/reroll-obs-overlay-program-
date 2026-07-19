import Link from "next/link"

const routeList = [
  {
    href: "/dashboard",
    title: "대시보드",
    desc: "후원·채팅 이벤트를 보내고 목표를 설정합니다.",
  },
  {
    href: "/preview",
    title: "미리보기",
    desc: "방송 배경 위에 오버레이를 얹어 확인합니다.",
  },
  {
    href: "/overlay",
    title: "오버레이",
    desc: "투명 배경. OBS 브라우저 소스에 넣는 화면입니다.",
  },
]

export default function Home() {
  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col justify-center gap-10 px-6 py-16">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">REROLL</h1>
        <p className="mt-2 text-white/60">
          채팅 · 후원 알림 · 목표 게이지 방송 오버레이와 제어 대시보드
        </p>
      </div>

      <div className="grid gap-3">
        {routeList.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="group rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-violet-400/50 hover:bg-white/10"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">{route.title}</span>
              <span className="text-white/30 transition group-hover:translate-x-0.5 group-hover:text-violet-300">
                →
              </span>
            </div>
            <p className="mt-1 text-sm text-white/50">{route.desc}</p>
          </Link>
        ))}
      </div>

      <p className="text-sm text-white/40">
        대시보드와 미리보기를 나란히 띄우고 이벤트를 보내면 바로 반영됩니다.
      </p>
    </main>
  )
}
