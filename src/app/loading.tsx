import LoadingAnimation from "@/components/loading";

export default function Loading() {
  return (
    <div className="grid h-[85vh] place-content-center md:h-screen">
      <LoadingAnimation />
    </div>
  );
}
