import { Nullable } from "../type";
import {
  DestinationComponent,
  ModelComponent,
  PipelineRecipe,
  SourceComponent,
} from "../vdp-sdk";

export type getComponentFromPipelineRecipeProps = {
  recipe: PipelineRecipe;
  componentName: "source" | "model" | "destination";
};

export type GetComponentFromPipelineRecipeReturn<T> = T extends "source"
  ? Nullable<SourceComponent>
  : T extends "model"
  ? Nullable<ModelComponent[]>
  : T extends "destination"
  ? Nullable<DestinationComponent>
  : null;

export function getComponentFromPipelineRecipe<
  T extends getComponentFromPipelineRecipeProps
>(props: T): GetComponentFromPipelineRecipeReturn<T["componentName"]> {
  const { recipe, componentName } = props;
  switch (componentName) {
    case "source": {
      const component = (recipe.components.find(
        (e) => e.resource_name.split("/")[0] === "source-connectors"
      ) || null) as GetComponentFromPipelineRecipeReturn<T["componentName"]>;

      return component;
    }

    case "destination": {
      const component = (recipe.components.find(
        (e) => e.resource_name.split("/")[0] === "destination-connectors"
      ) || null) as GetComponentFromPipelineRecipeReturn<T["componentName"]>;

      return component;
    }

    case "model": {
      const component = (recipe.components.filter(
        (e) => e.resource_name.split("/")[0] === "models"
      ) || null) as GetComponentFromPipelineRecipeReturn<T["componentName"]>;

      return component;
    }

    default:
      return null as GetComponentFromPipelineRecipeReturn<T["componentName"]>;
  }
}
