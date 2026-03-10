# Release Checklist

- [ ] 从 `main` 拉取最新代码
- [ ] 确认计划发版的 PR 都已合并
- [ ] 更新版本号（`manifest.json` / `package.json`）
- [ ] 更新 `CHANGELOG.md`
- [ ] 本地构建通过
- [ ] 手动冒烟测试通过（popup/options/content script/background）
- [ ] 创建并推送 tag（`vX.Y.Z`）
- [ ] 生成并归档发布产物（zip 或商店提交包）
- [ ] 在发布平台填写版本说明并发布

