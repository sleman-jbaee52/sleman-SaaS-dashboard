import {motion,AnimatePresence} from "framer-motion"
import { useState } from "react";

// Contact Sales Modal Component
interface ContactSalesModalProps {
  open: boolean;
  onClose: () => void;
}
const ContactSalesModal: React.FC<ContactSalesModalProps> = ({
  open,
  onClose,
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to backend/email/CRM etc.
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setForm({ name: "", email: "", company: "", message: "" });
    }, 2000); // simulate feedback then close
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-900">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-2xl text-slate-400 hover:text-red-600"
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
              Contact Sales
            </h3>
            <p className="mb-4 text-slate-600 dark:text-slate-300">
              Fill out the form and our team will reach out to discuss your
              needs.
            </p>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12">
                <svg
                  className="mb-2 h-10 w-10 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                  Thank you!
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-300">
                  Your request has been submitted.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your Name"
                  className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <input
                  required
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Address"
                  className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  type="text"
                  placeholder="Company (optional)"
                  className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Requirements / Message"
                  className="min-h-20 rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="mt-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-700 hover:to-purple-700"
                >
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactSalesModal;
