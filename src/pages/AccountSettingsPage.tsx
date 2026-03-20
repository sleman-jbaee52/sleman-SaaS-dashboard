import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Bell,
  Eye,
  EyeOff,
  Save,
  LogOut,
  Trash2,
  Shield,
  Globe,
  Moon,
  Sun,
  Check,
  X,
} from "lucide-react";

interface FormData {
  displayName: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Notifications {
  emailNotifications: boolean;
  projectUpdates: boolean;
  weeklyReport: boolean;
  securityAlerts: boolean;
}

const AccountSettingsPage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "notifications" | "preferences"
  >("profile");
  const [darkMode, setDarkMode] = useState(true);

  // Profile Form State
  const [formData, setFormData] = useState<FormData>({
    displayName: user?.displayName || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState<Notifications>({
    emailNotifications: true,
    projectUpdates: true,
    weeklyReport: false,
    securityAlerts: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({ message: "", type: "" });

  useEffect(() => {
    if (formData.displayName) {
      setFormData((prev) => ({
        ...prev,
        displayName: user?.displayName || "",
      }));
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      // محاكاة حفظ البيانات
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setToast({
        message: "Profile updated successfully!",
        type: "success",
      });
      setTimeout(() => setToast({ message: "", type: "" }), 3000);
    } catch (error) {
      setToast({
        message: "Failed to update profile",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setToast({
        message: "Notification preferences saved!",
        type: "success",
      });
      setTimeout(() => setToast({ message: "", type: "" }), 3000);
    } catch (error) {
      setToast({
        message: "Failed to save preferences",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-50 via-blue-50 to-indigo-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent"
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-indigo-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-12 lg:pt-36">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex items-center space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="rounded-xl p-2.5 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <ArrowLeft className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
          </motion.button>
          <div>
            <h1 className="bg-gradient-to-r from-neutral-900 to-neutral-800 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-neutral-100">
              Account Settings
            </h1>
            <p className="mt-1 text-neutral-600 dark:text-neutral-400">
              Manage your account preferences and security
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-32 overflow-hidden rounded-2xl border border-neutral-200/50 bg-white/60 backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-800/60">
              <nav className="space-y-1 p-4">
                {[
                  {
                    id: "profile",
                    label: "Profile",
                    icon: User,
                  },
                  {
                    id: "security",
                    label: "Security",
                    icon: Lock,
                  },
                  {
                    id: "notifications",
                    label: "Notifications",
                    icon: Bell,
                  },
                  {
                    id: "preferences",
                    label: "Preferences",
                    icon: Globe,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(item.id as typeof activeTab)}
                      className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 transition-all ${
                        activeTab === item.id
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                          : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700/50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <div className="border-t border-neutral-200/50 p-4 dark:border-neutral-700/50">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex w-full items-center justify-center space-x-2 rounded-xl border border-red-200/50 bg-red-50/50 px-4 py-3 font-medium text-red-600 transition-all hover:bg-red-100 dark:border-red-800/50 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-2xl border border-neutral-200/50 bg-white/60 p-8 backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-800/60"
                >
                  <h2 className="mb-8 text-2xl font-bold text-neutral-900 dark:text-white">
                    Profile Information
                  </h2>

                  {/* Profile Avatar */}
                  <div className="mb-8 flex items-center space-x-6 border-b border-neutral-200/50 pb-8 dark:border-neutral-700/50">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
                      <User className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                        Profile Picture
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-all hover:bg-blue-700"
                      >
                        Change Avatar
                      </motion.button>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="space-y-6">
                    {/* Display Name */}
                    <div>
                      <label className="mb-3 block text-xs font-semibold tracking-wider text-neutral-600 uppercase dark:text-neutral-400">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={formData.displayName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            displayName: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border-2 border-neutral-200/60 bg-white/70 px-4 py-3.5 font-medium text-neutral-900 backdrop-blur-md focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none dark:border-neutral-700/60 dark:bg-neutral-900/70 dark:text-white"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-3 block text-xs font-semibold tracking-wider text-neutral-600 uppercase dark:text-neutral-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full cursor-not-allowed rounded-xl border-2 border-neutral-200/60 bg-neutral-100/50 px-4 py-3.5 font-medium text-neutral-600 dark:border-neutral-700/60 dark:bg-neutral-800/50 dark:text-neutral-400"
                      />
                      <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                        Email cannot be changed
                      </p>
                    </div>

                    {/* Member Since */}
                    <div>
                      <label className="mb-3 block text-xs font-semibold tracking-wider text-neutral-600 uppercase dark:text-neutral-400">
                        Member Since
                      </label>
                      <input
                        type="text"
                        value={
                          user.createdAt
                            ? user.createdAt
                                .toDate?.()
                                ?.toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }) || "Recent"
                            : "Recent"
                        }
                        disabled
                        className="w-full cursor-not-allowed rounded-xl border-2 border-neutral-200/60 bg-neutral-100/50 px-4 py-3.5 font-medium text-neutral-600 dark:border-neutral-700/60 dark:bg-neutral-800/50 dark:text-neutral-400"
                      />
                    </div>

                    {/* Save Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-500/40 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                          />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-5 w-5" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Change Password */}
                  <div className="rounded-2xl border border-neutral-200/50 bg-white/60 p-8 backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-800/60">
                    <h2 className="mb-8 text-2xl font-bold text-neutral-900 dark:text-white">
                      Change Password
                    </h2>

                    <div className="space-y-6">
                      {/* Current Password */}
                      <div>
                        <label className="mb-3 block text-xs font-semibold tracking-wider text-neutral-600 uppercase dark:text-neutral-400">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.current ? "text" : "password"}
                            value={formData.currentPassword}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                currentPassword: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border-2 border-neutral-200/60 bg-white/70 px-4 py-3.5 pr-12 font-medium text-neutral-900 backdrop-blur-md focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none dark:border-neutral-700/60 dark:bg-neutral-900/70 dark:text-white"
                          />
                          <button
                            onClick={() =>
                              setShowPasswords({
                                ...showPasswords,
                                current: !showPasswords.current,
                              })
                            }
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                          >
                            {showPasswords.current ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* New Password */}
                      <div>
                        <label className="mb-3 block text-xs font-semibold tracking-wider text-neutral-600 uppercase dark:text-neutral-400">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.new ? "text" : "password"}
                            value={formData.newPassword}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                newPassword: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border-2 border-neutral-200/60 bg-white/70 px-4 py-3.5 pr-12 font-medium text-neutral-900 backdrop-blur-md focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none dark:border-neutral-700/60 dark:bg-neutral-900/70 dark:text-white"
                          />
                          <button
                            onClick={() =>
                              setShowPasswords({
                                ...showPasswords,
                                new: !showPasswords.new,
                              })
                            }
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                          >
                            {showPasswords.new ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="mb-3 block text-xs font-semibold tracking-wider text-neutral-600 uppercase dark:text-neutral-400">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.confirm ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border-2 border-neutral-200/60 bg-white/70 px-4 py-3.5 pr-12 font-medium text-neutral-900 backdrop-blur-md focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none dark:border-neutral-700/60 dark:bg-neutral-900/70 dark:text-white"
                          />
                          <button
                            onClick={() =>
                              setShowPasswords({
                                ...showPasswords,
                                confirm: !showPasswords.confirm,
                              })
                            }
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                          >
                            {showPasswords.confirm ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Save Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-500/40"
                      >
                        <Lock className="h-5 w-5" />
                        <span>Update Password</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="rounded-2xl border border-neutral-200/50 bg-white/60 p-8 backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-800/60">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                          Two-Factor Authentication
                        </h3>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-all hover:bg-blue-700"
                      >
                        Enable 2FA
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-2xl border border-neutral-200/50 bg-white/60 p-8 backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-800/60"
                >
                  <h2 className="mb-8 text-2xl font-bold text-neutral-900 dark:text-white">
                    Notification Preferences
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        key: "emailNotifications",
                        label: "Email Notifications",
                        description: "Receive notifications via email",
                      },
                      {
                        key: "projectUpdates",
                        label: "Project Updates",
                        description: "Get notified about project changes",
                      },
                      {
                        key: "weeklyReport",
                        label: "Weekly Report",
                        description: "Receive a summary every Monday",
                      },
                      {
                        key: "securityAlerts",
                        label: "Security Alerts",
                        description: "Important security notifications",
                      },
                    ].map((item) => (
                      <motion.div
                        key={item.key}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center justify-between rounded-xl bg-neutral-100/50 p-4 transition-all hover:bg-neutral-100 dark:bg-neutral-700/30 dark:hover:bg-neutral-700/50"
                      >
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-white">
                            {item.label}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {item.description}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            setNotifications({
                              ...notifications,
                              [item.key]:
                                !notifications[item.key as keyof Notifications],
                            })
                          }
                          className={`h-7 w-12 rounded-full transition-all ${
                            notifications[item.key as keyof Notifications]
                              ? "bg-blue-600"
                              : "bg-neutral-300 dark:bg-neutral-600"
                          }`}
                        >
                          <motion.div
                            layout
                            className={`h-6 w-6 rounded-full bg-white shadow-md transition-all ${
                              notifications[item.key as keyof Notifications]
                                ? "translate-x-5"
                                : "translate-x-0.5"
                            }`}
                          />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Save Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveNotifications}
                    disabled={isSaving}
                    className="mt-8 flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-500/40 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                        />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5" />
                        <span>Save Preferences</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}

              {/* Preferences Tab */}
              {activeTab === "preferences" && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-2xl border border-neutral-200/50 bg-white/60 p-8 backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-800/60"
                >
                  <h2 className="mb-8 text-2xl font-bold text-neutral-900 dark:text-white">
                    Preferences
                  </h2>

                  <div className="space-y-6">
                    {/* Theme */}
                    <div>
                      <label className="mb-4 block text-sm font-semibold text-neutral-900 dark:text-white">
                        Theme
                      </label>
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center space-x-2 rounded-xl border-2 px-6 py-3 transition-all ${
                            !darkMode
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-neutral-200 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
                          }`}
                        >
                          <Sun className="h-5 w-5" />
                          <span>Light</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center space-x-2 rounded-xl border-2 px-6 py-3 transition-all ${
                            darkMode
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-neutral-200 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
                          }`}
                        >
                          <Moon className="h-5 w-5" />
                          <span>Dark</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Language */}
                    <div>
                      <label className="mb-3 block text-xs font-semibold tracking-wider text-neutral-600 uppercase dark:text-neutral-400">
                        Language
                      </label>
                      <select className="w-full rounded-xl border-2 border-neutral-200/60 bg-white/70 px-4 py-3.5 font-medium text-neutral-900 backdrop-blur-md focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none dark:border-neutral-700/60 dark:bg-neutral-900/70 dark:text-white">
                        <option>English</option>
                        <option>عربي</option>
                        <option>Français</option>
                        <option>Español</option>
                      </select>
                    </div>

                    {/* Timezone */}
                    <div>
                      <label className="mb-3 block text-xs font-semibold tracking-wider text-neutral-600 uppercase dark:text-neutral-400">
                        Timezone
                      </label>
                      <select className="w-full rounded-xl border-2 border-neutral-200/60 bg-white/70 px-4 py-3.5 font-medium text-neutral-900 backdrop-blur-md focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none dark:border-neutral-700/60 dark:bg-neutral-900/70 dark:text-white">
                        <option>UTC</option>
                        <option>GMT+1</option>
                        <option>GMT+2</option>
                        <option>EST</option>
                      </select>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="mt-12 border-t border-red-200/50 pt-8 dark:border-red-800/50">
                    <h3 className="mb-4 text-lg font-bold text-red-600 dark:text-red-400">
                      Danger Zone
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex w-full items-center justify-center space-x-2 rounded-xl border-2 border-red-200/50 bg-red-50/50 px-6 py-3.5 font-semibold text-red-600 transition-all hover:bg-red-100 dark:border-red-800/50 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span>Delete Account</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.message && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            className="fixed top-4 right-4 z-50 max-w-sm"
          >
            <div
              className={`rounded-2xl border bg-white p-6 shadow-2xl dark:bg-neutral-800 ${
                toast.type === "success"
                  ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800/50 dark:bg-emerald-500/10"
                  : "border-red-200 bg-red-50/50 dark:border-red-800/50 dark:bg-red-500/10"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl ${
                    toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
                  }`}
                >
                  {toast.type === "success" ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <X className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-tight font-semibold text-neutral-900 dark:text-white">
                    {toast.message}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountSettingsPage;
