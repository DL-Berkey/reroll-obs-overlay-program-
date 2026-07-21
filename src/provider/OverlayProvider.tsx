"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { ALERT_DURATION } from "@/constant";
import { useChannel } from "@/hooks/useChannel";
import { initialState, overlayReducer } from "@/reducer/overlayReducer";
import type { OverlayState } from "@/type";

const OverlayContext = createContext<OverlayState | null>(null);

export const OverlayProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = useReducer(overlayReducer, initialState);

    useChannel(dispatch);

    useEffect(() => {
        if (!state.currentAlert) return;
        const timer = setTimeout(
            () => dispatch({ type: "alert-end" }),
            ALERT_DURATION,
        );
        return () => clearTimeout(timer);
    }, [state.currentAlert]);

    return (
        <OverlayContext.Provider value={state}>
            {children}
        </OverlayContext.Provider>
    );
};

export const useOverlay = () => {
    const state = useContext(OverlayContext);

    if (!state)
        throw new Error("useOverlay must be used within OverlayProvider");

    return state;
};
