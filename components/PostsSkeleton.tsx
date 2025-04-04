export default function PostsSkeleton() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-md">
      {/* Shimmer Background */}
      <div className="absolute inset-0 bg-muted-foreground from-muted via-muted/50 to-muted animate-shimmer z-0 opacity-30" />
      
      {/* Skeleton Content */}
      <div className="flex items-start space-x-3">
        {/* Avatar Circle */}
        <div className="w-12 h-12 bg-muted-foreground rounded-full overflow-hidden relative animate-pulse opacity-65" />
        
        {/* Text Lines */}
        <div className="flex flex-col space-y-2 w-3/4">
          <div className="w-1/2 h-5 bg-muted-foreground rounded relative overflow-hidden animate-pulse opacity-65" />
          <div className="w-1/2 h-4 bg-muted-foreground rounded relative overflow-hidden animate-pulse opacity-65" />
          <div className="w-3/4 h-4 bg-muted-foreground rounded relative overflow-hidden animate-pulse opacity-65" />
        </div>
      </div>
    </div>
  );
}
