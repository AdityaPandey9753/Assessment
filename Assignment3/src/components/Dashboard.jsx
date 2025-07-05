import React, { useState } from "react";
import { PiSquaresFourBold, PiSquaresFourThin } from "react-icons/pi";
import { HiOutlineViewList } from "react-icons/hi";
import { TbUsers } from "react-icons/tb";
import { SlNote } from "react-icons/sl";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import {
  CiCreditCard1,
  CiSettings,
  CiBellOn,
  CiSearch,
  CiFileOn,
  CiGlobe,
} from "react-icons/ci";
import {
  IoChatbubbleOutline,
  IoEllipsisHorizontalSharp,
} from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CaseUploadModal from "./Modal/CaseUploadModal";
import CaseSummaryModal from "./Modal/CaseSummaryModal";

function ViewToggle({ activeView, setActiveView }) {
  return (
    <div className="flex border border-gray-300 rounded-[8px] overflow-hidden w-fit text-sm">
      <button
        onClick={() => setActiveView("grid")}
        className={`flex items-center gap-2 px-4 py-2 transition font-medium ${
          activeView === "grid"
            ? "bg-[#032538] text-white"
            : "bg-white text-[#032538]"
        }`}
      >
        <PiSquaresFourBold className="text-lg" /> Grid
      </button>
      <button
        onClick={() => setActiveView("list")}
        className={`flex items-center gap-2 px-4 py-2 transition font-medium ${
          activeView === "list"
            ? "bg-[#032538] text-white"
            : "bg-white text-[#032538]"
        }`}
      >
        <HiOutlineViewList className="text-lg" /> List
      </button>
    </div>
  );
}

