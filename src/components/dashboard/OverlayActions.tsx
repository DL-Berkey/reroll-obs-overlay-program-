"use client";

import { useState } from "react";
import Section from "./Section";

const OverlayActions = () => {
    const [copied, setCopied] = useState(false);

    const openPreview = () => {
        window.open("/preview", "reroll-preview", "width=1280,height=720");
    };

    const copyOverlayUrl = () => {
        navigator.clipboard.writeText(`${window.location.origin}/overlay`);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Section title="OBS 연결">
            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={openPreview}
                    className="rounded-lg bg-white/10 px-3 py-2.5 text-sm font-semibold transition hover:bg-white/15"
                >
                    미리보기 새 창
                </button>
                <button
                    onClick={copyOverlayUrl}
                    className="rounded-lg bg-white/10 px-3 py-2.5 text-sm font-semibold transition hover:bg-white/15"
                >
                    {copied ? "복사됨!" : "오버레이 URL 복사"}
                </button>
            </div>
        </Section>
    );
};

export default OverlayActions;
