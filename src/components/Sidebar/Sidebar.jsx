import React from "react";
import SidebarButton from "./SideBarButton";
import SideNavbar from "./SideNavbar";

export default function Sidebar() {
  return (
    <>
      <aside
        id="logo-sidebar"
        class="fixed left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto">
          <ul class="space-y-2 font-medium">
            <SidebarButton
              iconPaths={[
                "M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z",
                "M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z",
              ]}
              label="Dashboard"
              href="/ballLove"
            />
            <SidebarButton
              iconPaths={[
                "M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 11 14H9a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 10 19Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"                
              ]}
              label="User Profile"
              href="/ballLove"
            />
          </ul>
        </div>
      </aside>
    </>
  );
}
