import React from "react";
import { assets } from "../assets/assets";

const teamMembers = [
  {
    name: "Md. Nafees Ahommed",
    id: "2111934642",
    department: "ECE",
    university: "North South University, Dhaka",
    image: assets.member1,
    role: "Backend Developer",
    skills: ["Database", "Node.js", "Security"]
  },
  {
    name: "Md. Rokib Hasan Oli",
    id: "2211950642",
    department: "ECE",
    university: "North South University, Dhaka",
    image: assets.member2,
    role: "Full Stack Developer",
    skills: ["React", "API", "UI/UX"]
  },
  {
    name: "Md Rakibul Hasan",
    id: "2212346042",  
    department: "ECE",
    university: "North South University, Dhaka",
    image: assets.member3,
    role: "Frontend Developer",
    skills: ["React", "Design", "Mobile"]
  },
];

const projectStats = [
  { number: "3", label: "Team Members", icon: "👥" },
  { number: "3", label: "Months Development", icon: "⏱️" },
  { number: "30+", label: "Features Built", icon: "⚡" },
  { number: "100%", label: "Dedication", icon: "❤️" }
];

const technologies = [
  { name: "React.js", category: "Frontend", color: "bg-blue-100 text-blue-800" },
  { name: "Node.js", category: "Backend", color: "bg-green-100 text-green-800" },
  { name: "Vite", category: "Build Tool", color: "bg-purple-100 text-purple-800" },
  { name: "Express.js", category: "Framework", color: "bg-gray-100 text-gray-800" },
  { name: "MongoDB", category: "Database", color: "bg-emerald-100 text-emerald-800" },
  { name: "Router Dom", category: "Routing", color: "bg-indigo-100 text-indigo-800" },
  { name: "Clerk", category: "Authentication", color: "bg-violet-100 text-violet-800" },
  { name: "Tailwind CSS", category: "Styling", color: "bg-cyan-100 text-cyan-800" },
  { name: "Cloudinary", category: "Cloud Storage", color: "bg-orange-100 text-orange-800" },
  { name: "Nodemailer", category: "Email Service", color: "bg-red-100 text-red-800" },
  { name: "Brevo", category: "Email Platform", color: "bg-pink-100 text-pink-800" },
  { name: "Vercel", category: "Deployment", color: "bg-slate-100 text-slate-800" }
];

const About = () => (
  <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
    {/* Hero Section */}
    <div className="max-w-6xl mx-auto px-4 mb-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-orange-900 leading-tight">
          About GHURBO
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto mb-8"></div>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            <span className="font-bold text-orange-600">GHURBO</span> is a modern tour package platform built as a capstone project for <span className="font-bold text-orange-600">CSE299 Junior Design, Section 4</span> at <span className="font-bold text-blue-600">North South University, Dhaka</span>. Our mission was to design a real-world travel web application that simplifies trip planning and connects travelers with authentic experiences across Bangladesh.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            This ambitious project was developed by a dedicated team of 3 passionate students, blending user-friendly design with practical booking features, and a touch of creativity to help travelers easily explore and book curated tours. Through this incredible journey, we mastered the essentials of full-stack web development, effective team collaboration, and modern UI/UX best practices.
          </p>
        </div>
      </div>
    </div>

    {/* Project Stats */}
    <div className="max-w-6xl mx-auto px-4 mb-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {projectStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl mb-3">{stat.icon}</div>
            <div className="text-3xl font-bold text-orange-600 mb-2">{stat.number}</div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Meet the Team Section */}
    <div className="max-w-6xl mx-auto px-4 mb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-orange-800 mb-4">Meet Our Development Team</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Three passionate students who transformed an idea into a fully functional travel platform
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
          >
            <div className="relative mb-6">
              <img
                src={member.image}
                alt={member.name}
                className="w-40 h-40 object-cover rounded-full border-4 border-orange-200 shadow-lg group-hover:border-orange-300 transition-colors duration-300"
              />
              <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white rounded-full p-2 shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <div className="text-center space-y-3 flex-grow">
              <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
              <p className="text-orange-600 font-semibold text-lg">{member.role}</p>
              <div className="space-y-1 text-gray-600">
                <p className="text-sm font-medium">ID: {member.id}</p>
                <p className="text-sm">Department: {member.department}</p>
                <p className="text-sm">{member.university}</p>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-3">Specializations:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Technologies Used */}
    <div className="max-w-6xl mx-auto px-4 mb-20">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-orange-800 mb-4">Technologies & Tools</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">Modern tech stack powering our travel platform</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className={`${tech.color} rounded-xl p-4 text-center font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg`}
            >
              <div className="font-bold">{tech.name}</div>
              <div className="text-xs opacity-75 mt-1">{tech.category}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Project Highlights */}
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Project Highlights & Features</h2>
          <div className="w-16 h-1 bg-white/30 mx-auto"></div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Curated Tour Packages</h3>
                <p className="text-white/90">Travelers can browse, filter, and book packages based on their preferences, budget, and travel dates with real-time availability.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Package Owner Dashboard</h3>
                <p className="text-white/90">Comprehensive admin panel enabling tour providers to add, manage, and track their offerings with analytics and booking management.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Customer-Focused Design</h3>
                <p className="text-white/90">Intuitive search functionality, genuine testimonials, seamless booking experience, and instant support via AI-powered chatbot.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Modern Web Stack</h3>
                <p className="text-white/90">Built with cutting-edge technologies including React, Node.js, and Tailwind CSS, focusing on responsive design and clean user interface.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-2xl font-bold mb-3">🎓 Academic Achievement</h3>
            <p className="text-lg text-white/90">
              This project represents the culmination of our junior year studies, demonstrating practical application of software engineering principles, modern web development practices, and collaborative project management in a real-world scenario.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;