import { useState } from 'react';
import { getRecipesByCategory } from '../data/recipes.js';
import { DAYS, DAY_LABELS, MEAL_SLOTS, MEAL_LABELS, getDayDate, formatDayDate } from '../utils/dates.js';
import { RECIPE_MAP } from '../data/recipes.js';

const byCategory = getRecipesByCategory();
const CUSTOM_SENTINEL = '__custom__';

// Returns true if the value is a free-text meal (not a known recipe ID)
function isCustom(value) {
  return value && !RECIPE_MAP[value];
}

function MealInput({ value, onChange }) {
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState('');

  const custom = isCustom(value);

  // Show text input when: user clicked "Type your own…", or value is already a custom string
  if (typing || custom) {
    return (
      <div className="meal-select-wrap">
        <input
          type="text"
          className="meal-text-input"
          placeholder="Type meal name…"
          value={typing ? draft : (value || '')}
          autoFocus={typing}
          onChange={(e) => {
            if (typing) setDraft(e.target.value);
            else onChange(e.target.value || null);
          }}
          onBlur={() => {
            if (typing) {
              onChange(draft.trim() || null);
              setTyping(false);
              setDraft('');
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.target.blur();
            if (e.key === 'Escape') {
              setTyping(false);
              setDraft('');
              onChange(value); // keep old value
            }
          }}
        />
        <button
          className="meal-clear-btn"
          title="Clear / pick from list"
          onClick={() => { onChange(null); setTyping(false); setDraft(''); }}
        >
          ×
        </button>
      </div>
    );
  }

  return (
    <div className="meal-select-wrap">
      <select
        value={value || ''}
        onChange={(e) => {
          const v = e.target.value;
          if (v === CUSTOM_SENTINEL) {
            setDraft('');
            setTyping(true);
          } else {
            onChange(v || null);
          }
        }}
        className="meal-select"
      >
        <option value="">— none —</option>
        <option value={CUSTOM_SENTINEL}>✏️ Type your own…</option>
        {Object.entries(byCategory).map(([cat, recipes]) =>
          recipes.length === 0 ? null : (
            <optgroup key={cat} label={cat}>
              {recipes.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </optgroup>
          )
        )}
      </select>
      {value && RECIPE_MAP[value] && (
        <a
          href={RECIPE_MAP[value].url}
          target="_blank"
          rel="noopener noreferrer"
          className="recipe-link"
          title="View recipe"
        >
          ↗
        </a>
      )}
    </div>
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
              {MEAL_SLOTS.map((slot) => (
                <div key={slot} className="meal-row">
                  <span className="meal-slot-label">{MEAL_LABELS[slot]}</span>
                  <MealInput
                    value={dayPlan[slot] || null}
                    onChange={(val) => onUpdateDay(day, slot, val)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
