import { pipeline } from '@xenova/transformers';
import { db } from './schema.js';

let embedder = null;

async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return embedder;
}

export async function generateEmbedding(text) {
  const extractor = await getEmbedder();
  const output = await extractor(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}

export async function freezeCluster(clusterName, nodeIds) {
  const nodes = await db.nodes.where('id').anyOf(nodeIds).toArray();
  const combinedText = nodes.map(n => `${n.title} ${n.url}`).join(' ');
  
  const embedding = await generateEmbedding(combinedText);
  
  const clusterId = await db.clusters.add({
    name: clusterName,
    embedding: embedding,
    createdAt: Date.now()
  });

  await db.snapshots.add({
    clusterId,
    timestamp: Date.now(),
    summary: `Snapshot of ${nodes.length} tabs: ${nodes.slice(0, 3).map(n => n.title).join(', ')}...`
  });

  // Close the tabs associated with these nodes
  const activeTabIds = nodes.filter(n => n.tabId).map(n => n.tabId);
  if (activeTabIds.length > 0) {
    chrome.tabs.remove(activeTabIds);
  }

  // Update node status in DB
  await Promise.all(nodes.map(n => db.nodes.update(n.id, { status: 'frozen', clusterId })));
  
  return clusterId;
}
