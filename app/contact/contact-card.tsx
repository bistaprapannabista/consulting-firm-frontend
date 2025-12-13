"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MoveRight } from "lucide-react";

const ContactCard = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
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

    const { fullName, email } = formData;

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
    <Card className="bg-primary">
      <CardHeader>
        <CardTitle className="text-white">
          Discover Quality and Precision: Request a Quote for Our Expert
          Services
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white">
                Name
              </Label>
              <Input
                className="text-white"
                id="fullName"
                placeholder="Enter Your Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              <div className="text-white">I am not a Robot</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                className="text-white"
                id="email"
                type="email"
                placeholder="Enter Your Email Address"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <div>
                <Button
                  type="submit"
                  className="w-full bg-white text-black"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Request a Quote"}
                  <MoveRight />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <ToastContainer />
    </Card>
  );
};

export default ContactCard;
