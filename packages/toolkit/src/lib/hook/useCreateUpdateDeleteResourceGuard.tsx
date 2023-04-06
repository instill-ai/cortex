import { env } from "../utility";
import { useEffect, useState } from "react";

export function useCreateUpdateDeleteResourceGuard() {
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    setEnable(env("NEXT_PUBLIC_DISABLE_CREATE_UPDATE_DELETE_RESOURCE"));
  }, []);

  return enable;
}
