import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TagProvider } from "@/context/TagProvider";

const queryclient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <TagProvider>
    <QueryClientProvider client={queryclient}>
      <App />
      </QueryClientProvider>
    </TagProvider>
  </BrowserRouter>
);
