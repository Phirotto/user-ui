import { useParams } from "react-router";
import { useWithdraw } from "./hooks/useWithdraw";
import { Button, Row, Typography } from "antd";

export function Withdraw() {
  const params = useParams();
  const vaultAddress = params["vault"] as `0x${string}`;

  const { write, isSending, isWaiting, isSuccess } = useWithdraw(vaultAddress);

  return (
    <Row justify="center">
      {isSending || isWaiting ? (
        <Typography.Text strong>Withdraw in progress...</Typography.Text>
      ) : isSuccess ? (
        <Typography.Text strong>Your funds withdrawn</Typography.Text>
      ) : (
        <Button onClick={write}>Withdraw</Button>
      )}
    </Row>
  );
}
