import { Card } from "@/components/ui/card";
import Image from "next/image";

const menItems = [
  {
    img: "/product/men1.png",
    title: "Denim",
  },
  {
    img: "/product/men2.png",
    title: "Non Denim",
  },
];

const womenItems = [
  {
    img: "/product/women1.png",
    title: "Denim",
  },
  {
    img: "/product/women2.png",
    title: "Non Denim",
  },
];

const kidsItems = [
  {
    img: "/product/kids1.png",
    title: "Denim",
  },
  {
    img: "/product/kids2.png",
    title: "Non Denim",
  },
  {
    img: "/product/kids3.png",
    title: "Outerwear",
  },
];

export default function Page() {
  return (
    <div className="max-w-300 mx-auto py-10 space-y-20">
      <div id="men">
        <h2 className="text-2xl text-center font-semibold text-primary uppercase">
          Men
        </h2>

        <div className="grid grid-cols-3 gap-10 pt-5">
          {menItems.map((it) => (
            <Card
              key={it.img}
              className="aspect-3/4 grid grid-rows-6 p-0 gap-0 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="row-span-5 relative w-full h-full bg-white">
                <Image
                  src={it.img}
                  alt={it.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-lg font-semibold flex justify-center items-center border uppercase text-center px-2">
                {it.title}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div id="women">
        <h2 className="text-2xl text-center font-semibold text-primary uppercase">
          Women
        </h2>

        <div className="grid grid-cols-3 gap-10 pt-5">
          {womenItems.map((it) => (
            <Card
              key={it.img}
              className="aspect-3/4 grid grid-rows-6 p-0 gap-0 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="row-span-5 relative w-full h-full bg-white">
                <Image
                  src={it.img}
                  alt={it.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-lg font-semibold flex justify-center items-center border uppercase text-center px-2">
                {it.title}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div id="kids">
        <h2 className="text-2xl text-center font-semibold text-primary uppercase">
          Kids
        </h2>

        <div className="grid grid-cols-3 gap-10 pt-5">
          {kidsItems.map((it) => (
            <Card
              key={it.img}
              className="aspect-3/4 grid grid-rows-6 p-0 gap-0 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="row-span-5 relative w-full h-full bg-white">
                <Image
                  src={it.img}
                  alt={it.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-lg font-semibold flex justify-center items-center border uppercase text-center px-2">
                {it.title}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
