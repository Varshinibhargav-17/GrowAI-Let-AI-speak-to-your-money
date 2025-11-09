"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  User,
  Mail,
  Calendar,
  Settings,
  Shield,
  Bell,
  CreditCard,
  LogOut,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <User className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-green-300/20 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              Profile
            </h1>
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 text-gray-600 hover:text-green-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200 shadow-xl overflow-hidden animate-fade-in">
              {/* Profile Header */}
              <div className="bg-gradient-to-br from-green-500 to-green-700 px-6 py-10 text-center relative">
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold text-white">
                    <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                    Active
                  </span>
                </div>
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <User className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {session.user?.username || "User"}
                </h2>
                <p className="text-green-100 text-sm">GrowAI Premium Member</p>
              </div>

              {/* Quick Stats */}
              <div className="p-6 border-b border-green-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-700">247</p>
                    <p className="text-xs text-gray-600">Days Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-700">₹2.4L</p>
                    <p className="text-xs text-gray-600">Saved</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6">
                <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-3 rounded-xl font-semibold shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all flex items-center justify-center gap-2">
                  <Settings className="w-5 h-5" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Details & Settings */}
          <div className="md:col-span-2 space-y-6">
            {/* Account Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200 shadow-xl p-8 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Account Information
                </h3>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Email Address
                    </p>
                    <p className="text-gray-700">{session.user?.email}</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      {/* ✅ FIXED SVG HERE */}
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        />
                      </svg>
                      Verified
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Member Since
                    </p>
                    <p className="text-gray-700">
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Menu */}
            {/* ...rest of your code remains unchanged */}
          </div>
        </div>
      </div>
    </main>
  );
}
