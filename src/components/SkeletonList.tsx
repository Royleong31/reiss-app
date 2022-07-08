import { Skeleton } from "@mui/material";


export default function SkeletonList({ skeletonCount = 3 }: { skeletonCount?: number }) {
  return (
    <>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <Skeleton key={index} variant="text" height={150} sx={{ transform: "none" }} />
      ))}
    </>
  );
}
