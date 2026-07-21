type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: Props) => {
    return (
        <input
            {...props}
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none transition placeholder:text-white/30 focus:border-violet-400/60"
        />
    );
};

export default Input;
