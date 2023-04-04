import { Nullable } from "../../type";
import {
  getDestinationDefinitionQuery,
  getDestinationQuery,
  getModelQuery,
  getSourceDefinitionQuery,
  getSourceQuery,
  type Model,
  type PipelineRecipe,
  type RawPipelineRecipe,
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
    const models: Model[] = [];

    for (const modelName of rawRecipe.models) {
      const model = await getModelQuery({
        modelName,
        accessToken,
      });
      models.push(model);
    }

    const recipe: PipelineRecipe = {
      source: { ...source, source_connector_definition: sourceDefinition },
      destination: {
        ...destination,
        destination_connector_definition: destinationDefinition,
      },
      models,
    };

    return Promise.resolve(recipe);
  } catch (err) {
    return Promise.reject(err);
  }
};
