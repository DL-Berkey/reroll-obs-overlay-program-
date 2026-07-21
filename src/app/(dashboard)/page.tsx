import OverlayActions from "@/components/dashboard/OverlayActions";
import QuickActionList from "@/components/dashboard/QuickActionList";
import DonationForm from "@/components/dashboard/DonationForm";
import ChatForm from "@/components/dashboard/ChatForm";
import GoalForm from "@/components/dashboard/GoalForm";

export default function Home() {
    return (
        <main className="mx-auto w-full max-w-xl px-6 py-8">
            <div className="flex flex-col gap-4">
                <OverlayActions />
                <QuickActionList />
                <DonationForm />
                <ChatForm />
                <GoalForm />
            </div>
        </main>
    );
}
