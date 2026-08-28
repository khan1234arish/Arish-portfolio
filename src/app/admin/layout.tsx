import React from 'react';
import { isAuthenticated } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Private Admin CMS | Arish Portfolio',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  // If not authenticated, we render the page (login page will display login form)
  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {authed && <AdminSidebar />}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        {children}
      </div>
    </div>
  );
}
