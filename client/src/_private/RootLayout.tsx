import { Home, Profile, Stories  } from "./pages";
import AppSidebar from "@/components/AppSidebar";

const RootLayout = () => {
  const profile = false;
  return(
    <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] min-h-screen">
      <AppSidebar />
      {!profile ? <Home /> : <Profile />}
      <Stories/>
    </div>

  )
};

export default RootLayout;
