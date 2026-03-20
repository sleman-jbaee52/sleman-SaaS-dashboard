import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Download,
  Filter,
  ArrowLeft,
  Activity,
  Target,
  Zap,
  Calendar,
} from "lucide-react";

interface AnalyticsData {
  totalViews: number;
  totalUsers: number;
  averageTime: number;
  conversionRate: number;
  topPages: Array<{ name: string; views: number; users: number }>;
  dailyData: Array<{ date: string; views: number; users: number }>;
}

const AnalyticsPage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null,
  );
  const [dataLoading, setDataLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  useEffect(() => {
    if (user) {
      loadAnalyticsData();
    }
  }, [user, timeRange]);

  const loadAnalyticsData = async () => {
    setDataLoading(true);
    try {
      // محاكاة تحميل البيانات
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // بيانات وهمية للعرض
      setAnalyticsData({
        totalViews: 24563,
        totalUsers: 3421,
        averageTime: 3.45,
        conversionRate: 8.7,
        topPages: [
          { name: "Dashboard", views: 8543, users: 2134 },
          { name: "Projects", views: 6234, users: 1856 },
          { name: "Settings", views: 4321, users: 987 },
          { name: "Billing", views: 3456, users: 654 },
          { name: "Analytics", views: 2009, users: 790 },
        ],
        dailyData: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
            .toLocaleDateString("en-US", { month: "short", day: "numeric" })
            .replace(" ", " "),
          views: Math.floor(Math.random() * 1000) + 500,
          users: Math.floor(Math.random() * 200) + 100,
        })),
      });
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setDataLoading(false);
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
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-12 lg:pt-36">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
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
                Analytics
              </h1>
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                Track your project performance
              </p>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center space-x-2 rounded-2xl border border-neutral-200/50 bg-white/60 p-1.5 backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-800/60">
            {(["7d", "30d", "90d"] as const).map((range) => (
              <motion.button
                key={range}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTimeRange(range)}
                className={`rounded-lg px-4 py-2 font-medium transition-all ${
                  timeRange === range
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
              >
                {range === "7d"
                  ? "7 Days"
                  : range === "30d"
                    ? "30 Days"
                    : "90 Days"}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dataLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl border border-neutral-200/50 bg-white/60 dark:border-neutral-700/50 dark:bg-neutral-800/60"
              />
            ))
          ) : analyticsData ? (
            <>
              {/* Total Views Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/50 bg-white/60 p-6 backdrop-blur-xl transition-all hover:shadow-2xl hover:shadow-blue-500/10 dark:border-neutral-700/50 dark:bg-neutral-800/60"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Total Views
                    </p>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/20">
                      <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <motion.p
                    key={analyticsData.totalViews}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-2 text-3xl font-bold text-neutral-900 dark:text-white"
                  >
                    {analyticsData.totalViews.toLocaleString()}
                  </motion.p>
                  <p className="flex items-center space-x-1 text-sm text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>+12.5% from last period</span>
                  </p>
                </div>
              </motion.div>

              {/* Total Users Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/50 bg-white/60 p-6 backdrop-blur-xl transition-all hover:shadow-2xl hover:shadow-purple-500/10 dark:border-neutral-700/50 dark:bg-neutral-800/60"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Total Users
                    </p>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-500/20">
                      <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <motion.p
                    key={analyticsData.totalUsers}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-2 text-3xl font-bold text-neutral-900 dark:text-white"
                  >
                    {analyticsData.totalUsers.toLocaleString()}
                  </motion.p>
                  <p className="flex items-center space-x-1 text-sm text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>+8.2% from last period</span>
                  </p>
                </div>
              </motion.div>

              {/* Average Time Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/50 bg-white/60 p-6 backdrop-blur-xl transition-all hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-neutral-700/50 dark:bg-neutral-800/60"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Avg. Time
                    </p>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-500/20">
                      <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  <motion.p
                    key={analyticsData.averageTime}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-2 text-3xl font-bold text-neutral-900 dark:text-white"
                  >
                    {analyticsData.averageTime}m
                  </motion.p>
                  <p className="flex items-center space-x-1 text-sm text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>+5.3% from last period</span>
                  </p>
                </div>
              </motion.div>

              {/* Conversion Rate Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/50 bg-white/60 p-6 backdrop-blur-xl transition-all hover:shadow-2xl hover:shadow-orange-500/10 dark:border-neutral-700/50 dark:bg-neutral-800/60"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Conversion
                    </p>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-500/20">
                      <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                  <motion.p
                    key={analyticsData.conversionRate}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-2 text-3xl font-bold text-neutral-900 dark:text-white"
                  >
                    {analyticsData.conversionRate}%
                  </motion.p>
                  <p className="flex items-center space-x-1 text-sm text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>+2.1% from last period</span>
                  </p>
                </div>
              </motion.div>
            </>
          ) : null}
        </div>

        {/* Charts & Tables Section */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200/50 bg-white/60 p-8 backdrop-blur-xl transition-all hover:shadow-2xl hover:shadow-blue-500/10 lg:col-span-2 dark:border-neutral-700/50 dark:bg-neutral-800/60"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    Views & Users Trend
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    Last{" "}
                    {timeRange === "7d"
                      ? "7"
                      : timeRange === "30d"
                        ? "30"
                        : "90"}{" "}
                    days
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/20">
                  <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>

              {/* Mock Chart */}
              <div className="flex h-64 items-end justify-between rounded-xl bg-gradient-to-b from-blue-500/10 to-transparent px-4 py-6">
                {analyticsData?.dailyData.slice(-7).map((day, index) => {
                  const maxViews = Math.max(
                    ...analyticsData.dailyData.map((d) => d.views),
                  );
                  const height = (day.views / maxViews) * 100;
                  return (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="group/bar mx-1 flex-1 rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 transition-all hover:shadow-lg hover:shadow-blue-500/50"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="mt-2 text-center text-xs font-semibold text-white opacity-0 transition-opacity group-hover/bar:opacity-100"
                      >
                        {day.views}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Top Pages Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200/50 bg-white/60 p-8 backdrop-blur-xl transition-all hover:shadow-2xl hover:shadow-purple-500/10 dark:border-neutral-700/50 dark:bg-neutral-800/60"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <h3 className="mb-6 text-xl font-bold text-neutral-900 dark:text-white">
                Top Pages
              </h3>
              <div className="space-y-3">
                {analyticsData?.topPages.map((page, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between rounded-lg bg-neutral-100/50 p-3 transition-colors hover:bg-neutral-100 dark:bg-neutral-700/50 dark:hover:bg-neutral-700"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-neutral-900 dark:text-white">
                        {page.name}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {page.users} users
                      </p>
                    </div>
                    <div className="ml-2 text-right">
                      <p className="font-bold text-neutral-900 dark:text-white">
                        {page.views}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Export Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-500/40"
          >
            <Download className="h-5 w-5" />
            <span>Export Report</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
