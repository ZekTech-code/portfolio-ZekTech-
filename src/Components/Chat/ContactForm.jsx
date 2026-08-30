import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  else if (form.name.trim().length < 2) errors.name = "Name must be at least 2 characters";

  if (!form.email.trim()) errors.email = "Email is required";
  else if (!EMAIL_REGEX.test(form.email.trim())) errors.email = "Enter a valid email address";

  if (!form.subject.trim()) errors.subject = "Subject is required";

  if (!form.message.trim()) errors.message = "Message is required";
  else if (form.message.trim().length < 10) errors.message = "Message must be at least 10 characters";

  return errors;
}

function FieldError({ message }) {
  if (!message) return null;
  return (
    <span className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-500">
      <FiAlertCircle className="text-[10px]" />
      {message}
    </span>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const fieldErrors = validate(form);
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(fieldErrors).length > 0) return;

    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setTouched({});
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const sending = status === "sending";
  const success = status === "success";
  const failed = status === "error";

  const inputClass = (field) =>
    `w-full rounded-xl border bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:ring-1 ${
      touched[field] && errors[field]
        ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20"
        : "border-border/60 focus:border-accent focus:ring-accent/30"
    }`;

  return (
    <div className="flex h-full max-h-120 flex-col rounded-2xl border border-border/60 bg-surface/50 backdrop-blur-xl overflow-hidden">
      {success ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <FiCheckCircle className="text-5xl text-accent-hover" />
          </motion.div>
          <h3 className="text-lg font-extrabold text-foreground">Message Sent!</h3>
          <p className="text-sm text-muted text-center">Thanks for reaching out. I&apos;ll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col p-4 sm:p-6 gap-3 sm:gap-4">
          {failed && (
            <p className="text-xs font-medium text-red-500">Failed to send message. Please try again.</p>
          )}
          <div>
            <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-muted mb-1 sm:mb-1.5">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              placeholder="John Doe"
              className={inputClass("name")}
            />
            <FieldError message={touched.name && errors.name} />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-muted mb-1 sm:mb-1.5">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="you@example.com"
              className={inputClass("email")}
            />
            <FieldError message={touched.email && errors.email} />
          </div>

          <div>
            <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-muted mb-1 sm:mb-1.5">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              value={form.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              onBlur={() => handleBlur("subject")}
              placeholder="Project inquiry"
              className={inputClass("subject")}
            />
            <FieldError message={touched.subject && errors.subject} />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-muted mb-1 sm:mb-1.5">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={4}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              onBlur={() => handleBlur("message")}
              placeholder="Tell me about your project..."
              className={`w-full resize-none rounded-xl border bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:ring-1 ${
                touched.message && errors.message
                  ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20"
                  : "border-border/60 focus:border-accent focus:ring-accent/30"
              }`}
            />
            <FieldError message={touched.message && errors.message} />
          </div>

          <motion.button
            type="submit"
            disabled={sending}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="premium-primary-action flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 sm:px-6 sm:py-3 text-sm font-bold text-white dark:text-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <FiSend className="text-sm" />
            {sending ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
