export const SectionDivider = ({ label }: { label: string }) => (
    <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-on-secondary-container/15" />
        <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container">
            {label}
        </span>
        <div className="flex-1 h-px bg-on-secondary-container/15" />
    </div>
);
