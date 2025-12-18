"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import "../i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-orange-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t("temple")}</h3>
            <p className="text-orange-200">{t("footer.tagline")}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-orange-200">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition">
                  {t("nav.events")}
                </Link>
              </li>
              <li>
                <Link href="/donations" className="hover:text-white transition">
                  {t("nav.donations")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t("nav.contact")}</h3>
            <p className="text-orange-200">
              {t("footer.email")}: info@ganeshatempel.org
            </p>
            <p className="text-orange-200">
              {t("footer.phone")}: +1 (555) 123-4567
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-orange-800 text-center text-orange-200">
          <p>
            &copy; 2025 {t("temple")}. {t("footer.rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
