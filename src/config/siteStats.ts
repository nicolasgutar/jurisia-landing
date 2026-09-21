// Manually updated — there is no live pipeline to compute this number
// automatically (the documents live in a separate RAG database owned by
// the Scrapers repo, not something Landing can query). Update by hand
// whenever the knowledge base grows meaningfully.
//
// Last updated 2026-09-21, from a direct COUNT(*) against
// jurisprudencia-db-prod's `documents` table.
export const DOCUMENTS_INDEXED_COUNT = 302_429;
