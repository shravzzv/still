// constants\styling.ts

export const colors = {
  surface: '#F6F4EF',
  primary: '#111827',
  muted: '#6B7280',
  accent: '#6F8196',
  border: '#E5E7EB',
}

export const typography = {
  body: 'Inter_400Regular',
  heading: 'Inter_600SemiBold',
  display: 'Inter_900Black',
}

// Tailwind adapter layer
export const fontFamily: Record<string, [string]> = {
  sans: [typography.body],
  medium: [typography.heading],
  bold: [typography.display],
}

/**
 *
 */
