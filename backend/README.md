# TODOアプリ バックエンド

GraphQLを使用したTODOアプリのバックエンドAPIです。

## 技術スタック

- Ruby 3.2.2
- Ruby on Rails 7.1.5
- PostgreSQL 16
- GraphQL
- Docker / Docker Compose

## 開発環境のセットアップ

### 必要な環境

- Docker
- Docker Compose

### セットアップ手順

1. リポジトリをクローン

```bash
git clone <リポジトリのURL>
cd <プロジェクトディレクトリ>
```

2. 開発環境の起動

```bash
docker compose build
docker compose run --rm api bundle install
docker compose run --rm api rails db:create db:migrate
docker compose up
```

3. 動作確認
- ブラウザで http://localhost:3000/graphiql にアクセス
- 以下のクエリを実行して動作確認

```graphql
# タスクの作成
mutation {
  createTask(
    title: "テストタスク"
    description: "これはテストタスクです"
    completed: false
  ) {
    task {
      id
      title
      description
      completed
      createdAt
    }
    errors
  }
}

# タスク一覧の取得
query {
  tasks {
    id
    title
    description
    completed
    createdAt
  }
}
```

## 利用可能なGraphQL API

### Queries

- `tasks`: 全タスクの取得
- `task(id: ID!)`: 指定したIDのタスク取得

### Mutations

- `createTask`: タスクの作成
  - 引数：
    - `title: String!`
    - `description: String`
    - `completed: Boolean`

- `updateTask`: タスクの更新
  - 引数：
    - `id: ID!`
    - `title: String`
    - `description: String`
    - `completed: Boolean`

- `deleteTask`: タスクの削除
  - 引数：
    - `id: ID!`

- `toggleTaskCompletion`: タスクの完了状態の切り替え
  - 引数：
    - `id: ID!`

## 開発用コマンド

```bash
# Railsコンソールの起動
docker compose run --rm api rails console
# データベースのリセット
docker compose run --rm api rails db:reset
# コンテナのログ確認
docker compose logs -f
# コンテナの停止
docker compose down
```

## 注意事項

- 開発環境では全てのCORSリクエストを許可しています
- 本番環境にデプロイする際は、適切なCORS設定を行ってください
