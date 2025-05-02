import { useEffect } from "react";
import { YaciProvider } from "@meshsdk/core";

export const useYaci = () => {
  useEffect(() => {
    const fetchParams = async () => {
      const provider = new YaciProvider();
      const params = await provider.fetchProtocolParameters();
      console.log(params);
    };
    fetchParams();
  }, []);
};