export default function Dashboard() {
  const [activeView, setActiveView] = useState("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSummaryOpen, setSummaryOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-display bg-bgMain">
      {/* Mobile Top Bar */}
      <div className="flex md:hidden justify-between items-center bg-bg1 text-white px-4 py-3">
        <h2 className="text-lg font-semibold">LeXi Ai</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <PiSquaresFourBold className="text-2xl" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-40 bg-bg1 text-white w-[230px] p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:flex`}
      >
        <div>
          <h2 className="hidden md:block text-[26px] font-semibold mb-8">
            LeXi Ai
          </h2>
          <nav className="space-y-4 text-sm">
            <button className="text-left bg-h1 flex items-center gap-2 w-full h-[40px] rounded-[8px]">
              <PiSquaresFourThin className="text-lg ml-2" /> Workspaces
            </button>
            <button className="w-full text-left flex items-center gap-2">
              <TbUsers className="text-lg ml-2" /> Team Management
            </button>
            <button className="w-full text-left flex items-center gap-2">
              <CiCreditCard1 className="text-lg ml-2" /> Billings & Plans
            </button>
            <button className="w-full text-left flex items-center gap-2">
              <CiSettings className="text-lg ml-2" /> Settings
            </button>
            <button className="w-full text-left flex items-center gap-2">
              <IoChatbubbleOutline className="text-lg ml-2" /> Contact Admin
            </button>
          </nav>
        </div>
        <button className="text-white py-2 px-4 text-sm flex items-center gap-2 border-t">
          <GoSignOut className="text-lg ml-2" /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-5 mt-5 overflow-x-auto">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4 px-4 text-sm">
          <div className="flex items-center gap-2 border border-b1 px-2 py-1 rounded-[8px] w-full md:w-[272px]">
            <CiSearch className="text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="border-none focus:outline-none bg-transparent w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <CiBellOn className="text-lg" />
            <div className="flex items-center gap-2">
              <img
                src="https://avatar.iran.liara.run/public/43"
                className="rounded-full w-6.5"
                alt="user"
              />
              <span className="text-t1">John Doe</span>
              <IoIosArrowDown className="text-sm" />
            </div>
          </div>
        </div>
        {/* Dashboard Overview */}
        <h1 className="text-[26px] font-semibold mb-4 text-t1">
          Dashboard Overview
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {[
            {
              id: 1,
              title: "Total Workspaces",
              value: 4,
              note: "12% from last month",
              icon: <PiSquaresFourThin />,
              direction: "up",
              iconBg: "bg-iconBg1",
              iconColor: "text-purple-500",
            },
            {
              id: 2,
              title: "Total Signed Contracts",
              value: 51,
              note: "12% from last month",
              icon: <CiFileOn />,
              direction: "up",
              iconBg: "bg-iconBg2",
              iconColor: "text-blue-500",
            },
            {
              id: 3,
              title: "Contracts Drafted",
              value: 4,
              note: "4% from last month",
              icon: <SlNote />,
              direction: "down",
              iconBg: "bg-iconBg3",
              iconColor: "text-yellow-500",
            },
            {
              id: 4,
              title: "Contracts Reviewed",
              value: 18,
              note: "12% from last month",
              icon: <LiaCheckDoubleSolid />,
              direction: "up",
              iconBg: "bg-iconBg4",
              iconColor: "text-green-500",
            },
            {
              id: 5,
              title: "Contracts Translated",
              value: 9,
              note: "10% from last month",
              icon: <CiGlobe />,
              direction: "up",
              iconBg: "bg-iconBg5",
              iconColor: "text-red-500",
            },
          ].map((card) => (
            <div key={card.id} className="p-4 rounded shadow bg-white">
              <span className="flex justify-between items-center">
                <h2 className="text-t2 text-sm">{card.title}</h2>
                <div className={`${card.iconBg} text-2xl p-1.5 rounded`}>
                  {React.cloneElement(card.icon, {
                    className: card.iconColor,
                  })}
                </div>
              </span>
              <p className="text-2xl font-bold mt-2">{card.value}</p>
              <p
                className={`text-sm flex items-center gap-1 mt-1 ${
                  card.direction === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {card.direction === "up" ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
                {card.note}
              </p>
            </div>
          ))}
        </div>
        {/* Workspaces and ViewToggle*/}
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <h1 className="text-[20px] font-semibold mb-2 text-t1">Workspaces</h1>
          <div className="self-end">
            <ViewToggle activeView={activeView} setActiveView={setActiveView} />
          </div>
        </div>
        <div className="bg-white p-4 mt-2 rounded">
          <div className="flex flex-wrap gap-4 border-y text-sm border-b1 mb-4">
            <button className="py-2 text-gray-400">Contracts</button>
            <button className="py-2 font-medium border-b-2 border-black text-black">
              Litigation
            </button>
          </div>

          <div className="flex flex-wrap gap-2 items-center mb-4">
            <div className="flex items-center border rounded px-2 py-[6px] w-full md:w-[411px]">
              <CiSearch className="text-lg mr-2" />
              <input
                type="text"
                placeholder="Search by Workspace Name / Client Name"
                className="w-full text-xs bg-transparent focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select className="border rounded px-2 py-[6px] text-xs text-gray-600">
                <option>All Types</option>
              </select>
              <select className="border rounded px-2 py-[6px] text-xs text-gray-600">
                <option>All Status</option>
              </select>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-400 text-white px-4 py-[6px] rounded text-xs font-medium whitespace-nowrap"
              >
                + Create New Workspace
              </button>
            </div>
          </div>

          <div className="shadow-2xl py-2">
            {activeView === "list" ? (
              <div className="w-full overflow-auto px-2 py-4">
                <div className="min-w-full overflow-x-auto">
                  <table className="min-w-full text-sm text-center border-collapse">
                    <thead className="border-b border-b1 bg-gray-50">
                      <tr>
                        <th className="py-3 font-semibold px-2">
                          Workspace Name
                        </th>
                        <th className="font-semibold px-2">Client</th>
                        <th className="font-semibold px-2">Opponent</th>
                        <th className="font-semibold px-2">Case</th>
                        <th className="font-semibold px-2">Area of Law</th>
                        <th className="font-semibold px-2">Timeline</th>
                        <th className="font-semibold px-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-b1">
                        <td className="py-3 px-2">Morgan Acquisition</td>
                        <td className="px-2">Sarah Chen</td>
                        <td className="px-2">Chen Sarah</td>
                        <td className="px-2">
                          <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-[2px] rounded">
                            Criminal
                          </span>
                        </td>
                        <td className="px-2">Jalandar</td>
                        <td className="px-2">
                          <span className="bg-gray-200 text-xs px-2 py-[2px] rounded">
                            First hearing done
                          </span>
                        </td>
                        <td className="px-2">
                          <IoEllipsisHorizontalSharp className="text-gray-500 inline-block" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-center mt-4">
                  <div className="bg-bg1 text-white text-sm p-3 rounded flex items-center justify-center gap-2 w-full max-w-screen-md">
                    <CiFileOn className="text-white text-lg" />
                    Upgrade to add more litigation cases to the workspace
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 py-4">
                <div className="bg-white border rounded-lg shadow p-3 text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-blue-100 text-blue-600 text-[10px] font-medium px-2 py-[1px] rounded">
                        Criminal
                      </span>
                      <h2 className="text-sm font-semibold mt-2 leading-tight">
                        Johnson & Partners Merger
                      </h2>
                      <p className="text-[11px] text-gray-500">
                        Johnson & Partners LLP
                      </p>
                    </div>
                    <IoEllipsisHorizontalSharp className="text-gray-400 text-base" />
                  </div>
                  <div className="text-[11px] text-gray-500 mt-3 space-y-[2px] leading-tight">
                    <p>📅 Created: May 2, 2025</p>
                    <p>🕒 Last active: 2 hours ago</p>
                    <p>✅ 12 documents processed</p>
                  </div>
                  <div className="flex gap-2 mt-2 flex-wrap text-[10px]">
                    <span className="bg-gray-200 px-2 py-[1px] rounded">
                      3 Drafts
                    </span>
                    <span className="bg-gray-200 px-2 py-[1px] rounded">
                      1 In Review
                    </span>
                    <span className="bg-gray-200 px-2 py-[1px] rounded">
                      0 Completed
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="flex -space-x-1">
                      <div className="bg-black text-white text-[9px] rounded-full w-5 h-5 flex items-center justify-center">
                        JD
                      </div>
                      <div className="bg-black text-white text-[9px] rounded-full w-5 h-5 flex items-center justify-center">
                        ML
                      </div>
                      <div className="bg-black text-white text-[9px] rounded-full w-5 h-5 flex items-center justify-center">
                        RE
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500 ml-1">+2</span>
                  </div>
                  <button className="mt-3 bg-[#032538] text-white text-xs px-3 py-1 rounded">
                    Open →
                  </button>
                </div>

                <div className="border rounded-lg flex flex-col items-center justify-center p-6 bg-[#F7F9FC] text-center">
                  <CiFileOn className="text-2xl text-gray-400 mb-1" />
                  <p className="text-xs text-gray-600 w-[160px] leading-tight">
                    Upgrade to add more litigation cases to the workspace
                  </p>
                </div>
              </div>
            )}
          </div>
          <CaseUploadModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onRunSummariser={() => {
              setIsModalOpen(false);
              setSummaryOpen(true);
            }}
          />
          <CaseSummaryModal
            isOpen={isSummaryOpen}
            onClose={() => setSummaryOpen(false)}
          />
        </div>
      </main>
    </div>
  );
}
