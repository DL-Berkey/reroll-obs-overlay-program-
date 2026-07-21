"use client";

import { useState } from "react";

import { useChannel } from "@/hooks/useChannel";
import Section from "./Section";
import Input from "./Input";
import { formatWon } from "@/lib/format";

const GoalForm = () => {
    const [target, setTarget] = useState(100000);
    const { send } = useChannel();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const value = target;
        if (!value) {
            return;
        }

        send({ type: "goal-target", target: value });
    };

    return (
        <Section title="목표 설정">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    value={target}
                    onChange={(e) => setTarget(Number(e.target.value))}
                    placeholder="목표 금액"
                    type="number"
                />
                <button className="whitespace-nowrap rounded-lg bg-white/10 px-4 text-sm font-semibold transition hover:bg-white/15">
                    적용
                </button>
            </form>
            <p className="mt-2 text-xs text-white/40">
                현재 목표: {formatWon(target || 0)}
            </p>
        </Section>
    );
};

export default GoalForm;
