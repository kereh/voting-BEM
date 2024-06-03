import Image from "next/image";

export default function LoadingAnimation() {
  return (
    <div className="item-center flex flex-col space-y-3 text-center">
      <div className="relative h-16 w-16 self-center">
        <Image
          src="/loading.gif"
          alt="loading"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          unoptimized
          priority
        />
      </div>
      <h1 className="text-center text-sm text-muted-foreground">
        Mohon Tunggu ...
      </h1>
    </div>
  );
}
