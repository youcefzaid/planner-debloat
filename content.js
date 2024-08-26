const elements = {
  "navigation-drawer": "navigation-drawer",
  "app-bar": "awsm-app-bar",
  "tab-strip": "scrolling-material-tab-strip",
  toolbelt: "toolbelt",
  "side-drawer": "side-drawer",
  "notification-bar": "notification-bar",
};

function applyUIChanges(preferences) {
  for (const [key, selector] of Object.entries(elements)) {
    const element = document.querySelector(selector);
    if (element) {
      element.style.display = preferences[key] ? "none" : "";
    }
  }

  const keywordSelector = ".keyword, .value-text";
  const updateKeywordStyles = (fontSize = "") => {
    document.querySelectorAll(keywordSelector).forEach((keyword) => {
      keyword.style.fontSize = fontSize;
    });
  };

  if (preferences["bigger-keyword-font"]) {
    updateKeywordStyles("18px");
  } else {
    updateKeywordStyles();
  }
}

function applyChangesOnLoad() {
  chrome.storage.local.get(["uiPreferences"], (result) => {
    if (chrome.runtime.lastError) {
      console.error("Error fetching preferences:", chrome.runtime.lastError);
      return;
    }
    const preferences = result.uiPreferences || {};
    applyUIChanges(preferences);

    const observer = new MutationObserver(() => applyUIChanges(preferences));
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

// Apply changes on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyChangesOnLoad);
} else {
  applyChangesOnLoad();
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "updateUI") {
    applyChangesOnLoad();
    sendResponse({ success: true });
  }
  return true; // Keeps the message channel open for asynchronous response
});
