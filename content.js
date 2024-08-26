function applyUIChanges(preferences) {
  if (preferences["navigation-drawer"]) {
    document.querySelector("navigation-drawer").style.display = "none";
  } else {
    document.querySelector("navigation-drawer").style.display = "";
  }

  if (preferences["app-bar"]) {
    document.querySelector("awsm-app-bar").style.display = "none";
  } else {
    document.querySelector("awsm-app-bar").style.display = "";
  }

  if (preferences["tab-strip"]) {
    document.querySelector("scrolling-material-tab-strip").style.display =
      "none";
  } else {
    document.querySelector("scrolling-material-tab-strip").style.display = "";
  }

  if (preferences["toolbelt"]) {
    document.querySelector("toolbelt").style.display = "none";
  } else {
    document.querySelector("toolbelt").style.display = "";
  }

  if (preferences["side-drawer"]) {
    document.querySelector("side-drawer").style.display = "none";
  } else {
    document.querySelector("side-drawer").style.display = "";
  }

  if (preferences["notification-bar"]) {
    document.querySelector("notification-bar").style.display = "none";
  } else {
    document.querySelector("notification-bar").style.display = "";
  }

  if (preferences["bigger-keyword-font"]) {
    const updateKeywordStyles = () => {
      document.querySelectorAll(".keyword").forEach((keyword) => {
        keyword.style.fontSize = "18px";
      });
    };
    updateKeywordStyles();
    // Create a MutationObserver to watch for new elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          updateKeywordStyles();
        }
      });
    });
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    const resetKeywordStyles = () => {
      document.querySelectorAll(".keyword").forEach((keyword) => {
        keyword.style.fontSize = "";
        keyword.style.fontWeight = "";
      });
    };
    resetKeywordStyles();
    // Create a MutationObserver to watch for new elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          resetKeywordStyles();
        }
      });
    });
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "updateUI") {
    chrome.storage.local.get(["uiPreferences"], function (result) {
      applyUIChanges(result.uiPreferences || {});
    });
  }
});

// Apply changes on page load
chrome.storage.local.get(["uiPreferences"], function (result) {
  applyUIChanges(result.uiPreferences || {});
});
