"use client";

import { useChannel } from "@/hooks/useChannel";
import Section from "./Section";
import { randomChat, randomDonation } from "@/lib/samples";

const QuickActionList = () => {
    const { send } = useChannel();

    const flood = () => {
        Array.from({ length: 4 }).forEach((_, index) => {
            setTimeout(
                () => send({ type: "donation", donation: randomDonation() }),
                index * 250,
            );
        });
    };

    return (
        <Section title="빠른 테스트">
            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={() =>
                        send({
                            type: "donation",
                            donation: randomDonation(),
                        })
                    }
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
                    onClick={() =>
                        send({ type: "chat", message: randomChat() })
                    }
                    className="rounded-lg bg-white/10 px-3 py-2.5 text-sm font-semibold transition hover:bg-white/15"
                >
                    랜덤 채팅
                </button>
                <button
                    onClick={() => send({ type: "reset" })}
                    className="rounded-lg bg-white/5 px-3 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10"
                >
                    초기화
                </button>
            </div>
        </Section>
    );
};

export default QuickActionList;
