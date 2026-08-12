"use client";
import tellMeOn from "@/utils/tellMeOn.json";
import axios from "axios";
import { useRef, useState } from "react";
import { Fade } from "react-reveal";
import swal from "sweetalert";
import Title from "../Title";
import ContactInp from "./ContactInp";

export default function ContactMe() {
  const [loading, setLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(true);
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(form.current);
    const data = {
      from_name: formData.get("from_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      await axios.post("/api/contact", data);
      swal({
        title: "Message Sent!",
        text: "Thank you for reaching out. A confirmation email has been sent to your inbox and I will get back to you shortly.",
        icon: "success",
        button: "Close",
      }).then(() => setShowContactForm(false));
    } catch (err) {
      console.error("Failed to send contact message:", err);
      swal({
        title: "Something went wrong!",
        text: err.response?.data?.error || "Failed to send email. Please try again.",
        icon: "error",
        button: "Close",
        dangerMode: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    swal({
      title: "Sending message",
      icon: "warning",
      text: "Please wait ...",
      button: false,
      closeOnClickOutside: false,
    });
  }

  return (
    <div className="containerCustom gap">
      <Title
        title="CONTACT"
        titleDes="Have a project in mind or want to connect? Send me a message."
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
        
        {/* Left Column: Contact Details & Social Icons (Equal Height Card) */}
        <div className="lg:col-span-5 h-full">
          <div className="h-full p-6 md:p-8 bg-white dark:bg-[#111c35]/50 border border-gray-200/60 dark:border-[#1d2d55]/40 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="border-l-4 border-cyan-500 pl-3 mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Contact Details
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Reach out directly via call, WhatsApp, or email.
                </p>
              </div>

              {/* Direct Info Items */}
              <div className="space-y-4">
                <a
                  href="tel:+8801610881871"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-gray-50 dark:bg-[#16223b]/60 border border-gray-200/60 dark:border-[#1e2d4a]/60 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 text-base group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Direct Call / Phone</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">+8801610881871</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/+8801610881871/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-gray-50 dark:bg-[#16223b]/60 border border-gray-200/60 dark:border-[#1e2d4a]/60 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-lg group-hover:scale-110 transition-transform">
                    <i className="fa-brands fa-whatsapp"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">WhatsApp</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">+8801610881871</p>
                  </div>
                </a>

                <a
                  href="mailto:tahirahmadsani@gmail.com"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-gray-50 dark:bg-[#16223b]/60 border border-gray-200/60 dark:border-[#1e2d4a]/60 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all group overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 text-base group-hover:scale-110 transition-transform flex-shrink-0">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 font-medium">Email Address</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">tahirahmadsani@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Profiles - ICON ONLY Horizontal Buttons */}
            <div className="border-t border-gray-200 dark:border-[#1d2d55]/60 pt-6 mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3.5">
                Social Profiles
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {tellMeOn.map((tellMe, idx) => (
                  <a
                    key={tellMe.id || idx}
                    href={tellMe.link}
                    target="_blank"
                    rel="noreferrer"
                    title={tellMe.name}
                    className="w-11 h-11 rounded-xl bg-gray-50 dark:bg-[#16223b]/80 border border-gray-200/60 dark:border-[#1e2d4a]/60 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all hover:scale-110 shadow-sm"
                  >
                    <i className={`${tellMe.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form (Equal Height Card) */}
        <div className="lg:col-span-7 h-full">
          {showContactForm ? (
            <div className="h-full p-6 md:p-8 bg-white dark:bg-[#111c35]/50 border border-gray-200/60 dark:border-[#1d2d55]/40 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="border-l-4 border-cyan-500 pl-3 mb-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Send Me A Message
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Fill out the details below and I will reply to your message promptly.
                  </p>
                </div>

                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ContactInp
                      placeholder="Your Full Name *"
                      type="text"
                      name="from_name"
                      required
                    />
                    <ContactInp
                      placeholder="Your Email Address *"
                      type="email"
                      delay={150}
                      name="email"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ContactInp
                      placeholder="Your Phone (Optional)"
                      type="text"
                      delay={200}
                      name="phone"
                    />
                    <ContactInp
                      placeholder="Subject *"
                      type="text"
                      delay={230}
                      name="subject"
                      required
                    />
                  </div>
                  <div>
                    <Fade up delay={240}>
                      <textarea
                        className="w-full rounded-xl bg-gray-50 dark:bg-[#16223b]/80 border border-gray-200/80 dark:border-[#1e2d4a] p-4 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 min-h-[150px] transition-all shadow-sm resize-none"
                        placeholder="Your Message *"
                        name="message"
                        required
                      />
                    </Fade>
                  </div>

                  <Fade up delay={450}>
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        <i className="fa-solid fa-paper-plane text-xs"></i>
                        <span>{loading ? "Sending Message..." : "Send Message"}</span>
                      </button>
                    </div>
                  </Fade>
                </form>
              </div>
            </div>
          ) : (
            <div className="h-full p-8 md:p-12 bg-white dark:bg-[#111c35]/50 border border-gray-200/60 dark:border-[#1d2d55]/40 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 text-3xl">
                <i className="fa-solid fa-check"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Message Sent Successfully!
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
                Thank you for getting in touch. I have received your inquiry and will review it and reply to your email shortly.
              </p>
              <button
                type="button"
                onClick={() => setShowContactForm(true)}
                className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-[#1e293b] hover:bg-gray-200 dark:hover:bg-[#283854] text-gray-800 dark:text-gray-200 text-xs font-semibold border border-gray-200 dark:border-gray-800 transition-all hover:scale-105"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
