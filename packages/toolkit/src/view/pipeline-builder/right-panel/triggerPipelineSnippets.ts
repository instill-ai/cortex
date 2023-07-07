export const syncCloud = `// Please put your data to the appropriate field based on its data type:
//   - "texts": an array containing your text data to be processed
//   - "images": an array containing your image data to be processed
//   - "metadata": a JSON object containing metadata for the data to be processed

curl -X POST {vdp-pipeline-base-url}/v1alpha/pipelines/{pipeline-id}/triggerSync \
  -H 'Authorization: Bearer <YOUR_API_TOKEN>' -d '{
  "inputs": [
    {
      "texts": [
        "once upon a time"
      ],
      "images": [
        {
          "url": "https://artifacts.instill.tech/imgs/dog.jpg"
        }
      ],
      "metadata": {}
    }
  ]
}'
`;

export const syncCE = `// Please put your data to the appropriate field based on its data type:
//   - "texts": an array containing your text data to be processed
//   - "images": an array containing your image data to be processed
//   - "metadata": a JSON object containing metadata for the data to be processed

curl -X POST {vdp-pipeline-base-url}/v1alpha/pipelines/{pipeline-id}/triggerSync -d '{
  "inputs": [
    {
      "texts": [
        "once upon a time"
      ],
      "images": [
        {
          "url": "https://artifacts.instill.tech/imgs/dog.jpg"
        }
      ],
      "metadata": {}
    }
  ]
}'
`;

export const asyncCloud = `// Please put your data to the appropriate field based on its data type:
//   - "texts": an array containing your text data to be processed
//   - "images": an array containing your image data to be processed
//   - "metadata": a JSON object containing metadata for the data to be processed
curl -X POST {vdp-pipeline-base-url}/v1alpha/pipelines/{pipeline-id}/triggerAsync \
  -H 'Authorization: Bearer <YOUR_API_TOKEN>' -d '{
  "inputs": [
    {
      "texts": [
        "once upon a time"
      ],
      "images": [
        {
          "url": "https://artifacts.instill.tech/imgs/dog.jpg"
        }
      ],
      "metadata": {}
    }
  ]
}'
`;

export const asyncCE = `// Please put your data to the appropriate field based on its data type:
//   - "texts": an array containing your text data to be processed
//   - "images": an array containing your image data to be processed
//   - "metadata": a JSON object containing metadata for the data to be processed
curl -X POST {vdp-pipeline-base-url}/v1alpha/pipelines/{pipeline-id}/triggerAsync -d '{
  "inputs": [
    {
      "texts": [
        "once upon a time"
      ],
      "images": [
        {
          "url": "https://artifacts.instill.tech/imgs/dog.jpg"
        }
      ],
      "metadata": {}
    }
  ]
}'
`;
