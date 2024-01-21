import { Button, Form, Input, InputNumber, Space, Typography } from "antd";
import BigNumber from "bignumber.js";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { isAddress } from "viem";
import { useAccount } from "wagmi";
import { useCheckIn } from "./hooks/useCheckIn";

type CheckInData = {
  address: string;
  amount: BigNumber.Value;
  proof: string;
};

export function CheckIn() {
  const params = useParams();
  const [search] = useSearchParams();
  const { address } = useAccount();
  const navigate = useNavigate();

  const vaultAddress = params["vault"] as `0x${string}`;
  const { write, isSending, isWaiting } = useCheckIn(vaultAddress);

  const [data, setData] = useState<Partial<CheckInData>>({
    address: search.get("address") || address || undefined,
    amount: search.get("amount") || undefined,
    proof: search.get("proof") || undefined,
  });

  const isValid = useMemo(
    () =>
      data.address &&
      isAddress(data.address) &&
      data.amount &&
      BigNumber(data.amount).gt(0) &&
      data.proof &&
      data.proof.length > 0 &&
      data.proof.startsWith("0x"),
    [data]
  );

  const onCheckInClick = () => {
    write({
      args: [data.address, BigNumber(data.amount!).toFixed(), data.proof],
    });
  };

  return (
    <Form>
      <Space
        direction="vertical"
        className="w-full flex items-center mb-4"
        size="small"
      >
        <Typography.Title level={3}>
          Check in to vault {vaultAddress}
        </Typography.Title>

        <Form.Item
          label="Participant address"
          status={
            data.address && !isAddress(data.address) ? "error" : undefined
          }
        >
          <Input
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            placeholder="Eth Address"
            className="min-w-[450px]"
          />
        </Form.Item>
        <Form.Item label="Participant amount">
          <InputNumber
            value={BigNumber(data.amount || 0)
              .div(BigNumber(10).pow(18))
              .toFixed()}
            onChange={(e) =>
              setData({
                ...data,
                amount: BigNumber(e || 0).multipliedBy(
                  BigNumber(10).pow(18).toFixed()
                ),
              })
            }
            min="0"
            placeholder="Amount"
            addonAfter="$"
          />
        </Form.Item>
        <Form.Item label="Participant proof">
          <Input.TextArea
            value={data.proof}
            onChange={(e) => setData({ ...data, proof: e.target.value })}
            placeholder="Hex"
            className="min-w-[450px]"
          />
        </Form.Item>

        {isSending || isWaiting ? (
          <Typography.Text strong>Check In in progress...</Typography.Text>
        ) : (
          <Button disabled={!isValid} onClick={onCheckInClick}>
            Check In
          </Button>
        )}
        <Button
          type="link"
          onClick={() => navigate(`/withdraw/${vaultAddress}`)}
        >
          Withdraw
        </Button>
      </Space>
    </Form>
  );
}
