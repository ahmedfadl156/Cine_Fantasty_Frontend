export const OverviewLoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 w-full animate-pulse">
      {/* Alert Skeleton */}
      <div className="h-24 bg-surface-container-low rounded-[2px]" />
      
      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-surface-container-low rounded-[2px]" />
        ))}
      </div>
      
      {/* Chart Skeleton */}
      <div className="h-[400px] bg-surface-container-low rounded-[2px] mt-4" />
    </div>
  );
};
