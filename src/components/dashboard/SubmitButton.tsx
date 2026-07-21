type Props = { children: React.ReactNode };

const SubmitButton = ({ children }: Props) => {
    return (
        <button className="rounded-lg bg-violet-600 px-3 py-2.5 text-sm font-semibold transition hover:bg-violet-500">
            {children}
        </button>
    );
};

export default SubmitButton;
