document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Load saved preferences
  chrome.storage.local.get(["uiPreferences"], function (result) {
    const preferences = result.uiPreferences || {};
    checkboxes.forEach((checkbox) => {
      checkbox.checked = preferences[checkbox.id] || false;
    });
  });

  // Save preferences and update UI when checkboxes are toggled
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      savePreferences();
      updateUI();
    });
  });

  function savePreferences() {
    const preferences = {};
    checkboxes.forEach((checkbox) => {
      preferences[checkbox.id] = checkbox.checked;
    });
    chrome.storage.local.set({ uiPreferences: preferences });
  }

  function updateUI() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "updateUI" });
    });
  }
});
