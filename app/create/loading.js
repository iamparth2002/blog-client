import Skeleton from "react-loading-skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return   <div className="flex flex-col gap-4 items-start p-4 md:mx-24 py-8">
    <Skeleton height={40} width={300} />
    <Skeleton height={150} width="100%" />
    <Skeleton height={300} width="100%" />
    <Skeleton height={40} width={150} />
  </div>
  }