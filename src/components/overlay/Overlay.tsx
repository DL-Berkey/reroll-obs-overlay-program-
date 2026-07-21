"use client";

import AlertLayer from "./AlertLayer";
import ChatLayer from "./ChatLayer";
import GoalGauge from "./GoalGauge";

const Overlay = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-6 top-6">
                <GoalGauge />
            </div>

            <div className="absolute inset-x-0 top-1/4 flex justify-center">
                <AlertLayer />
            </div>

            <div className="absolute bottom-6 left-6">
                <ChatLayer />
            </div>
        </div>
    );
};

export default Overlay;
