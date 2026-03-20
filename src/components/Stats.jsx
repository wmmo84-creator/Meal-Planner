import { RECIPE_MAP, CATEGORIES } from '../data/recipes.js';
import { DAYS, MEAL_SLOTS } from '../utils/dates.js';
import { COMMON_ITEMS, HOUSEHOLD_ITEMS, WEEKLY_STAPLES } from '../data/items.js';

const ALL_ITEMS = [...COMMON_ITEMS, ...HOUSEHOLD_ITEMS, ...WEEKLY_STAPLES];
const ITEM_MAP = Object.fromEntries(ALL_ITEMS.map((i) => [i.id, i.name]));

function countRecipes(plans) {
  const counts = {};
  for (const plan of Object.values(plans)) {
    for (const day of DAYS) {
      const dayPlan = plan?.days?.[day] || {};
      for (const slot of MEAL_SLOTS) {
        const id = dayPlan[slot];
        if (id) counts[id] = (counts[id] || 0) + 1;
      }
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([id, count]) => ({ id, name: RECIPE_MAP[id]?.name || id, count }));
}

function countItems(plans) {
  const counts = {};
  for (const plan of Object.values(plans)) {
    for (const id of [...(plan.staplesChecked || []), ...(plan.commonChecked || []), ...(plan.householdChecked || [])]) {
      counts[id] = (counts[id] || 0) + 1;
    }
    for (const item of plan.customItems || []) {
      const key = item.toLowerCase().trim();
      counts[key] = (counts[key] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([id, count]) => ({ id, name: ITEM_MAP[id] || id, count }));
}

function countByCategory(plans) {
  const counts = {};
  for (const cat of CATEGORIES) counts[cat] = 0;
  for (const plan of Object.values(plans)) {
    for (const day of DAYS) {
      const dayPlan = plan?.days?.[day] || {};
      for (const slot of MEAL_SLOTS) {
        const id = dayPlan[slot];
        if (!id) continue;
        const recipe = RECIPE_MAP[id];
        if (recipe) counts[recipe.category] = (counts[recipe.category] || 0) + 1;
      }
    }
  }
  return Object.entries(counts)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1]);
}

function Bar({ label, count, max }) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="stat-bar-row">
      <span className="stat-bar-label">{label}</span>
      <div className="stat-bar-track">
        <div className="stat-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="stat-bar-count">{count}×</span>
    </div>
  );
}

export default function Stats({ plans }) {
  const planList = Object.values(plans);
  const totalWeeks = planList.filter((p) => {
    for (const day of DAYS) {
      const dayPlan = p?.days?.[day] || {};
      for (const slot of MEAL_SLOTS) {
        if (dayPlan[slot]) return true;
      }
    }
    return false;
  }).length;

  const totalMeals = planList.reduce((sum, p) => {
    let c = 0;
    for (const day of DAYS) {
      const d = p?.days?.[day] || {};
      for (const slot of MEAL_SLOTS) {
        if (d[slot]) c++;
      }
    }
    return sum + c;
  }, 0);

  const topRecipes = countRecipes(plans).slice(0, 15);
  const topItems = countItems(plans);
  const byCategory = countByCategory(plans);
  const maxRecipe = topRecipes[0]?.count || 1;
  const maxItem = topItems[0]?.count || 1;
  const maxCat = byCategory[0]?.[1] || 1;

  if (planList.length === 0) {
    return (
      <div className="stats-empty">
        <p>No data yet.</p>
        <p>Start planning meals and your stats will appear here.</p>
      </div>
    );
  }

  return (
    <div className="stats">
      <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-number">{totalWeeks}</div>
          <div className="stat-label">Weeks planned</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalMeals}</div>
          <div className="stat-label">Total meals</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{Object.keys(plans).length}</div>
          <div className="stat-label">Saved weeks</div>
        </div>
      </div>

      {topRecipes.length > 0 && (
        <div className="stats-section">
          <h3 className="stats-section-title">🏆 Most Cooked Meals</h3>
          {topRecipes.map((r) => (
            <Bar key={r.id} label={r.name} count={r.count} max={maxRecipe} />
          ))}
        </div>
      )}

      {byCategory.length > 0 && (
        <div className="stats-section">
          <h3 className="stats-section-title">📊 Meals by Category</h3>
          {byCategory.map(([cat, count]) => (
            <Bar key={cat} label={cat} count={count} max={maxCat} />
          ))}
        </div>
      )}

      {topItems.length > 0 && (
        <div className="stats-section">
          <h3 className="stats-section-title">🛒 Most Purchased Items</h3>
          {topItems.map((item) => (
            <Bar key={item.id} label={item.name} count={item.count} max={maxItem} />
          ))}
        </div>
      )}
    </div>
  );
}
