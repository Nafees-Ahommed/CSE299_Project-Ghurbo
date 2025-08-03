import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const CHAT_BOT_AVATAR = assets.ChatBot;

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "bn", label: "বাংলা" },
];

const PACKAGE_TYPES = [
  { en: "Solo Traveler", bn: "একাকী ভ্রমণকারী" },
  { en: "Couple's Getaway", bn: "দম্পতির জন্য" },
  { en: "Family Fun", bn: "ফ্যামিলি" },
  { en: "Friends Trip", bn: "বন্ধুদের দল" },
];

const PRICE_RANGES = [
  { value: "500-5000", en: "500 to 5000 BDT", bn: "৫০০ থেকে ৫০০০ টাকা" },
  { value: "5000-10000", en: "5000 to 10000 BDT", bn: "৫০০০ থেকে ১০,০০০ টাকা" },
  { value: "10000-20000", en: "10000 to 20000 BDT", bn: "১০,০০০ থেকে ২০,০০০ টাকা" },
  { value: "20000-50000", en: "20000 to 50000 BDT", bn: "২০,০০০ থেকে ৫০,০০০ টাকা" },
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [lang, setLang] = useState(null);
  const [waitingFor, setWaitingFor] = useState("language");
  const [filter, setFilter] = useState({});
  const [showNotifier, setShowNotifier] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showBackMenu, setShowBackMenu] = useState(false);

  const navigate = useNavigate();
  const chatEndRef = useRef();

  // Show "How can I help you?" every 20s when closed
  useEffect(() => {
    if (!open) {
      const timer = setInterval(() => setShowNotifier(true), 20000);
      return () => clearInterval(timer);
    }
  }, [open]);

  // Auto hide notifier after 5 seconds
  useEffect(() => {
    if (showNotifier) {
      const timer = setTimeout(() => setShowNotifier(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotifier]);

  // Scroll chat to bottom on message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Initialize with language selection
  useEffect(() => {
    if (waitingFor === "language") {
      setMessages([
        {
          from: "bot",
          text: "Hello! Welcome to GHURBO 🌍\nPlease select your preferred language\n\nহ্যালো! GHURBO তে স্বাগতম 🌍\nআপনার পছন্দের ভাষা নির্বাচন করুন",
        },
        {
          from: "bot",
          options: LANGUAGES.map((lang) => ({
            label: `🌐 ${lang.label}`,
            value: lang.code,
          })),
        },
      ]);
    }
  }, []);

  // Simulate typing effect
  const simulateTyping = (callback, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  // Handlers

  const handleLanguage = (code) => {
    setLang(code);
    setShowBackMenu(false);

    simulateTyping(() => {
      setMessages([
        {
          from: "bot",
          text: code === "en"
            ? "Welcome to GHURBO! ✈️ I'm your travel assistant. How can I help you explore Bangladesh's most beautiful destinations today?"
            : "GHURBO তে স্বাগতম! ✈️ আমি আপনার ট্রাভেল সহায়ক। আজ বাংলাদেশের সবচেয়ে সুন্দর গন্তব্যগুলো অন্বেষণে আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
        },
        {
          from: "bot",
          options: [
            {
              label: code === "en" ? "🎯 Find Perfect Tour Package" : "🎯 পারফেক্ট ট্যুর প্যাকেজ খুঁজুন",
              value: "find_package",
            },
            {
              label: code === "en" ? "📋 Booking & Registration Help" : "📋 বুকিং ও রেজিস্ট্রেশন সহায়তা",
              value: "booking_info",
            },
            {
              label: code === "en" ? "🎧 Customer Support" : "🎧 কাস্টমার সাপোর্ট",
              value: "support",
            },
          ],
        },
      ]);
      setWaitingFor("main_option");
    });
  };

  const handleMainOption = (value) => {
    setShowBackMenu(false);
    if (value === "find_package") {
      simulateTyping(() => {
        setMessages((m) => [
          ...m,
          {
            from: "bot",
            text: lang === "en"
              ? "Perfect! Let's find your ideal getaway 🏖️\nWhat's your travel budget range?"
              : "চমৎকার! আসুন আপনার আদর্শ ভ্রমণ খুঁজে নিই 🏖️\nআপনার ভ্রমণ বাজেট রেঞ্জ কী?",
          },
          {
            from: "bot",
            options: PRICE_RANGES.map((p) => ({
              label: `💰 ${p[lang]}`,
              value: p.value,
            })),
          },
        ]);
        setWaitingFor("budget");
      });
    } else if (value === "booking_info") {
      simulateTyping(() => {
        setMessages((m) => [
          ...m,
          {
            from: "bot",
            text: lang === "en"
              ? "📚 Booking & Registration Guide:\n\n🔹 To book a package: Visit 'Tour Packages' → Select your preferred package → Click 'Book Now'\n\n🔹 Package owner registration: Go to Dashboard → Register as Package Owner\n\n🔹 Payment: Follow secure checkout process with multiple payment options\n\n🔹 Need help? Our support team is always ready!"
              : "📚 বুকিং ও রেজিস্ট্রেশন গাইড:\n\n🔹 প্যাকেজ বুক করতে: 'ট্যুর প্যাকেজ' এ যান → আপনার পছন্দের প্যাকেজ নির্বাচন করুন → 'বুক নাউ' ক্লিক করুন\n\n🔹 প্যাকেজ মালিক রেজিস্ট্রেশন: ড্যাশবোর্ডে যান → প্যাকেজ মালিক হিসেবে রেজিস্টার করুন\n\n🔹 পেমেন্ট: একাধিক পেমেন্ট অপশন সহ নিরাপদ চেকআউট প্রক্রিয়া অনুসরণ করুন\n\n🔹 সাহায্য প্রয়োজন? আমাদের সাপোর্ট টিম সর্বদা প্রস্তুত!",
          },
        ]);
        setWaitingFor("end");
        setTimeout(() => setShowBackMenu(true), 2500);
      });
    } else if (value === "support") {
      simulateTyping(() => {
        setMessages((m) => [
          ...m,
          {
            from: "bot",
            text: lang === "en"
              ? "🎧 Customer Support\n\n📞 Call us: 017123456\n📧 Email: support@ghurbo.com\n⏰ Available: 24/7\n\nWould you like to connect with our support team right now?"
              : "🎧 কাস্টমার সাপোর্ট\n\n📞 কল করুন: ০১৭১২৩৪৫৬\n📧 ইমেইল: support@ghurbo.com\n⏰ উপলব্ধ: ২৪/৭\n\nআপনি কি এখনই আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করতে চান?",
          },
          {
            from: "bot",
            options: [
              { label: lang === "en" ? "📞 Call Now" : "📞 এখনই কল করুন", value: "call" },
              { label: lang === "en" ? "↩️ Back to Menu" : "↩️ মেনুতে ফিরে যান", value: "main_menu" },
            ],
          },
        ]);
        setWaitingFor("support_confirm");
      });
    }
  };

  const handleBudget = (value) => {
    setFilter((f) => ({ ...f, budget: value }));
    setShowBackMenu(false);
    simulateTyping(() => {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: lang === "en"
            ? "Great choice! 💡 Now, what type of travel experience are you looking for?"
            : "দারুণ পছন্দ! 💡 এখন, আপনি কোন ধরনের ভ্রমণ অভিজ্ঞতা খুঁজছেন?",
        },
        {
          from: "bot",
          options: PACKAGE_TYPES.map((p) => ({
            label: `🎒 ${p[lang]}`,
            value: p.en,
          })),
        },
      ]);
      setWaitingFor("type");
    });
  };

  const handleTourType = (value) => {
    setFilter((f) => ({ ...f, type: value }));
    setShowBackMenu(false);
    simulateTyping(() => {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: lang === "en"
            ? "Perfect! 🎉 I'm finding the best packages that match your preferences. Get ready for an amazing journey!"
            : "পারফেক্ট! 🎉 আমি আপনার পছন্দ অনুযায়ী সেরা প্যাকেজগুলো খুঁজে দিচ্ছি। একটি অসাধারণ যাত্রার জন্য প্রস্তুত হন!",
        },
      ]);
      setWaitingFor("end");
      setTimeout(() => setShowBackMenu(true), 2500);
      setTimeout(() => {
        const params = [];
        if (filter.budget) params.push(`budget=${encodeURIComponent(filter.budget)}`);
        if (value) params.push(`tourType=${encodeURIComponent(value)}`);
        navigate(`/packages?${params.join("&")}`);
        setOpen(false);
      }, 2000);
    });
  };

  const handleSupportConfirm = (value) => {
    setShowBackMenu(false);
    if (value === "call") {
      window.open("tel:017123456");
    } else if (value === "main_menu") {
      handleLanguage(lang);
    }
  };

  // "Back to Menu" logic: resets flow to main menu, removes "Back to Menu" button
  const handleBackMenu = () => {
    setShowBackMenu(false);
    handleLanguage(lang);
  };

  const handleOption = (value) => {
    setShowBackMenu(false); // Hide on next step
    if (waitingFor === "language") handleLanguage(value);
    else if (waitingFor === "main_option") handleMainOption(value);
    else if (waitingFor === "budget") handleBudget(value);
    else if (waitingFor === "type") handleTourType(value);
    else if (waitingFor === "support_confirm") handleSupportConfirm(value);
  };

  return (
    <>
      {/* Floating Icon */}
      <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
        <button
          aria-label="Open GHURBO Travel Assistant"
          onClick={() => {
            setOpen(true);
            setShowNotifier(false);
          }}
          className="group relative bg-gradient-to-br from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white shadow-2xl rounded-full w-16 h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-3xl active:scale-95"
        >
          <img
            src={CHAT_BOT_AVATAR}
            alt="GHURBO Travel Assistant"
            className="w-8 h-8 filter brightness-0 invert"
          />

          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-amber-500 animate-ping opacity-20"></div>

          {/* Notification Bubble */}
          {showNotifier && (
            <div className="absolute -top-14 -left-20 bg-gray-900 text-white px-4 py-2 text-sm rounded-xl shadow-lg animate-bounce whitespace-nowrap z-10">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
              </div>
              {lang === "bn" ? "কিভাবে সাহায্য করতে পারি? 🌟" : "How can I help you? 🌟"}
            </div>
          )}
        </button>
      </div>

      {/* Chatbot Dialog */}
      {open && (
        <div className="fixed bottom-24 right-4 z-50 bg-white shadow-2xl rounded-3xl border border-gray-100 flex flex-col w-[95vw] max-w-[400px] h-[70vh] md:bottom-24 md:right-8 md:w-[400px] md:h-[550px] animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-amber-500 text-white rounded-t-3xl">
            <div className="relative">
              <img
                src={CHAT_BOT_AVATAR}
                alt="GHURBO Assistant"
                className="w-10 h-10 rounded-full bg-white/20 p-2 filter brightness-0 invert"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">GHURBO Assistant</h3>
              <p className="text-xs text-white/80">Your Travel Companion</p>
            </div>
            <button
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white space-y-4">
            {messages.map((msg, i) =>
              msg.options ? (
                <div key={i} className="space-y-2">
                  <div className="grid gap-2">
                    {msg.options.map((opt) => (
                      <button
                        key={opt.value}
                        className="bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white rounded-xl px-4 py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 text-sm font-medium text-left"
                        onClick={() => {
                          setMessages((m) => [
                            ...m,
                            {
                              from: "user",
                              text: opt.label,
                            },
                          ]);
                          handleOption(opt.value);
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  key={i}
                  className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                    msg.from === "bot"
                      ? "bg-white border border-gray-200 text-gray-700"
                      : "bg-gradient-to-r from-blue-600 to-amber-500 text-white ml-auto"
                  }`}>
                    {msg.text.split("\n").map((str, idx) => (
                      <div key={idx} className={`${idx > 0 ? "mt-2" : ""} text-sm leading-relaxed`}>
                        {str}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Back to Menu button */}
            {showBackMenu && waitingFor === "end" && (
              <div style={{ marginTop: '8px', textAlign: 'center' }}>
                <button
                  className="bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white rounded-xl px-4 py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 text-sm font-medium"
                  onClick={handleBackMenu}
                >
                  {lang === "en" ? "↩️ Back to Menu" : "↩️ মেনুতে ফিরে যান"}
                </button>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl">
            <p className="text-center text-xs text-gray-500">
              {lang === "bn"
                ? "🌟 GHURBO চ্যাটবট দ্বারা দ্রুত ভ্রমণ সহায়তা নিন"
                : "🌟 Get instant travel assistance with GHURBO chatbot"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
