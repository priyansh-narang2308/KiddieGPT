"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Loader2 } from "lucide-react";
import emailjs from "emailjs-com";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          setLoading(false);
          setForm({ name: "", email: "", message: "" });
          toast.success("🎉 Your magical message has been sent successfully!");
        },
        (error) => {
          setLoading(false);
          console.error("EmailJS error:", error);
          toast.error("❌ Failed to send message. Please try again!");
        }
      );
  };

  return (
    <div className="min-h-screen mt-15 bg-gradient-to-br from-purple-100 via-pink-100 to-fuchsia-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 relative overflow-hidden">
        <motion.div
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-purple-800">
            ✨ Get in Touch ✨
          </h1>
          <p className="text-pink-600 mt-2 text-lg">
            Have questions, magical ideas, or just want to say hi? We’d love to
            hear from you! 🦄🌈
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-pink-200 to-purple-200 shadow-md"
          >
            <Mail className="w-10 h-10 mx-auto text-purple-700" />
            <h3 className="font-bold text-purple-800 mt-3">Email Us</h3>
            <p className="text-sm text-purple-600">
              priyanshnarang23@gmail.com
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-purple-200 to-pink-200 shadow-md"
          >
            <Phone className="w-10 h-10 mx-auto text-pink-700" />
            <h3 className="font-bold text-pink-800 mt-3">Call Us</h3>
            <p className="text-sm text-pink-600">+91 8320396828</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-fuchsia-200 to-pink-200 shadow-md"
          >
            <MessageCircle className="w-10 h-10 mx-auto text-fuchsia-700" />
            <h3 className="font-bold text-fuchsia-800 mt-3">Chat With Us</h3>
            <p className="text-sm text-fuchsia-600">
              We’re just a message away!
            </p>
          </motion.div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-purple-800">
            Send us a Magical Message 🧚
          </h2>
          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-purple-200 p-3 focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-pink-200 p-3 focus:ring-2 focus:ring-pink-400"
            />
            <textarea
              name="message"
              placeholder="Your Magical Message ✨"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-fuchsia-200 p-3 focus:ring-2 focus:ring-fuchsia-400"
            ></textarea>

            <motion.button
              type="submit"
              whileHover={{ scale: loading ? 1 : 1.05 }}
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 cursor-pointer rounded-xl 
    bg-gradient-to-r from-purple-600 via-pink-500 to-fuchsia-500 text-white py-3 font-bold shadow-lg
    ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message 💌"
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
