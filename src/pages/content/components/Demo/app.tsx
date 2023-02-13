import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      console.log("content view loaded", document.querySelector("[aria-label=Follow]"));
    }, 5000)
    console.log("content view loaded", document.querySelector(".unknown_loc"));

  }, []);

  return <div className="content-view">content view</div>;
}
