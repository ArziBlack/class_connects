import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { StreamTheme } from "@stream-io/video-react-sdk";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StreamTheme style={{ fontFamily: "sans-serif", color: "white" }}>
      <App />
    </StreamTheme>
  </React.StrictMode>,
);
