# Stripe Documentation Design Analysis

> Reference screenshots captured: 2025-11-28
> Source: https://docs.stripe.com/

## Visual Design Language

### Color Palette

**Primary Colors:**
- Background: `#FAFAFA` (very light gray)
- Text Primary: `#0A2540` (dark navy)
- Text Secondary: `#425466` (gray)
- Links: `#635BFF` (Stripe purple/blue)
- Links Hover: `#0074D4` (blue)
- Accent: `#00D924` (green for success)

**Surface Colors:**
- Card Background: `#FFFFFF` (white)
- Code Background: `#0A2540` (dark navy)
- Sidebar Background: `#F6F9FC` (very light blue-gray)
- Border: `#E3E8EE` (light gray)

**Shadows:**
- Subtle: `0 1px 3px rgba(0,0,0,0.04)`
- Card: `0 2px 8px rgba(0,0,0,0.08)`
- Modal: `0 8px 32px rgba(0,0,0,0.12)`

### Typography

**Font Stack:**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Ubuntu, sans-serif;
```

**Font Sizes:**
- Hero H1: `48px` / `3rem` - Bold
- H1: `32px` / `2rem` - Bold
- H2: `24px` / `1.5rem` - Semibold
- H3: `20px` / `1.25rem` - Semibold
- Body: `16px` / `1rem` - Regular
- Small: `14px` / `0.875rem` - Regular
- Code: `14px` / `0.875rem` - Monospace

**Line Heights:**
- Headings: `1.2`
- Body: `1.6`
- Code: `1.4`

**Letter Spacing:**
- Headings: `-0.02em`
- Body: `0`
- Uppercase: `0.05em`

### Spacing System

**8px Base Unit:**
- XS: `4px` (0.5 units)
- S: `8px` (1 unit)
- M: `16px` (2 units)
- L: `24px` (3 units)
- XL: `32px` (4 units)
- 2XL: `48px` (6 units)
- 3XL: `64px` (8 units)

**Component Spacing:**
- Paragraph margin: `16px`
- Section margin: `48px`
- Card padding: `24px`
- Code block padding: `16px`
- Button padding: `12px 24px`

### Component Patterns

#### 1. Navigation Header

**Structure:**
```
┌────────────────────────────────────────────────────┐
│ Logo  [Search (/)]  [Ask AI]         Links  Auth  │
│                                                     │
│ Category1 | Category2 | Category3 | Category4      │
└────────────────────────────────────────────────────┘
```

**Specifications:**
- Height: `60px` (top bar)
- Background: White with subtle bottom border
- Search bar: Rounded, light gray background
- Keyboard hint: Monospace, light gray text
- Categories: Horizontal scroll on mobile

**CSS Properties:**
```css
.navbar {
  background: #FFFFFF;
  border-bottom: 1px solid #E3E8EE;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-input {
  background: #F6F9FC;
  border: 1px solid #E3E8EE;
  border-radius: 6px;
  padding: 8px 12px 8px 36px;
  width: 240px;
}

.search-input::placeholder {
  color: #8898AA;
}
```

#### 2. Search Modal

**Structure:**
```
┌──────────────────────────────────────┐
│  🔍 Search or ask a question     ✕  │
├──────────────────────────────────────┤
│  Suggested                           │
│  📄 View test cards                  │
│  🔍 Search code examples             │
└──────────────────────────────────────┘
```

**Specifications:**
- Width: `600px` max
- Backdrop: `rgba(0,0,0,0.5)`
- Border-radius: `12px`
- Shadow: Large, soft
- Animation: Fade in + scale

**CSS Properties:**
```css
.search-modal {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  max-width: 600px;
  width: 90vw;
}

.search-input-large {
  border: none;
  border-bottom: 1px solid #E3E8EE;
  font-size: 18px;
  padding: 20px;
}

.search-suggestions {
  padding: 12px;
}

.suggestion-item {
  border-radius: 6px;
  padding: 12px;
  transition: background 0.2s;
}

