import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

import { useStripe } from "../hooks/useStripe";
import {
  Users,
  BarChart3,
  Folder,
  DollarSign,
  Plus,
  Settings,
  Star,
  Zap,
  Download,
  CheckCircle,
  X,
} from "lucide-react";
import { SUBSCRIPTION_PLANS } from "../utils/constants";

import { canCreateProject } from "../services/stripe";

import { UserProfile, Project } from "../types";
import {
  getUserProjects,
  createProject,
  updateUserProjectsCount,
} from "../services/firebase";

const DashboardPage: React.FC = () => {
  const { user, loading } = useAuth();
  const { createCheckoutSession } = useStripe();
  const [activeTab, setActiveTab] = useState<
    "overview" | "projects" | "billing"
  >("overview");
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const navigate = useNavigate();
  // New Project Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [formErrors, setFormErrors] = useState({ name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({
    message: "",
    type: "",
  });

  useEffect(() => {
    let isMounted = true;

    if (user) {
      const fetchProjects = async () => {
        try {
          setProjectsLoading(true);
          const userProjects = await getUserProjects(user.uid);
          if (isMounted) {
            setProjects(userProjects);
          }
        } catch (error) {
          console.error("Error fetching projects:", error);
          if (isMounted) {
            setProjects([]);
          }
        } finally {
          if (isMounted) {
            setProjectsLoading(false);
          }
        }
      };
      fetchProjects();
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
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

  const currentPlan =
    SUBSCRIPTION_PLANS.find(
      (p) => p.id === (user.subscriptionPlan || "starter"),
    ) || SUBSCRIPTION_PLANS[0];
  const subscriptionPlan = user.subscriptionPlan || "starter";
  const canCreateMoreProjects = canCreateProject(
    subscriptionPlan as "starter" | "professional" | "enterprise",
    user.projectsCount,
  );

  // Create New Project Handler
  const createNewProject = async () => {
    if (!newProject.name.trim()) {
      setFormErrors({ name: "Project name is required" });
      return;
    }

    setIsSubmitting(true);
    setFormErrors({ name: "" });

    try {
      const projectId = await createProject(
        user.uid,
        newProject.name.trim(),
        newProject.description.trim(),
      );

      // Optimistic update
      const newProj = {
        id: projectId,
        name: newProject.name.trim(),
        description: newProject.description.trim(),
        createdAt: {
          seconds: Math.floor(Date.now() / 1000),
          nanoseconds: 0,
        } as any,
      };
      setProjects([newProj, ...projects]);

      // Update count
      await updateUserProjectsCount(user.uid);

      // Show success toast
      setToast({ message: "Project created successfully!", type: "success" });

      // Auto-hide toast after 3 seconds
      setTimeout(() => {
        setToast({ message: "", type: "" });
      }, 3000);

      // Reset form and close modal
      setNewProject({ name: "", description: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
      setToast({
        message: "Failed to create project. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-12 lg:pt-36">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Stats Cards */}
          <div className="space-y-6 lg:col-span-3">
            {/* Welcome Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 max-w-2xl text-center lg:mb-16 lg:text-left"
            >
              <h1 className="mb-6 bg-gradient-to-r from-neutral-900 to-neutral-800 bg-clip-text text-4xl leading-tight font-bold text-transparent lg:text-5xl dark:from-white dark:to-neutral-100">
                Welcome back,{" "}
                {user.displayName?.split(" ")[0] ||
                  user.email?.split("@")[0] ||
                  "User"}
                !
              </h1>
              <p className="max-w-2xl text-xl text-neutral-600 dark:text-neutral-400">
                Here's what's happening with your account.
              </p>
              <div className="mt-8 flex items-center justify-center lg:mt-6 lg:justify-start">
                <button
                  onClick={() => navigate("/account-settings")}
                  className="group flex items-center space-x-2 rounded-xl p-3 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-blue-600 dark:hover:bg-neutral-800 dark:hover:text-blue-400"
                >
                  <Settings className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
                  <span className="hidden lg:inline">Account Settings</span>
                </button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/50 bg-white/50 p-8 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-neutral-700/50 dark:bg-neutral-800/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Total Projects
                    </p>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                      {user.projectsCount}
                    </p>
                  </div>
                  <Folder className="h-12 w-12 text-blue-600 transition-transform group-hover:scale-110" />
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-blue-500 to-purple-600 transition-all duration-500"
                    style={{
                      width: `${Math.min((user.projectsCount / (currentPlan.maxProjects || 5)) * 100, 100)}%`,
                    }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/50 bg-white/50 p-8 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-neutral-700/50 dark:bg-neutral-800/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Plan Status
                    </p>
                    <p className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-3xl font-bold text-transparent">
                      {currentPlan.name.toUpperCase()}
                    </p>
                  </div>
                  <Star className="h-12 w-12 text-emerald-500 transition-transform group-hover:scale-110" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/50 bg-white/50 p-8 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 dark:border-neutral-700/50 dark:bg-neutral-800/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Max Projects
                    </p>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                      {currentPlan.maxProjects.toLocaleString()}
                    </p>
                  </div>
                  <Zap className="h-12 w-12 text-purple-500 transition-transform group-hover:scale-110" />
                </div>
              </motion.div>
            </div>

            {/* Content Tabs */}
            <div className="overflow-hidden rounded-3xl border border-neutral-200/50 bg-white/60 shadow-2xl backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-800/60">
              <div className="flex border-b border-neutral-200/50 dark:border-neutral-700/50">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex-1 px-8 py-6 font-medium transition-all duration-300 ${
                    activeTab === "overview"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700/50"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`flex-1 px-8 py-6 font-medium transition-all duration-300 ${
                    activeTab === "projects"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700/50"
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => setActiveTab("billing")}
                  className={`flex-1 px-8 py-6 font-medium transition-all duration-300 ${
                    activeTab === "billing"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700/50"
                  }`}
                >
                  Billing
                </button>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-8"
                  >
                    <h2 className="mb-8 text-2xl font-bold text-neutral-900 dark:text-white">
                      Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group rounded-2xl border-2 p-8 transition-all ${
                          canCreateMoreProjects
                            ? "border-blue-200 bg-blue-50/50 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20 dark:border-blue-800/50 dark:bg-blue-500/10"
                            : "cursor-not-allowed border-orange-200 bg-orange-50/50 opacity-60 dark:border-orange-800/50 dark:bg-orange-500/10"
                        }`}
                        onClick={() => setIsModalOpen(true)}
                        disabled={!canCreateMoreProjects}
                      >
                        <div className="flex flex-col items-center space-y-4">
                          <div
                            className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                              canCreateMoreProjects
                                ? "bg-blue-600 shadow-lg shadow-blue-500/25 group-hover:bg-blue-700"
                                : "bg-orange-500"
                            }`}
                          >
                            <Plus className="h-8 w-8 text-white" />
                          </div>
                          <div className="text-center">
                            <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-white">
                              New Project
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {canCreateMoreProjects
                                ? "Start a new project"
                                : "Upgrade to create more"}
                            </p>
                          </div>
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-8 transition-all hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20 dark:border-emerald-800/50 dark:bg-emerald-500/10"
                      >
                        <div className="flex flex-col items-center space-y-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-500/25 group-hover:bg-emerald-700">
                            <Download className="h-8 w-8 text-white" />
                          </div>
                          <div className="text-center">
                            <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-white">
                              Export Data
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              Download analytics
                            </p>
                          </div>
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/analytics")}
                        className="group rounded-2xl border-2 border-purple-200 bg-purple-50/50 p-8 transition-all hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20 dark:border-purple-800/50 dark:bg-purple-500/10"
                      >
                        <div className="flex flex-col items-center space-y-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600 shadow-lg shadow-purple-500/25 transition-all group-hover:bg-purple-700 group-hover:shadow-purple-500/40">
                            <BarChart3 className="h-8 w-8 text-white transition-transform group-hover:scale-110" />
                          </div>
                          <div className="text-center">
                            <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-white">
                              View Analytics
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              See your performance metrics
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "projects" && (
                  <motion.div
                    key="projects"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-8"
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        Your Projects ({projects.length}/
                        {user.projectsCount || projects.length}/
                        {currentPlan.maxProjects})
                      </h2>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        disabled={!canCreateMoreProjects}
                        className={`flex items-center space-x-2 rounded-xl px-6 py-2.5 font-semibold transition-all ${
                          canCreateMoreProjects
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700"
                            : "cursor-not-allowed bg-neutral-200 text-neutral-500 dark:bg-neutral-700"
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                        <span>New Project</span>
                      </button>
                    </div>
                    {projectsLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="h-8 w-8 rounded-full border-3 border-blue-600 border-t-transparent"
                        />
                        <span className="ml-3 text-neutral-500">
                          Loading projects...
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {projects.length === 0 ? (
                          <div className="py-12 text-center">
                            <Folder className="mx-auto mb-4 h-16 w-16 text-neutral-400" />
                            <h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
                              No projects yet
                            </h3>
                            <p className="text-neutral-500 dark:text-neutral-400">
                              Get started by creating your first project
                            </p>
                          </div>
                        ) : (
                          projects.map((project) => (
                            <motion.div
                              key={project.id}
                              whileHover={{ scale: 1.02 }}
                              className="group rounded-2xl border border-neutral-200/30 bg-white/50 p-6 backdrop-blur-xl transition-all hover:shadow-xl hover:shadow-blue-500/10 dark:border-neutral-700/50 dark:bg-neutral-800/50"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
                                    {project.name || "Untitled Project"}
                                  </h3>
                                  <div className="flex items-center space-x-4 text-sm">
                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                                      Active
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                                  <button
                                    onClick={() => navigate("/analytics")}
                                    className="group/btn rounded-xl p-2 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                  >
                                    <BarChart3 className="h-4 w-4 text-neutral-500 transition-colors group-hover/btn:text-blue-600 dark:group-hover/btn:text-blue-400" />
                                  </button>

                                  <button
                                    onClick={() =>
                                      navigate("/account-settings")
                                    }
                                    className="group/btn rounded-xl p-2 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                  >
                                    <Settings className="h-4 w-4 text-neutral-500 transition-colors group-hover/btn:text-blue-400" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "billing" && (
                  <motion.div
                    key="billing"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-8"
                  >
                    <div className="mx-auto max-w-2xl text-center">
                      <div className="mb-8 rounded-3xl border-2 border-blue-200/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 dark:border-blue-800/50">
                        <DollarSign className="mx-auto mb-4 h-16 w-16 text-blue-600" />
                        <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-white">
                          Current Plan: {currentPlan.name.toUpperCase()}
                        </h2>
                        <p className="mx-auto mb-8 max-w-md text-neutral-600 dark:text-neutral-400">
                          {currentPlan.price === 0
                            ? "You're on the free Starter plan"
                            : `You're paying $${currentPlan.price}/month`}
                        </p>
                        <div className="mb-8 space-y-4">
                          {currentPlan.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3"
                            >
                              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600">
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>

                              <span className="text-neutral-700 dark:text-neutral-300">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                        {currentPlan.price === 0 && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              createCheckoutSession(
                                "professional",
                                user as UserProfile,
                              )
                            }
                            className="inline-flex items-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-xl shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-500/40"
                          >
                            Upgrade to Professional
                            <Zap className="ml-2 h-5 w-5" />
                          </motion.button>
                        )}
                      </div>
                    </div>

                    {/* Upgrade Cards */}
                    <div className="grid gap-6 pt-12 md:grid-cols-3">
                      {SUBSCRIPTION_PLANS.slice(1).map((plan) => (
                        <motion.div
                          key={plan.id}
                          whileHover={{ y: -8 }}
                          className="group relative overflow-hidden rounded-3xl border border-neutral-200/50 bg-white/70 p-8 backdrop-blur-xl transition-all hover:shadow-2xl hover:shadow-purple-500/10 dark:border-neutral-700/50 dark:bg-neutral-800/70"
                        >
                          <div className="absolute top-6 right-6">
                            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                              {plan.name.toUpperCase()}
                            </span>
                          </div>
                          <div className="mb-8 text-center">
                            <h3 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-white">
                              ${plan.price}
                            </h3>
                            <p className="mb-2 text-neutral-600 dark:text-neutral-400">
                              per month
                            </p>
                          </div>
                          <ul className="mb-8 space-y-4 text-left">
                            {plan.features.map((feature, index) => (
                              <li
                                key={index}
                                className="flex items-start space-x-3"
                              >
                                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600">
                                  <CheckCircle className="h-4 w-4 text-white" />
                                </div>

                                <span className="text-neutral-700 dark:text-neutral-300">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              createCheckoutSession(
                                plan.id as "professional" | "enterprise",
                                user as UserProfile,
                              )
                            }
                            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-xl shadow-blue-500/25 transition-all group-hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-500/40"
                          >
                            {user.subscriptionPlan === plan.id
                              ? "Current Plan"
                              : "Upgrade Now"}
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 lg:col-span-1"
          >
            <div className="sticky top-32 rounded-3xl border border-neutral-200/50 bg-white/70 p-8 backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-800/70">
              <h3 className="mb-6 text-lg font-bold text-neutral-900 dark:text-white">
                Account Overview
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 rounded-2xl bg-neutral-100/50 p-4 dark:bg-neutral-700/50">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="truncate font-semibold text-neutral-900 dark:text-white">
                      {user.displayName?.split(" ")[0] ||
                        user.email?.split("@")[0] ||
                        "User"}
                    </p>
                    <p className="max-w-[200px] truncate text-sm text-neutral-600 dark:text-neutral-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-emerald-200/50 bg-emerald-100/50 p-4 dark:border-emerald-800/50 dark:bg-emerald-900/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                        Plan Status
                      </p>
                      <p className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
                        Active
                      </p>
                    </div>
                    <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
                  </div>
                </div>

                <div className="border-t border-neutral-200/50 pt-6 text-center dark:border-neutral-700/50">
                  <p className="mb-4 text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-500">
                    Member since
                  </p>
                  <p className="font-mono text-sm text-neutral-700 dark:text-neutral-300">
                    {user.createdAt
                      ? user.createdAt.toDate?.()?.toLocaleDateString() ||
                        "Recent"
                      : "Recent"}
                  </p>
                </div>
              </div>
            </div>
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
                    <CheckCircle className="h-5 w-5 text-white" />
                  ) : (
                    <BarChart3 className="h-5 w-5 text-white" />
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

      {/* 🎨 PROFESSIONAL NEW PROJECT MODAL - NOTION STYLE */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/50 bg-white/95 shadow-2xl ring-1 ring-white/20 backdrop-blur-3xl dark:border-neutral-700/50 dark:bg-neutral-900/95 dark:ring-neutral-800/30">
                {/* Header Section */}
                <div className="sticky top-0 border-b border-neutral-200/50 bg-white/50 p-8 backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-900/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 shadow-lg shadow-blue-500/25">
                        <Plus className="h-6 w-6 text-white" />
                        <div className="absolute inset-0 rounded-xl bg-white/10 blur-xl" />
                      </div>
                      <div>
                        <h2 className="bg-gradient-to-r from-neutral-900 via-blue-900 to-neutral-900 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:via-blue-300 dark:to-white">
                          New Project
                        </h2>
                        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                          Create and launch your next idea
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-xl border border-neutral-200/50 p-2 text-neutral-400 backdrop-blur-sm transition-all hover:border-neutral-300 hover:bg-neutral-100/80 hover:text-neutral-600 dark:border-neutral-600/50 dark:hover:border-neutral-500 dark:hover:bg-neutral-700/80 dark:hover:text-neutral-300"
                      aria-label="Close modal"
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-8">
                  <div className="space-y-6">
                    {/* Project Name Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-3"
                    >
                      <label
                        htmlFor="project-name"
                        className="block flex items-center space-x-1.5 text-xs font-semibold tracking-wider text-neutral-600 uppercase dark:text-neutral-400"
                      >
                        <span>Project Name</span>
                        <span className="font-bold text-red-500">*</span>
                      </label>
                      <div className="group relative">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur-md transition-opacity duration-300 group-focus-within:opacity-100" />
                        <input
                          id="project-name"
                          type="text"
                          maxLength={50}
                          value={newProject.name}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              name: e.target.value,
                            })
                          }
                          disabled={isSubmitting}
                          className={`relative w-full rounded-xl border-2 bg-white/70 px-4 py-3.5 backdrop-blur-md transition-all duration-300 focus:outline-none dark:bg-neutral-800/70 ${
                            formErrors.name
                              ? "border-red-400 focus:ring-4 focus:ring-red-400/30 dark:border-red-500 dark:focus:ring-red-500/30"
                              : "border-neutral-200/60 hover:border-blue-400/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-neutral-700/60 dark:hover:border-blue-600/50 dark:focus:border-blue-400 dark:focus:ring-blue-500/30"
                          } text-base font-semibold placeholder-neutral-400 shadow-sm focus:shadow-lg focus:shadow-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder-neutral-600`}
                          placeholder="My Awesome Project"
                          aria-invalid={!!formErrors.name}
                          aria-describedby={
                            formErrors.name ? "name-error" : "name-hint"
                          }
                        />
                      </div>

                      {/* Character Count & Status */}
                      <div className="flex items-center justify-between text-xs">
                        <span
                          id="name-hint"
                          className="flex items-center space-x-1 text-neutral-500 dark:text-neutral-500"
                        >
                          <span>
                            {newProject.name.length === 0
                              ? "Give your project a name"
                              : "Project name"}
                          </span>
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-neutral-400 dark:text-neutral-600">
                            {newProject.name.length}/50
                          </span>
                          {newProject.name.trim() && !formErrors.name && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center space-x-1 font-semibold text-emerald-600 dark:text-emerald-400"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Valid</span>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Error Message */}
                      <AnimatePresence>
                        {formErrors.name && (
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            id="name-error"
                            role="alert"
                            className="flex items-center space-x-2 rounded-lg border border-red-200 bg-red-50/80 p-3 text-sm text-red-700 backdrop-blur-sm dark:border-red-800/50 dark:bg-red-500/15 dark:text-red-300"
                          >
                            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500">
                              <X className="h-3 w-3 text-white" />
                            </div>
                            <span className="font-medium">
                              {formErrors.name}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Description Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-3"
                    >
                      <label
                        htmlFor="project-description"
                        className="block text-xs font-semibold tracking-wider text-neutral-600 uppercase dark:text-neutral-400"
                      >
                        Description
                      </label>
                      <div className="group relative">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 blur-md transition-opacity duration-300 group-focus-within:opacity-100" />
                        <textarea
                          id="project-description"
                          value={newProject.description}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              description: e.target.value.slice(0, 500),
                            })
                          }
                          disabled={isSubmitting}
                          className="relative max-h-40 min-h-28 w-full resize-none rounded-xl border-2 border-neutral-200/60 bg-white/70 px-4 py-3.5 text-base font-medium text-neutral-900 placeholder-neutral-400 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-purple-400/50 focus:border-purple-500 focus:shadow-lg focus:ring-4 focus:shadow-purple-500/10 focus:ring-purple-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700/60 dark:bg-neutral-800/70 dark:text-white dark:placeholder-neutral-600 dark:hover:border-purple-600/50 dark:focus:border-purple-400 dark:focus:ring-purple-500/30"
                          placeholder="Tell us about your project... (optional)"
                          aria-describedby="desc-hint"
                        />
                      </div>

                      {/* Description Counter */}
                      <div className="flex items-center justify-between text-xs">
                        <span
                          id="desc-hint"
                          className="flex items-center space-x-1 text-neutral-500 dark:text-neutral-500"
                        >
                          <CheckCircle className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                          <span>
                            {newProject.description.length === 0
                              ? "Optional description"
                              : "Description added"}
                          </span>
                        </span>
                        <span className="text-neutral-400 dark:text-neutral-600">
                          {newProject.description.length}/500
                        </span>
                      </div>
                    </motion.div>

                    {/* Plan Limit Warning */}
                    <AnimatePresence>
                      {!canCreateMoreProjects && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="rounded-xl border border-orange-200 bg-orange-50/80 p-4 backdrop-blur-sm dark:border-orange-800/50 dark:bg-orange-500/15"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500">
                              <Zap className="h-3.5 w-3.5 text-white" />
                            </div>
                            <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                              Upgrade your plan to create more projects
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                      <motion.button
                        whileHover={
                          !isSubmitting && canCreateMoreProjects
                            ? { scale: 1.02 }
                            : {}
                        }
                        whileTap={
                          !isSubmitting && canCreateMoreProjects
                            ? { scale: 0.98 }
                            : {}
                        }
                        onClick={createNewProject}
                        disabled={isSubmitting || !canCreateMoreProjects}
                        className={`flex flex-1 items-center justify-center space-x-2.5 rounded-xl px-6 py-3.5 font-semibold transition-all ${
                          isSubmitting || !canCreateMoreProjects
                            ? "cursor-not-allowed bg-neutral-200 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-500/40 active:shadow-blue-500/20"
                        }`}
                      >
                        {isSubmitting ? (
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
                            <span>Creating...</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-5 w-5" />
                            <span>Create Project</span>
                          </>
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsModalOpen(false)}
                        disabled={isSubmitting}
                        className="rounded-xl px-6 py-3.5 font-medium text-neutral-700 transition-all duration-300 hover:bg-neutral-100/80 disabled:cursor-not-allowed disabled:opacity-50 dark:text-neutral-300 dark:hover:bg-neutral-700/50"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
