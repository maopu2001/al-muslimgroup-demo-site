import {
  Call02Icon,
  Facebook01Icon,
  LinkedinIcon,
  Location06Icon,
  Mail01Icon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/dist/client/link";
import Image from "next/image";

const quickLinkItems = [
  { label: "Company Profile", href: "/about#company-profile" },
  { label: "Machinery", href: "/about#machinery" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Trusted Partner", href: "/about#trusted-partner" },
];

const contactUsItems = [
  {
    icon: Location06Icon,
    label: "14 Gedda. Karnapara, Ulail, Savar, Dhaka 1340, Bangladesh",
    href: "https://maps.app.goo.gl/GNDRyEHanzuj6XMX8",
  },
  { icon: Call02Icon, label: "09666777879", href: "tel:+8809666777879" },
  {
    icon: Mail01Icon,
    label: "md@pacificbluejeans.com",
    href: "mailto:md@pacificbluejeans.com",
  },
];

const followUsItems = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/almuslimgroupsavar/",
    icon: Facebook01Icon,
    color: "#2D65F6",
  },
  {
    label: "Youtube",
    href: "https://www.youtube.com/@al-muslimgroup-amg9308",
    icon: YoutubeIcon,
    color: "#E9333E",
  },
  {
    label: "LinkedIn",
    href: "https://bd.linkedin.com/company/al-muslimgroup",
    icon: LinkedinIcon,
    color: "#2D64BC",
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t pt-10 px-10 text-center text-sm text-muted-foreground">
      <div className="grid grid-cols-5 gap-4">
        {/* Image */}
        <div className="m-auto">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={200}
              height={200}
            />
          </Link>
        </div>
        {/* Quick Links */}
        <div className="text-left">
          <h1 className="text-lg font-semibold">Quick Links</h1>
          <div className="w-4 border-t border-2 border-red-700" />
          <ul className="my-5 space-y-4">
            {quickLinkItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="hover:underline hover:text-accent"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="text-left col-span-2">
          <h1 className="text-lg font-semibold">Contact Us</h1>
          <div className="w-4 border-t border-2 border-red-700" />
          <ul className="my-5 space-y-4">
            {contactUsItems.map((item) => (
              <li key={item.label}>
                <Link
                  className="hover:underline hover:text-accent"
                  href={item.href}
                >
                  <HugeiconsIcon
                    icon={item.icon}
                    strokeWidth={2}
                    className="inline-block mr-2 text-accent"
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div className="text-left pb-10">
          <h1 className="text-lg font-semibold">Follow Us</h1>
          <div className="w-4 border-t border-2 border-red-700" />
          <ul className="my-5 space-y-4">
            {followUsItems.map((item) => (
              <li key={item.label}>
                <Link
                  className="hover:underline hover:text-accent"
                  href={item.href}
                >
                  <HugeiconsIcon
                    icon={item.icon}
                    strokeWidth={2}
                    color={item.color}
                    className="inline-block mr-2"
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
