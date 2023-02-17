import { useEffect, useState } from "react";


export default function App() {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    chrome.storage.sync.get(['formData']).then((result) => {
      setFormData(JSON.parse(result.formData));
    });
  }, []);

  return <div className="content-view">Sample</div>;
}
