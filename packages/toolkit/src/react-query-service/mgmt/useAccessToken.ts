import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Token } from "simple-oauth2";

import { Nullable } from "../../type";
import {
  RefreshTokenApiResponse,
  ValidateTokenApiResponse,
} from "../../type/apiRoute";
import { env } from "../../utility";

export const useAccessToken = ({ enable }: { enable: boolean }) => {
  const queryClient = useQueryClient();

  let expiresAt: Nullable<number> = null;
  const tokenSet = queryClient.getQueryData<Token>(["accessToken"]);

  if (tokenSet && tokenSet) {
    expiresAt = Date.parse(tokenSet.expires_at as string);
  }

  let enableQuery = false;

  if (enable) {
    if (expiresAt) {
      if (expiresAt < Date.now()) {
        enableQuery = true;
      }
    } else {
      enableQuery = true;
    }
  }

  return useQuery(
    ["accessToken"],
    async (): Promise<Token> => {
      const validateToken = await axios.post<ValidateTokenApiResponse>(
        env("NEXT_PUBLIC_VALIDATE_TOKEN_API_ROUTE")
      );

      if (validateToken.data.tokenIsValid && validateToken.data.tokenSet) {
        return Promise.resolve(validateToken.data.tokenSet);
      }

      const refreshToken = await axios.post<RefreshTokenApiResponse>(
        env("NEXT_PUBLIC_REFRESH_TOKEN_API_ROUTE")
      );

      return Promise.resolve(refreshToken.data.tokenSet as Token);
    },
    {
      refetchOnWindowFocus: false,
      enabled: enableQuery,
    }
  );
};
