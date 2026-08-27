"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import { GlassCard } from "@/ui/GlassCard";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatusMessage("Opening your email client...");

    // Build pre-filled mailto
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formData.name.trim()}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
    );
    const mailtoUrl = `mailto:${profileData.canonicalEmail}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setTimeout(() => setStatusMessage(null), 5000);
    }, 600);
  };

  return (
    <GlassCard variant="elevated" className="p-6 sm:p-8 lg:p-10 border border-border-strong">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Live Region for Screen Readers & Status */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="text-xs font-mono"
        >
          {statusMessage && (
            <div className="p-3.5 rounded-xl bg-accent-primary/10 border border-accent-primary/30 text-accent-highlight flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 text-accent-primary shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>

        {/* Name Field */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-mono text-text-primary uppercase tracking-wider mb-2 font-medium"
          >
            Name <span className="text-accent-primary">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full px-4 py-3.5 rounded-xl bg-background-surface border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all ${
              errors.name
                ? "border-rose-500/80 focus:ring-rose-500/50"
                : "border-border-subtle focus:border-accent-primary/50 focus:ring-accent-primary/30"
            }`}
          />
          {errors.name && (
            <p
              id="name-error"
              className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-mono"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-mono text-text-primary uppercase tracking-wider mb-2 font-medium"
          >
            Email <span className="text-accent-primary">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full px-4 py-3.5 rounded-xl bg-background-surface border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all ${
              errors.email
                ? "border-rose-500/80 focus:ring-rose-500/50"
                : "border-border-subtle focus:border-accent-primary/50 focus:ring-accent-primary/30"
            }`}
          />
          {errors.email && (
            <p
              id="email-error"
              className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-mono"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-xs font-mono text-text-primary uppercase tracking-wider mb-2 font-medium"
          >
            Message <span className="text-accent-primary">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (errors.message) setErrors({ ...errors, message: undefined });
            }}
            placeholder="Tell me about your project or role..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`w-full px-4 py-3.5 rounded-xl bg-background-surface border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all resize-none ${
              errors.message
                ? "border-rose-500/80 focus:ring-rose-500/50"
                : "border-border-subtle focus:border-accent-primary/50 focus:ring-accent-primary/30"
            }`}
          />
          {errors.message && (
            <p
              id="message-error"
              className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-mono"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-accent-primary text-black font-bold text-sm hover:bg-accent-highlight shadow-[0_0_20px_rgba(255,106,0,0.3)] hover:shadow-[0_0_30px_rgba(255,106,0,0.5)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Preparing Email Draft...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </GlassCard>
  );
}
