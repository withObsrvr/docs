# Shape Up Pitch: Stripe-Inspired Documentation Design

**Problem**: Our documentation lacks the polish and professionalism users expect from enterprise-grade developer tools. Users struggle to find information quickly and the visual presentation doesn't inspire confidence.

**Appetite**: 2 weeks

**Solution**: Transform Obsrvr docs to match Stripe's documentation quality using Docusaurus customization.

---

## Problem

Our current documentation uses the default Docusaurus theme with minimal customization. When developers evaluate Obsrvr for blockchain infrastructure, the documentation is their first impression. Currently, it looks like a side project rather than enterprise-grade tooling.

### Current Pain Points

1. **Visual hierarchy is weak** - Everything looks equally important
2. **No interactive search** - Standard Docusaurus search is basic
3. **Code examples lack polish** - No copy buttons, language switching, or live previews
4. **Homepage doesn't guide users** - Generic cards, no clear user journeys
5. **Navigation isn't contextual** - Same nav for beginners and advanced users

### What We're Not Doing

This is NOT a content rewrite. We're keeping all existing documentation. This is purely a design and UX enhancement layer on top of what exists.

---

## Appetite

**2 weeks** - Fixed time, variable scope. We ship what's done at the end of 2 weeks.

If we hit blockers, we cut features, not time.

---

## Solution

### Fat-Marker Sketch

Apply Stripe's design patterns to our Docusaurus site through custom CSS and components:

```
┌─────────────────────────────────────────────────┐
│  OBSRVR     [Search... (/) ] [Ask AI ✨]        │ ← Enhanced header
│                                                  │
│  Gateway | Flow | Tutorials | API Ref | Support │ ← Horizontal nav
├─────────────────────────────────────────────────┤
│                                                  │
│        Build on Stellar & Soroban               │ ← Hero section
│        with confidence                          │
│                                                  │
│   [Get started with Gateway →] [Explore Flow]   │ ← Clear CTAs
│                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌─────────┐ │
│  │ Quick start  │ │ API Keys     │ │ Pricing │ │ ← Guided paths
│  │ Guide        │ │ & Auth       │ │ & Limits│ │
│  └──────────────┘ └──────────────┘ └─────────┘ │
│                                                  │
└─────────────────────────────────────────────────┘
```

### Core Features (Scope Line)

#### MUST HAVE (Non-negotiable)
1. **Enhanced Search Modal** - Keyboard shortcut (/) with better UX
2. **Horizontal Navigation** - Replace default navbar with Stripe-style mega menu
3. **Code Block Polish** - Copy buttons, syntax highlighting improvements
4. **Custom Homepage** - Replace generic landing with guided user journeys
5. **Typography & Spacing** - Match Stripe's visual hierarchy

#### NICE TO HAVE (Try to include)
6. **Contextual Sidebar Sections** - "Just getting started?" boxes
7. **Interactive Code Previews** - Language switcher for examples
8. **Improved Mobile Experience** - Better responsive design
9. **Dark Mode Polish** - Refine dark theme colors to match Stripe
10. **Footer Enhancement** - Add helpful links and social proof

#### COULD HAVE (Cut first if needed)
11. **"Ask AI" Integration** - Placeholder for future AI chat
12. **Animated Transitions** - Smooth page transitions
13. **Version Selector** - Multi-version docs support
14. **Breadcrumbs** - Navigation breadcrumb trail

---

## Rabbit Holes

**Don't Do These** - Known time sinks that provide minimal value:

❌ **Custom MDX Components** - Avoid building complex interactive components. Use standard Docusaurus features.

❌ **Search Backend Replacement** - Keep Docusaurus's built-in search (Algolia DocSearch). Just style it better.

❌ **Complete Redesign** - Don't redesign the entire information architecture. Work with existing structure.

❌ **Mobile-First Rebuild** - Don't rebuild responsive layouts from scratch. Enhance what Docusaurus provides.

❌ **Animation Library** - Don't add heavy animation frameworks. Use CSS transitions only.

---

## No-Gos

**Explicitly Out of Scope:**

🚫 Content migration or rewriting
🚫 Adding new documentation sections
🚫 Backend/infrastructure changes
🚫 Multi-language support (i18n)
🚫 User authentication/accounts
🚫 Analytics beyond what exists
🚫 CDN or performance optimization
🚫 SEO improvements (keep existing)

---

## Done

**Concrete Success Example:**

A developer lands on docs.withobsrvr.com and immediately thinks "This looks as professional as Stripe." They can:

1. Press `/` and get a beautiful search modal
2. See clear navigation categories in the header
3. Click a code example and see a copy button
4. Choose their programming language for code samples
5. Navigate smoothly without UI jank
6. Read comfortably with proper typography
7. See contextual help boxes guiding them to next steps

**Acceptance Test:**
- Side-by-side screenshots of Stripe and Obsrvr docs look similar in polish
- All existing pages render correctly with new design
- Mobile viewport works smoothly
- Playwright tests all pass
- Deploy to production without breaking links

---

## Implementation Approach

