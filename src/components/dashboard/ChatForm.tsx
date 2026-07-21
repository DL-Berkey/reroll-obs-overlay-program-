"use client";

import { useState } from "react";

import { useChannel } from "@/hooks/useChannel";
import Section from "./Section";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

type ChatData = {
    user: string;
    message: string;
};

const ChatForm = () => {
    const [chatData, setChatData] = useState<ChatData>({
        user: "",
        message: "",
    });
    const { send } = useChannel();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!chatData.user.trim() || !chatData.message.trim()) {
            return;
        }

        send({
            type: "chat",
            message: {
                id: crypto.randomUUID(),
                user: chatData.user.trim(),
                message: chatData.message.trim(),
            },
        });
        setChatData((prev) => ({ ...prev, message: "" }));
    };

    return (
        <Section title="채팅 보내기">
            <form onSubmit={submit} className="flex flex-col gap-2">
                <Input
                    value={chatData.user}
                    onChange={(e) =>
                        setChatData((prev) => ({
                            ...prev,
                            user: e.target.value,
                        }))
                    }
                    placeholder="닉네임"
                />
                <Input
                    value={chatData.message}
                    onChange={(e) =>
                        setChatData((prev) => ({
                            ...prev,
                            message: e.target.value,
                        }))
                    }
                    placeholder="채팅 메시지"
                />
                <SubmitButton>채팅 보내기</SubmitButton>
            </form>
        </Section>
    );
};

export default ChatForm;
