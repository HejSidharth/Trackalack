import React from "react";
import SidebarButton from "./SideBarButton";
import SideNavbar from "./SideNavbar";

export default function Sidebar() {
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed left-0 z-40 w-64 mt-20 transition-transform -translate-x-full sm:translate-x-0 rounded-lg"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <SidebarButton
              
              label="Application Details"
              href="#app"
            />
            <SidebarButton
              
              label="Communication"
              href="#comm"
            />
            <SidebarButton
              
              label="Status & Outcomes"
              href="#stat"
            />
            {/*
            <SidebarButton
              
              label="Reminders"
              href="#rem"
              className="hidden"
            />
            */ }
            <SidebarButton
              
              label="Submit"
              href="#sub"
            />
          </ul>
        </div>
      </aside>
    </>
  );
}
