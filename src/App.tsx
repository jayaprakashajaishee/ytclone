import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import VideoGrid from "./components/video/VideoGrid";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VideoPage from "./components/video/VideoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <VideoGrid />,
  },
  {
    path: "/video/:id",
    element: <VideoPage />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
    // <VideoGrid />
    // <iframe
    //   title="sdasd"
    //   style={{ width: "100vw", height: "100vh" }}
    //   // width="100"
    //   // height="100vw"
    //   src="//www.youtube.com/embed/FR9U8A-pQmw"
    //   // frameborder="0"
    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //   allowFullScreen
    // />
  );
}

export default App;
