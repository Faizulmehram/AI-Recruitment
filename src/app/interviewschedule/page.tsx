"use client";

import React, { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Search,
  ChevronLeft,
  Video,
  Clock,
  User,
  AlertCircle,
  Lightbulb,
  FileText,
} from "lucide-react";
import Image from "next/image";
// ✅ App Router hook
import { useRouter } from "next/navigation";

const InterviewSchedule = () => {
  const router = useRouter(); // works in app/ routes

  const [activeTab, setActiveTab] = useState("All");
  const [selectedStatuses, setSelectedStatuses] = useState({
    confirmed: true,
    pending: true,
    reschedule: true,
    noShowRisk: true,
  });

  const interviews = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior React Developer",
      status: "Confirmed",
      time: "Today, 1:00 PM",
      type: "Technical Interview",
      owner: "Mike Johnson",
      avatar: "/assets/dashboard/people/1af2086220affecd5f498aeca93f64918a91bf86.jpg",
      color: "bg-green-500",
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      role: "Product Manager",
      status: "Pending",
      time: "Today, 3:00 PM",
      type: "First Interview",
      owner: "Lisa Wang",
      avatar: "/assets/dashboard/people/30a03b20d0d79bd9c491d22b6f3398fcaedf2780.jpg",
      color: "bg-yellow-500",
    },
    {
      id: 3,
      name: "James Wilson",
      role: "Backend Engineer",
      status: "Reschedule",
      time: "Tomorrow, 2:00 PM",
      type: "System Design",
      owner: "Sarah Miller",
      avatar: "/assets/dashboard/people/389d48c3df5ee8b67ef377543c9b31f0e430e2a6.jpg",
      color: "bg-blue-500",
    },
    {
      id: 4,
      name: "Maria Garcia",
      role: "Data Scientist",
      status: "No-show Risk",
      time: "Friday, 11:00 AM",
      type: "Technical Assessment",
      owner: "Tom Brown",
      avatar: "/assets/dashboard/people/65be568fc2c1207c7799d895e6d7cb113b985966.jpg",
      color: "bg-red-500",
    },
  ];

  const upcomingInterviews = [
    {
      name: "Sarah Chen",
      time: "Today, 2:00 PM",
      status: "Confirmed",
      avatar: "1af2086220affecd5f498aeca93f64918a91bf86.jpg",
      color: "bg-green-500",
    },
    {
      name: "James Wilson",
      time: "Tomorrow, 3:00 PM",
      status: "Reschedule",
      avatar: "389d48c3df5ee8b67ef377543c9b31f0e430e2a6.jpg",
      color: "bg-blue-500",
    },
    {
      name: "Alex Rodriguez",
      time: "Today, 4:00 PM",
      status: "Pending",
      avatar: "30a03b20d0d79bd9c491d22b6f3398fcaedf2780.jpg",
      color: "bg-yellow-500",
    },
  ];

  const tabs = ["All", "Today", "This Week", "Reschedule Requests", "No-show Risk"];

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) => ({ ...prev, [status]: !prev[status as keyof typeof prev] }));
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      Confirmed: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700",
      Reschedule: "bg-blue-100 text-blue-700",
      "No-show Risk": "bg-red-100 text-red-700",
    };
    return badges[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 lg:px-8 py-4">
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-lg lg:text-2xl font-semibold flex items-center gap-2">
              Interview Schedule
            </h1>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates, roles or interviewers..."
                className="pl-10 pr-4 py-2 w-60 lg:w-80 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-3 lg:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs lg:text-sm font-medium hover:bg-gray-800 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Open Calendar</span>
            </button>
          </div>
        </div>
        <div className="flex gap-2 px-4 lg:px-8 py-2 bg-gray-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Sidebar - Filters (Desktop: Left, Mobile: After Interviews) */}
        <div className="order-2 lg:order-1 w-full lg:w-80 bg-white lg:border-r border-gray-200 p-4 lg:p-6 overflow-y-auto rounded-lg">
          <div className="flex items-center gap-2 mb-6">
            <ChevronDown className="w-5 h-5" />
            <h2 className="font-semibold text-lg">Filters</h2>
          </div>

          {/* Date Range */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Date Range
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select Date Range</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>

          {/* Role/Job */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Role/Job
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select Role</option>
              <option>Developer</option>
              <option>Designer</option>
              <option>Manager</option>
            </select>
          </div>

          {/* Candidate Name */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Candidate Name
            </label>
            <input
              type="text"
              placeholder="Enter Candidate Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select Status</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Reschedule</option>
              <option>No-show Risk</option>
            </select>
          </div>

          {/* Interview Owner */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Interview Owner
            </label>
            <input
              type="text"
              placeholder="Enter Interview Owner"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Center - Interviews (Desktop: Center, Mobile: Top) */}
        <div className="order-1 lg:order-2 flex-1 overflow-y-auto p-4 lg:p-8">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">
            4 interviews scheduled
          </h2>

          <div className="space-y-4">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                  <div className="flex items-start gap-3 lg:gap-4 w-full lg:w-auto">
                    <div
                      className={`w-10 h-10 lg:w-12 lg:h-12 ${interview.color} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}
                    >
                      <Image
                        src={interview.avatar}
                        alt={interview.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3 mb-2">
                        <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                          {interview.name}
                        </h3>
                        <span
                          className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                            interview.status
                          )} w-fit`}
                        >
                          {interview.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{interview.role}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{interview.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>{interview.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>Owner: {interview.owner}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3 w-full lg:w-auto justify-end">
                    {interview.status === "Confirmed" && (
                      <button
                        className="px-3 lg:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs lg:text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
                        onClick={() => router.push(`/join/${interview.id}`)}
                      >
                        <Video className="w-4 h-4" />
                        Join
                      </button>
                    )}
                    <button
                      className="px-3 lg:px-4 py-2 border border-gray-300 rounded-lg text-xs lg:text-sm font-medium hover:bg-gray-50"
                      onClick={() => alert(`Actions for ${interview.name}`)}
                    >
                      Actions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Calendar className="w-4 h-4" />
              Sync Settings
              <span className="text-gray-400 ml-2 hidden lg:inline">
                Google/Outlook calendar integration
              </span>
            </button>
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none px-3 lg:px-4 py-2 border border-gray-300 rounded-lg text-xs lg:text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                Export CSV
              </button>
              <button className="flex-1 lg:flex-none px-3 lg:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs lg:text-sm font-medium hover:bg-gray-800">
                Send Reminder
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar (Desktop: Right, Mobile: After Filters) */}
        <div className="order-3 w-full lg:w-96 bg-white lg:border-l border-gray-200 p-4 lg:p-6 overflow-y-auto">
          {/* Upcoming Interviews */}
          <div className="mb-6 lg:mb-8 border border-gray-300 rounded-md p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Upcoming Interviews
            </h2>
            <div className="space-y-3">
              {upcomingInterviews.map((interview, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0"
                >
                  <Image
                    src={`/assets/dashboard/people/${interview.avatar}`}
                    alt={interview.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate flex items-center gap-2">
                      {interview.name}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          interview.status
                        )}`}
                      >
                        {interview.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {interview.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="border border-gray-300 rounded-md p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              AI Suggestions
            </h2>
            <div className="space-y-3">
              <div className="bg-blue-100 text-blue-700 p-3 rounded-md">
                <p className="text-sm font-medium">Best Times to Schedule</p>
                <p className="text-sm">
                  Tuesday-Thursday 2-4 PM show highest attendance rates.
                </p>
              </div>
              <div className="bg-red-100 text-red-700 p-3 rounded-md">
                <p className="text-sm font-medium">No-show Risk Alert</p>
                <p className="text-sm">
                  Maria Garcia has 2 previous no-shows. Consider confirmation
                  call.
                </p>
              </div>
              <div className="bg-green-100 text-green-700 p-3 rounded-md">
                <p className="text-sm font-medium">Feedback Templates</p>
                <p className="text-sm">
                  Use structured templates for consistent interview feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSchedule;
