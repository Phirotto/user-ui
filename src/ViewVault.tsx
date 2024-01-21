import { useParams } from "react-router";
import { useVaultInfo } from "./hooks/useVaultInfo";
import { Skeleton, Space, Typography } from "antd";
import BigNumber from "bignumber.js";

export function ViewVault() {
  const params = useParams();

  const vaultAddress = params["vault"] as `0x${string}`;

  const { fillPercent, debt, isParticipant } = useVaultInfo(vaultAddress);

  return (
    <Space className="w-full" direction="vertical">
      <Typography.Title level={3}>Vault {vaultAddress} info</Typography.Title>
      <Space className="mt-3">
        <Typography.Text type="secondary">Vault fill percent:</Typography.Text>
        <Typography.Text strong>
          {fillPercent != null ? `${fillPercent}%` : <Skeleton.Input />}
        </Typography.Text>
      </Space>
      <Space>
        <Typography.Text type="secondary">
          Vault requested amount:
        </Typography.Text>
        <Typography.Text strong>
          {debt != null ? (
            `${BigNumber(debt)
              .div(BigNumber(10).pow(18))
              .decimalPlaces(2)
              .toFixed()}$`
          ) : (
            <Skeleton.Input />
          )}
        </Typography.Text>
      </Space>
      {isParticipant != null && (
        <Space>
          <Typography.Text type="secondary">Am I participant:</Typography.Text>
          <Typography.Text type={isParticipant ? "success" : "danger"}>
            {isParticipant ? "Yes" : "No"}
          </Typography.Text>
        </Space>
      )}
    </Space>
  );
}
