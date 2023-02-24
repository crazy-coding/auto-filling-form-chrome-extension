const ExceededMONTHLYQuota = {
  monthlyLimit: true
};

export async function jSearchEngine() {
  console.log("jSearchEngine Loaded");

  const settings = (await chrome.storage.sync.get(["settings"])).settings;
  const jSearchSettings = settings.jSearchSettings;
  
  if (isNeededScrap(jSearchSettings.lastScrapDate)) {
    alert("You have to wait a few minutes to complete the scraping process!");
    console.log("jSearchEngine Start", new Date().getTime() - 3600 * 24 * 7)

    const jSearchJobs = (await chrome.storage.local.get("jSearchJobs")).jSearchJobs.filter((job) => job.job_posted_at_timestamp > new Date().getTime() - 3600 * 24 * 7) || [];
    const jSJobsIds = jSearchJobs.map((jSJob) => jSJob.job_id);
    
    let keyIndex = 0;
    let page = 1;
    let loop = true;
    let updated = false;

    while (loop) {
      try {
        const jobs = await fetchJobs({ ...jSearchSettings, key: jSearchSettings.APIKeys[keyIndex], page });
        const filteredJobs = jobs.filter((job) => !jSJobsIds.includes(job.job_id));
        await chrome.storage.local.set({ "jSearchJobs": [...jSearchJobs, ...filteredJobs] });
        
        updated = true;

        if (page === 3) {
          loop = false;
        }
        page++;
      } catch (err) {
        if (ExceededMONTHLYQuota === err && jSearchSettings.APIKeys.length > keyIndex + 1) {
          keyIndex++;
        } else {
          loop = false;
        }
      }
    }

    if (updated) {
      await chrome.storage.sync.set({ "settings": { ...settings,
        jSearchSettings: {...jSearchSettings, lastScrapDate: getToday()}
      } });
    }

    alert("Scraping process completed!");
    console.log("jSearchEngine End")
  }
}

async function fetchJobs(settings) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': settings.key,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

  const url = settings.baseURL + "?" + (new URLSearchParams({
      query: settings.query,
      num_pages: settings.numPages, // 1 - 20
      date_posted: settings.datePosted, //"today", "3days" ... 
      remote_jobs_only: settings.remoteJobsOnly,
      page: settings.page
    }))
  
  const resp = await fetch(url, options);
  const data = await resp.json();

  if (resp.status === 429) throw ExceededMONTHLYQuota;

  return data.data || [];
}

export function isNeededScrap(date) {
  const today = new Date(getToday());
  if (![6, 0].includes(today.getDay())) {
    return  today > new Date(date);
  }

  return false;
}

function getToday() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
}

function alert(message) {
  chrome.notifications.create(
    "jSearchEngine",
    {
      type: "basic",
      iconUrl: "data:image/jpeg;base64,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",
      title: 'jSearchEngine',
      message
    }
  );
  chrome.notifications.clear("jSearchEngine");
}