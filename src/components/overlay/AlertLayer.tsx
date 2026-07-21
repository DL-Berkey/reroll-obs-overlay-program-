"use client";

import { useOverlay } from "@/provider/OverlayProvider";
import { formatWon } from "@/lib/format";

const AlertLayer = () => {
    const { currentAlert } = useOverlay();

    if (!currentAlert) return null;

    return (
        <div
            key={currentAlert.id}
            className="animate-alert w-120 max-w-[80vw] rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-600 px-8 py-6 text-center text-white shadow-2xl"
        >
            <p className="text-lg">
                <span className="font-bold">{currentAlert.user}</span>
                <span className="text-white/85">님이 후원했습니다</span>
            </p>
            <p className="my-2 text-4xl font-extrabold tabular-nums drop-shadow">
                {formatWon(currentAlert.amount)}
            </p>
            {currentAlert.message && (
                <p className="text-white/90">“{currentAlert.message}”</p>
            )}
        </div>
    );
};

export default AlertLayer;
