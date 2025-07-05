import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const CaseUploadModal = ({ isOpen, onClose, onRunSummariser }) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.id === "modalBackdrop") onClose();
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="modalBackdrop"
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 overflow-y-scroll scrollbar-hide"
    >
      <div className="bg-white rounded-[12px] w-[400px] shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center px-6 pt-4">
          <h2 className="text-lg font-semibold text-[#032538]">Case Details</h2>
          <button onClick={onClose}>
            <IoClose className="text-xl text-gray-700" />
          </button>
        </div>
        <hr className="my-3 border-gray-300" />

        {/* Upload */}
        <div className="border border-dashed border-gray-400 rounded-lg text-center mb-3 p-10 mx-4">
          <div className="text-gray-500 text-sm">
            <div className="text-2xl mb-1">⬆️</div>
            <p className="font-medium">Drag and drop your document</p>
            <p className="text-xs">or click to browse files</p>
            <p className="text-xs mt-2 text-gray-400">📄 PDF (max. 20 MB)</p>
          </div>
        </div>

        <div className="text-center text-gray-400 my-2 text-xs">or</div>

        {/* Manual Entry */}
        <div className="mb-4 px-6">
          <label className="text-sm block mb-1 text-gray-700">
            Add case facts manually
          </label>
          <textarea
            className="w-full border rounded p-2 text-sm"
            rows={4}
            placeholder="Enter case description"
          />
        </div>

        {/* Action */}
        <div className="px-6 pb-4">
          <button
            onClick={onRunSummariser}
            className="bg-[#032538] text-white py-2 px-4 rounded text-sm w-full"
          >
            Run AI Summarizer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseUploadModal;
