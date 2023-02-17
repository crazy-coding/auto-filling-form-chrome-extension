import { useEffect, useRef, useState } from "react";
import { eventOn } from ".";

export default function App() {
  const [formData, setFormData] = useState([]);
  const [profile, setProfile] = useState({});
  const [focusedRef, setFocusedRef] = useState({});
  const [open, setOpen] = useState(false);

  const autoFillingForm = () => {
    if (formData.length > 0) {
      const inputRefs = document.querySelectorAll('input, textarea');

      if (inputRefs.length < 1) {
        setTimeout(autoFillingForm, 5000)
      }

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
            // console.log("refId - checking", formD.ids, refId)
            if (formD.ids.some((idKey) => refId.toLowerCase().indexOf(idKey.toLowerCase()) !== -1)) {
              // console.log("refId - found", formD.ids, refId)
              (inputRef as HTMLInputElement).value = typeof formD.value !== 'string' ? formD.value[0]: formD.value;
              inputRef.dispatchEvent(new Event("change"));
              return false;
            }
            return true;
          });
          return true;
        })

        // console.log("----------------------------------------", refLabels)
        refLabels.every((refLabel) => {
          formData.every((formD) => {
            // console.log("refLabel - checking", formD.labels, refLabel)
            if (formD.labels.some((labelKey) => refLabel.toLowerCase().indexOf(labelKey.toLowerCase()) !== -1)) {
              // console.log("refLabel - found", formD.labels, refLabel)
              (inputRef as HTMLInputElement).value = typeof formD.value !== 'string' ? formD.value[0]: formD.value;
              inputRef.dispatchEvent(new Event("change"));
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
      setProfile(result.profile);
      const filledFormData = result.formData.map((formD) => ({ ...formD, value: (result.profile[formD.id] || "") }))
      setFormData(filledFormData);
    });

    eventOn('focusin', 'input, textarea', (e) => {
      setFocusedRef(e);
      setOpen(true);
    })

    eventOn('focusout', 'input, textarea', (e) => {
      setTimeout(() => {
        setOpen(false);
      }, 200)
    })
  }, []);

  useEffect(() => {
    if (formData) {
      setTimeout(autoFillingForm, 3000);
    }
  }, [formData]);

  const onClick = (e) => {
    (focusedRef as HTMLInputElement).value = e.target.textContent;
    setFocusedRef(null);
    setOpen(false);
  }

  return <div className="content-view">
    {open && <div className="AutoFillModal">
      <ul>
        {Object.keys(profile).map((pro) => typeof profile[pro] !== "string" ? (
          <>
            {profile[pro].map((pr) => (
              <li key={pr} onClick={onClick}>{typeof pr !== "string" ? JSON.stringify(pr) : pr}</li>
            ))}
          </>
        ) : (
          <li key={pro} onClick={onClick}>{typeof profile[pro] !== "string" ? JSON.stringify(profile[pro]) : profile[pro]}</li>
        ))}
      </ul>
    </div>}
  </div>;
}
