export default function PostsSkeleton() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-md">
      {/* Shimmer Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-shimmer z-0" />
      
      {/* Skeleton Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-3 p-4">
        {/* Avatar Circle */}
        <div className="w-12 h-12 bg-muted-foreground rounded-full overflow-hidden relative opacity-80">
          <div className="absolute inset-0 from-muted via-muted/50 to-muted animate-shimmer" />
        </div>

        {/* Text Lines */}
        <div className="w-3/4 h-4 bg-muted-foreground rounded relative overflow-hidden opacity-80">
          <div className="absolute inset-0 from-muted via-muted/50 to-muted animate-shimmer" />
        </div>
        <div className="w-1/2 h-4 bg-muted-foreground rounded relative overflow-hidden opacity-80">
          <div className="absolute inset-0 from-muted via-muted/50 to-muted animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
