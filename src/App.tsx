import { ConnectKitProvider } from "connectkit";
import { WagmiConfig } from "wagmi";
import { config } from "./wagmi";
import { Layout } from "./Layout";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { App as AntdApp } from "antd";
import { ViewVault } from "./ViewVault";

const router = createHashRouter([
  {
    path: "/:vault",
    element: <ViewVault />,
  },
]);

function App() {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <AntdApp>
          <Layout>
            <RouterProvider router={router} />
          </Layout>
        </AntdApp>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
