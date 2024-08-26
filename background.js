chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("ads.google.com/aw/keywordplanner")
  ) {
    chrome.tabs.sendMessage(tabId, { action: "updateUI" });
  }
});
