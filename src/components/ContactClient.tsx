"use client";

import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";

export default function ContactClient() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-orange-900 mb-8 text-center">
          {t("contact.title")}
        </h1>
        <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          {t("contact.subtitle")}
        </p>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start">
                <span className="text-orange-600 text-3xl mr-4">📍</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t("contact.address")}
                  </h3>
                  <p className="text-gray-700">
                    123 Temple Street
                    <br />
                    Your City, State 12345
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start">
                <span className="text-orange-600 text-3xl mr-4">📞</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t("contact.phoneLabel")}
                  </h3>
                  <p className="text-gray-700">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start">
                <span className="text-orange-600 text-3xl mr-4">📧</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t("contact.emailLabel")}
                  </h3>
                  <p className="text-gray-700">info@ganeshatempel.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {t("contact.sendMessage")}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  {t("contact.message")}
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-md font-semibold hover:bg-orange-700 transition"
              >
                {t("contact.send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
