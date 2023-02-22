import { useEffect, useState } from "react";

const BackupForm = () => {
  const [data, setData] = useState({});

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setData(JSON.parse(`${e.target.result}`));
    };
  };
  
  useEffect(() => {
    chrome.storage.sync.get().then((result) => {
      console.log(result)
      setData(result);
    });
  }, []);

  const onRestore = () => {
    chrome.storage.sync.set(data);
  }

  const onReset = () => {
    if (confirm("Are you sure? You will lost all data.")) {
      chrome.storage.sync.clear();
    }
  }

  const onExport = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  }
  
  return <div className="BackupForm">
    <h3>Backup Form</h3>
    <button onClick={onReset}>Reset</button>
    <hr />
    <input type="file" onChange={handleChange} />
    <button onClick={onRestore}>Restore</button>
    <hr />
    <button onClick={onExport}>Export</button>
  </div>
}

export default BackupForm;