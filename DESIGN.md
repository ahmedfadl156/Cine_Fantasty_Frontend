# Design System: The Cinematic Editorial Standards

## 1. Overview & Creative North Star
**Creative North Star: "The Noir Archivist"**

This design system is a digital translation of a 1972 private screening room. It rejects the "app-like" conventions of modern SaaS in favor of high-end editorial layouts, reminiscent of a vintage Criterion Collection booklet or a prestige film program.

The aesthetic is built on **Organic Brutalism**: a juxtaposition of sharp, 0px radius geometry against the soft, humanistic curves of serif typography. By leveraging asymmetric layouts and intentional "dead space," we create a rhythm that feels curated rather than generated. We do not use grids to align; we use them to create tension.

---

## 2. Colors & Surface Philosophy
The palette is a study in "Warm Noir"—a collection of near-blacks and aged creams that mimic the silver halide chemistry of film stock.

### Color Tokens
- **Background (`#16130f`):** The deep, warm void of a darkened theater.
- **Surface & Containers:**
- `surface_container_lowest`: #110e0a (Deepest wells)
- `surface_container_low`: #1f1b16 (Standard sections)
- `surface_container_high`: #2d2924 (Elevated cards)
- **Primary / Accent (`#c8352a`):** "Cinema Red"—used sparingly for critical CTAs and "Live" indicators.
- **Typography:**
- `on_surface`: #EEE4D4 (Aged Cream) - Primary readability.
- `on_secondary_container`: #9C8E7E (Taupe) - Metadata and de-emphasized content.

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for defining sections. Structure must be achieved through:
1. **Tonal Shifting:** Transitioning from `surface` to `surface_container_low`.
2. **The Signature Divider:** A 1px line that terminates into text and resumes, using `outline_variant` at 20% opacity.
3. **Negative Space:** Large gutters (32px, 48px, 64px) to separate conceptual blocks.

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of physical cardstock. A `surface_container_high` card should sit atop a `surface_container_low` section. Because we use **0px border radius**, the distinction relies entirely on the subtle shift in hex value.

---

## 3. Typography
Typography is our primary tool for conveying "Cinema." We mix the intellectual rigor of a serif with the utilitarian precision of a typewriter.

- **Display & Headline (Cormorant Garamond):** Must be used in **Bold Italic** for titles. This is our "Editorial" voice. Use generous letter-spacing (tracking) for a premium feel.
- **UI & Labels (Outfit):** Set in Light or Medium weights. This provides the "Modern" functional layer. Never use Bold for Outfit; hierarchy is achieved through scale and color (Cream vs. Taupe), not weight.
- **Stats & Numbers (Courier Prime):** All financial data, timestamps, and seat numbers must use Monospace. It evokes the "Script" or "Ticket" feel of 1972.

---

## 4. Elevation & Depth
In this system, "Flat is Premium." We reject shadows and rounded corners entirely.

- **The Layering Principle:** Depth is "Z-indexed" through color. The darker the surface, the "further back" it sits. The lighter the surface, the "closer" it is to the user.
- **Zero Radius:** Every element—buttons, cards, inputs—must have a **0px border-radius**. Sharp corners imply a custom, architectural precision.
- **The Ghost Border:** For hover states or necessary containment, use the `outline` token at 10% opacity. It should be felt, not seen.
- **Intentional Asymmetry:** Avoid centering everything. If a headline is left-aligned, consider placing the body text in a 6-column span on the right side of a 12-column grid.

---

## 5. Components

### Buttons
- **Primary:** Background `primary_container` (#c8352a), Text `on_primary`. Sharp corners. No icons unless strictly functional.
- **Secondary:** Transparent background, `on_surface` text, 1px "Ghost Border."
- **Interaction:** On hover, shift the background to `surface_bright`. Transition should be a cinematic 300ms fade.

### The "Film Strip" Card
- **Structure:** `surface_container_high` background. No borders.
- **Header:** Use `display-sm` (Cormorant Garamond Bold Italic).
- **Metadata:** Use `label-md` (Courier Prime) in Taupe.
- **Rule:** Forbid the use of divider lines inside cards. Use 24px vertical padding to separate elements.

### Inputs & Fields
- **Styling:** Underline only. No "box" inputs.
- **Focus State:** The underline shifts from `outline_variant` to `primary` (Cinema Red).
- **Typography:** Input text must be `body-lg` Outfit Light.

### Signature Dividers
A custom component consisting of a 1px `outline_variant` line, interrupted by a `label-sm` (Courier Prime) text element, followed by the line continuing.
*Example: —————— SESSION 01 ——————*

---

## 6. Do's and Don'ts

### Do:
- **Do** use "Dead Space." Let elements breathe with exaggerated margins.
- **Do** use Cormorant Garamond for any text that is "Storytelling" (e.g., film descriptions, member bios).
- **Do** use Courier Prime for "Data" (e.g., $ Profit, Loss, Dates, Durations).
- **Do** overlap elements. An image can bleed off the edge of a container to create a "collage" feel.

### Don't:
- **Don't** use border-radius. Ever.
- **Don't** use drop shadows. If you need separation, use a 1-tone color shift.
- **Don't** use standard "Success" green or "Error" red. Use our specific `muted forest` (#4E9268) and `burnt sienna` (#A85A3A) to maintain the 1970s tonal range.
- **Don't** center-align long-form editorial content. Keep it left-justified for a "Book" feel.