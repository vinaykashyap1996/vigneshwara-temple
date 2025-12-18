"use client";

import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";

export default function AboutClient() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-orange-900 mb-8 text-center">
          {t("about.title")}
        </h1>

        <div className="max-w-4xl mx-auto space-y-8">
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-orange-800 mb-4">
              {t("about.history")}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t("about.historyText")}
            </p>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-orange-800 mb-4">
              {t("about.mission")}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t("about.missionText")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t("about.missionItems.values")}</li>
              <li>{t("about.missionItems.space")}</li>
              <li>{t("about.missionItems.festivals")}</li>
              <li>{t("about.missionItems.community")}</li>
              <li>{t("about.missionItems.wisdom")}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
