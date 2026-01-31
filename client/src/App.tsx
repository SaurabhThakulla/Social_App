import { Routes, Route } from "react-router-dom";
import "./global.css";
import Signin from "./_public/forms/Signin";
import { Home } from "./_private/pages";
import Signup from "./_public/forms/Signup";
import AuthLayout from "./_public/AuthLayout";
import RootLayout from "./_private/RootLayout";
import NotFound from "./not-found";
const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sigin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
