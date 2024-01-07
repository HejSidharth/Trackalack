import React from "react";
import SidebarButton from "./SideBarButton";
import SideNavbar from "./SideNavbar";

export default function Sidebar() {
  return (
    <>
      <SideNavbar />
      <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0 bg-base-200"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto bg-base-200">
          <ul class="space-y-2 font-medium">
            <SidebarButton
              iconPaths={[
                "M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z",
                "M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z",
              ]}
              label="Dashboard"
              href="/ballLove"
            />
          </ul>
        </div>
      </aside>

      <div class="p-4 sm:ml-64">
        <div class="p-4 mt-14">
          Dashboard
        </div>
      </div>
    </>
  );
}
