import images from "@/images.json";
import Image from "next/image";

export default function Page() {
  return (
    <div className="mx-auto max-w-300 py-10 space-y-10">
      <h1 className="text-4xl font-semibold text-primary uppercase text-center">
        Gallery
      </h1>
      <div className="grid grid-cols-4 gap-3 place-items-center">
        {images.map((e, i) => {
          return (
            <div
              key={i}
              className="relative w-full h-60 overflow-hidden rounded-lg block"
            >
              <Image
                src={`/gallery/${e.src}`}
                fill
                className="object-cover"
                alt={e.alt}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAooB9HFqOZ0AAAAASUVORK5CYII="
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
