import React from 'react';
import { FaBoxOpen, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

export default function OrdersDashboard({ orders }) {
  const total = orders.length;
  const delivered = orders.filter(o => o.status === 'delivered').length;
  const dispatched = orders.filter(o => o.status === 'dispatched').length;
  const pending = orders.filter(o => o.status === 'pending').length;
  const cancelled = orders.filter(o => o.status === 'cancelled').length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <DashboardCard
        icon={<FaBoxOpen />}
        label="Total Orders"
        count={total}
        bg="bg-gray-100"
        text="text-gray-700"
      />
      <DashboardCard
        icon={<FaCheckCircle />}
        label="Delivered"
        count={delivered}
        bg="bg-green-100"
        text="text-green-700"
      />
      <DashboardCard
        icon={<FaClock />}
        label="Pending"
        count={pending}
        bg="bg-yellow-100"
        text="text-yellow-700"
      />
      <DashboardCard
        icon={<FaTimesCircle />}
        label="Cancelled"
        count={cancelled}
        bg="bg-red-100"
        text="text-red-700"
      />
    </div>
  );
}

function DashboardCard({ icon, label, count, bg, text }) {
  return (
    <div className={`rounded-xl p-4 shadow-sm hover:shadow-md transition ${bg} ${text} flex flex-col items-center`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-sm font-medium">{label}</div>
      <div className="text-xl font-bold">{count}</div>
    </div>
  );
}
