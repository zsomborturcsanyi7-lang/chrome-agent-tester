import Dexie from 'dexie';

export const db = new Dexie('CognitiveSessionDB');

db.version(2).stores({
  nodes: '++id, &url, tabId, title, clusterId, status, lastAccessed',
  edges: '++id, [source+target], source, target, type',
  clusters: '++id, name, embedding',
  snapshots: '++id, clusterId, timestamp, summary'
}).upgrade(tx => {
  // Migration logic if needed
});

// Robust Delete: Ensure cascading cleanup
db.nodes.hook('deleting', function (primKey, obj, transaction) {
  transaction.table('edges').where('source').equals(obj.url).delete();
  transaction.table('edges').where('target').equals(obj.url).delete();
});

export default db;
