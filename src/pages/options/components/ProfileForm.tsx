import { useCallback, useEffect, useState } from "react";

const ProfileForm = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    chrome.storage.sync.get(['profile']).then((result) => {
      setProfile(result.profile);
    });
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    chrome.storage.sync.set({ 'profile': profile });
  }, [profile]);

  return <div className="ProfileForm">
      <h3>Profile Form</h3>
      <form onSubmit={onSubmit}>
        <textarea rows={10} onChange={(e) => setProfile(JSON.parse(e.target.value))}>{JSON.stringify(profile)}</textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
}

export default ProfileForm;