// Date utilities for weekly meal planning

export const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
export const DAY_LABELS = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};
export const MEAL_SLOTS = ['dinner'];
export const MEAL_LABELS = { dinner: 'Dinner' };

// Get the Monday of the week containing a given date
export function getWeekStart(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun, 1=Mon...
  const diff = day === 0 ? -6 : 1 - day; // Monday offset
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Format a date as 'YYYY-MM-DD' for use as a week ID
export function toWeekId(date) {
  const d = new Date(date);
  return d.toISOString().slice(0, 10);
}

// Get weekId for the current week
export function currentWeekId() {
  return toWeekId(getWeekStart());
}

// Add or subtract weeks from a weekId
export function shiftWeek(weekId, delta) {
  const d = new Date(weekId);
  d.setDate(d.getDate() + delta * 7);
  return toWeekId(d);
}

// Format a weekId for display: 'Week of 17 Mar 2026'
export function formatWeekLabel(weekId) {
  const d = new Date(weekId + 'T00:00:00');
  return 'Week of ' + d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Get the actual date for a day of the week given a weekId
export function getDayDate(weekId, dayName) {
  const offset = DAYS.indexOf(dayName);
  const d = new Date(weekId + 'T00:00:00');
  d.setDate(d.getDate() + offset);
  return d;
}

// Format a Date as 'Tue 17 Mar'
export function formatDayDate(date) {
  return date.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
}

// Get a list of previous week IDs (most recent first)
export function getPastWeekIds(count = 12) {
  const ids = [];
  let id = currentWeekId();
  for (let i = 0; i < count; i++) {
    ids.push(id);
    id = shiftWeek(id, -1);
  }
  return ids;
}
