import Overlay from "@/components/overlay/Overlay";
import { OverlayProvider } from "@/provider/OverlayProvider";

const MockScene = () => {
    return (
        <div className="absolute inset-0 bg-linear-to-br from-slate-800 via-slate-900 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.25),transparent_55%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium uppercase tracking-[0.3em] text-white/15">
                    방송 화면 미리보기
                </span>
            </div>
            <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white/70 backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                LIVE
            </div>
        </div>
    );
};

const PreviewPage = () => {
    return (
        <OverlayProvider>
            <main className="relative h-dvh w-full overflow-hidden">
                <MockScene />
                <Overlay />
            </main>
        </OverlayProvider>
    );
};

export default PreviewPage;
