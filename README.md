# instill-ai/cortex

This is the repo that stores various functions/components, used across instill-ai open-source projects and cloud-version apps.

- 🏖️ cortext/ui: The main design-system that we are using, we store all the basic/low-level components here. You can read our philosophy toward a design system [here](/packages/ui/README.md)
- 🗼 cortext/view: We store all the reusable high-level components here.
- 🧰 cortext/toolkit: We store universal types and functions here
  - query: Instill API react-query wrapper
  - sdk: Instill API Axios wrapper and typescript type related to the requests/responses of the API
  - hook: React hooks
  - type: General Typescript types that we are using



## Caveats

If you encounter some error like this, and the target file may not need to be covered by tsconfig. Please put the file into `.eslintignore`

```
/Users/summerbud/Documents/instill-ai/design-system/packages/design-tokens/vitest.config.ts
  0:0  error  Parsing error: ESLint was configured to run on `<tsconfigRootDir>/vitest.config.ts` using `parserOptions.project`: /users/summerbud/documents/instill-ai/design-system/packages/design-tokens/tsconfig.json
However, that TSConfig does not include this file. Either:
```