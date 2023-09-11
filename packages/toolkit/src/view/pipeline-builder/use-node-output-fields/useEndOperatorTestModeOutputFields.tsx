/* eslint-disable  @typescript-eslint/no-explicit-any */

import * as React from "react";
import { OpenAPIV3 } from "openapi-types";

import { TextField } from "./TextField";
import { TextsField } from "./TextsField";
import { ImageField } from "./ImageField";
import { ImagesField } from "./ImagesField";
import { NumberField } from "./NumberField";
import { NumbersField } from "./NumbersField";
import { Nullable, TriggerUserPipelineResponse } from "../../../lib";
import {
  InstillAIOpenAPIProperty,
  getPropertiesFromOpenAPISchema,
} from "../lib";
import { getPipelineInputOutputSchema } from "../lib/getPipelineInputOutputSchema";

export function useEndOperatorTestModeOutputFields(
  openAPISchema: Nullable<OpenAPIV3.Document>,
  outputs: TriggerUserPipelineResponse["outputs"]
) {
  const fields = React.useMemo(() => {
    let outputProperties: InstillAIOpenAPIProperty[] = [];
    const fields: React.ReactElement[] = [];

    if (!openAPISchema) {
      return [];
    }

    const { outputSchema } = getPipelineInputOutputSchema(openAPISchema);

    if (outputSchema) {
      outputProperties = getPropertiesFromOpenAPISchema(outputSchema);
    }

    // This component will only be displayed under test mode, and under test
    // /view-only mode, we will display user defined title as title.

    for (const property of outputProperties) {
      let value: any = null;
      const title = property.title ? property.title : property.path ?? null;

      if (outputs[0]) {
        value = property.path ? outputs[0][property.path] : null;
      }

      switch (property.instillFormat) {
        case "text": {
          fields.push(
            <TextField
              nodeType="end"
              key={property.path}
              title={title}
              text={value}
            />
          );
          break;
        }
        case "text_array": {
          fields.push(
            <TextsField
              nodeType="end"
              key={property.path}
              title={title}
              texts={value}
            />
          );
          break;
        }
        case "image": {
          fields.push(
            <ImageField
              nodeType="end"
              key={property.path}
              title={title}
              image={value}
            />
          );
          break;
        }
        case "image_array": {
          fields.push(
            <ImagesField
              nodeType="end"
              key={property.path}
              title={title}
              images={value}
            />
          );
          break;
        }
        case "number": {
          fields.push(
            <NumberField
              nodeType="end"
              key={property.path}
              title={title}
              number={value}
            />
          );
          break;
        }
        case "number_array": {
          fields.push(
            <NumbersField
              nodeType="end"
              key={property.path}
              title={title}
              numbers={value}
            />
          );
          break;
        }
      }
    }

    return fields;
  }, [openAPISchema, outputs]);

  return fields;
}
