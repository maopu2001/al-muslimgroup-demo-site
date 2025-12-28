import Image from "next/image";
import { Card } from "./ui/card";

const machinesItems = [
  { title: "Jeanologia Laser Machine", img: "/machineries/mc1.jpg" },
  { title: "Dye And Finishing", img: "/machineries/mc2.jpg" },
  { title: "Intelligent Template Machine", img: "/machineries/mc3.jpg" },
  {
    title: "Woven Elastic Tap Making Machine",
    img: "/machineries/mc4.jpg",
  },
  {
    title: "Jeanologia Ozone Machine",
    img: "/machineries/mc5.jpg",
  },
  {
    title: "AUTOMATIC EDGE CONTROL & FABRIC FOLDING MACHINE",
    img: "/machineries/mc6.jpg",
  },
  {
    title: "LOOP SETTER",
    img: "/machineries/mc7.jpg",
  },
  {
    title: "NUMBERING MACHINE",
    img: "/machineries/mc8.jpg",
  },
  {
    title: "OVERLOCK MACHINE",
    img: "/machineries/mc9.jpg",
  },
  {
    title: "POCKET RULLING",
    img: "/machineries/mc10.jpg",
  },
  {
    title: "QUILTING MACHINE",
    img: "/machineries/mc11.jpg",
  },
  {
    title: "AUTO POCKET WELTING & AUTO SPREADING MACHINE",
    img: "/machineries/mc12.jpg",
  },
  {
    title: "3D MACHINE",
    img: "/machineries/mc13.jpg",
  },
  {
    title: "DRY CLEANING PRESS MACHINE",
    img: "/machineries/mc14.jpg",
  },
  {
    title: "SINGLE NEEDLE",
    img: "/machineries/mc15.jpg",
  },
  {
    title: "TONELLO WASH MACHINE",
    img: "/machineries/mc16.jpg",
  },
  {
    title: "EMBROIDERY MACHINE",
    img: "/machineries/mc17.jpg",
  },
  {
    title: "TWILL TAPE MAKING MACHINE 1",
    img: "/machineries/mc18.jpg",
  },
  {
    title: "AUTOMATIC TRIMMING & PACKING MACHINE",
    img: "/machineries/mc20.jpg",
  },
  {
    title: "JEANOLOGIA LASER MACHINE",
    img: "/machineries/mc21.jpg",
  },
  {
    title: "FUSING MACHINE",
    img: "/machineries/mc22.jpg",
  },
  {
    title: "FUSING BLOCK MACHINE",
    img: "/machineries/mc23.jpg",
  },
  {
    title: "SEWING MACHINE -DOUBLE NEEDLE, FEED OF THE ARM, OVERLOCK MACHINE",
    img: "/machineries/mc24.jpg",
  },
  {
    title: "FABRIC INSPECTION",
    img: "/machineries/mc25.jpg",
  },
];

export default function Machineries() {
  return (
    <>
      <h2 className="text-2xl text-center font-semibold text-primary uppercase">
        Our Machineries
      </h2>

      <div className="grid grid-cols-3 gap-10 pt-5">
        {machinesItems.map((it) => (
          <Card
            key={it.img}
            className="aspect-3/4 grid grid-rows-6 p-0 gap-0 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="row-span-5 relative w-full h-full">
              <Image
                src={it.img}
                alt={it.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-lg font-semibold flex justify-center items-center border uppercase text-center px-2">
              {it.title}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
