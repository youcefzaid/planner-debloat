function applyUIChanges(preferences) {
  const elements = {
    "navigation-drawer": "navigation-drawer",
    "app-bar": "awsm-app-bar",
    "tab-strip": "scrolling-material-tab-strip",
    toolbelt: "toolbelt",
    "side-drawer": "side-drawer",
    "notification-bar": "notification-bar",
  };

  for (const [key, selector] of Object.entries(elements)) {
    const element = document.querySelector(selector);
    if (element) {
      element.style.display = preferences[key] ? "none" : "";
    }
  }

  if (preferences["bigger-keyword-font"]) {
    const updateKeywordStyles = () => {
      document.querySelectorAll(".keyword, .value-text").forEach((keyword) => {
        keyword.style.fontSize = "18px";
      });
    };
    updateKeywordStyles();
    const observer = new MutationObserver(updateKeywordStyles);
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    const resetKeywordStyles = () => {
      document.querySelectorAll(".keyword, .value-text").forEach((keyword) => {
        keyword.style.fontSize = "";
        keyword.style.fontWeight = "";
      });
    };
    resetKeywordStyles();
    const observer = new MutationObserver(resetKeywordStyles);
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

function applyChangesOnLoad() {
  try {
    chrome.storage.local.get(["uiPreferences"], function (result) {
      if (chrome.runtime.lastError) {
        console.error("Error fetching preferences:", chrome.runtime.lastError);
        return;
      }
      const preferences = result.uiPreferences || {};
      applyUIChanges(preferences);

      // Set up a MutationObserver to watch for DOM changes
      const observer = new MutationObserver(() => {
        applyUIChanges(preferences);
      });

      // Start observing the document with the configured parameters
      observer.observe(document.body, { childList: true, subtree: true });
    });
  } catch (error) {
    console.error("Extension context invalidated:", error);
  }
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
