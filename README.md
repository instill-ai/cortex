# Instill Design System

This is Instill's design system(WIP).

## Philosophy

- Design system expose different style of component but all inhert a component base.
- When it comes to using component, you only need to decide two things
  - Action
  - Style

## Rules

- We won't export any of xxBase component, they will only be used inside design-system repo.
- Every compnent should be export and use like below

```js
import { EyeIcon } from "design-system/components/Icons";
import { BasicTextField } from "design-system/components/Textfields";
```
