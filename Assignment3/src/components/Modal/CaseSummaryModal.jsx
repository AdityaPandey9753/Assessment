import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const CaseSummaryModal = ({ isOpen, onClose }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.id === "summaryModalBackdrop") onClose();
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [onClose]);

  const handleSave = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Hide after 3 seconds
  };

  if (!isOpen) return null;

  return (
    <div
      id="summaryModalBackdrop"
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-[12px] w-[562px] shadow-lg relative max-h-[90vh] overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center px-6 pt-4">
          <h2 className="text-lg font-semibold text-[#032538]">Case Details</h2>
          <button onClick={onClose}>
            <IoClose className="text-xl text-gray-700" />
          </button>
        </div>
        <hr className="my-3 border-gray-300" />

        <div className="px-6 space-y-1 pb-2">
          {/* Fields */}
          <div>
            <label className="text-sm">Case Type</label>
            <select className="w-full border rounded px-3 py-1 text-sm">
              <option>Criminal</option>
              <option>Civil</option>
            </select>
          </div>

          <div>
            <label className="text-sm">Complainant</label>
            <input
              type="text"
              defaultValue="Seema Batra, Mukesh Kumar"
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm">Accused</label>
            <input
              type="text"
              defaultValue="Ajay Kumar, Raj Rani"
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm">Victim</label>
            <input
              type="text"
              defaultValue="Neha Kumari"
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm">Allegations</label>
            <textarea
              rows={3}
              defaultValue="Dowry harassment, domestic violence, and abetment to suicide (304B, 498A, DP Act)"
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm">Facts Summary</label>
            <textarea
              rows={3}
              defaultValue="Neha Kumari found hanging from ceiling fan, with evidence suggesting possible foul play amid dowry harassment allegations"
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm">Date of Incident</label>
            <input
              type="text"
              defaultValue="16.10.2022"
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Representing (please select) <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="bg-[#032538] text-white text-xs py-1 px-3 rounded-full">
                Neha Kumari
              </span>
              <span className="bg-[#032538] text-white text-xs py-1 px-3 rounded-full">
                Ajay Kumar, Raj Rani
              </span>
            </div>
          </div>
        </div>

        <hr className="my-2 border-gray-300" />

        {/* Footer */}
        <div className="flex justify-between px-6 py-4">
          <button
            className="text-[#032538] border border-[#032538] rounded px-4 py-2 text-sm"
            onClick={onClose}
          >
            Go Back
          </button>
          <button
            onClick={handleSave}
            className="bg-[#032538] text-white px-4 py-2 rounded text-sm"
          >
            Save Details
          </button>
        </div>

        {/* Upgrade Popup */}
        {showPopup && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#032538] text-white text-sm px-4 py-2 rounded shadow-md z-50">
            Upgrade to add more litigation cases to the workspace
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseSummaryModal;
