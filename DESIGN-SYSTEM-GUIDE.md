# Design System Usage Guide

## Quick Reference

### Colors

```tsx
// Backgrounds
bg-background         // #16130f - Deep theater void
bg-surface-container-lowest  // #110e0a - Deepest wells
bg-surface-container-low     // #1f1b16 - Standard sections
bg-surface-container-high    // #2d2924 - Elevated cards
bg-surface-bright    // #3d3832 - Hover states

// Accent
text-primary / bg-primary  // #c8352a - Cinema Red (use sparingly)

// Typography
text-on-surface            // #EEE4D4 - Aged cream (primary text)
text-on-secondary-container // #9C8E7E - Taupe (metadata)
```

### Typography

```tsx
// Display & Headlines - Cormorant Garamond (Bold Italic)
<h1 className="font-display font-bold italic">The Film Title</h1>

// UI & Body - Outfit (Light/Medium)
<p className="font-ui font-light">Description text</p>

// Numbers & Data - Courier Prime
<span className="font-mono">$1,234.56</span>
<span className="font-mono">14:30:00</span>
```

### Components

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SignatureDivider } from "@/components/ui/signature-divider"

// Primary Button (Cinema Red)
<Button variant="default">Book Tickets</Button>

// Secondary Button (Ghost Border)
<Button variant="outline">Learn More</Button>

// Film Strip Card
<Card>
  <CardHeader>
    <CardTitle>The Godfather</CardTitle>
    <CardDescription>1972 • Crime Drama</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="font-ui font-light">A compelling story...</p>
  </CardContent>
</Card>

// Underline Input
<Input placeholder="Enter email..." />

// Signature Divider
<SignatureDivider label="SESSION 01" />
```

### Utilities

```tsx
// Dead Space (generous margins)
<div className="dead-space-lg">Content</div>

// Cinematic Transition (300ms fade)
<div className="cinematic-transition hover:bg-surface-bright">Hover me</div>

// Ghost Border (felt, not seen)
<div className="ghost-border">Subtle containment</div>
```

## Key Rules

1. **No Border Radius** - Everything is sharp (0px)
2. **No Drop Shadows** - Use tonal shifting for depth
3. **No Standard Grids** - Use asymmetric layouts
4. **Generous Spacing** - 32px, 48px, 64px gutters
5. **Cormorant for Storytelling** - Titles, descriptions
6. **Courier for Data** - Prices, times, seat numbers
7. **Cinema Red Sparingly** - Only critical CTAs
