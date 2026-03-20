import { RECIPES, getRecipesByCategory } from '../data/recipes.js';
import { DAYS, DAY_LABELS, MEAL_SLOTS, MEAL_LABELS, getDayDate, formatDayDate } from '../utils/dates.js';
import { RECIPE_MAP } from '../data/recipes.js';

const byCategory = getRecipesByCategory();

function MealSelect({ value, onChange }) {
  return (
    <select value={value || ''} onChange={(e) => onChange(e.target.value || null)} className="meal-select">
      <option value="">— none —</option>
      {Object.entries(byCategory).map(([cat, recipes]) =>
        recipes.length === 0 ? null : (
          <optgroup key={cat} label={cat}>
            {recipes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </optgroup>
        )
      )}
    </select>
  );
}

export default function MealPlanner({ plan, weekId, onUpdateDay }) {
  return (
    <div className="meal-planner">
      {DAYS.map((day) => {
        const dayPlan = plan?.days?.[day] || {};
        const date = getDayDate(weekId, day);
        const isToday = formatDayDate(new Date()) === formatDayDate(date);
        return (
          <div key={day} className={`day-card${isToday ? ' day-card--today' : ''}`}>
            <div className="day-header">
              <span className="day-name">{DAY_LABELS[day]}</span>
              <span className="day-date">{formatDayDate(date)}</span>
            </div>
            <div className="day-meals">
              {MEAL_SLOTS.map((slot) => {
                const recipeId = dayPlan[slot];
                const recipe = recipeId ? RECIPE_MAP[recipeId] : null;
                return (
                  <div key={slot} className="meal-row">
                    <span className="meal-slot-label">{MEAL_LABELS[slot]}</span>
                    <div className="meal-select-wrap">
                      <MealSelect
                        value={recipeId || ''}
                        onChange={(val) => onUpdateDay(day, slot, val)}
                      />
                      {recipe && (
                        <a
                          href={recipe.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="recipe-link"
                          title="View recipe"
                        >
                          ↗
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
