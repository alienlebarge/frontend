---
title: "Design tokens"
label: "Design tokens"
---
[Design tokens](https://medium.com/eightshapes-llc/25dd82d58421) are named entities that store visual design information. These are used in place of hard-coded values (such as hex values for color or pixels for spacing) in order to maintain a scalable, consistent system for UI development.

## Colour Palettes
{% for palette, values in colors %}
**{{ palette | capitalize }}** palette values. Accessed via `map(colors, {{ palette }}, <key>)`
{% include "@palette-sample" %}
{% endfor %}

## Borders
Width and radius tokens are used to style element borders. Accessed via `map(borders, <key>)`.

{% for properties, values in borders %}
### {{ properties | capitalize }}
Accessed via `map(borders, {{ properties }}, <key>)`.

Key         | Value
------------|------------
{% for key, value in values -%}
`{{ key }}` | {{ value }}
{% endfor -%}
{% endfor -%}

## Breakpoints
Breakpoint tokens are used within `@media` queries. Accessed via `map(breakpoints, <key>)`.

Key         | Value
------------|------------
{% for key, value in breakpoints -%}
`{{ key }}` | {{ value }}
{% endfor -%}

## Font families
Font family tokens are used for typographic styling. Accessed via `map(fonts, <key>)`.

Key         | Value
------------|------------
{% for key, value in fonts -%}
`{{ key }}` | <span style="font: 1.25em/1 {{ value }}">{{ value }}</span>
{% endfor -%}

## Spacing
Spacing tokens describe the distance between elements. Accessed via `map(spaces, <key>)`.

Key         | Value
------------|------------
{% for key, value in spaces -%}
`{{ key }}` | {{ value }}
{% endfor -%}
