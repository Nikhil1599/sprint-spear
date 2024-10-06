import React from "react";
import Navbar from "./(component)/Navbar";
import Sidebar from "./(component)/Sidebar";

const dashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Side Bar */}
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg md:pl-64`}
      >
        {/* Nav Bar */}
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default dashboardWrapper;
