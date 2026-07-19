import type { ChatMessage, Donation } from "./types"

const userList = ["구독전사", "감자머글", "야식러버", "새벽감성", "코딩고양이", "무지개송어"]

const donationMessageList = [
  "오늘 방송도 화이팅!",
  "치킨 사드세요 🍗",
  "목표까지 가자!",
  "덕분에 힐링합니다",
  "가보자고",
]

const chatMessageList = [
  "ㅋㅋㅋㅋㅋ",
  "이거 개꿀잼",
  "방금 그거 다시 보여주세요",
  "안녕하세요~",
  "오늘 컨디션 좋아보이네요",
  "gg",
]

const amountList = [1000, 3000, 5000, 10000, 30000, 50000]

function pick<T>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)]
}

export function randomDonation(): Donation {
  return {
    id: crypto.randomUUID(),
    user: pick(userList),
    amount: pick(amountList),
    message: pick(donationMessageList),
  }
}

export function randomChat(): ChatMessage {
  return {
    id: crypto.randomUUID(),
    user: pick(userList),
    message: pick(chatMessageList),
  }
}
