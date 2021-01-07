# SparkPlug
UI for SparkPlug browser extension; currently compatible with only Gmail.
Functionality soon to be extended across other communications platforms.
SparkPlug not yet hooked up to HBDI database; updates to come shortly.

# Instructions
To use SparkPlug, download code base and add as an unpacked extension in your preferred browser.
Navigate to Gmail and find the Herrmann icon in your toolbar.
Click the icon to start thinking Whole-Brain!

# For Future Forkers
To connect the SparkPlug to the HBDI database, see SparkPlug/content.js lines:

447 | 492 | 542

There you will find instructions for what data to replace and how, along with the fetch request itself.
