document.getElementById("exportBtn").addEventListener("click", async () => {
    // Inject and run contentScript.js on the current page
    chrome.scripting.executeScript({
      target: { tabId: (await getCurrentTab()).id },
      files: ["contentScript.js"]
    });
  });
  
  // Helper: get the current active tab
  async function getCurrentTab() {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
  