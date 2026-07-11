import { db } from '../db/schema.js';

export const GraphManager = {
  async registerNode(tab) {
    if (!tab.url || tab.url.startsWith('chrome://')) return;

    const existing = await db.nodes.where('url').equals(tab.url).first();
    if (!existing) {
      await db.nodes.add({
        tabId: tab.id,
        url: tab.url,
        title: tab.title,
        favIconUrl: tab.favIconUrl,
        status: 'active',
        lastAccessed: Date.now(),
        clusterId: null
      });
    } else {
      await db.nodes.update(existing.id, {
        tabId: tab.id,
        title: tab.title,
        lastAccessed: Date.now()
      });
    }
  },

  async registerEdge(sourceUrl, targetUrl) {
    if (!sourceUrl || !targetUrl || sourceUrl === targetUrl) return;

    try {
      await db.transaction('rw', db.edges, async () => {
        const existingEdge = await db.edges
          .where({ source: sourceUrl, target: targetUrl })
          .first();

        if (!existingEdge) {
          await db.edges.add({
            source: sourceUrl,
            target: targetUrl,
            type: 'navigation',
            weight: 1
          });
        } else {
          await db.edges.update(existingEdge.id, {
            weight: (existingEdge.weight || 1) + 1
          });
        }
      });
    } catch (err) {
      console.error('[CSE] Edge Registration Error:', err);
    }
  },

  async handleTabClose(tabId) {
    const node = await db.nodes.where('tabId').equals(tabId).first();
    if (node) {
      await db.nodes.update(node.id, { status: 'closed', tabId: null });
    }
  }
};
