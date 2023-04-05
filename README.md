# instill-ai/cortex

This is the repo that stores various functions/components, used across instill-ai open-source projects and cloud-version apps.

- 🏖️ cortext/ui: The main design-system that we are using, we store all the basic/low-level components here. You can read our philosophy toward a design system [here](/packages/ui/README.md)
- 🗼 cortext/view: We store all the reusable high-level components here.
- 🧰 cortext/toolkit: We store universal types and functions here
  - query: Instill API react-query wrapper
  - sdk: Instill API Axios wrapper and typescript type related to the requests/responses of the API
  - hook: React hooks
  - type: General Typescript types that we are using


## Notice

- When digesting the toolkit ModelReadmeMarkdown, you need to provide the stylesheet that starts from the markdown-body class