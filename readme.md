# Google Keyword Planner UI Customizer

A Chrome extension that allows users to debloat the Google Keyword Planner UI.

## Installation

You can install this extension directly from the Chrome Web Store:

[Google Keyword Planner UI Customizer](https://chromewebstore.google.com/detail/google-keyword-planner-ui/jcnedbebdejdpdfknoklaoadmoggfgbh)

Alternatively, for development purposes:

1. Clone this repository or download the ZIP file and extract it.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the extension directory.

## Features

- Hide/show various UI elements:
  - Notification bar
  - App bar
  - Navigation drawer
  - Tab strip
  - Toolbelt
  - Side drawer
- Increase keyword font size for better readability

## Usage

1. Click on the extension icon in your Chrome toolbar to open the popup.
2. Toggle the switches to customize the Google Keyword Planner interface.
3. Changes will be applied immediately to any open Google Keyword Planner tabs.

## Files

- `manifest.json`: Extension configuration
- `popup.html`: User interface for the extension popup
- `popup.js`: Handles user interactions and saves preferences
- `content.js`: Applies UI changes to the Google Keyword Planner page
- `background.js`: Listens for tab updates to reapply changes

## Development

To modify the extension:

1. Edit the relevant files (e.g., `content.js` for UI modifications).
2. Save your changes.
3. Go to `chrome://extensions/` and click the "Reload" button for this extension.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).