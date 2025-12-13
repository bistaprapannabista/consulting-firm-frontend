"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  Mail,
  Phone,
  Building2,
  User,
  MessageSquare,
  Send,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { INTERESTS } from "@/lib/constants";

const ContactCard = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    company: "",
    message: "",
    interest: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

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
      const response = await fetch("/api/quote", {
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
        throw new Error(data.error || "Failed to send quote request");
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

      toast.success(
        "Quote request sent successfully! We'll get back to you soon."
      );
    } catch (err) {
      console.error("Error submitting quote request:", err);
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to send quote request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/5 via-transparent to-brand-400/5 rounded-3xl"></div>

      <Card className="relative border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden h-[85vh] sm:h-[90vh] flex flex-col">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-brand-50 to-brand-400 p-6 sm:p-8 text-white relative overflow-hidden flex-shrink-0">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Get Your Quote</h2>
                <p className="text-sm">{"Let's discuss your project"}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+971 55 385 6863</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:info@aimterior.com"
                  className="hover:underline transition-all duration-300"
                >
                  info@aimterior.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6 sm:p-8 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            {/* Interest Selection */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-brand-50" />I am interested
                in
              </label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, interest: value })
                }
              >
                <SelectTrigger className="w-full h-12 border-2 border-gray-200 focus:border-brand-50 transition-all duration-300 rounded-xl bg-gray-50/50 hover:bg-gray-50">
                  <SelectValue placeholder="Select your interest" />
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

            {/* Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-50" />
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="h-12 border-2 border-gray-200 focus:border-brand-50 focus:ring-2 focus:ring-brand-50/20 transition-all duration-300 rounded-xl bg-gray-50/50 hover:bg-gray-50"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-50" />
                  Phone Number
                </label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="h-12 border-2 border-gray-200 focus:border-brand-50 focus:ring-2 focus:ring-brand-50/20 transition-all duration-300 rounded-xl bg-gray-50/50 hover:bg-gray-50"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-50" />
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-12 border-2 border-gray-200 focus:border-brand-50 focus:ring-2 focus:ring-brand-50/20 transition-all duration-300 rounded-xl bg-gray-50/50 hover:bg-gray-50"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-brand-50" />
                  Company
                </label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Enter your company name"
                  className="h-12 border-2 border-gray-200 focus:border-brand-50 focus:ring-2 focus:ring-brand-50/20 transition-all duration-300 rounded-xl bg-gray-50/50 hover:bg-gray-50"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Message */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-brand-50" />
                Message / Enquiry
              </label>
              <Textarea
                id="message"
                placeholder="Tell us about your project requirements..."
                className="w-full h-24 border-2 border-gray-200 focus:border-brand-50 focus:ring-2 focus:ring-brand-50/20 transition-all duration-300 rounded-xl bg-gray-50/50 hover:bg-gray-50 resize-none"
                value={formData.message}
                onChange={handleChange}
                maxLength={500}
              />
              <div className="text-right text-xs text-gray-400 mt-1">
                {formData.message.length}/500
              </div>
            </div>

            {/* Submit Section */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Button
                  type="submit"
                  variant="brand"
                  size="xl"
                  className="group px-8 py-4 text-base font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span>Send Quote Request</span>
                      <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  )}
                </Button>

                <div className="text-sm text-gray-500 max-w-xs">
                  By submitting this form you agree to our{" "}
                  <a
                    href="#"
                    className="text-brand-50 hover:text-brand-400 underline transition-colors duration-300 font-medium"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-brand-50 hover:text-brand-400 underline transition-colors duration-300 font-medium"
                  >
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ContactCard;
