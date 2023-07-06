# LayerX coding test

## 使用言語

- TypeScript

## 使用ライブラリ

- React
- Emotion
- Material UI
- useSWR
- MSW

## アプリケーション起動方法

### 前提

1. node、pnpm がインストールされている
2. `docker compose`コマンドが実行できる

- モジュールをインストール

```bash
pnpm install
```

- 下記コマンドでサーバを起動後、[localhost:5173](http://localhost:5173)にアクセス

```bash
pnpm dev
```

- または下記コマンドでビルド&サーバを起動後、[localhost:4173](http://localhost:4173)にアクセス

```bash
pnpm build
pnpm preview
```

## Swagger UI の閲覧方法

- プロジェクトルートで下記コマンドを実行し、コンテナを起動後、[localhost:8000](http://localhost:8000)にアクセス

```bash
docker compose up -d
```

## デモ動画

- `demo_movie.mov`
