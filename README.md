# test-ci

Simple math library with unit tests.

## Usage
```js
const { add, subtract, multiply, divide } = require('./src/math');
```

## Running tests
```sh
node test.js
```

## GitHub Actions Workflows

### 1. PR Gate (`pr-gate.yml`)

每次向 `main` 分支发起 push 或 Pull Request 时自动触发，作为合并前的质量门禁。

**触发条件**
- push to `main`
- pull_request to `main`

---

### 2. Nightly Smoke Test (`nightly-smoke.yml`)

每天 UTC 02:00 定时运行冒烟测试，验证主干持续可用。也可在 GitHub Actions 页面手动触发。

**触发条件**
- 定时：每天 UTC 02:00（cron: `0 2 * * *`）
- 手动：GitHub Actions 页面点击 "Run workflow"

---

### 3. Webhook Smoke Test (`webhook-smoke.yml`)

通过 GitHub `repository_dispatch` API 触发，支持指定任意 branch 和 commit SHA 运行冒烟测试，适用于外部系统（CD 流水线、发布脚本等）按需触发。

**触发条件**
- `repository_dispatch` event type: `run-smoke`

**Payload 参数**

| 字段 | 必填 | 说明 |
|---|---|---|
| `branch` | 是 | 目标分支名 |
| `commit` | 否 | 指定 commit ID，不传则使用分支 HEAD |

**触发示例**

```bash
curl -X POST \
  -H "Authorization: Bearer <PAT>" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/<owner>/ci-test/dispatches \
  -d '{"event_type":"run-smoke","client_payload":{"branch":"main","commit":"abc1234"}}'
```

> PAT 所需权限：Fine-grained token 需开启 **Contents: Read and write** 及 **Actions: Read and write**。
