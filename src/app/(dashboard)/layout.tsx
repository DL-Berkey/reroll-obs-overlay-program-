import Header from "@/components/layout/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default DashboardLayout;
