import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/constants";

type ArticleHeroImageProps = {
  src: string;
  alt: string;
};

export function ArticleHeroImage({ src, alt }: ArticleHeroImageProps) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
      <Image
        src={src}
        alt={alt}
        quality={85}
        width={1600}
        height={900}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