### Technical Strategy

All changes through **Docusaurus customization only**:

1. **CSS Custom Properties** - Override Docusaurus CSS variables
2. **Component Swizzling** - Minimal swizzling for navbar, footer
3. **Custom CSS** - Add `src/css/custom.css` enhancements
4. **React Components** - Custom homepage component only

### Estimated Effort Breakdown

| Feature | Effort | Priority |
|---------|--------|----------|
| Typography & spacing | 4 hours | Must Have |
| Code block styling | 3 hours | Must Have |
| Search modal polish | 4 hours | Must Have |
| Horizontal navigation | 6 hours | Must Have |
| Custom homepage | 8 hours | Must Have |
| Contextual sections | 3 hours | Nice to Have |
| Language switcher | 4 hours | Nice to Have |
| Mobile refinements | 4 hours | Nice to Have |
| Dark mode polish | 3 hours | Nice to Have |
| Footer enhancement | 2 hours | Nice to Have |

**Total MUST HAVEs: 25 hours (~3 days)**
**Total NICE TO HAVEs: 16 hours (~2 days)**
**Buffer for testing/fixes: 3 days**

**Total: 8 working days fits in 2-week cycle**

---

## Risks & Mitigations

### Risk 1: Docusaurus Limitations
**Mitigation**: We've verified Docusaurus supports all MUST HAVE features through swizzling and CSS. We have escape hatch of dropping NICE TO HAVE features.

### Risk 2: Breaking Existing Docs
**Mitigation**: All changes are additive CSS/React. Content files unchanged. Playwright tests verify nothing breaks.

### Risk 3: Mobile Responsiveness
**Mitigation**: Use Docusaurus's existing responsive utilities. Test early and often with mobile viewport.

### Risk 4: Scope Creep
**Mitigation**: Strong scope line defined. Regular check-ins at 50% mark (Hill Chart).

---

## Hill Chart Progress Tracking

We'll track progress using the Shape Up hill:

**Left Side (Figuring It Out):**
- Understanding Docusaurus theming system
- Extracting Stripe's CSS patterns
- Prototyping navigation structure

**Right Side (Making It Happen):**
- Implementing CSS overrides
- Building custom components
- Testing across browsers
- Polishing details

**🚨 If stuck on left side at 50% time → CUT SCOPE immediately**

---

## Files Changed

Expected file additions/changes:

```
docs/
├── src/
│   ├── css/
│   │   └── custom.css          # MAJOR changes
│   ├── components/
│   │   ├── Homepage/           # NEW - Custom homepage
│   │   │   └── index.tsx
│   │   └── SearchModal/        # NEW - Enhanced search
│   │       └── index.tsx
│   ├── theme/                  # Swizzled components
│   │   ├── Navbar/             # MODIFIED
│   │   ├── Footer/             # MODIFIED
│   │   └── CodeBlock/          # MODIFIED
│   └── pages/
│       └── index.tsx           # MAJOR changes
├── docusaurus.config.js        # Minor theme config
└── package.json                # Possible new deps
```

---

## Comparison Analysis

### What Stripe Does Well (That We'll Adopt)

1. **Search UX**
   - Stripe: Keyboard shortcut `/`, modal overlay, suggestions
   - Obsrvr: Basic search
   - **Gap**: Need custom search modal component

2. **Navigation**
   - Stripe: Horizontal mega-menu, clear categories
   - Obsrvr: Vertical sidebar only
   - **Gap**: Need horizontal nav bar

3. **Code Blocks**
   - Stripe: Copy button, language tags, syntax colors
   - Obsrvr: Basic Prism highlighting
   - **Gap**: Need enhanced code block styling

4. **Typography**
   - Stripe: Perfect hierarchy, generous spacing, custom fonts
   - Obsrvr: Default Docusaurus fonts
   - **Gap**: Need custom CSS variables

5. **Homepage**
   - Stripe: User journey-driven, clear CTAs, categorized paths
   - Obsrvr: Generic cards
   - **Gap**: Need custom React homepage

6. **Visual Polish**
   - Stripe: Subtle patterns, shadows, hover states
   - Obsrvr: Flat design
   - **Gap**: Need CSS enhancements

---

## Next Steps After Approval

1. Create feature branch `feature/stripe-inspired-design`
2. Set up CSS variables for Stripe-like colors
3. Build custom homepage component
4. Implement horizontal navigation
5. Enhance code blocks
6. Polish search modal
7. Test on mobile
8. Ship to production

---

## Cool-Down Period

After this 2-week cycle, we take **3 days cool-down**:
- Fix any bugs discovered
- Gather user feedback
- Plan next iteration (if needed)
- No new big features

This prevents burnout and keeps code healthy.

---

## Decision Time

**Ready to bet on this?**

✅ Approve and we start the 2-week cycle
❌ Reject and we continue with current docs
⏸️ Shape further if unclear

**Questions to Answer:**
1. Is 2 weeks the right appetite?
2. Are the MUST HAVEs correct?
3. Are the NO-GOs clear?
4. Who will implement? (Solo or pair?)
