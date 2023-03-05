# @instill-ai/design-system

## [0.2.0](https://github.com/instill-ai/design-system/compare/@instill-ai/design-system-v0.1.3...@instill-ai/design-system-v0.2.0) (2023-03-05)


### Features

* add base tsconfig ([#122](https://github.com/instill-ai/design-system/issues/122)) ([1f43ad1](https://github.com/instill-ai/design-system/commit/1f43ad1fcb8d6fbd235b3bb8f323e6c33f5fdcb4))
* add dot lib ([#125](https://github.com/instill-ai/design-system/issues/125)) ([db21ee7](https://github.com/instill-ai/design-system/commit/db21ee76d88b9027ae833efe83350297fb62695b))
* refactor design-system to monorepo ([#112](https://github.com/instill-ai/design-system/issues/112)) ([49a7608](https://github.com/instill-ai/design-system/commit/49a7608822705ad54ec73259f93b5e41f760fcf3))
* update eslint config and make it a standalone package ([#116](https://github.com/instill-ai/design-system/issues/116)) ([d3bcb5b](https://github.com/instill-ai/design-system/commit/d3bcb5b671785c80c8c4ec3f7bc329c50737f759))
* update package config ([#114](https://github.com/instill-ai/design-system/issues/114)) ([0a84a34](https://github.com/instill-ai/design-system/commit/0a84a347529a36ca8e6b46c1c660a7e1644f0cf1))


### Bug Fixes

* fix build issue and re-release ([#118](https://github.com/instill-ai/design-system/issues/118)) ([d112a82](https://github.com/instill-ai/design-system/commit/d112a828620127f4c26dc47ed92ffbf484d4fa6b))

## 0.1.2

### Patch Changes

- d112a82: fix AccordionBase has non-interactive element with onClick handler issue, replease div element with button
- d112a82: fix duplicated import and non-interactive element lint issue
- d112a82: Adapt new eslint-config-cortex to simplify the workflow

## 0.1.2

### Patch Changes

- d3bcb5b: fix AccordionBase has non-interactive element with onClick handler issue, replease div element with button
- d3bcb5b: fix duplicated import and non-interactive element lint issue
- d3bcb5b: Adapt new eslint-config-cortex to simplify the workflow

## 0.1.1

### Patch Changes

- 0a84a34: Update the package.json config to make it public

## 0.1.0

### Minor Changes

- 49a7608: adapt monorepo structure and re-organize design-system

### Patch Changes

- 49a7608: Replace old deploy to staging workflow with purely lint and test workflow. Link this repo to vercel to simplify build/publish storybook step
