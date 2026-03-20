import { WEEKLY_STAPLES } from '../data/items.js';

const STAPLE_IDS = new Set(WEEKLY_STAPLES.map((i) => i.id));
const THRESHOLD = 3; // selected this many times → learned staple

/**
 * Analyse all saved plans and return items that appear frequently enough
 * to be surfaced as learned staples.
 *
 * Returns an array of:
 *   { id, name, count, source: 'common' | 'household' | 'custom' }
 *
 * Already-in-WEEKLY_STAPLES items are excluded (they're already shown).
 */
export function getLearnedStaples(plans, allCommon, allHousehold) {
  const counts = {}; // id/key → count

  for (const plan of Object.values(plans)) {
    // Common pantry items
    for (const id of plan.commonChecked || []) {
      if (!STAPLE_IDS.has(id)) counts[id] = (counts[id] || 0) + 1;
    }
    // Household items
    for (const id of plan.householdChecked || []) {
      if (!STAPLE_IDS.has(id)) counts[id] = (counts[id] || 0) + 1;
    }
    // Custom text items — normalise to lowercase for deduplication
    for (const text of plan.customItems || []) {
      const key = 'custom:' + text.toLowerCase().trim();
      counts[key] = (counts[key] || 0) + 1;
    }
  }

  const commonMap = Object.fromEntries(allCommon.map((i) => [i.id, i]));
  const householdMap = Object.fromEntries(allHousehold.map((i) => [i.id, i]));

  return Object.entries(counts)
    .filter(([, count]) => count >= THRESHOLD)
    .map(([key, count]) => {
      if (key.startsWith('custom:')) {
        const text = key.slice(7);
        return {
          id: key,
          name: text.charAt(0).toUpperCase() + text.slice(1),
          count,
          source: 'custom',
        };
      }
      if (commonMap[key]) return { id: key, name: commonMap[key].name, count, source: 'common' };
      if (householdMap[key]) return { id: key, name: householdMap[key].name, count, source: 'household' };
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => b.count - a.count);
}
