type Props = { title: string; children: React.ReactNode };

const Section = (props: Props) => {
    const { title, children } = props;

    return (
        <section className="rounded-xl border border-white/10 bg-white/3 p-4">
            <h2 className="mb-3 text-sm font-semibold text-white/70">
                {title}
            </h2>
            {children}
        </section>
    );
};

export default Section;
