import React from "react";
import { assets } from "../assets/assets";

const experiences = [
  {
    name: "Sylhet Adventure",
    image: assets.sylhetExp,
    description: "Discover lush tea gardens, river cruises, and vibrant culture in Sylhet.",
    highlight: "Tea Gardens & Culture"
  },
  {
    name: "Cox's Bazar Beach Escape",
    image: assets.coxsbazarExp,
    description: "Enjoy the world's longest natural sea beach, surfing, and beachside resorts.",
    highlight: "World's Longest Beach"
  },
  {
    name: "Sundarbans Expedition",
    image: assets.sundarbansExp,
    description: "Explore the UNESCO World Heritage Site, home of the Royal Bengal Tiger.",
    highlight: "UNESCO Heritage Site"
  },
  {
    name: "Rangamati Lake Retreat",
    image: assets.rangamatiExp,
    description: "Serene lakes, tribal culture, and scenic boat rides in Rangamati hills.",
    highlight: "Lake & Hills"
  },
  {
    name: "Bandarban Mountain Journey",
    image: assets.bandarbanExp,
    description: "Trek the misty hills, visit waterfalls, and discover indigenous heritage.",
    highlight: "Mountain Trekking"
  },
];

const whyGhurbo = [
  {
    icon: "🎯",
    title: "Handpicked Destinations",
    description: "Wide range of curated experiences and authentic local adventures"
  },
  {
    icon: "💰",
    title: "Transparent Pricing",
    description: "Easy online booking with no hidden fees or surprise charges"
  },
  {
    icon: "⭐",
    title: "Genuine Reviews",
    description: "Real customer testimonials and honest ratings from verified travelers"
  },
  {
    icon: "🔧",
    title: "24/7 Support",
    description: "Round-the-clock assistance and instant chatbot help when you need it"
  },
];

const uniqueFeatures = [
  {
    icon: "🏠",
    title: "Local Expertise",
    description: "Packages crafted by real travel enthusiasts who know Bangladesh intimately"
  },
  {
    icon: "📱",
    title: "Mobile-Friendly",
    description: "Easy-to-use, responsive website that works perfectly on all devices"
  },
  {
    icon: "✂️",
    title: "Customizable Trips",
    description: "Tailored experiences for every budget, group size, and travel preference"
  },
  {
    icon: "🔒",
    title: "Secure Booking",
    description: "Safe payment processing and comprehensive booking management system"
  },
];

const Experience = () => (
  <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
    {/* Hero Section */}
    <div className="max-w-6xl mx-auto px-4 mb-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-orange-900 leading-tight">
          GHURBO Experiences
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto mb-6"></div>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          At GHURBO, every traveler finds their perfect adventure. Whether you crave beaches, hills, wildlife, or culture—discover real stories and unique journeys from happy Ghurbo explorers.
        </p>
      </div>
    </div>

    {/* Experience Cards */}
    <div className="max-w-7xl mx-auto px-4 mb-20">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
          >
            <div className="relative overflow-hidden">
              <img
                src={exp.image}
                alt={exp.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {exp.highlight}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-orange-800 mb-3 group-hover:text-orange-600 transition-colors">
                {exp.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">{exp.description}</p>
              <div className="mt-4 flex items-center text-orange-500 font-medium text-sm">
                <span>Explore Now</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Why Ghurbo Section */}
    <div className="max-w-6xl mx-auto px-4 mb-20">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-orange-800 mb-4">Why Choose Ghurbo?</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto"></div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {whyGhurbo.map((item, idx) => (
            <div key={idx} className="text-center group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-orange-700 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* What Makes Us Unique Section */}
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">What Makes Us Unique?</h2>
          <div className="w-16 h-1 bg-white/30 mx-auto"></div>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {uniqueFeatures.map((item, idx) => (
            <div key={idx} className="flex items-start space-x-4 group">
              <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/90 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Call to Action */}
    <div className="max-w-4xl mx-auto px-4 mt-16 text-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-orange-800 mb-4">Ready to Start Your Adventure?</h3>
        <p className="text-gray-600 mb-6">Join thousands of satisfied travelers who chose GHURBO for their perfect getaway.</p>
        <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Explore Packages
        </button>
      </div>
    </div>
  </div>
);

export default Experience;