"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { SiteConfig } from "@/lib/site-config";
import { Github } from "lucide-react";
import { useNow, useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const t = useTranslations("Footer");
  const date = useNow();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12 md:py-16">
        <div className="flex justify-center sm:justify-end">
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold">{t("connect.title")}</h3>
            <p className="text-muted-foreground mb-2 text-sm">
              {t("connect.description")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={SiteConfig.author.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("links.github.label")}
                className="group"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span className="sr-only">{t("links.github.srOnly")}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground text-sm">
            {t("copyright", {
              year: date.getFullYear(),
              title: SiteConfig.title,
            })}
          </p>
          <nav className="text-muted-foreground flex gap-4 text-sm">
            <Link href="#" className="hover:text-foreground transition-colors">
              {t("legal.notices")}
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              {t("legal.privacy")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
