import { CustomRuntimeProvider } from "@/lib/runtime/custom/provider";
import type { GatewayClient } from "@/lib/gateway/GatewayClient";
import { DemoRuntimeProvider } from "@/lib/runtime/demo/provider";
import { HermesRuntimeProvider } from "@/lib/runtime/hermes/provider";
import { AstaRuntimeProvider } from "@/lib/runtime/openasta/provider";
import type { RuntimeProvider } from "@/lib/runtime/types";
import type { StudioGatewayAdapterType } from "@/lib/studio/settings";

export const createRuntimeProvider = (
  providerId: RuntimeProvider["id"] | StudioGatewayAdapterType,
  client: GatewayClient,
  runtimeUrl: string
): RuntimeProvider => {
  switch (providerId) {
    case "local":
      return new CustomRuntimeProvider(client, runtimeUrl, {
        id: "local",
        label: "Local Runtime",
        runtimeName: "Local Runtime",
        routeProfile: "local",
      });
    case "asta":
      return new CustomRuntimeProvider(client, runtimeUrl, {
        id: "asta",
        label: "asta Runtime",
        runtimeName: "asta Runtime",
        routeProfile: "asta",
      });
    case "custom":
      return new CustomRuntimeProvider(client, runtimeUrl, {
        id: "custom",
        label: "Custom Runtime",
        runtimeName: "Custom Runtime",
        routeProfile: "custom",
      });
    case "demo":
      return new DemoRuntimeProvider(client);
    case "hermes":
      return new HermesRuntimeProvider(client);
    case "Asta":
    default:
      return new AstaRuntimeProvider(client);
  }
};
