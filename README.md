# Instill Design System

This is Instill's design system(WIP).

## Philosophy

- Design system expose different style of component but all inhert a component base.
- When it comes to using component, you only need to decide two things
  - Action
  - Style

## The usage of TailwindCSS

Normally, a design-system won't restrict which css framework you use, they expose props with specific string and conditionally render the style depend on the input props. But this may cause the component have lots of condition code, which may lead to oversize issue. To solve this problem, this design system use two solutions.

1. TailwindCSS centric: We utilize TailwindCSS Just-In-Time feature to get rid of condition rendering style with specific props, which reduce the size of the component.
2. We Modularize Base Component, every exposed component will inherit some sort of base component, we will limit the style to avoid some style confusion caused by TailwindCSS Just-In-Time feature.

## Rules

### Testing

- Every base level component need to have related test suite

### Import and Export

- We won't export any of xxBase component, they will only be used inside design-system repo.
- Every compnent should be export and use like below

```js
import { EyeIcon } from "design-system/components/Icons";
import { BasicTextField } from "design-system/components/Textfields";
```
