import { createBrowserRouter } from "react-router-dom";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    loader: async () => {
      const { default: App } = await import("./App");
      return App;
    },
  },
]);
