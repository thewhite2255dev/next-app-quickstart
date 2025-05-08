"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslations } from "next-intl";
import { navItemsType } from "./header";

export function MobileNav() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems: navItemsType = [];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="max-h-screen w-[250px] overflow-y-scroll px-6 sm:w-[300px]"
      >
        <div className="flex flex-col gap-6 pt-10 pb-6">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "hover:text-foreground text-lg font-medium transition-colors",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
