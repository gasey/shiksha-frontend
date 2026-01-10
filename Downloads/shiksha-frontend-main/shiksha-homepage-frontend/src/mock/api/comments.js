import commentsData from '../../mock/comments.json';

let commentsStore = JSON.parse(JSON.stringify(commentsData)); // in-memory copy

export async function getComments(threadId, params = {}) {
  // params: sort=newest|oldest
  await new Promise(r => setTimeout(r, 120));
  const arr = commentsStore[String(threadId)] || [];
  const copy = arr.slice();
  if (params.sort === 'newest') {
    copy.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
  } else {
    copy.sort((a,b) => new Date(a.created_at) - new Date(b.created_at));
  }
  return { results: copy, count: copy.length };
}

export async function postComment(threadId, payload) {
  // payload: { content, reply_to_comment_id, author_username }
  await new Promise(r => setTimeout(r, 150));
  const list = commentsStore[String(threadId)] || [];
  const maxId = Object.values(commentsStore).flat().reduce((m,c) => Math.max(m, c.id), 0);
  const id = maxId + 1;
  const comment = {
    id,
    thread_id: parseInt(threadId, 10),
    author_username: payload.author_username || 'guest',
    content: payload.content,
    reply_to_comment_id: payload.reply_to_comment_id || null,
    created_at: new Date().toISOString()
  };
  commentsStore[String(threadId)] = [...list, comment];

  // update thread reply_count in threads.json in-memory if needed
  // Attempt to update threads in memory (import path)
  try {
    // lazy-import threads store to update reply_count
    const threadsModule = await import('./threads.js');
    // threads variable inside threads.js is not exported, so this won't mutate; skip in mock
  } catch (e) {
    // ignore
  }

  return comment;
}
