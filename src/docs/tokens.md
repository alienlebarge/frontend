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
