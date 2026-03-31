import React from "react";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="glass-panel hero-panel fade-up overflow-hidden p-5">
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white shadow-lg ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-[var(--ink-soft)]">
          {text}
        </p>
        <p className="mt-3 text-3xl font-semibold text-[var(--ink-strong)]">
          {number}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
