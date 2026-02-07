import Navbar from "@/components/shared/Navbar";
import AppSidebar from "@/components/shared/AppSidebar";
import { usePosts } from "@/api/queries";
import { Outlet } from "react-router-dom";
import { Stories } from "./pages";

const RootLayout = () => {
  const { data: posts } = usePosts();

  return(
    <div className="grid grid-cols-[0.3fr_2fr]  md:grid-cols-[0.5fr_3.4fr_1fr] min-h-screen">
      <AppSidebar />
      <Navbar>
        <Outlet/>
     </Navbar>
      <Stories posts={posts || []} />
    </div>

  )
};

export default RootLayout;
