import React from "react";

const PostsSkeleton: React.FC = () => {
  return (
    <div className="h-40 bg-gray-200 animate-pulse rounded-md p-2 flex space-x-2">
      <div className="w-24 h-24 bg-gray-300 rounded-md"></div>
      <div className="flex-1 space-y-2">
        <div className="h-6 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default PostsSkeleton;
