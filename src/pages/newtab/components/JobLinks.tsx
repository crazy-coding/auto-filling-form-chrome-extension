import { isNeededScrap, jSearchEngine } from "@src/pages/background/jSearchEngine";
import { useEffect, useState } from "react";

const JobLinks = (props) => {
  const [visitList, setVisitList] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [lastScrapDate, setLastScrapDate] = useState('');
  const [links, setLinks] = useState([]);

  useEffect(() => {
    chrome.storage.sync.get(["settings"]).then(({settings}) => {
      const jSearchSettings = settings.jSearchSettings;
      setLastScrapDate(jSearchSettings.lastScrapDate);
      if (isNeededScrap(jSearchSettings.lastScrapDate)) {
        setShowBtn(true);
      }
    });

    chrome.storage.local.get(["jSearchJobs", "visitedList"]).then(({jSearchJobs, visitedList}) => {
      const filterOption = {
        agreeSkills: [],
        notAgreeSkills: [".Net", "Ruby on Rails"]
      }
      const filterRegex = new RegExp(`${filterOption.notAgreeSkills.join("|")}/i`, "g");
      const list = (jSearchJobs || []).sort((a, b) => b.job_posted_at_timestamp - a.job_posted_at_timestamp).filter((job) => !filterRegex.test(job.job_description))
      setLinks(list);
      setVisitList(visitedList || []);
    });
  }, []);

  const visit = (jobId) => {
    setVisitList([...visitList.slice(-200), jobId]);
    chrome.storage.local.set({"visitedList": [...visitList.slice(-200), jobId]});
  }

  return (
    <div className="JobLinks">
      <div className="SuggestedLinksFolder">
        <div className="SLFolderTitle">
          <h5>Suggest Jobs</h5>
          {showBtn && <button className="borderless-btn" title={lastScrapDate} onClick={() => jSearchEngine()}>↺</button>}
        </div>
        <ul className="SuggestedLinksList">
          {links.filter((link) => !(visitList.includes(link.job_id))).map((link) => <li key={link.job_id}>
            <a href={link.job_apply_link} target="_blank" onClick={() => visit(link.job_id)} title={`[${link.employer_name} - ${link.job_title}](${link.job_posted_at_datetime_utc})\n${link.job_description}`}>
              <img src={link.employer_logo} height="15" />
              {link.employer_name}
            </a>
          </li>)}
        </ul>
      </div>
    </div>
  );
}

export default JobLinks;