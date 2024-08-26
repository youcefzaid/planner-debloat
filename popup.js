document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  chrome.storage.local.get(["uiPreferences"], function (result) {
    const preferences = result.uiPreferences || {};
    checkboxes.forEach((checkbox) => {
      checkbox.checked = preferences[checkbox.id] || false;
    });
  });

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
