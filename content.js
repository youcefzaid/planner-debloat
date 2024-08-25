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
    document.querySelector(
      "notification-bar-host._ngcontent-awn-AWSM-0"
    ).style.display = "none";
  } else {
    document.querySelector(
      "notification-bar-host._ngcontent-awn-AWSM-0"
    ).style.display = "";
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
