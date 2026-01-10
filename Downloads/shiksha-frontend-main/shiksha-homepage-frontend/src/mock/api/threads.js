import threadsData from '../../mock/threads.json';

let threads = JSON.parse(JSON.stringify(threadsData)); // in-memory copy

export async function getThreads(params = {}) {
  // params: search, tag, date_from, date_to, sort, page
  await new Promise(r => setTimeout(r, 150)); // simulate latency
  let res = threads.slice();

  if (params.search) {
    const q = params.search.toLowerCase();
    res = res.filter(t => t.title.toLowerCase().includes(q) || (t.body || '').toLowerCase().includes(q));
  }
  if (params.tag) {
    res = res.filter(t => (t.tags || []).includes(params.tag));
  }
  if (params.date_from || params.date_to) {
    res = res.filter(t => {
      const c = new Date(t.created_at);
      if (params.date_from && c < new Date(params.date_from)) return false;
      if (params.date_to && c > new Date(params.date_to)) return false;
      return true;
    });
  }
  if (params.sort === 'oldest') {
    res.sort((a,b) => new Date(a.created_at) - new Date(b.created_at));
  } else {
    res.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
  }

  // simple pagination support (page, page_size)
  const page = params.page ? parseInt(params.page, 10) : 1;
  const page_size = params.page_size ? parseInt(params.page_size, 10) : 50;
  const start = (page - 1) * page_size;
  const paginated = res.slice(start, start + page_size);

  return { results: paginated, count: res.length };
}

export async function getThread(id) {
  await new Promise(r => setTimeout(r, 100));
  const t = threads.find(x => String(x.id) === String(id));
  if (!t) throw new Error('Thread not found');
  return t;
}

// For completeness: createThread (will append in-memory)
export async function createThread(payload) {
  await new Promise(r => setTimeout(r, 150));
  const id = (threads[threads.length - 1]?.id || 0) + 1;
  const newThread = {
    id,
    title: payload.title,
    body: payload.body || '',
    author_username: payload.author_username || 'anonymous',
    created_at: new Date().toISOString(),
    tags: payload.tags || [],
    reply_count: 0
  };
  threads.push(newThread);
  return newThread;
}
