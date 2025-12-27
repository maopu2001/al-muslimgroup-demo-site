import HeroSection from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRightDoubleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

const machineriesItems = [
  { title: "Jeanologia Laser Machine", img: "/machineries/mc1.jpg" },
  { title: "Dye And Finishing", img: "/machineries/mc2.jpg" },
  { title: "Intelligent Template Machine", img: "/machineries/mc3.jpg" },
];

export default function Page() {
  return (
    <div>
      <HeroSection />

      {/* About Al Muslim */}
      <div className="grid grid-cols-2 gap-10 max-w-300 mx-auto">
        <div className="place-content-center">
          <div className="text-2xl font-semibold py-5 text-primary uppercase">
            About Al-Muslim
          </div>
          <p className="text-justify">
            Al-Muslim Group, an apparel manufacturer based in Bangladesh, stands
            as a leading global provider of readymade garments and denim
            products. Renowned as one of the premier garment manufacturing
            organizations in Bangladesh, we specialize in creating stylish and
            fashionable readymade garments and denim items. With a comprehensive
            and up-to-date manufacturing system and machinery setup, Al-Muslim
            Group is committed to maintaining quality standards in compliance
            with national and international laws.
          </p>
          <Link href="/about#company-profile">
            <Button
              className="mt-10 font-semibold hover:bg-accent/30"
              variant={"outline"}
            >
              <HugeiconsIcon
                icon={ArrowRightDoubleIcon}
                className="text-accent"
                strokeWidth={2}
              />
              Learn More
            </Button>
          </Link>
        </div>
        <div className="relative mx-auto w-full object-cover rounded-lg overflow-hidden min-h-100 hover:scale-105 transition-all duration-300 cursor-pointer">
          <Image src="/static/aboutalmuslim.jpg" alt="Company" fill />
        </div>
      </div>

      {/* Why US */}
      <div className="grid grid-cols-2 py-10 gap-10 max-w-300 mx-auto">
        <div className="relative mx-auto w-full object-cover rounded-lg overflow-hidden min-h-100 hover:scale-105 transition-all duration-300 cursor-pointer">
          <Image src="/static/whyus.jpg" alt="Company" fill />
        </div>
        <div className="place-content-center">
          <div className="text-2xl font-semibold py-5 text-primary uppercase">
            Why US
          </div>
          <p className="text-justify">
            Al-Muslim Group stands out as a top apparel manufacturer in
            Bangladesh, known for high-quality garments and denim. With
            cutting-edge technology and a strong commitment to compliance and
            ethical practices, we consistently meet global standards. Partnering
            with us ensures reliable quality, sustainability, and trust from
            clients worldwide.
          </p>
        </div>
      </div>

      {/* YT Video */}
      <iframe
        width="1440"
        height="750"
        src="https://www.youtube.com/embed/7thPwUmtLYs?autoplay=1&mute=1&controls=0&rel=0"
        title="AMG-Building Building View"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        // allowfullscreen
      ></iframe>

      {/* Machineries */}
      <div className="max-w-300 mx-auto pt-10 text-center space-y-2">
        <h1 className="text-2xl uppercase font-semibold text-accent ">
          Machineries
        </h1>
        <span>
          We offer a variety of services to cater to your needs. Our goal is to
          provide exceptional service with quality, precision, and
          professionalism for all our clients.
        </span>

        <div className="grid grid-cols-3 gap-10 pt-5 aspect-5/2">
          {machineriesItems.map((it) => (
            <Card
              key={it.img}
              className="grid grid-rows-6 p-0 gap-0 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="row-span-5 relative ">
                <Image src={it.img} alt={it.title} fill />
              </div>
              <div className="text-lg font-semibold flex justify-center items-center border uppercase">
                {it.title}
              </div>
            </Card>
          ))}
        </div>
        <Link href="/about#machinery">
          <Button
            className="mt-5 font-semibold hover:bg-accent/30"
            variant={"outline"}
          >
            <HugeiconsIcon
              icon={ArrowRightDoubleIcon}
              className="text-accent"
              strokeWidth={2}
            />
            Learn More
          </Button>
        </Link>
      </div>

      {/* Trusted Partners */}

      <div className="max-w-300 mx-auto py-10 text-center space-y-2">
        <h1 className="text-2xl text-primary font-semibold uppercase">
          Trusted Partners
        </h1>
        <div className="w-170 h-68 grid grid-cols-5 mx-auto place-items-center">
          {Array(10)
            .fill(0)
            .map((_, it) => {
              return (
                <Image
                  className="bg-white size-30 cursor-pointer border transition-all duration-300 ease-in-out hover:scale-110 hover:border-accent rounded-4xl dark:border-4"
                  key={it}
                  src={`/partners/p${it + 1}.png`}
                  alt={`Partners Logo ${it + 1}`}
                  width={200}
                  height={200}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
