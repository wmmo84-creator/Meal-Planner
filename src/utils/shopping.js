import { RECIPE_MAP } from '../data/recipes.js';
import { COMMON_ITEMS, HOUSEHOLD_ITEMS, WEEKLY_STAPLES } from '../data/items.js';
import { DAYS, MEAL_SLOTS } from './dates.js';

const ITEM_MAP = Object.fromEntries([...COMMON_ITEMS, ...HOUSEHOLD_ITEMS, ...WEEKLY_STAPLES].map((i) => [i.id, i]));

const SECTION_ORDER = ['meat', 'seafood', 'produce', 'dairy', 'bakery', 'pantry'];
const SECTION_LABELS = {
  meat: '🥩 Meat & Poultry',
  seafood: '🐟 Seafood',
  produce: '🥬 Fruit & Veg',
  dairy: '🥛 Dairy & Eggs',
  bakery: '🍞 Bakery',
  pantry: '🥫 Pantry',
};

// Build the auto shopping list from the week's meal plan
export function buildShoppingList(plan) {
  if (!plan) return { sections: [], staples: [], common: [], household: [], custom: [] };

  // Collect all perishable ingredients from selected meals
  const ingredientMap = {}; // key: normalised name → { name, qty[], section }
  for (const day of DAYS) {
    const dayPlan = plan.days?.[day] || {};
    for (const slot of MEAL_SLOTS) {
      const recipeId = dayPlan[slot];
      if (!recipeId) continue;
      const recipe = RECIPE_MAP[recipeId];
      if (!recipe) continue;
      for (const ing of recipe.ingredients) {
        if (!ing.perishable) continue;
        const key = ing.name.toLowerCase();
        if (ingredientMap[key]) {
          ingredientMap[key].qty.push(ing.qty);
        } else {
          ingredientMap[key] = { name: ing.name, qty: [ing.qty], section: ing.section };
        }
      }
    }
  }

  // Group by section
  const bySection = {};
  for (const item of Object.values(ingredientMap)) {
    if (!bySection[item.section]) bySection[item.section] = [];
    bySection[item.section].push({ name: item.name, qty: item.qty.join(' + ') });
  }

  const sections = SECTION_ORDER.filter((s) => bySection[s]).map((s) => ({
    key: s,
    label: SECTION_LABELS[s],
    items: bySection[s].sort((a, b) => a.name.localeCompare(b.name)),
  }));

  // Resolve selected common / staple / household item IDs to names
  const staples = (plan.staplesChecked || []).map((id) => ITEM_MAP[id]?.name || id);
  const common = (plan.commonChecked || []).map((id) => ITEM_MAP[id]?.name || id);
  const household = (plan.householdChecked || []).map((id) => ITEM_MAP[id]?.name || id);
  const custom = plan.customItems || [];

  return { sections, staples, common, household, custom };
}

// Get unique recipe IDs used in a plan (for stats)
export function getUsedRecipes(plan) {
  if (!plan) return [];
  const ids = new Set();
  for (const day of DAYS) {
    const dayPlan = plan.days?.[day] || {};
    for (const slot of MEAL_SLOTS) {
      if (dayPlan[slot]) ids.add(dayPlan[slot]);
    }
  }
  return [...ids];
}
