import React from "react";
import SidebarButton from "./SideBarButton";
import SideNavbar from "./SideNavbar";

export default function Sidebar() {
  return (
    <>
      <aside
        id="logo-sidebar"
        class="fixed left-0 z-40 w-64  pt-20 transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto">
          <ul class="space-y-2 font-medium">
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
            <SidebarButton
              
              label="Reminders"
              href="#rem"
            />
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
