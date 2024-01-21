import { useContractWrite, useWaitForTransaction } from "wagmi";
import { VAULT_ABI } from "../constants/vault";
import { App } from "antd";
import { useEffect } from "react";

export function useCheckIn(address: `0x${string}`) {
  const { notification } = App.useApp();
  const { write, error, isLoading, data } = useContractWrite({
    abi: VAULT_ABI,
    address,
    functionName: "checkIn",
  });

  const {
    isLoading: isWaiting,
    error: waitingError,
    isSuccess,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error raised during CheckIn operation",
        description: `${error.name}: ${error.message}`,
      });
    }
  }, [error]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error raised during CheckIn tx awaiting",
        description: `${error.name}: ${error.message}`,
      });
    }
  }, [waitingError]);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "You successfully Checked In",
      });
    }
  }, [isSuccess]);

  return {
    write,
    error: error || waitingError,
    isSending: isLoading,
    isWaiting: isWaiting,
    isSuccess,
  };
}
