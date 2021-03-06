const geometry = require("./geometry");
const quadtree = require("./quadtree");

function lookup(index, lng, lat, zoom) {
  const coords = geometry.normalize([lng, lat], index.index.bounds);
  const hit = quadtree.find2(index.index, coords[0], coords[1], zoom);
  if (hit.value) {
    const fields = hit.value.split(";");
    const [ssrid, category, name] = fields;
    const meta = index.id2meta[category];
    return { ssrid: ssrid, navn: name, dist: hit.dist, meta: meta };
  }
  return hit;
}

module.exports = { lookup };
