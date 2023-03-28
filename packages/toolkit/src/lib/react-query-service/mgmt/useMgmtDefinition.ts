import { useQuery } from "@tanstack/react-query";
import { listRepoFileContent } from "../../github";

export const useMgmtDefinition = ({ enable }: { enable: boolean }) => {
  return useQuery(
    ["mgmt", "encoded-definition"],
    async (): Promise<string> => {
      const { content } = await listRepoFileContent(
        "instill-ai",
        "mgmt-backend",
        "config/models/user.json"
      );

      const decode = window.atob(content);
      return Promise.resolve(decode);
    },
    {
      retry: 3,
      enabled: enable,
    }
  );
};
