import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingSkeletonPostCard() {
  return (
      <div className="mt-[20px] p-[20px] bg-slate-700 block w-full border border-default rounded-base shadow-xs">

        {/* Header */}
        <div className="flex justify-between mb-[20px]">
          <div className="flex gap-3">
            <Skeleton circle width={50} height={50} />

            <div>
              <Skeleton width={120} height={18} />
              <Skeleton width={80} height={14} />
            </div>
          </div>

          <Skeleton width={90} height={38} borderRadius={12} />
        </div>

        {/* Post Text */}
        <div className="my-[30px]">
          <Skeleton count={3} />
        </div>

        {/* Footer Icons */}
        <div className="flex justify-between">
          <Skeleton circle width={40} height={40} />
          <Skeleton circle width={40} height={40} />
          <Skeleton circle width={40} height={40} />
        </div>

      </div>
   
  );
}
