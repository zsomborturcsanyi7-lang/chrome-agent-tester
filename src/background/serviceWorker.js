import { GraphManager } from './graphManager.js';

// Track relationships using an in-memory map for quick lookup during navigation
const navigationMap = new Map();

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    await GraphManager.registerNode(tab);
    
    // Check if we have a source for this navigation
    const sourceUrl = navigationMap.get(tabId);
    if (sourceUrl && sourceUrl !== tab.url) {
      await GraphManager.registerEdge(sourceUrl, tab.url);
    }
    
    // Update the source for the next navigation in this tab
    navigationMap.set(tabId, tab.url);
    
    // Run Resource Guard
    resourceGuard();
  }
});

chrome.tabs.onRemoved.addListener(async (tabId) => {
  await GraphManager.handleTabClose(tabId);
  navigationMap.delete(tabId);
});

/**
 * Intelligent Resource Allocation - Hardened Version
 */
async function resourceGuard() {
  try {
    const tabs = await chrome.tabs.query({ active: false, discarded: false, pinned: false });
    const activeTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (activeTabs.length === 0) return;

    const activeTab = activeTabs[0];
    const highIntensityPatterns = [
      'github.com', 'localhost', 'stackoverflow.com', 
      'docs.', 'google.colab', 'azure.com', 'aws.amazon'
    ];

    const isHighIntensity = highIntensityPatterns.some(pattern => 
      activeTab.url?.includes(pattern)
    );

    // Only intervene if we are low on memory or in high-intensity mode
    if (isHighIntensity && tabs.length > 3) {
      for (const tab of tabs) {
        if (!tab.id || tab.url?.startsWith('chrome://')) continue;
        
        const activeHostname = new URL(activeTab.url).hostname;
        const tabHostname = new URL(tab.url).hostname;

        // Never discard the same domain or critical research pages
        if (activeHostname !== tabHostname && !tab.url.includes('google.com/search')) {
          console.log(`[CSE] Discarding background tab for performance: ${tab.title}`);
          chrome.tabs.discard(tab.id).catch(() => {/* Ignore already discarded */});
        }
      }
    }
  } catch (err) {
    console.error('[CSE] Resource Guard Error:', err);
  }
}
