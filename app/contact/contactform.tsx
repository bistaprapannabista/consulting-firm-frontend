"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INTERESTS } from "@/lib/constants";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    company: "",
    message: "",
    interest: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      interest: value,
    });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, email, phoneNumber, company, message, interest } =
      formData;

    if (!email) {
      toast.error("Please fill in required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          company,
          message,
          interest,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        company: "",
        message: "",
        interest: "",
      });

      toast.success("Message sent successfully! We'll get back to you soon.");
    } catch (error) {
      console.error("Error submitting contact:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" border-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 relative">
        {/* <button className="absolute top-4 right-4 text-gray-700 text-2xl">&times;</button> */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Send us a message
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Select
              onValueChange={handleSelectChange}
              value={formData.interest}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="I am interested in" />
              </SelectTrigger>
              <SelectContent>
                {INTERESTS.map((interest) => (
                  <SelectItem key={interest.value} value={interest.value}>
                    {interest.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full name******"
              className="border-b border-gray-300 focus:outline-none p-2"
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone number******"
              className="border-b border-gray-300 focus:outline-none p-2"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email address******"
              className="border-b border-gray-300 focus:outline-none p-2"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company******"
              className="border-b border-gray-300 focus:outline-none p-2"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Message / enquiry******"
              className="w-full border-b border-gray-300 focus:outline-none p-2"
              rows={2}
              maxLength={100}
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="border px-6 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "SENDING..." : "SEND"}
            </button>
            <span className="text-xs text-gray-500">
              By submitting this form you agree to our{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
