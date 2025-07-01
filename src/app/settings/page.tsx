"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Settings() {
  const { data: session, status } = useSession();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    
    // Apply dark mode to document
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Please sign in to access settings.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src="/greenspacelogo.png" alt="GreenSpace Logo" className="w-6 h-6" />
          <h1 className="text-2xl font-bold text-green-800">Account Settings</h1>
        </div>
        <p className="text-gray-600">Manage your account preferences and settings</p>
      </div>
      
      <div className="space-y-6">
        {/* User Info */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Account Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <p><strong className="text-green-700">Email:</strong> {session?.user?.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p><strong className="text-green-700">Name:</strong> {session?.user?.name || "Not provided"}</p>
            </div>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Dark Mode</p>
              <p className="text-sm text-gray-600">
                Switch between light and dark themes
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? "bg-green-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Sign Out */}
        <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Account Actions</h2>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
} 