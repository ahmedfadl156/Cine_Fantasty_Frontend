export const UsersLoadingSkeleton = () => {
    return (
        <div className="w-full flex flex-col gap-4 animate-pulse">
            <div className="h-12 bg-surface-container-lowest rounded-[2px] w-full mb-2" />
            {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="flex justify-between items-center px-4 py-4 border-b border-outline/20">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-[2px] bg-surface" />
                        <div className="w-48 h-4 bg-surface rounded-[2px]" />
                    </div>
                    <div className="w-32 h-4 bg-surface rounded-[2px] hidden sm:block" />
                    <div className="w-24 h-4 bg-surface rounded-[2px] hidden md:block" />
                    <div className="w-16 h-8 bg-surface rounded-[2px]" />
                </div>
            ))}
        </div>
    );
};
