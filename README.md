# sample-todo-app

(※このREADMEはCursorで生成しました)

GraphQLを使用したTODOアプリです。

## 技術スタック

### バックエンド
- Ruby 3.2.2
- Ruby on Rails 7.1.5
- PostgreSQL 16
- GraphQL

### フロントエンド
- React 18
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Tailwind CSS

## 開発環境のセットアップ

### 必要な環境
- Docker
- Docker Compose

### バックエンドの起動

```bash
# 開発環境の構築
docker compose build backend
docker compose run --rm backend bundle install
docker compose run --rm backend rails db:create db:migrate

# サーバーの起動
docker compose up backend
```

バックエンドサーバーが http://localhost:3000 で起動します。
GraphQL PlaygroundはGraphiQLで http://localhost:3000/graphiql から利用できます。

### フロントエンドの起動

```bash
# node_modulesディレクトリを作成
# 参考: https://serip39.hatenablog.com/entry/2022/08/10/120000
mkdir frontend/node_modules

# 開発環境の構築
docker compose build frontend
docker compose run --rm frontend npm install
# ↑はリポジトリ直下で実行する
# 失敗してしまった場合は再実行する前に docker compose down frontend -v でボリュームを削除する

# 開発サーバーの起動
docker compose up frontend
```

フロントエンドサーバーが http://localhost:5173 で起動します。

## 開発用コマンド

### バックエンド

```bash
# Railsコンソール
docker compose run --rm backend rails console
# データベースのリセット
docker compose run --rm backend rails db:reset
# コンテナのログ確認
docker compose logs -f
# コンテナの停止
docker compose down
```

## 利用可能な機能

- タスクの一覧表示
- タスクの作成（モーダル）
- タスクの編集（インライン）
- タスクの削除
- タスクの完了状態の切り替え

## ディレクトリ構成

```
.
├── README.md
├── backend/
│ ├── app/
│ │ ├── graphql/ # GraphQLの型定義とリゾルバ
│ │ ├── models/ # ActiveRecordモデル
│ │ └── ...
│ ├── db/ # データベースの設定とマイグレーション
│ └── ...
└── frontend/
│ ├── src/
│ │ ├── components/ # Reactコンポーネント
│ │ ├── hooks/ # カスタムフック
│ │ ├── queries/ # GraphQLクエリ定義
│ │ ├── routes/ # ルーティング設定
│ │ └── ...
│ └── ...
└── ...
```

## 注意事項

- 開発環境では全てのCORSリクエストを許可しています
- 本番環境にデプロイする際は、適切なCORS設定を行ってください
