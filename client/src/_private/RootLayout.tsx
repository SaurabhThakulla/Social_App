import Navbar from "@/components/shared/Navbar";
import { Home, Profile, Stories  } from "./pages";
import AppSidebar from "@/components/shared/AppSidebar";

const RootLayout = () => {
  const profile = false;
  return(
    <div className="grid grid-cols-[0.3fr_2fr]  md:grid-cols-[0.5fr_3.4fr_1fr] min-h-screen">
      <AppSidebar />
      <Navbar>
        {!profile ? <Home /> : <Profile />}
     </Navbar>
      <Stories/>
    </div>

  )
};

export default RootLayout;
