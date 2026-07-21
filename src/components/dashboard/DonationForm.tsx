"use client";

import { useState } from "react";

import { useChannel } from "@/hooks/useChannel";
import Section from "./Section";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

const INITIAL_DONATION_DATA = {
    user: "",
    amount: 0,
    message: "",
};

type DonationData = typeof INITIAL_DONATION_DATA;

const DonationForm = () => {
    const [donationData, setDonationData] = useState<DonationData>(
        INITIAL_DONATION_DATA,
    );
    const { send } = useChannel();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const user = donationData.user.trim();
        const amount = Number(donationData.amount);
        const message = donationData.message.trim();

        if (!user) {
            return;
        }

        send({
            type: "donation",
            donation: {
                id: crypto.randomUUID(),
                user,
                amount,
                message,
            },
        });

        setDonationData(INITIAL_DONATION_DATA);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setDonationData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Section title="후원 보내기">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                    <Input
                        name="user"
                        value={donationData.user}
                        onChange={handleInputChange}
                        placeholder="닉네임"
                    />
                    <Input
                        name="amount"
                        value={donationData.amount}
                        onChange={handleInputChange}
                        placeholder="금액"
                        type="number"
                    />
                    <Input
                        name="message"
                        value={donationData.message}
                        onChange={handleInputChange}
                        placeholder="후원 메시지 (선택)"
                        type="text"
                    />
                </div>
                <SubmitButton>후원 보내기</SubmitButton>
            </form>
        </Section>
    );
};

export default DonationForm;
