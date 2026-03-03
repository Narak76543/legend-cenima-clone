import template from "/home/runner/work/ui/ui/src/theme/kbd"

const variant = [
  "solid",
  "outline",
  "subtle"
] as const

const size = [
  "sm",
  "md",
  "lg"
] as const

const result = typeof template === 'function' ? (template as Function)({
  "prefix": "U",
  "fonts": true,
  "colorMode": true,
  "theme": {
    "colors": [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "error"
    ],
    "transitions": true
  }
}) : template

const theme = {
  "base": "inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans",
  "variants": {
    "variant": {
      "solid": "bg-inverted text-inverted",
      "outline": "bg-default text-highlighted ring ring-inset ring-accented",
      "subtle": "bg-elevated text-default ring ring-inset ring-accented"
    },
    "size": {
      "sm": "h-4 min-w-[16px] text-[10px]",
      "md": "h-5 min-w-[20px] text-[11px]",
      "lg": "h-6 min-w-[24px] text-[12px]"
    }
  },
  "defaultVariants": {
    "variant": "outline" as typeof variant[number],
    "size": "md" as typeof size[number]
  }
}

export default result as typeof theme