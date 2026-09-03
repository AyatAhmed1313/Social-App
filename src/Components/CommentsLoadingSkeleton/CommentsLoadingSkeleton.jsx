import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function CommentsLoadingSkeleton() {
  return <>
   <div className="flex gap-2 mb-[10px] p-[10px]">
      {/* User Image */}
      <Skeleton circle width={40} height={40} />

      {/* Name, Date, Comment */}
      <div className="flex-1">
        <div className="flex gap-3 items-center mb-2">
          <Skeleton width={90} height={18} />
          <Skeleton width={80} height={14} />
        </div>

        <Skeleton width="90%" height={16} />
        <Skeleton width="70%" height={16} className="mt-1" />
      </div>
    </div>
  </>
}
