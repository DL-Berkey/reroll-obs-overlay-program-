import { CHAT_LIMIT } from "@/constant";
import type { OverlayAction, OverlayState } from "@/type";

export const initialState: OverlayState = {
    chatList: [],
    alertQueue: [],
    currentAlert: null,
    goalTotal: 0,
    goalTarget: 100000,
};

export const overlayReducer = (
    state: OverlayState,
    action: OverlayAction,
): OverlayState => {
    switch (action.type) {
        case "chat": {
            const chatList = [...state.chatList, action.message].slice(
                -CHAT_LIMIT,
            );
            return { ...state, chatList };
        }

        case "donation": {
            const queue = [...state.alertQueue, action.donation];
            const goalTotal = state.goalTotal + action.donation.amount;

            if (state.currentAlert) {
                return { ...state, alertQueue: queue, goalTotal };
            }

            const [next, ...rest] = queue;
            return {
                ...state,
                alertQueue: rest,
                currentAlert: next,
                goalTotal,
            };
        }

        case "alert-end": {
            const [next, ...rest] = state.alertQueue;
            return { ...state, alertQueue: rest, currentAlert: next ?? null };
        }

        case "goal-target":
            return { ...state, goalTarget: action.target };

        case "reset":
            return { ...initialState, goalTarget: state.goalTarget };

        default:
            return state;
    }
}
