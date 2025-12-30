import { Separator } from "@/components/ui/separator";
import { Location06Icon, Mail } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="py-10 max-w-300 mx-auto grid grid-cols-2">
      <iframe
        className="place-items-end"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14598.941526633349!2d90.25938908413085!3d23.82800703144756!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755ebb391261a4d%3A0x3965cede549c299f!2sAl-Muslim%20Group!5e0!3m2!1sen!2sbd!4v1766931555786!5m2!1sen!2sbd"
        width="500"
        height="600"
        style={{ border: 1 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="my-auto">
        <h2 className="text-4xl font-bold mb-4">
          Get In <span className="text-primary">Touch!</span>
        </h2>
        <h2 className="text-xl font-semibold py-2">Corporate Office</h2>
        <Separator className="my-4" />
        <div className="flex gap-5">
          <div>
            <div className="text-xl text-primary font-semibold flex gap-2 items-center pb-2">
              <HugeiconsIcon icon={Location06Icon} />
              Address
            </div>
            <Link
              href="https://maps.app.goo.gl/GNDRyEHanzuj6XMX8"
              className="hover:underline hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              14 Gedda. Karnapara, Ulail, Savar <br />
              Dhaka 1340, Bangladesh
            </Link>
          </div>
          <Separator orientation="vertical" className="h-20 mx-2" />
          <div>
            <div className="text-xl text-primary font-semibold flex gap-2 items-center pb-2">
              <HugeiconsIcon icon={Mail} />
              Call / Email Us
            </div>
            <div>
              <Link
                href="tel:+8809666777879"
                className="hover:underline hover:text-accent"
              >
                09666777879
              </Link>
              <br />
              <Link
                href="mailto:md@pacificbluejeans.com"
                className="hover:underline hover:text-accent"
              >
                md@pacificbluejeans.com
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
