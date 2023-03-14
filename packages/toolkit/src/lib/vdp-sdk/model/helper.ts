import { Nullable } from "../../type";
import { getModelOperationQuery } from "./queries";

export const checkCreateModelOperationUntilDone = async ({
  operationName,
  accessToken,
}: {
  operationName: string;
  accessToken: Nullable<string>;
}) => {
  try {
    const operation = await getModelOperationQuery({
      operationName,
      accessToken,
    });
    if (operation.done) {
      return Promise.resolve(true);
    } else {
      return new Promise((resolve) => {
        setTimeout(async () => {
          const result = await checkCreateModelOperationUntilDone({
            operationName,
            accessToken,
          });
          resolve(result);
        }, 1500);
      });
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
