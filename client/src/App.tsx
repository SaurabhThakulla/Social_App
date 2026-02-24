import { Routes, Route } from "react-router-dom";
import "./global.css";
import Signin from "./_public/forms/Signin";
import { Home, Profile } from "./_private/pages";
import Signup from "./_public/forms/Signup";
import AuthLayout from "./_public/AuthLayout";
import RootLayout from "./_private/RootLayout";
import NotFound from "./not-found";
import Explore from "./_private/pages/Explore";
import Settings from "./_private/pages/Setting";
const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