.suggestion-item:hover {
  background: #F6F9FC;
}
```

#### 3. Code Blocks

**Structure:**
```
┌─────────────────────────────────────┐
│ Frontend: HTML ▼  Backend: Ruby ▼  │
├─────────────────────────────────────┤
│ 1  require 'stripe'                 │
│ 2  require 'sinatra'                │
│ 3                                   │
│ 4  Stripe.api_key = 'sk_test_...'   │
│ ...                                 │
├─────────────────────────────────────┤
│                         [Download ↓]│
└─────────────────────────────────────┘
```

**Specifications:**
- Background: Dark navy `#0A2540`
- Text: Light colors for syntax
- Line numbers: Dim gray
- Language selector: Tabs above
- Copy/Download: Right-aligned buttons
- Border-radius: `8px`

**CSS Properties:**
```css
.code-block-wrapper {
  background: #0A2540;
  border-radius: 8px;
  margin: 24px 0;
  overflow: hidden;
}

.code-block-header {
  align-items: center;
  background: rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
}

.language-tabs {
  display: flex;
  gap: 8px;
}

.language-tab {
  border-radius: 4px;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  padding: 6px 12px;
}

.language-tab.active {
  background: rgba(255,255,255,0.1);
  color: #FFFFFF;
}

.code-content {
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.4;
  overflow-x: auto;
  padding: 16px;
}

.copy-button {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 4px;
  color: rgba(255,255,255,0.7);
  padding: 6px 12px;
  transition: all 0.2s;
}

.copy-button:hover {
  background: rgba(255,255,255,0.1);
  color: #FFFFFF;
}
```

#### 4. Sidebar Navigation

**Structure:**
```
┌────────────────────┐
│ 🔍 Find anything   │
├────────────────────┤
│ Introduction       │← Active
│ Authentication     │
│ Connected Accounts │
│ Errors             │
│                    │
│ ▼ Core Resources   │← Collapsible
│   Balance          │
│   Charges          │
│   Customers        │
└────────────────────┘
```

**Specifications:**
- Width: `240px`
- Background: `#F6F9FC`
- Active item: Highlighted with border
- Nested indent: `16px` per level
- Sticky positioning

**CSS Properties:**
```css
.sidebar {
  background: #F6F9FC;
  border-right: 1px solid #E3E8EE;
  height: calc(100vh - 60px);
  overflow-y: auto;
  position: sticky;
  top: 60px;
  width: 240px;
}

.sidebar-search {
  border-bottom: 1px solid #E3E8EE;
  padding: 16px;
}

.sidebar-nav {
  padding: 16px 0;
}

.nav-item {
  border-left: 3px solid transparent;
  color: #425466;
  display: block;
  padding: 8px 16px;
  transition: all 0.15s;
}

.nav-item:hover {
  background: rgba(99,91,255,0.05);
  color: #635BFF;
}

.nav-item.active {
  border-left-color: #635BFF;
  color: #0A2540;
  font-weight: 600;
}

.nav-section-title {
  color: #8898AA;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin: 16px 16px 8px;
  text-transform: uppercase;
}
```

#### 5. Content Cards

**Structure:**
```
┌────────────────────────────┐
│  Icon                      │
│                            │
│  Card Title                │
│  Brief description text... │
│                            │
│  → Learn more              │
└────────────────────────────┘
```

**Specifications:**
- Background: White
- Border: 1px solid light gray
- Border-radius: `12px`
- Padding: `24px`
- Hover: Slight lift with shadow
- Icon: 48px, colored

**CSS Properties:**
```css
.content-card {
  background: #FFFFFF;
  border: 1px solid #E3E8EE;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.2s ease;
}

.content-card:hover {
  border-color: #C8D1DD;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}

.card-icon {
  height: 48px;
  margin-bottom: 16px;
  width: 48px;
}

.card-title {
  color: #0A2540;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.card-description {
  color: #425466;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.card-link {
  align-items: center;
  color: #635BFF;
  display: inline-flex;
  font-size: 14px;
  font-weight: 500;
  gap: 4px;
}

.card-link:hover {
  color: #0074D4;
}
```

#### 6. Callout Boxes

**Types:**

**Info Box:**
```css
.callout-info {
  background: #F6F9FC;
  border-left: 3px solid #635BFF;
  border-radius: 4px;
  padding: 16px;
}
```

**Success Box:**
```css
.callout-success {
  background: #F0FDF4;
  border-left: 3px solid #00D924;
  border-radius: 4px;
  padding: 16px;
}
```

