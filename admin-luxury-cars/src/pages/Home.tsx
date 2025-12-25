import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    cars: 0,
    sellingcars: 0,
    contactus: 0,
    Services:0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/counts`
        );
        setCounts(res.data);
      } catch (error) {
        console.error("Failed to fetch counts", error);
      }
    };

    fetchCounts();
  }, []);
  const totalusers=counts.contactus + counts.sellingcars;
  const cards = [
    {
      title: "Total Cars",
      value: counts.cars,
      icon: "🚗",
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
      textColor: "text-blue-600",
      borderColor: "border-l-4 border-blue-500",
      path: "/cars",
    },
    {
      title: "Total Services",
      value: counts.Services,
      icon: "🛠️",
      color: "bg-gradient-to-br from-green-50 to-green-100",
      textColor: "text-green-600",
      borderColor: "border-l-4 border-green-500",
      path: "/services",
    },
    {
      title: "Users / Client Submissions",
      value: totalusers,
      icon: "👤",
      color: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      textColor: "text-yellow-600",
      borderColor: "border-l-4 border-yellow-500",
      path: "/users",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome to your management dashboard
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className={`
              relative overflow-hidden rounded-xl shadow-lg cursor-pointer
              hover:shadow-2xl transition-all duration-300 
              hover:-translate-y-1
              ${card.color} ${card.borderColor}
              group
            `}
          >
            {/* Decorative accent */}
            <div
              className={`absolute top-0 right-0 w-24 h-24 -translate-y-12 translate-x-12 
              rounded-full opacity-20 
              ${card.textColor.replace("text-", "bg-")}
              group-hover:scale-125 transition-transform`}
            />

            <div className="relative p-6 flex flex-col h-full">
              {/* Icon */}
              <div
                className={`mb-4 p-3 rounded-lg ${card.textColor} 
                bg-white bg-opacity-60 w-14 h-14 flex items-center 
                justify-center shadow`}
              >
                <span className="text-2xl">{card.icon}</span>
              </div>

              {/* Content */}
              <div className="flex-grow">
                <h2 className={`text-base font-medium ${card.textColor}`}>
                  {card.title}
                </h2>
                <p className="text-3xl font-bold text-gray-800">
                  {card.value.toLocaleString()}
                </p>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-gray-200 border-opacity-40 mt-4">
                <span
                  className={`text-sm font-medium ${card.textColor}`}
                >
                  View details →
                </span>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
}

