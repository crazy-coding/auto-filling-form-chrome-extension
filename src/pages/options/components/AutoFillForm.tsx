import { useCallback, useEffect, useState } from "react";

const AutoFillForm = () => {
  const [autoFill, setAutoFill] = useState({});

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (autoFill) {
      chrome.storage.sync.get(['formData']).then((result) => {
        const formData = result.formData || [];
        const exist = formData.filter(({ id }) => autoFill?.id === id);
        if (exist.length > 0) {
          chrome.storage.sync.set({ 'formData': formData.map((formD) => {
            if (formD.id === autoFill?.id) {
              return autoFill;
            } else {
              return formD;
            }
          }) });
        } else {
          chrome.storage.sync.set({ 'formData': [ ...formData, autoFill ] });
        }
      });
    }
  }, [autoFill]);

  return <div className="AutoFillForm">
      <h3>AutoFill Form</h3>
      <form onSubmit={onSubmit}>
        <textarea rows={10} onChange={(e) => setAutoFill(JSON.parse(e.target.value))}>{JSON.stringify(autoFill)}</textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
}

export default AutoFillForm;