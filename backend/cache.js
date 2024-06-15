// cache.js
import NodeCache from 'node-cache';

const nodeCache = new NodeCache({
    stdTTL: 60
});

export default nodeCache;
