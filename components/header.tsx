import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const aboutMenuItems = [
  { label: "Company Profile", href: "/about#company-profile" },
  { label: "Message From MD", href: "/about#message-from-md" },
  { label: "Certificates", href: "/about#certificates" },
  { label: "Machinery", href: "/about#machinery" },
  { label: "Trusted Partner", href: "/about#trusted-partner" },
];

const productsMenuItems = [
  { label: "Men", href: "/products#men" },
  { label: "Women", href: "/products#women" },
  { label: "Kids", href: "/products#kids" },
];

const menuItems = [
  { label: "About Us", href: "/about", subItems: aboutMenuItems },
  { label: "Products", href: "/products", subItems: productsMenuItems },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 bg-background/80 backdrop-blur-md right-0 z-50 px-10 py-2 flex items-center justify-between border-b h-12">
      <Link href="/">
        <Image src="/logo1.png" alt="Logo" width={240} height={80} />
      </Link>
      <div className="space-x-2">
        {menuItems.map((item) => (
          <Button
            className="p-0 hover:bg-accent/20"
            variant="ghost"
            key={item.href}
          >
            {(item.subItems && (
              <div>
                <TooltipMenu item={item} />
              </div>
            )) || (
              <Link className="p-2" href={item.href}>
                {item.label.toUpperCase()}
              </Link>
            )}
          </Button>
        ))}
        <ThemeSwitcher />
      </div>
    </header>
  );
}

function TooltipMenu({ item }: { item: (typeof menuItems)[1] }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild className="cursor-pointer p-2">
        <Link href={item.href}>{item.label.toUpperCase()}</Link>
      </TooltipTrigger>
      <TooltipContent
        sideOffset={10}
        className="transition-opacity duration-300 py-1 px-2 flex flex-col"
      >
        {item.subItems?.map((subItem) => (
          <Link key={subItem.href} href={subItem.href} className="py-1">
            <Button
              className="w-full justify-start hover:bg-accent dark:hover:bg-accent"
              variant={"ghost"}
            >
              {subItem.label}
            </Button>
          </Link>
        ))}
      </TooltipContent>
    </Tooltip>
  );
}
