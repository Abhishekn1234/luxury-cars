import { useState } from "react";
import Contactsubmit from "../components/Contactsubmit";
import Sellingsubmit from "../components/Sellingsubmit";
import TestDrive from "../components/TestDrive";
import Whoweare from "../components/Whoweare";

const tabs = [
  { id: "contact", label: "Contact Us" },
  { id: "selling", label: "Sell Your Car" },
  { id: "about", label: "Who We Are" },
  { id: "testdrive", label: "Test Drive" },
];

export default function Users() {
  const [activeTab, setActiveTab] = useState("contact");

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Tabs Header */}
      <div className="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-xl shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300
              ${
                activeTab === tab.id
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:text-black hover:bg-white"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 md:p-10 transition-all duration-300">
        {activeTab === "contact" && <Contactsubmit />}
        {activeTab === "selling" && <Sellingsubmit />}
        {activeTab === "about" && <Whoweare />}
        {activeTab === "testdrive" && <TestDrive />}
      </div>
    </div>
  );
}
