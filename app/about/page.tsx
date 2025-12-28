import Machineries from "@/components/machineries";
import PdfRenderer from "@/components/pdf-renderer";
import { Button } from "@/components/ui/button";
import { Download, QuoteDownIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="pt-10">
      {/* Company Profile */}
      <div
        className="flex flex-col justify-center max-w-300 mx-auto"
        id="company-profile"
      >
        <div className="grid grid-cols-2 gap-10 max-w-300 mx-auto">
          <div className="place-content-center space-y-5">
            <div className="text-2xl font-semibold py-5 text-primary uppercase">
              About Al-Muslim
            </div>
            <p className="text-justify">
              Al-Muslim Group, an apparel manufacturer based in Bangladesh,
              stands as a leading global provider of readymade garments and
              denim products. Renowned as one of the premier garment
              manufacturing organizations in Bangladesh, we specialize in
              creating stylish and fashionable readymade garments and denim
              items. With a comprehensive and up-to-date manufacturing system
              and machinery setup, Al-Muslim Group is committed to maintaining
              quality standards in compliance with national and international
              laws.,
            </p>
            <p className="text-justify">
              We produce a diverse range of woven top and bottom items for men,
              women, and children. Upholding a commitment to quality and timely
              delivery, we thrive on overcoming challenges. Customer
              satisfaction is paramount, and the competent team ensures a final
              inspection on behalf of clients, reinforcing the company&apos;s
              reputation.,
            </p>
            <p className="text-justify">
              Al-Muslim Group has earned recognition in the readymade garment
              industry in both Asia and Europe, attributing its success to
              massive production capacity, advanced technologies, skilled team
              members, and a dedicated focus on customer satisfaction. With a
              workforce of 16,000 employees considered a valuable asset, we
              manufacture over 2.5 million pieces of various readymade garments
              monthly, catering to all age groups.
            </p>
          </div>
          <div className="relative m-auto w-full object-cover rounded-lg overflow-hidden h-100 hover:scale-105 transition-all duration-300 cursor-pointer">
            <Image src="/company-profile/image.png" alt="Company" fill />
          </div>
        </div>
        <Link
          className="mx-auto"
          href="/company-profile/almuslim-profile.pdf"
          target="_blank"
        >
          <Button
            className="mt-10 text-lg font-semibold hover:bg-accent/30 p-5"
            variant={"outline"}
          >
            <HugeiconsIcon
              icon={Download}
              className="text-accent size-5"
              strokeWidth={2}
            />
            Download the Company Profile
          </Button>
        </Link>
      </div>

      {/* Message from MD */}
      <div className="mt-10 mx-auto relative max-w-400 w-full h-200 object-cover ">
        <Image src="/message-from-md/image2.png" alt="Message from MD" fill />
      </div>
      <div
        className="pt-10 flex flex-col justify-center max-w-300 mx-auto"
        id="message-from-md"
      >
        <div
          className="grid grid-cols-2 gap-10 max-w-300 mx-auto"
          id="company-profile"
        >
          <Image
            className="m-auto rounded-4xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer  border-8 border-blue-950 shadow-lg"
            src="/message-from-md/image1.png"
            alt="Company"
            width={450}
            height={1000}
          />
          <div className="place-content-center space-y-4">
            <div className="text-2xl font-semibold py-5 text-primary uppercase">
              Message From MD
              <HugeiconsIcon
                icon={QuoteDownIcon}
                className="text-accent size-5 inline-block ml-2 -translate-y-5 fill-accent"
                strokeWidth={2}
              />
            </div>
            <p className="text-justify">
              Al Muslim Group was founded in 1992, from the beginning our main
              vision was to redefine excellence in Bangladesh&apos;s garments
              industry. Over the years, we have earned global recognition for
              our unwavering commitment to quality, innovation, and
              sustainability.
            </p>
            <p className="text-justify">
              Our success is built on the dedication of our talented workforce
              and the long-term partnership/relationship with our customers and
              suppliers. Each garment we produce is a testament to our passion
              for exceeding international standards while embracing ethical
              practices and sustainable solutions. As we look to the future, we
              remain steadfast in our mission to lead with integrity, foster
              innovation, and create meaningful impacts on our industry and
              communities.
            </p>
            <p className="text-justify">
              On behalf of Al Muslim Group, I want to thank all our customers
              and suppliers for their constant support and cooperation and I
              look forward to a future where we all grow together.
            </p>
            <p>Sincerely,</p>
            <p className="font-semibold">Managing Director </p>
            <p className="font-bold">MD Abdullah</p>
          </div>
        </div>
      </div>

      {/* Certificates */}
      <div className="max-w-300 mx-auto pt-20 space-y-5" id="certificates">
        <div className="text-2xl font-semibold text-primary uppercase text-center">
          Certificates
        </div>
        <div className="text-center">
          At Al Muslim Group, our commitment to innovation and quality shines
          through in the diverse range of products we manufacture. With a
          comprehensive portfolio that caters to various fashion preferences, we
          have become a trusted name in the global apparel industry.
        </div>
        <div className="grid grid-cols-3 gap-10 pt-5">
          {Array(9)
            .fill(0)
            .map((_, it) => (
              <Link
                key={it}
                href={`/certificates/${it + 1}.pdf`}
                target="_blank"
                className="w-full aspect-square overflow-hidden border rounded-lg shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <PdfRenderer
                  url={`/certificates/${it + 1}.pdf`}
                  className="w-full"
                />
              </Link>
            ))}
        </div>
      </div>

      {/* Machineries */}
      <div className="max-w-300 mx-auto pt-20 space-y-5" id="machinery">
        <Machineries />
      </div>

      {/* Trusted Partner */}
      <div
        className="max-w-300 mx-auto py-10 text-center space-y-2"
        id="trusted-partner"
      >
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
