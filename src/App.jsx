import { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login.jsx';
import MealPlanner from './components/MealPlanner.jsx';
import ShoppingList from './components/ShoppingList.jsx';
import Stats from './components/Stats.jsx';
import { getAllPlans, savePlan, logout } from './utils/api.js';
import { currentWeekId, shiftWeek, formatWeekLabel, getPastWeekIds } from './utils/dates.js';

const TABS = ['plan', 'shopping', 'stats'];
const TAB_LABELS = { plan: '📅 Plan', shopping: '🛒 Shopping', stats: '📊 Stats' };

function emptyPlan() {
  return {
    days: {},
    staplesChecked: [],
    commonChecked: [],
    householdChecked: [],
    customItems: [],
    shoppingChecked: [],
  };
}

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('mp_token'));
  const [tab, setTab] = useState('plan');
  const [weekId, setWeekId] = useState(currentWeekId);
  const [plans, setPlans] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [showWeekPicker, setShowWeekPicker] = useState(false);

  // Load all plans from server on mount / login
  useEffect(() => {
    if (!token) return;
    getAllPlans()
      .then((data) => setPlans(data || {}))
      .catch((err) => {
        if (err.message === 'UNAUTHORIZED') handleLogout();
      });
  }, [token]); // eslint-disable-line

  function handleLogin(tok) {
    setToken(tok);
  }

  function handleLogout() {
    logout();
    setToken(null);
    setPlans({});
  }

  const currentPlan = plans[weekId] || emptyPlan();

  function updatePlan(updates) {
    setPlans((prev) => ({
      ...prev,
      [weekId]: { ...(prev[weekId] || emptyPlan()), ...updates },
    }));
  }

  function updateDay(day, slot, recipeId) {
    const plan = currentPlan;
    const days = {
      ...(plan.days || {}),
      [day]: { ...(plan.days?.[day] || {}), [slot]: recipeId || null },
    };
    updatePlan({ days });
  }

  async function handleSave() {
    setSaving(true);
    setSaveMsg('');
    try {
      await savePlan(weekId, currentPlan);
      setSaveMsg('Saved ✓');
      setTimeout(() => setSaveMsg(''), 2500);
    } catch {
      setSaveMsg('Save failed');
    } finally {
      setSaving(false);
    }
  }

  const pastWeeks = getPastWeekIds(16);

  if (!token) return <Login onLogin={handleLogin} />;

  return (
    <div className="app">
      {/* ── Header ─────────────────────────────── */}
      <header className="app-header">
        <div className="header-top">
          <span className="app-title">🍽️ Meal Planner</span>
          <button className="logout-btn" onClick={handleLogout} title="Sign out">
            Sign out
          </button>
        </div>

        <div className="week-nav">
          <button className="week-nav-btn" onClick={() => setWeekId((w) => shiftWeek(w, -1))}>‹</button>
          <button className="week-label-btn" onClick={() => setShowWeekPicker((v) => !v)}>
            {formatWeekLabel(weekId)}
            <span className="week-label-arrow">{showWeekPicker ? ' ▲' : ' ▼'}</span>
          </button>
          <button className="week-nav-btn" onClick={() => setWeekId((w) => shiftWeek(w, 1))}>›</button>
          <button className="btn-save" onClick={handleSave} disabled={saving}>
            {saving ? '…' : 'Save'}
          </button>
        </div>

        {saveMsg && <div className="save-msg">{saveMsg}</div>}

        {showWeekPicker && (
          <div className="week-picker">
            {pastWeeks.map((wid) => (
              <button
                key={wid}
                className={`week-picker-item${wid === weekId ? ' week-picker-item--active' : ''}${plans[wid] ? ' week-picker-item--saved' : ''}`}
                onClick={() => { setWeekId(wid); setShowWeekPicker(false); }}
              >
                {formatWeekLabel(wid)}
                {plans[wid] && <span className="saved-dot"> ●</span>}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Main Content ───────────────────────── */}
      <main className="app-main">
        {tab === 'plan' && (
          <MealPlanner
            plan={currentPlan}
            weekId={weekId}
            onUpdateDay={updateDay}
          />
        )}
        {tab === 'shopping' && (
          <ShoppingList
            plan={currentPlan}
            plans={plans}
            onUpdate={updatePlan}
          />
        )}
        {tab === 'stats' && <Stats plans={plans} />}
      </main>

      {/* ── Bottom Nav ─────────────────────────── */}
      <nav className="bottom-nav">
        {TABS.map((t) => (
          <button
            key={t}
            className={`bottom-nav-btn${tab === t ? ' bottom-nav-btn--active' : ''}`}
            onClick={() => setTab(t)}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </nav>
    </div>
  );
}
