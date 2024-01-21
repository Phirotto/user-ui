import BigNumber from "bignumber.js";
import { optimismSepolia } from "viem/chains";
import { useAccount, useContractRead } from "wagmi";
import { VAULT_ABI } from "../constants/vault";

type VaultInfo = {
  fillPercent: number;
  debt: BigNumber.Value;
  isParticipant?: boolean;
};

export function useVaultInfo(address: `0x${string}`): Partial<VaultInfo> {
  const { address: userAddress } = useAccount();
  const { data: fillPercent } = useContractRead<
    readonly unknown[],
    string,
    string
  >({
    address,
    chainId: optimismSepolia.id,
    abi: VAULT_ABI,
    functionName: "fillPercent",
  });

  const { data: debt } = useContractRead<readonly unknown[], string, string>({
    address,
    chainId: optimismSepolia.id,
    abi: VAULT_ABI,
    functionName: "requestedAmount",
  });

  const { data: isParticipant } = useContractRead<
    readonly unknown[],
    string,
    [boolean]
  >({
    address,
    chainId: optimismSepolia.id,
    abi: VAULT_ABI,
    functionName: userAddress ? "participants" : undefined,
    args: [userAddress],
  });

  return {
    fillPercent:
      fillPercent != null ? BigNumber(fillPercent).toNumber() : undefined,
    debt,
    isParticipant: isParticipant?.[0],
  };
}
