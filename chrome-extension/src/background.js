chrome.runtime.onInstalled.addListener(() => {
  console.log('WebLink Figma Capture installed.');
});

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab?.id) return;

  try {
    await chrome.tabs.sendMessage(tab.id, { type: 'WEBLINK_TOGGLE_TOOLBAR' });
  } catch (error) {
    console.warn('Unable to toggle toolbar:', error);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== 'WEBLINK_COPY_CAPTURE') return;

  (async () => {
    try {
      const tabId = sender?.tab?.id;
      if (!tabId) throw new Error('No active tab id');

      await chrome.scripting.executeScript({
        target: { tabId },
        files: ['src/capture.js']
      });

      const [{ result }] = await chrome.scripting.executeScript({
        target: { tabId },
        func: async ({ selector }) => {
          if (!window.figma || typeof window.figma.captureForDesign !== 'function') {
            throw new Error('capture.js not available on page context');
          }
          return window.figma.captureForDesign({ selector: selector || 'body', verbose: false });
        },
        args: [{ selector: message.selector || 'body' }]
      });

      sendResponse({ ok: true, result: result || null });
    } catch (error) {
      sendResponse({ ok: false, error: String(error?.message || error) });
    }
  })();

  return true;
});
