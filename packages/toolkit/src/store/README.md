## About the stores

We are still experimenting with how to set up a proper Zustand store.

Right now the plan will be the implementation like [useConfigureProfileFormStore](./useConfigureModelFormStore.ts). We use Zod to form the schema of the store, infer the typescript types from the schema and verify the form state in runtime.

[WIP] Other stores still need to be refactored to represent this idea. 