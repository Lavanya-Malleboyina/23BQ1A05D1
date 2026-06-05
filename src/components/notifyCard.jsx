function NotificationCard({
  notification,
  isRead,
  onRead,
}) {
  return (
    <div
      onClick={() => onRead(notification.ID)}
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        margin: "10px",
        borderRadius: "10px",
        width: "100%",
boxSizing: "border-box",
        backgroundColor: isRead
          ? "#f0f0f0"
          : "#fff8cc",
        cursor: "pointer",
      }}
    >
      <h3>{notification.Type}</h3>

      <p>{notification.Message}</p>

      <small>
        Status: {isRead ? "Read" : "Unread"}
      </small>

      <br />

      <small>{notification.Timestamp}</small>
    </div>
  );
}

export default NotificationCard;