**Warning Box:**
```css
.callout-warning {
  background: #FFF7ED;
  border-left: 3px solid #FF9800;
  border-radius: 4px;
  padding: 16px;
}
```

#### 7. Buttons

**Primary Button:**
```css
.btn-primary {
  background: #635BFF;
  border: none;
  border-radius: 6px;
  color: #FFFFFF;
  font-weight: 600;
  padding: 12px 24px;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #4E47CC;
  transform: translateY(-1px);
}
```

**Secondary Button:**
```css
.btn-secondary {
  background: transparent;
  border: 1px solid #E3E8EE;
  border-radius: 6px;
  color: #0A2540;
  font-weight: 600;
  padding: 12px 24px;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: #635BFF;
  color: #635BFF;
}
```

### Animation & Transitions

**Timing Functions:**
- Default: `ease` (0.25, 0.1, 0.25, 1)
- Smooth: `cubic-bezier(0.4, 0, 0.2, 1)`
- Bounce: `cubic-bezier(0.34, 1.56, 0.64, 1)`

**Durations:**
- Fast: `150ms` (hover states)
- Medium: `200ms` (most transitions)
- Slow: `300ms` (page transitions)

**Common Transitions:**
```css
/* Hover lift */
transition: transform 0.2s ease, box-shadow 0.2s ease;

/* Color change */
transition: color 0.15s ease, background-color 0.15s ease;

/* Modal fade in */
animation: fadeIn 0.2s ease;

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Responsive Breakpoints

```css
/* Mobile first approach */
--breakpoint-sm: 640px;   /* Phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Desktop */
--breakpoint-2xl: 1536px; /* Large desktop */
```

**Mobile Adaptations:**
- Horizontal nav → Hamburger menu
- Sidebar → Slide-out drawer
- 3-column → 1-column
- Search bar → Icon only
- Font sizes → -2px

### Dark Mode

**Color Adjustments:**
```css
[data-theme='dark'] {
  --bg-primary: #0A2540;
  --bg-secondary: #1A3555;
  --text-primary: #FFFFFF;
  --text-secondary: #8898AA;
  --border: #2D4B6B;
  --code-bg: #1A1F36;
}
```

**Contrast Ratios:**
- Normal text: 7:1 minimum
- Large text: 4.5:1 minimum
- UI elements: 3:1 minimum

### Accessibility

**Focus States:**
```css
*:focus-visible {
  outline: 2px solid #635BFF;
  outline-offset: 2px;
}
```

**Skip Links:**
```css
.skip-link {
  left: -9999px;
  position: absolute;
  z-index: 999;
}

.skip-link:focus {
  background: #635BFF;
  color: white;
  left: 6px;
  padding: 12px;
  top: 6px;
}
```

**ARIA Labels:**
- All interactive elements labeled
- Dynamic content announced
- Form validation messages
- Loading states communicated

---

## Implementation Checklist

### Phase 1: Foundation (Day 1-2)
- [ ] Set up CSS custom properties
- [ ] Define color palette variables
- [ ] Configure typography system
- [ ] Set up spacing scale
- [ ] Add font imports

### Phase 2: Components (Day 3-5)
- [ ] Enhanced navigation header
- [ ] Search modal component
- [ ] Code block enhancements
- [ ] Sidebar styling
- [ ] Content cards
- [ ] Callout boxes
- [ ] Button styles

### Phase 3: Pages (Day 6-7)
- [ ] Custom homepage
- [ ] Content page templates
- [ ] API reference layout
- [ ] Guide layouts

### Phase 4: Polish (Day 8-10)
- [ ] Animations and transitions
- [ ] Mobile responsive
- [ ] Dark mode refinement
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Performance check

---

## Key Takeaways

1. **Consistency is key** - Every component follows the same spacing/color system
2. **Typography creates hierarchy** - Clear size/weight differences guide the eye
3. **Subtle animations add polish** - Small hover effects make it feel alive
4. **White space matters** - Generous padding prevents cramped feeling
5. **Accessibility is built-in** - Not an afterthought
6. **Mobile is equal priority** - Not just responsive, but thoughtfully adapted
7. **Performance matters** - Fast page loads, smooth scrolling
8. **Details matter** - Border radius, shadows, hover states all carefully considered

