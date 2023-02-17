import { useEffect, useState } from "react";

export default function App() {
  const [formData, setFormData] = useState([]);

  const autoFillingForm = () => {
    if (formData.length > 0) {
      const inputRefs = document.querySelectorAll('input, textarea');
      console.log(inputRefs)
      inputRefs.forEach((inputRef) => {
        
        const refIds = inputRef.getAttributeNames().map((attrName) => inputRef.getAttribute(attrName));
        const refLabels = [];
        
        try {
          const labelRef = document.querySelector(`[for="${inputRef.getAttribute("id")}"]`);
          if (labelRef) {
            refLabels.push(labelRef.textContent);
          }
          
          if (inputRef.parentNode.nodeName === "LABEL") {
            refLabels.push(inputRef.parentNode.textContent);
          }
          if (inputRef.parentNode.parentNode.nodeName === "LABEL") {
            refLabels.push(inputRef.parentNode.parentNode.textContent);
          }
          if (inputRef.parentNode.parentNode.parentNode.nodeName === "LABEL") {
            refLabels.push(inputRef.parentNode.parentNode.parentNode.textContent);
          }
        } catch (e) {

        }

        // console.log("----------------------------------------", refIds)
        refIds.every((refId) => {
          formData.every((formD) => {
            console.log("refId - checking", formD.ids, refId)
            if (formD.ids.some((idKey) => refId.toLowerCase().indexOf(idKey.toLowerCase()) !== -1)) {
              console.log("refId - found", formD.ids, refId)
              inputRef.value = typeof formD.value !== 'string' ? formD.value[0]: formD.value;
              return false;
            }
            return true;
          });
          return true;
        })

        // console.log("----------------------------------------", refLabels)
        refLabels.every((refLabel) => {
          formData.every((formD) => {
            console.log("refLabel - checking", formD.labels, refLabel)
            if (formD.labels.some((labelKey) => refLabel.toLowerCase().indexOf(labelKey.toLowerCase()) !== -1)) {
              console.log("refLabel - found", formD.labels, refLabel)
              inputRef.value = typeof formD.value !== 'string' ? formD.value[0]: formD.value;
              return false;
            }
            return true;
          });
          return true;
        })
      })
    }
  }

  useEffect(() => {
    chrome.storage.sync.get(['formData', 'profile']).then((result) => {
      const filledFormData = result.formData.map((formD) => ({ ...formD, value: (result.profile[formD.id] || "") }))
      setFormData(filledFormData);
    });
  }, []);

  useEffect(() => {
    if (formData) {
      setTimeout(autoFillingForm, 3000);
    }
  }, [formData]);

  return <div className="content-view">Sample</div>;
}
