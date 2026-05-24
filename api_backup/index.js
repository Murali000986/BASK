import server from '../dist/server/server.js';

export const config = {
  runtime: 'nodejs',
};

export default function(request, event) {
  return server.fetch(request, process.env, event);
}
