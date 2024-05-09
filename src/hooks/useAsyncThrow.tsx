import { useCallback, useState } from "react";

/** A workaround for error boundary async limitations. */
export const useAsyncThrow = () => {
  const [_, setErr] = useState();
  return useCallback(
    (e:any) =>
      setErr(() => {
        throw e;
      }),
    [setErr]
  );
};