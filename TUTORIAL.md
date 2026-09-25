# asta + Asta + Tailscale Setup Tutorial

This guide is a step-by-step runbook for the most common production-like setup:

- **Machine A** runs **Asta Gateway**.
- **Machine B** runs **asta**.
- **Tailscale** connects both machines securely.

If you follow this exactly, people should avoid the most common confusion: **asta does not install or run Asta for you.**

---

## 0) Architecture and Responsibilities

- **Asta** is the runtime and Gateway.
- **asta** is the UI and Studio proxy.
- asta connects to an already running Asta Gateway.
- In this tutorial, the Gateway lives on a different machine from asta.

---

## 1) Prerequisites

### Machine A (Gateway host)

- macOS, Linux, or WSL2.
- Internet access.
- Ability to install Asta and Tailscale.

### Machine B (asta host)

- Node.js `20+` recommended for this repo.
- npm `10+` recommended.
- Internet access.
- Ability to install Tailscale.

### Accounts and permissions

- A Tailscale account for your tailnet.
- If your tailnet uses device approval, you need Owner/Admin/IT admin access in Tailscale admin.

---

## 2) Install and Start Asta on Machine A

Asta official install docs are here: [Install](https://docs.Asta.ai/install/index.md) and [Getting Started](https://docs.Asta.ai/start/getting-started.md).

### 2.1 Install Asta

On **Machine A**:

```bash
curl -fsSL https://Asta.ai/install.sh | bash
```

### 2.2 Run onboarding and install daemon

```bash
Asta onboard --install-daemon
```

### 2.3 Verify Gateway health

```bash
Asta gateway status
Asta status
```

You want a healthy result such as runtime running and RPC probe ok.

### 2.4 Get your Gateway token

You will need this token in asta:

```bash
Asta config get gateway.auth.token
```

Store it securely.

---

## 3) Install and Authorize Tailscale on Both Machines

Tailscale docs: [Serve overview](https://tailscale.com/kb/1312/serve), [Serve CLI](https://tailscale.com/docs/reference/tailscale-cli/serve), and [Device approval](https://tailscale.com/kb/1099/device-approval).

### 3.1 Install Tailscale

Install Tailscale on **Machine A** and **Machine B** using official installers: [Tailscale downloads](https://tailscale.com/download).

### 3.2 Join both machines to the same tailnet

On each machine:

```bash
tailscale up
tailscale status
```

Confirm both machines appear in the same tailnet.

### 3.3 If your tailnet requires approval, approve devices

In Tailscale admin:

1. Open [Machines](https://login.tailscale.com/admin/machines).
2. Find devices marked **Needs approval**.
3. Approve both Machine A and Machine B.

Without this, the machines cannot communicate over tailnet traffic.

---

## 4) Expose Asta Gateway Through Tailscale on Machine A

You have two valid ways. Pick one.

### Option A (simple and explicit): Tailscale Serve command

On **Machine A**, keep Gateway bound locally (`127.0.0.1:18789`) and publish through Serve:

```bash
tailscale serve --yes --bg --https=443 http://127.0.0.1:18789
tailscale serve status
```

Notes:

- Newer Tailscale CLI uses `--https=443`.
- If you are on older docs/commands, you may see syntax like `--https 443`. Use `tailscale serve --help` on your installed version.

### Option B (Asta-managed Tailscale mode)

Asta can manage Tailscale mode itself:

```bash
Asta gateway --tailscale serve
```

Asta Tailscale docs: [Gateway Tailscale](https://docs.Asta.ai/gateway/tailscale.md).

### 4.1 Confirm the public tailnet URL

You need the `https://<gateway-host>.<tailnet>.ts.net` host.

This host is what asta will use as `wss://<gateway-host>.<tailnet>.ts.net`.

---

## 5) Install and Run asta on Machine B

On **Machine B**:

```bash
git clone https://github.com/iamlukethedev/asta.git asta
cd asta
npm install
cp .env.example .env
npm run dev
```

Then open:

- `http://localhost:3000`

---

## 6) Connect asta to Asta

In asta connection UI:

1. Set **Gateway URL** to:
   - `wss://<gateway-host>.<tailnet>.ts.net`
2. Paste the token from Machine A (`Asta config get gateway.auth.token`).
3. Click **Connect**.

Important:

- Use `wss://` for Tailscale HTTPS endpoints.
- Use `ws://localhost:18789` only when Gateway is local to the same machine as asta or when using an SSH tunnel.

---

## 7) Required Device-Pairing Approval Step

This is the step people often miss.

After asta is running and tries to connect for the first time, approve pending device pairing on **Machine A**:

```bash
Asta devices list
Asta devices approve --latest
```

Asta devices docs: [Asta devices](https://docs.Asta.ai/cli/devices.md).

If multiple requests are pending, approve by id instead:

```bash
Asta devices approve <requestId>
```

---

## 8) Verification Checklist

Run this checklist in order:

1. `Asta gateway status` on Machine A shows healthy runtime.
2. `tailscale status` on both machines shows connected devices in same tailnet.
3. `tailscale serve status` on Machine A shows active Serve config for port `443` to `127.0.0.1:18789`.
4. asta connect UI uses `wss://...ts.net` plus valid token.
5. `Asta devices approve --latest` has been run after first connect attempt.
6. asta UI shows gateway connected and loads agents.

---

## 9) Troubleshooting

### `EPROTO` or `wrong version number`

- Usually means protocol mismatch.
- Fix: if your endpoint is HTTPS/Tailscale Serve, use `wss://...`.
- Do not use `wss://` against a plain `ws://` endpoint.

### `401` or auth errors from asta

- Re-copy token from Machine A:
  - `Asta config get gateway.auth.token`.
- Confirm Gateway auth mode and token are current.

### asta still cannot connect after token is correct

- Approve pending device:
  - `Asta devices approve --latest`.
- Check pending requests:
  - `Asta devices list`.

### Tailscale URL works nowhere

- Confirm both devices are approved in Tailscale admin if device approval is enabled.
- Re-run:
  - `tailscale status`.
  - `tailscale serve status`.
- Recreate serve config if needed:
  - `tailscale serve reset`.
  - `tailscale serve --yes --bg --https=443 http://127.0.0.1:18789`.

### Gateway itself is unhealthy

- Run:
  - `Asta doctor`.
  - `Asta gateway restart`.
  - `Asta gateway status`.

---

## 10) Security Notes

- Keep Gateway bound to loopback unless you have a deliberate reason not to.
- Do not commit tokens into git or `.env` files intended for sharing.
- Prefer Tailscale Serve over exposing raw Gateway ports publicly.
- Treat Asta device pairing approval as a security gate, not a one-time annoyance.

---

## References

- Asta install: [docs.Asta.ai/install/index.md](https://docs.Asta.ai/install/index.md).
- Asta getting started: [docs.Asta.ai/start/getting-started.md](https://docs.Asta.ai/start/getting-started.md).
- Asta gateway runbook: [docs.Asta.ai/gateway/index.md](https://docs.Asta.ai/gateway/index.md).
- Asta devices CLI: [docs.Asta.ai/cli/devices.md](https://docs.Asta.ai/cli/devices.md).
- Asta tailscale gateway mode: [docs.Asta.ai/gateway/tailscale.md](https://docs.Asta.ai/gateway/tailscale.md).
- Tailscale Serve: [tailscale.com/kb/1312/serve](https://tailscale.com/kb/1312/serve).
- Tailscale serve CLI: [tailscale.com/docs/reference/tailscale-cli/serve](https://tailscale.com/docs/reference/tailscale-cli/serve).
- Tailscale device approval: [tailscale.com/kb/1099/device-approval](https://tailscale.com/kb/1099/device-approval).
