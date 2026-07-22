"use client";

import { useCallback, useEffect } from "react";
import { CHANNEL_NAME } from "@/constant";
import type { OverlayEvent } from "@/type";

let channel: BroadcastChannel | null = null;

const getChannel = () => {
    if (typeof window === "undefined") return null;
    if (!channel) channel = new BroadcastChannel(CHANNEL_NAME);
    return channel;
}

export const useChannel = (onEvent?: (event: OverlayEvent) => void) => {
    useEffect(() => {
        if (!onEvent) return;

        const channel = getChannel();
        if (!channel) return;

        const listener = (event: MessageEvent<OverlayEvent>) =>
            onEvent(event.data);

        channel.addEventListener("message", listener);
        return () => channel.removeEventListener("message", listener);
    }, [onEvent]);

    const send = useCallback((event: OverlayEvent) => {
        getChannel()?.postMessage(event);
    }, []);

    return { send };
}
