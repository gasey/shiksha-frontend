import tagsData from '../../mock/tags.json';

let tags = JSON.parse(JSON.stringify(tagsData));

export async function getTags() {
  await new Promise(r => setTimeout(r, 80));
  return tags;
}
