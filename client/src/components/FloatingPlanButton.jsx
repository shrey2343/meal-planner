import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList } from 'react-icons/fa';

export default function FloatingPlanButton({ plan }) {
  const navigate = useNavigate();

  if (!plan || plan.length === 0) return null;

  return (
    <button
      onClick={() => navigate('/my-plan')}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 z-50"
    >
      <FaClipboardList className="text-lg" />
      View My Plan ({plan.length})
    </button>
  );
}
