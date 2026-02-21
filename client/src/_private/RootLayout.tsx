import Navbar from "@/components/shared/Navbar";
import AppSidebar from "@/components/shared/AppSidebar";
import { usePosts } from "@/api/queries";
import { Outlet } from "react-router-dom";
import { Stories } from "./pages";

const RootLayout = () => {
  const { data: posts } = usePosts();

  return(
    <div className="flex h-screen w-full md:justify-center md:items-center">

      {/* Sidebar */}
      <div className="hidden min-[1020px]:block border-r border-dark-4 bg-dark-2 h-full min-w-[14vw] max-md:w-full">
        <AppSidebar />
      </div>

      {/* Center Feed (ONLY SCROLL AREA) */}
      <div className="h-full overflow-y-auto custom-scrollbar w-full min-[1020px]:w-[60vw]">
        <Navbar>
          <Outlet />
        </Navbar>
      </div>

      {/* Stories */}
      <div className="hidden min-[1020px]:block border-l border-dark-4 bg-dark-2 h-full min-w-[26vw]">

          <Stories posts={posts || []} />
      </div>

    </div>

  )
};

export default RootLayout;
