# Stage 1

## Notification Platform REST API Design

The notification platform supports the following core actions:

1. Create a notification for a user
2. Retrieve a user's notifications
3. Mark notifications as read
4. Delete a notification
5. Count unread notifications
6. Subscribe to real-time notification events

---

## API Endpoints

### 1. Create Notification

- Endpoint: `POST /api/notifications`
- Purpose: Create a new notification for a specific user.
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- Request Body:
```json
{
  "userId": "string",
  "type": "string",
  "title": "string",
  "message": "string",
  "priority": "low|medium|high",
  "metadata": {
    "relatedId": "string",
    "source": "string"
  }
}
```
- Success Response: `201 Created`
```json
{
  "notificationId": "string",
  "userId": "string",
  "type": "string",
  "title": "string",
  "message": "string",
  "priority": "low|medium|high",
  "metadata": {
    "relatedId": "string",
    "source": "string"
  },
  "isRead": false,
  "createdAt": "2026-01-01T12:00:00Z"
}
```

### 2. Get User Notifications

- Endpoint: `GET /api/notifications`
- Purpose: Retrieve notifications for the authenticated user.
- Headers:
  - `Accept: application/json`
  - `Authorization: Bearer <token>`
- Query Parameters:
  - `page` (integer, optional, default: 1)
  - `limit` (integer, optional, default: 20)
  - `unreadOnly` (boolean, optional)
  - `type` (string, optional)
- Success Response: `200 OK`
```json
{
  "userId": "string",
  "page": 1,
  "limit": 20,
  "total": 42,
  "notifications": [
    {
      "notificationId": "string",
      "type": "string",
      "title": "string",
      "message": "string",
      "priority": "low|medium|high",
      "metadata": {
        "relatedId": "string",
        "source": "string"
      },
      "isRead": false,
      "createdAt": "2026-01-01T12:00:00Z"
    }
  ]
}
```

### 3. Mark Notification as Read

- Endpoint: `PATCH /api/notifications/{notificationId}/read`
- Purpose: Mark a single notification as read.
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- Request Body:
```json
{
  "isRead": true
}
```
- Success Response: `200 OK`
```json
{
  "notificationId": "string",
  "isRead": true,
  "readAt": "2026-01-01T12:05:00Z"
}
```

### 4. Delete Notification

- Endpoint: `DELETE /api/notifications/{notificationId}`
- Purpose: Remove a notification for the authenticated user.
- Headers:
  - `Authorization: Bearer <token>`
- Success Response: `204 No Content`

### 5. Get Unread Notification Count

- Endpoint: `GET /api/notifications/unread/count`
- Purpose: Return the number of unread notifications for the authenticated user.
- Headers:
  - `Accept: application/json`
  - `Authorization: Bearer <token>`
- Success Response: `200 OK`
```json
{
  "userId": "string",
  "unreadCount": 7
}
```

---

## JSON Schema and Field Definitions

### Notification Object

- `notificationId`: Unique notification identifier.
- `userId`: Target user identifier.
- `type`: Notification category, e.g. `message`, `alert`, `system`, `social`.
- `title`: Short display title.
- `message`: Full notification body.
- `priority`: `low`, `medium`, or `high`.
- `metadata`: Optional structured payload for client routing.
- `isRead`: Boolean indicating read state.
- `createdAt`: ISO 8601 timestamp.
- `readAt`: ISO 8601 timestamp when the notification was read.

---

## Real-Time Notification Mechanism

Real-time delivery should use a websocket-based subscription channel to notify users when new notifications arrive.

### WebSocket Contract

- Connect to: `wss://api.example.com/notifications/socket`
- Headers during handshake:
  - `Authorization: Bearer <token>`
- Client sends a subscription request after connection:
```json
{
  "action": "subscribe",
  "channels": ["notifications"],
  "userId": "string"
}
```
- Server sends event payloads:
```json
{
  "event": "notification.created",
  "data": {
    "notificationId": "string",
    "userId": "string",
    "type": "string",
    "title": "string",
    "message": "string",
    "priority": "high",
    "metadata": {
      "relatedId": "string",
      "source": "string"
    },
    "isRead": false,
    "createdAt": "2026-01-01T12:00:00Z"
  }
}
```
- Client can acknowledge receipt:
```json
{
  "action": "ack",
  "notificationId": "string"
}
```

### Fallback for non-WebSocket clients

- Server supports server-sent events (SSE) at `GET /api/notifications/stream`
- Authentication via `Authorization: Bearer <token>`
- Event payload follows the same JSON structure as websocket events.

---

## Recommended Request/Response Standards

- Use `Authorization: Bearer <token>` for user authentication.
- Return standard HTTP codes: `201`, `200`, `204`, `400`, `401`, `404`, `500`.
- Validate request payloads and return helpful error JSON:
```json
{
  "error": "InvalidPayload",
  "message": "userId is required"
}
```

## Notes for Front-End Integration

- Use `GET /api/notifications` to fetch the current notification list.
- Use websocket/SSE to listen for `notification.created` events and immediately update the UI.
- Use `PATCH /api/notifications/{notificationId}/read` when a notification is opened.
- Use `GET /api/notifications/unread/count` for badge counters.

---

## Logging Middleware Suggestion

For middleware, log incoming API requests and responses with:
- request path
- HTTP method
- authenticated user ID
- payload summary
- response status
- timestamp

This ensures the notification API is observable and troubleshootable while supporting real-time event delivery.
