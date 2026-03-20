import { useState } from 'react';
import { buildShoppingList } from '../utils/shopping.js';
import { COMMON_ITEMS, HOUSEHOLD_ITEMS, WEEKLY_STAPLES } from '../data/items.js';
import { getLearnedStaples } from '../utils/learning.js';

function groupBy(items) {
  const groups = {};
  for (const item of items) {
    if (!groups[item.group]) groups[item.group] = [];
    groups[item.group].push(item);
  }
  return groups;
}

function ToggleGrid({ items, selected, onToggle }) {
  const grouped = groupBy(items);
  return (
    <div className="toggle-sections">
      {Object.entries(grouped).map(([group, groupItems]) => (
        <div key={group} className="toggle-group">
          <p className="toggle-group-label">{group}</p>
          <div className="toggle-grid">
            {groupItems.map((item) => (
              <button
                key={item.id}
                className={`toggle-btn${selected.includes(item.id) ? ' toggle-btn--on' : ''}`}
                onClick={() => onToggle(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CheckableItem({ name, qty, checked, onCheck }) {
  return (
    <li className={`check-item${checked ? ' check-item--done' : ''}`} onClick={onCheck}>
      <span className="check-box">{checked ? '✓' : ''}</span>
      <span className="check-name">{name}</span>
      {qty && <span className="check-qty">{qty}</span>}
    </li>
  );
}

export default function ShoppingList({ plan, plans, onUpdate }) {
  const [customInput, setCustomInput] = useState('');
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'common' | 'household'

  const shoppingData = buildShoppingList(plan);

  const checked = plan?.shoppingChecked || [];
  const staplesChecked = plan?.staplesChecked || [];
  const commonChecked = plan?.commonChecked || [];
  const householdChecked = plan?.householdChecked || [];
  const customItems = plan?.customItems || [];

  // Items learned from history (selected 3+ times across saved weeks)
  const learnedStaples = getLearnedStaples(plans || {}, COMMON_ITEMS, HOUSEHOLD_ITEMS);

  function isLearnedActive(item) {
    if (item.source === 'common') return commonChecked.includes(item.id);
    if (item.source === 'household') return householdChecked.includes(item.id);
    if (item.source === 'custom') return customItems.some(
      (t) => t.toLowerCase().trim() === item.name.toLowerCase().trim()
    );
    return false;
  }

  function toggleLearned(item) {
    if (item.source === 'common') {
      const next = commonChecked.includes(item.id)
        ? commonChecked.filter((k) => k !== item.id)
        : [...commonChecked, item.id];
      onUpdate({ commonChecked: next });
    } else if (item.source === 'household') {
      const next = householdChecked.includes(item.id)
        ? householdChecked.filter((k) => k !== item.id)
        : [...householdChecked, item.id];
      onUpdate({ householdChecked: next });
    } else if (item.source === 'custom') {
      const alreadyIn = customItems.some(
        (t) => t.toLowerCase().trim() === item.name.toLowerCase().trim()
      );
      const next = alreadyIn
        ? customItems.filter((t) => t.toLowerCase().trim() !== item.name.toLowerCase().trim())
        : [...customItems, item.name];
      onUpdate({ customItems: next });
    }
  }

  function toggleChecked(itemKey) {
    const next = checked.includes(itemKey)
      ? checked.filter((k) => k !== itemKey)
      : [...checked, itemKey];
    onUpdate({ shoppingChecked: next });
  }

  function toggleStaple(id) {
    const next = staplesChecked.includes(id)
      ? staplesChecked.filter((k) => k !== id)
      : [...staplesChecked, id];
    onUpdate({ staplesChecked: next });
  }

  function toggleCommon(id) {
    const next = commonChecked.includes(id)
      ? commonChecked.filter((k) => k !== id)
      : [...commonChecked, id];
    onUpdate({ commonChecked: next });
  }

  function toggleHousehold(id) {
    const next = householdChecked.includes(id)
      ? householdChecked.filter((k) => k !== id)
      : [...householdChecked, id];
    onUpdate({ householdChecked: next });
  }

  function addCustomItem() {
    const val = customInput.trim();
    if (!val) return;
    const next = [...customItems, val];
    onUpdate({ customItems: next });
    setCustomInput('');
  }

  function removeCustomItem(idx) {
    const next = customItems.filter((_, i) => i !== idx);
    onUpdate({ customItems: next });
  }

  const totalItems =
    shoppingData.sections.reduce((s, sec) => s + sec.items.length, 0) +
    staplesChecked.length +
    commonChecked.length +
    householdChecked.length +
    customItems.length;

  return (
    <div className="shopping-list">
      <div className="sl-tab-bar">
        <button className={`sl-tab${activeTab === 'list' ? ' sl-tab--active' : ''}`} onClick={() => setActiveTab('list')}>
          Shopping List {totalItems > 0 ? `(${totalItems})` : ''}
        </button>
        <button className={`sl-tab${activeTab === 'common' ? ' sl-tab--active' : ''}`} onClick={() => setActiveTab('common')}>
          Pantry Items
        </button>
        <button className={`sl-tab${activeTab === 'household' ? ' sl-tab--active' : ''}`} onClick={() => setActiveTab('household')}>
          Household
        </button>
      </div>

      {activeTab === 'list' && (
        <div className="sl-list-view">
          {/* Learned staples — items selected 3+ times historically */}
          {learnedStaples.length > 0 && (
            <div className="sl-section">
              <h3 className="sl-section-title">📈 Suggested for You</h3>
              <p className="sl-hint">Based on your shopping history</p>
              <div className="toggle-grid">
                {learnedStaples.map((item) => (
                  <button
                    key={item.id}
                    className={`toggle-btn${isLearnedActive(item) ? ' toggle-btn--on' : ''}`}
                    onClick={() => toggleLearned(item)}
                    title={`Selected ${item.count}× before`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Weekly staples quick-add */}
          <div className="sl-section">
            <h3 className="sl-section-title">⭐ Weekly Staples</h3>
            <p className="sl-hint">Tap to add to list</p>
            <div className="toggle-grid staples-grid">
              {WEEKLY_STAPLES.map((item) => (
                <button
                  key={item.id}
                  className={`toggle-btn${staplesChecked.includes(item.id) ? ' toggle-btn--on' : ''}`}
                  onClick={() => toggleStaple(item.id)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Auto-generated from meals */}
          {shoppingData.sections.length > 0 && (
            <div className="sl-section">
              <h3 className="sl-section-title">🍽️ From This Week's Meals</h3>
              {shoppingData.sections.map((sec) => (
                <div key={sec.key} className="sl-subsection">
                  <h4 className="sl-subsection-title">{sec.label}</h4>
                  <ul className="check-list">
                    {sec.items.map((item) => {
                      const key = `meal-${item.name.toLowerCase()}`;
                      return (
                        <CheckableItem
                          key={key}
                          name={item.name}
                          qty={item.qty}
                          checked={checked.includes(key)}
                          onCheck={() => toggleChecked(key)}
                        />
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {shoppingData.sections.length === 0 && (
            <div className="sl-empty">
              <p>No meals planned yet.</p>
              <p>Go to the <strong>Plan</strong> tab to add meals for the week.</p>
            </div>
          )}

          {/* Selected common/pantry items */}
          {commonChecked.length > 0 && (
            <div className="sl-section">
              <h3 className="sl-section-title">🥫 Pantry Items</h3>
              <ul className="check-list">
                {commonChecked.map((id) => {
                  const item = COMMON_ITEMS.find((i) => i.id === id);
                  const key = `common-${id}`;
                  return (
                    <CheckableItem
                      key={key}
                      name={item?.name || id}
                      checked={checked.includes(key)}
                      onCheck={() => toggleChecked(key)}
                    />
                  );
                })}
              </ul>
            </div>
          )}

          {/* Selected household items */}
          {householdChecked.length > 0 && (
            <div className="sl-section">
              <h3 className="sl-section-title">🏠 Household Items</h3>
              <ul className="check-list">
                {householdChecked.map((id) => {
                  const item = HOUSEHOLD_ITEMS.find((i) => i.id === id);
                  const key = `household-${id}`;
                  return (
                    <CheckableItem
                      key={key}
                      name={item?.name || id}
                      checked={checked.includes(key)}
                      onCheck={() => toggleChecked(key)}
                    />
                  );
                })}
              </ul>
            </div>
          )}

          {/* Selected weekly staples */}
          {staplesChecked.length > 0 && (
            <div className="sl-section">
              <h3 className="sl-section-title">⭐ Weekly Staples</h3>
              <ul className="check-list">
                {staplesChecked.map((id) => {
                  const item = WEEKLY_STAPLES.find((i) => i.id === id);
                  const key = `staple-${id}`;
                  return (
                    <CheckableItem
                      key={key}
                      name={item?.name || id}
                      checked={checked.includes(key)}
                      onCheck={() => toggleChecked(key)}
                    />
                  );
                })}
              </ul>
            </div>
          )}

          {/* Custom items */}
          <div className="sl-section">
            <h3 className="sl-section-title">✏️ Custom Items</h3>
            <div className="custom-input-row">
              <input
                type="text"
                className="custom-input"
                placeholder="Add an item…"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomItem()}
              />
              <button className="btn-primary custom-add-btn" onClick={addCustomItem}>
                Add
              </button>
            </div>
            {customItems.length > 0 && (
              <ul className="check-list">
                {customItems.map((item, idx) => {
                  const key = `custom-${idx}-${item}`;
                  return (
                    <li key={key} className={`check-item${checked.includes(key) ? ' check-item--done' : ''}`}>
                      <span className="check-box" onClick={() => toggleChecked(key)}>
                        {checked.includes(key) ? '✓' : ''}
                      </span>
                      <span className="check-name" onClick={() => toggleChecked(key)}>
                        {item}
                      </span>
                      <button className="remove-btn" onClick={() => removeCustomItem(idx)}>
                        ×
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}

      {activeTab === 'common' && (
        <div className="sl-toggle-view">
          <p className="sl-hint">Select items to add them to your shopping list.</p>
          <ToggleGrid items={COMMON_ITEMS} selected={commonChecked} onToggle={toggleCommon} />
        </div>
      )}

      {activeTab === 'household' && (
        <div className="sl-toggle-view">
          <p className="sl-hint">Select items you need to buy this week.</p>
          <ToggleGrid items={HOUSEHOLD_ITEMS} selected={householdChecked} onToggle={toggleHousehold} />
        </div>
      )}
    </div>
  );
}
