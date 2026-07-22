"use client";

import { useEffect } from "react";
import Overlay from "@/components/overlay/Overlay";
import { OverlayProvider } from "@/provider/OverlayProvider";

const OverlayPage = () => {
    useEffect(() => {
        const { style } = document.body;
        const previous = style.background;
        style.background = "transparent";
        return () => {
            style.background = previous;
        };
    }, []);

    return (
        <OverlayProvider>
            <main className="relative h-dvh w-full">
                <Overlay />
            </main>
        </OverlayProvider>
    );
};

export default OverlayPage;
