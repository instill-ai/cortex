import { Nullable } from "../../type";
import {
  getDestinationDefinitionQuery,
  getDestinationQuery,
  getModelInstanceQuery,
  getSourceDefinitionQuery,
  getSourceQuery,
  ModelInstance,
  PipelineRecipe,
  RawPipelineRecipe,
} from "../../vdp-sdk";

export const constructPipelineRecipeWithDefinition = async ({
  accessToken,
  rawRecipe,
}: {
  rawRecipe: RawPipelineRecipe;
  accessToken: Nullable<string>;
}): Promise<PipelineRecipe> => {
  try {
    const source = await getSourceQuery({
      sourceName: rawRecipe.source,
      accessToken,
    });
    const sourceDefinition = await getSourceDefinitionQuery({
      sourceDefinitionName: source.source_connector_definition,
      accessToken,
    });
    const destination = await getDestinationQuery({
      destinationName: rawRecipe.destination,
      accessToken,
    });
    const destinationDefinition = await getDestinationDefinitionQuery({
      destinationDefinitionName: destination.destination_connector_definition,
      accessToken,
    });
    const instances: ModelInstance[] = [];

    for (const modelInstanceName of rawRecipe.model_instances) {
      const modelInstance = await getModelInstanceQuery({
        modelInstanceName,
        accessToken,
      });
      instances.push(modelInstance);
    }

    const recipe: PipelineRecipe = {
      source: { ...source, source_connector_definition: sourceDefinition },
      destination: {
        ...destination,
        destination_connector_definition: destinationDefinition,
      },
      models: instances,
    };

    return Promise.resolve(recipe);
  } catch (err) {
    return Promise.reject(err);
  }
};
