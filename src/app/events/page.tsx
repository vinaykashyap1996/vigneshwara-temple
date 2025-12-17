import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Events() {
  const events = [
    {
      title: "Ganesh Chaturthi",
      date: "September 2025",
      description:
        "The most auspicious festival celebrating the birth of Lord Ganesha with 10 days of special pujas, cultural programs, and community feasts.",
      icon: "🎉",
    },
    {
      title: "Diwali",
      date: "October/November 2025",
      description:
        "Festival of lights with special Lakshmi puja, lamp lighting ceremony, and traditional celebrations.",
      icon: "🪔",
    },
    {
      title: "Navaratri",
      date: "September/October 2025",
      description:
        "Nine nights of worship dedicated to Goddess Durga with daily aartis, garba, and dandiya nights.",
      icon: "💃",
    },
    {
      title: "Sankashti Chaturthi",
      date: "Monthly",
      description:
        "Monthly observance dedicated to Lord Ganesha, observed on the 4th day after the full moon.",
      icon: "🌙",
    },
    {
      title: "Maha Shivaratri",
      date: "February/March 2025",
      description:
        "Great night of Shiva with all-night vigil, special abhishekam, and meditation sessions.",
      icon: "🔱",
    },
    {
      title: "Holi",
      date: "March 2025",
      description:
        "Festival of colors celebrating the victory of good over evil with music, dance, and color play.",
      icon: "🎨",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navigation */}
      <Navbar />

      {/* Page Content */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-orange-900 mb-8 text-center">
          Festivals & Events
        </h1>
        <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          Join us in celebrating sacred festivals and spiritual events
          throughout the year
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
            >
              <div className="text-5xl mb-4">{event.icon}</div>
              <h3 className="text-2xl font-bold text-orange-800 mb-2">
                {event.title}
              </h3>
              <p className="text-orange-600 font-semibold mb-3">{event.date}</p>
              <p className="text-gray-700">{event.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-orange-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-orange-900 mb-4 text-center">
            Weekly Schedule
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-orange-200 pb-2">
              <span className="font-semibold text-gray-800">
                Monday - Friday
              </span>
              <span className="text-gray-700">
                Morning Aarti: 6:30 AM | Evening Aarti: 7:00 PM
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-orange-200 pb-2">
              <span className="font-semibold text-gray-800">Saturday</span>
              <span className="text-gray-700">
                Special Abhishekam: 10:00 AM
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-orange-200 pb-2">
              <span className="font-semibold text-gray-800">Sunday</span>
              <span className="text-gray-700">Community Lunch: 12:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-orange-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Ganesha Temple. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
