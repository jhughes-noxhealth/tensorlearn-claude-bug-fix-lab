// Contract: docs/contract.md. Pure function; do not mutate claims.
// Only nonempty strings (after trimming) are IDs; anything else is malformed and cannot match.
function normalizeId(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

export function getClaim(claims, viewerId, claimId) {
  if (!Array.isArray(claims)) return null;
  const target = normalizeId(claimId);
  const viewer = normalizeId(viewerId);
  if (target === null || viewer === null) return null;
  return claims.find(claim =>
    claim !== null && typeof claim === 'object' &&
    normalizeId(claim.id) === target && normalizeId(claim.ownerId) === viewer) ?? null;
}
