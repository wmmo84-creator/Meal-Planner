// All recipes from recipetineats.com.au
// ingredients: perishable:true → auto-added to shopping list
// section: 'meat' | 'seafood' | 'produce' | 'dairy' | 'pantry' | 'bakery'

export const CATEGORIES = [
  'Chicken',
  'Beef & Lamb',
  'Pork',
  'Seafood',
  'Pasta & Noodles',
  'Asian',
  'Mexican',
  'Vegetarian',
  'Roasts & Hearty',
  'Quick & Easy',
];

export const RECIPES = [
  // ─── CHICKEN ───────────────────────────────────────────────────────────────
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    category: 'Chicken',
    url: 'https://www.recipetineats.com.au/butter-chicken/',
    ingredients: [
      { name: 'Chicken thighs', qty: '800g', section: 'meat', perishable: true },
      { name: 'Plain yoghurt', qty: '1 cup', section: 'dairy', perishable: true },
      { name: 'Lemon', qty: '1', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '4 cloves', section: 'produce', perishable: true },
      { name: 'Fresh ginger', qty: '30g piece', section: 'produce', perishable: true },
      { name: 'Butter', qty: '60g', section: 'dairy', perishable: true },
      { name: 'Brown onion', qty: '1 large', section: 'produce', perishable: true },
      { name: 'Thickened cream', qty: '300ml', section: 'dairy', perishable: true },
    ],
  },
  {
    id: 'chicken-tikka-masala',
    name: 'Chicken Tikka Masala',
    category: 'Chicken',
    url: 'https://www.recipetineats.com.au/chicken-tikka-masala/',
    ingredients: [
      { name: 'Chicken breast', qty: '700g', section: 'meat', perishable: true },
      { name: 'Plain yoghurt', qty: '3/4 cup', section: 'dairy', perishable: true },
      { name: 'Lemon', qty: '1', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '5 cloves', section: 'produce', perishable: true },
      { name: 'Fresh ginger', qty: '30g piece', section: 'produce', perishable: true },
      { name: 'Butter', qty: '40g', section: 'dairy', perishable: true },
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Thickened cream', qty: '200ml', section: 'dairy', perishable: true },
    ],
  },
  {
    id: 'honey-garlic-chicken',
    name: 'Honey Garlic Chicken',
    category: 'Chicken',
    url: 'https://www.recipetineats.com.au/honey-garlic-chicken/',
    ingredients: [
      { name: 'Chicken thighs (bone-in)', qty: '1kg', section: 'meat', perishable: true },
      { name: 'Garlic', qty: '4 cloves', section: 'produce', perishable: true },
      { name: 'Butter', qty: '30g', section: 'dairy', perishable: true },
    ],
  },
  {
    id: 'chicken-schnitzel',
    name: 'Chicken Schnitzel',
    category: 'Chicken',
    url: 'https://www.recipetineats.com.au/chicken-schnitzel/',
    ingredients: [
      { name: 'Chicken breast', qty: '4 large', section: 'meat', perishable: true },
      { name: 'Eggs', qty: '2', section: 'dairy', perishable: true },
      { name: 'Lemon', qty: '1', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'roast-chicken',
    name: 'Roast Chicken',
    category: 'Chicken',
    url: 'https://www.recipetineats.com.au/roast-chicken/',
    ingredients: [
      { name: 'Whole chicken', qty: '1.8kg', section: 'meat', perishable: true },
      { name: 'Butter', qty: '60g', section: 'dairy', perishable: true },
      { name: 'Garlic', qty: '4 cloves', section: 'produce', perishable: true },
      { name: 'Lemon', qty: '1', section: 'produce', perishable: true },
      { name: 'Fresh rosemary', qty: '3 sprigs', section: 'produce', perishable: true },
      { name: 'Potatoes', qty: '600g', section: 'produce', perishable: true },
      { name: 'Carrots', qty: '3', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'creamy-tuscan-chicken',
    name: 'Creamy Tuscan Chicken',
    category: 'Chicken',
    url: 'https://www.recipetineats.com.au/creamy-tuscan-chicken/',
    ingredients: [
      { name: 'Chicken thighs', qty: '800g', section: 'meat', perishable: true },
      { name: 'Garlic', qty: '4 cloves', section: 'produce', perishable: true },
      { name: 'Cherry tomatoes', qty: '250g punnet', section: 'produce', perishable: true },
      { name: 'Baby spinach', qty: '60g bag', section: 'produce', perishable: true },
      { name: 'Thickened cream', qty: '300ml', section: 'dairy', perishable: true },
      { name: 'Parmesan', qty: '40g', section: 'dairy', perishable: true },
    ],
  },
  {
    id: 'chicken-parmigiana',
    name: 'Chicken Parmigiana',
    category: 'Chicken',
    url: 'https://www.recipetineats.com.au/chicken-parmesan/',
    ingredients: [
      { name: 'Chicken breast', qty: '4 large', section: 'meat', perishable: true },
      { name: 'Eggs', qty: '2', section: 'dairy', perishable: true },
      { name: 'Mozzarella', qty: '200g', section: 'dairy', perishable: true },
    ],
  },
  {
    id: 'lemon-herb-chicken',
    name: 'Lemon Herb Chicken',
    category: 'Chicken',
    url: 'https://www.recipetineats.com.au/lemon-herb-marinated-chicken-breast/',
    ingredients: [
      { name: 'Chicken breast', qty: '4', section: 'meat', perishable: true },
      { name: 'Lemon', qty: '2', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '3 cloves', section: 'produce', perishable: true },
      { name: 'Fresh parsley', qty: '1 bunch', section: 'produce', perishable: true },
    ],
  },

  // ─── BEEF & LAMB ────────────────────────────────────────────────────────────
  {
    id: 'spaghetti-bolognese',
    name: 'Spaghetti Bolognese',
    category: 'Beef & Lamb',
    url: 'https://www.recipetineats.com.au/spaghetti-bolognese/',
    ingredients: [
      { name: 'Beef mince', qty: '500g', section: 'meat', perishable: true },
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Carrot', qty: '1', section: 'produce', perishable: true },
      { name: 'Celery', qty: '2 stalks', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '3 cloves', section: 'produce', perishable: true },
      { name: 'Parmesan', qty: '60g', section: 'dairy', perishable: true },
    ],
  },
  {
    id: 'beef-stir-fry',
    name: 'Beef Stir Fry',
    category: 'Beef & Lamb',
    url: 'https://www.recipetineats.com.au/beef-stir-fry/',
    ingredients: [
      { name: 'Beef stir fry strips', qty: '500g', section: 'meat', perishable: true },
      { name: 'Broccolini', qty: '1 bunch', section: 'produce', perishable: true },
      { name: 'Capsicum', qty: '1', section: 'produce', perishable: true },
      { name: 'Carrot', qty: '1', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '3 cloves', section: 'produce', perishable: true },
      { name: 'Fresh ginger', qty: '20g piece', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'mongolian-beef',
    name: 'Mongolian Beef',
    category: 'Beef & Lamb',
    url: 'https://www.recipetineats.com.au/mongolian-beef/',
    ingredients: [
      { name: 'Beef strips', qty: '500g', section: 'meat', perishable: true },
      { name: 'Spring onions', qty: '4', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '3 cloves', section: 'produce', perishable: true },
      { name: 'Fresh ginger', qty: '20g piece', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'shepherds-pie',
    name: "Shepherd's Pie",
    category: 'Beef & Lamb',
    url: 'https://www.recipetineats.com.au/shepherds-pie/',
    ingredients: [
      { name: 'Lamb mince', qty: '500g', section: 'meat', perishable: true },
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Carrot', qty: '2', section: 'produce', perishable: true },
      { name: 'Celery', qty: '2 stalks', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '2 cloves', section: 'produce', perishable: true },
      { name: 'Potatoes', qty: '800g', section: 'produce', perishable: true },
      { name: 'Butter', qty: '50g', section: 'dairy', perishable: true },
      { name: 'Milk', qty: '1/3 cup', section: 'dairy', perishable: true },
      { name: 'Frozen peas', qty: '1 cup', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'beef-tacos',
    name: 'Beef Tacos',
    category: 'Beef & Lamb',
    url: 'https://www.recipetineats.com.au/beef-tacos/',
    ingredients: [
      { name: 'Beef mince', qty: '500g', section: 'meat', perishable: true },
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '2 cloves', section: 'produce', perishable: true },
      { name: 'Tomato', qty: '2', section: 'produce', perishable: true },
      { name: 'Iceberg lettuce', qty: '1/2', section: 'produce', perishable: true },
      { name: 'Cheddar cheese', qty: '1 cup shredded', section: 'dairy', perishable: true },
      { name: 'Sour cream', qty: '200g', section: 'dairy', perishable: true },
      { name: 'Avocado', qty: '1', section: 'produce', perishable: true },
      { name: 'Lime', qty: '1', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'roast-lamb',
    name: 'Slow Roasted Lamb Leg',
    category: 'Beef & Lamb',
    url: 'https://www.recipetineats.com.au/slow-roasted-lamb-leg/',
    ingredients: [
      { name: 'Lamb leg', qty: '2.5kg', section: 'meat', perishable: true },
      { name: 'Garlic', qty: '1 head', section: 'produce', perishable: true },
      { name: 'Fresh rosemary', qty: '4 sprigs', section: 'produce', perishable: true },
      { name: 'Potatoes', qty: '800g', section: 'produce', perishable: true },
      { name: 'Brown onion', qty: '2', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'beef-stew',
    name: 'Beef Stew',
    category: 'Beef & Lamb',
    url: 'https://www.recipetineats.com.au/beef-stew/',
    ingredients: [
      { name: 'Beef chuck steak', qty: '1kg', section: 'meat', perishable: true },
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Carrot', qty: '2', section: 'produce', perishable: true },
      { name: 'Potatoes', qty: '500g', section: 'produce', perishable: true },
      { name: 'Celery', qty: '2 stalks', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '3 cloves', section: 'produce', perishable: true },
      { name: 'Mushrooms', qty: '200g', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'beef-burgers',
    name: 'Beef Burgers',
    category: 'Beef & Lamb',
    url: 'https://www.recipetineats.com.au/juicy-beef-burgers/',
    ingredients: [
      { name: 'Beef mince', qty: '600g', section: 'meat', perishable: true },
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Egg', qty: '1', section: 'dairy', perishable: true },
      { name: 'Cheese slices', qty: '4', section: 'dairy', perishable: true },
      { name: 'Tomato', qty: '1', section: 'produce', perishable: true },
      { name: 'Iceberg lettuce', qty: '1/4', section: 'produce', perishable: true },
      { name: 'Burger buns', qty: '4', section: 'bakery', perishable: true },
    ],
  },
  {
    id: 'lasagne',
    name: 'Lasagne',
    category: 'Beef & Lamb',
    url: 'https://www.recipetineats.com.au/lasagne/',
    ingredients: [
      { name: 'Beef mince', qty: '600g', section: 'meat', perishable: true },
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '3 cloves', section: 'produce', perishable: true },
      { name: 'Carrot', qty: '1', section: 'produce', perishable: true },
      { name: 'Butter', qty: '60g', section: 'dairy', perishable: true },
      { name: 'Milk', qty: '3 cups', section: 'dairy', perishable: true },
      { name: 'Parmesan', qty: '80g', section: 'dairy', perishable: true },
      { name: 'Mozzarella', qty: '200g shredded', section: 'dairy', perishable: true },
    ],
  },

  // ─── PORK ───────────────────────────────────────────────────────────────────
  {
    id: 'honey-garlic-pork-chops',
    name: 'Honey Garlic Pork Chops',
    category: 'Pork',
    url: 'https://www.recipetineats.com.au/pork-chops/',
    ingredients: [
      { name: 'Pork chops', qty: '4', section: 'meat', perishable: true },
      { name: 'Garlic', qty: '4 cloves', section: 'produce', perishable: true },
      { name: 'Butter', qty: '30g', section: 'dairy', perishable: true },
    ],
  },
  {
    id: 'pork-stir-fry-noodles',
    name: 'Pork Stir Fry with Noodles',
    category: 'Pork',
    url: 'https://www.recipetineats.com.au/asian-pork-noodle-soup/',
    ingredients: [
      { name: 'Pork mince', qty: '400g', section: 'meat', perishable: true },
      { name: 'Cabbage', qty: '1/4 small', section: 'produce', perishable: true },
      { name: 'Carrot', qty: '1', section: 'produce', perishable: true },
      { name: 'Spring onions', qty: '3', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '3 cloves', section: 'produce', perishable: true },
      { name: 'Fresh ginger', qty: '20g piece', section: 'produce', perishable: true },
    ],
  },

  // ─── SEAFOOD ────────────────────────────────────────────────────────────────
  {
    id: 'fish-and-chips',
    name: 'Fish and Chips',
    category: 'Seafood',
    url: 'https://www.recipetineats.com.au/beer-battered-fish/',
    ingredients: [
      { name: 'White fish fillets', qty: '600g', section: 'seafood', perishable: true },
      { name: 'Potatoes', qty: '800g', section: 'produce', perishable: true },
      { name: 'Eggs', qty: '1', section: 'dairy', perishable: true },
      { name: 'Lemon', qty: '1', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'garlic-butter-prawns',
    name: 'Garlic Butter Prawns',
    category: 'Seafood',
    url: 'https://www.recipetineats.com.au/garlic-prawns/',
    ingredients: [
      { name: 'Raw prawns (peeled)', qty: '600g', section: 'seafood', perishable: true },
      { name: 'Butter', qty: '80g', section: 'dairy', perishable: true },
      { name: 'Garlic', qty: '5 cloves', section: 'produce', perishable: true },
      { name: 'Fresh parsley', qty: '1 small bunch', section: 'produce', perishable: true },
      { name: 'Lemon', qty: '1', section: 'produce', perishable: true },
      { name: 'Crusty bread', qty: '1 loaf', section: 'bakery', perishable: true },
    ],
  },
  {
    id: 'salmon-lemon-butter',
    name: 'Salmon with Lemon Butter Sauce',
    category: 'Seafood',
    url: 'https://www.recipetineats.com.au/pan-fried-salmon/',
    ingredients: [
      { name: 'Salmon fillets', qty: '4', section: 'seafood', perishable: true },
      { name: 'Butter', qty: '60g', section: 'dairy', perishable: true },
      { name: 'Lemon', qty: '1', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '2 cloves', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'fish-tacos',
    name: 'Fish Tacos',
    category: 'Seafood',
    url: 'https://www.recipetineats.com.au/fish-tacos/',
    ingredients: [
      { name: 'White fish fillets', qty: '500g', section: 'seafood', perishable: true },
      { name: 'Cabbage', qty: '1/4', section: 'produce', perishable: true },
      { name: 'Lime', qty: '2', section: 'produce', perishable: true },
      { name: 'Avocado', qty: '1', section: 'produce', perishable: true },
      { name: 'Sour cream', qty: '120g', section: 'dairy', perishable: true },
    ],
  },

  // ─── PASTA & NOODLES ────────────────────────────────────────────────────────
  {
    id: 'carbonara',
    name: 'Spaghetti Carbonara',
    category: 'Pasta & Noodles',
    url: 'https://www.recipetineats.com.au/pasta-carbonara/',
    ingredients: [
      { name: 'Bacon rashers', qty: '200g', section: 'meat', perishable: true },
      { name: 'Eggs', qty: '3', section: 'dairy', perishable: true },
      { name: 'Parmesan', qty: '80g', section: 'dairy', perishable: true },
    ],
  },
  {
    id: 'pesto-pasta',
    name: 'Pesto Pasta',
    category: 'Pasta & Noodles',
    url: 'https://www.recipetineats.com.au/pesto-pasta/',
    ingredients: [
      { name: 'Cherry tomatoes', qty: '250g punnet', section: 'produce', perishable: true },
      { name: 'Parmesan', qty: '50g', section: 'dairy', perishable: true },
      { name: 'Baby spinach', qty: '60g bag', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'tuna-pasta-bake',
    name: 'Tuna Pasta Bake',
    category: 'Pasta & Noodles',
    url: 'https://www.recipetineats.com.au/tuna-pasta-bake/',
    ingredients: [
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Celery', qty: '2 stalks', section: 'produce', perishable: true },
      { name: 'Cheddar cheese', qty: '1.5 cups shredded', section: 'dairy', perishable: true },
    ],
  },
  {
    id: 'pasta-primavera',
    name: 'Pasta Primavera',
    category: 'Pasta & Noodles',
    url: 'https://www.recipetineats.com.au/pasta-primavera/',
    ingredients: [
      { name: 'Zucchini', qty: '2', section: 'produce', perishable: true },
      { name: 'Asparagus', qty: '1 bunch', section: 'produce', perishable: true },
      { name: 'Cherry tomatoes', qty: '250g punnet', section: 'produce', perishable: true },
      { name: 'Thickened cream', qty: '200ml', section: 'dairy', perishable: true },
      { name: 'Parmesan', qty: '60g', section: 'dairy', perishable: true },
      { name: 'Garlic', qty: '2 cloves', section: 'produce', perishable: true },
    ],
  },

  // ─── ASIAN ──────────────────────────────────────────────────────────────────
  {
    id: 'chicken-fried-rice',
    name: 'Chicken Fried Rice',
    category: 'Asian',
    url: 'https://www.recipetineats.com.au/fried-rice/',
    ingredients: [
      { name: 'Chicken breast', qty: '400g', section: 'meat', perishable: true },
      { name: 'Eggs', qty: '2', section: 'dairy', perishable: true },
      { name: 'Frozen peas & corn', qty: '1 cup', section: 'produce', perishable: true },
      { name: 'Carrot', qty: '1', section: 'produce', perishable: true },
      { name: 'Spring onions', qty: '3', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '2 cloves', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'pad-thai',
    name: 'Pad Thai',
    category: 'Asian',
    url: 'https://www.recipetineats.com.au/pad-thai/',
    ingredients: [
      { name: 'Chicken breast', qty: '300g', section: 'meat', perishable: true },
      { name: 'Eggs', qty: '2', section: 'dairy', perishable: true },
      { name: 'Bean sprouts', qty: '100g', section: 'produce', perishable: true },
      { name: 'Spring onions', qty: '3', section: 'produce', perishable: true },
      { name: 'Lime', qty: '1', section: 'produce', perishable: true },
      { name: 'Fresh coriander', qty: '1 small bunch', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'teriyaki-chicken',
    name: 'Teriyaki Chicken',
    category: 'Asian',
    url: 'https://www.recipetineats.com.au/teriyaki-chicken/',
    ingredients: [
      { name: 'Chicken thighs', qty: '800g', section: 'meat', perishable: true },
      { name: 'Spring onions', qty: '2', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'japanese-curry',
    name: 'Japanese Chicken Curry',
    category: 'Asian',
    url: 'https://www.recipetineats.com.au/japanese-curry/',
    ingredients: [
      { name: 'Chicken thighs', qty: '600g', section: 'meat', perishable: true },
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Carrot', qty: '2', section: 'produce', perishable: true },
      { name: 'Potatoes', qty: '400g', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'kung-pao-chicken',
    name: 'Kung Pao Chicken',
    category: 'Asian',
    url: 'https://www.recipetineats.com.au/kung-pao-chicken/',
    ingredients: [
      { name: 'Chicken breast', qty: '500g', section: 'meat', perishable: true },
      { name: 'Capsicum', qty: '1', section: 'produce', perishable: true },
      { name: 'Spring onions', qty: '3', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '3 cloves', section: 'produce', perishable: true },
      { name: 'Fresh ginger', qty: '20g piece', section: 'produce', perishable: true },
    ],
  },

  // ─── MEXICAN ────────────────────────────────────────────────────────────────
  {
    id: 'chicken-tacos',
    name: 'Chicken Tacos',
    category: 'Mexican',
    url: 'https://www.recipetineats.com.au/chicken-tacos/',
    ingredients: [
      { name: 'Chicken breast', qty: '600g', section: 'meat', perishable: true },
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Capsicum', qty: '1', section: 'produce', perishable: true },
      { name: 'Avocado', qty: '1', section: 'produce', perishable: true },
      { name: 'Lime', qty: '1', section: 'produce', perishable: true },
      { name: 'Cheddar cheese', qty: '1 cup shredded', section: 'dairy', perishable: true },
      { name: 'Sour cream', qty: '200g', section: 'dairy', perishable: true },
    ],
  },
  {
    id: 'nachos',
    name: 'Nachos',
    category: 'Mexican',
    url: 'https://www.recipetineats.com.au/nachos/',
    ingredients: [
      { name: 'Beef mince', qty: '400g', section: 'meat', perishable: true },
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Avocado', qty: '1', section: 'produce', perishable: true },
      { name: 'Tomato', qty: '1', section: 'produce', perishable: true },
      { name: 'Cheddar cheese', qty: '1.5 cups shredded', section: 'dairy', perishable: true },
      { name: 'Sour cream', qty: '200g', section: 'dairy', perishable: true },
      { name: 'Lime', qty: '1', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'burrito-bowls',
    name: 'Burrito Bowls',
    category: 'Mexican',
    url: 'https://www.recipetineats.com.au/burrito-bowl/',
    ingredients: [
      { name: 'Chicken breast', qty: '600g', section: 'meat', perishable: true },
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Capsicum', qty: '2', section: 'produce', perishable: true },
      { name: 'Avocado', qty: '1', section: 'produce', perishable: true },
      { name: 'Lime', qty: '1', section: 'produce', perishable: true },
      { name: 'Sour cream', qty: '120g', section: 'dairy', perishable: true },
      { name: 'Cheddar cheese', qty: '1 cup shredded', section: 'dairy', perishable: true },
      { name: 'Fresh coriander', qty: '1 small bunch', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'quesadillas',
    name: 'Quesadillas',
    category: 'Mexican',
    url: 'https://www.recipetineats.com.au/chicken-quesadillas/',
    ingredients: [
      { name: 'Chicken breast', qty: '500g', section: 'meat', perishable: true },
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Capsicum', qty: '1', section: 'produce', perishable: true },
      { name: 'Cheddar cheese', qty: '1.5 cups shredded', section: 'dairy', perishable: true },
      { name: 'Sour cream', qty: '120g', section: 'dairy', perishable: true },
      { name: 'Avocado', qty: '1', section: 'produce', perishable: true },
    ],
  },

  // ─── VEGETARIAN ─────────────────────────────────────────────────────────────
  {
    id: 'vegetable-curry',
    name: 'Vegetable Curry',
    category: 'Vegetarian',
    url: 'https://www.recipetineats.com.au/vegetable-curry/',
    ingredients: [
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '3 cloves', section: 'produce', perishable: true },
      { name: 'Fresh ginger', qty: '20g piece', section: 'produce', perishable: true },
      { name: 'Sweet potato', qty: '500g', section: 'produce', perishable: true },
      { name: 'Baby spinach', qty: '60g bag', section: 'produce', perishable: true },
      { name: 'Cauliflower', qty: '1/2', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'lentil-soup',
    name: 'Lentil Soup',
    category: 'Vegetarian',
    url: 'https://www.recipetineats.com.au/lentil-soup/',
    ingredients: [
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Carrot', qty: '2', section: 'produce', perishable: true },
      { name: 'Celery', qty: '2 stalks', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '3 cloves', section: 'produce', perishable: true },
      { name: 'Baby spinach', qty: '60g bag', section: 'produce', perishable: true },
      { name: 'Lemon', qty: '1', section: 'produce', perishable: true },
    ],
  },
  {
    id: 'veggie-fried-rice',
    name: 'Veggie Fried Rice',
    category: 'Vegetarian',
    url: 'https://www.recipetineats.com.au/fried-rice/',
    ingredients: [
      { name: 'Eggs', qty: '3', section: 'dairy', perishable: true },
      { name: 'Frozen peas & corn', qty: '1 cup', section: 'produce', perishable: true },
      { name: 'Carrot', qty: '1', section: 'produce', perishable: true },
      { name: 'Brown onion', qty: '1', section: 'produce', perishable: true },
      { name: 'Spring onions', qty: '3', section: 'produce', perishable: true },
      { name: 'Garlic', qty: '2 cloves', section: 'produce', perishable: true },
    ],
  },
];

// Lookup map for quick access
export const RECIPE_MAP = Object.fromEntries(RECIPES.map((r) => [r.id, r]));

// Get recipes grouped by category
export function getRecipesByCategory() {
  const grouped = {};
  for (const cat of CATEGORIES) {
    grouped[cat] = RECIPES.filter((r) => r.category === cat);
  }
  return grouped;
}
