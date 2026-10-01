# ConnectSphere REST API

Base URL: `http://localhost:5000`

## Authentication

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/health` | No | API/database health |
| POST | `/api/auth/register` | No | Create account + JWT |
| POST | `/api/auth/login` | No | Login + JWT |
| GET | `/api/auth/me` | Yes | Current user |

## Users

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/users/:username` | No | Public profile |
| PUT | `/api/users/me` | Yes | Edit own profile |
| GET | `/api/users/:username/network/followers` | No | Followers |
| GET | `/api/users/:username/network/following` | No | Following |
| GET | `/api/users/search?q=alex` | No | Search users |
| POST | `/api/users/:id/follow` | Yes | Toggle follow |
| DELETE | `/api/users/:id/follow` | Yes | Toggle follow (HTTP semantics for clients that prefer DELETE) |
| GET | `/api/users/me/stats` | Yes | Current user summary |

## Posts

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/posts` | No | Feed |
| GET | `/api/posts/:id` | No | Single post + comments |
| POST | `/api/posts` | Yes | Create post |
| POST | `/api/posts/:id/like` | Yes | Toggle like |
| DELETE | `/api/posts/:id` | Yes | Delete own post |

## Comments

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/comments/post/:postId` | No | List comments |
| POST | `/api/comments/post/:postId` | Yes | Add comment |
| DELETE | `/api/comments/:id` | Yes | Delete own comment |

## Protected Request

```http
Authorization: Bearer <JWT>
Content-Type: application/json
```

## Error Shape

```json
{
  "message": "Human-readable error message"
}
```
