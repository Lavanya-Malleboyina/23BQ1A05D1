import { useEffect, useState } from "react";
import api from "../services/api";

function NotificationTypes() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications");

      setNotifications(
        response.data.notifications || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const placements = notifications.filter(
    (n) => n.Type === "Placement"
  );

  const events = notifications.filter(
    (n) => n.Type === "Event"
  );

  const results = notifications.filter(
    (n) => n.Type === "Result"
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notification Types</h1>

      <h2>Placement</h2>
      {placements.map((n) => (
        <p key={n.ID}>{n.Message}</p>
      ))}

      <h2>Event</h2>
      {events.map((n) => (
        <p key={n.ID}>{n.Message}</p>
      ))}

      <h2>Result</h2>
      {results.map((n) => (
        <p key={n.ID}>{n.Message}</p>
      ))}
    </div>
  );
}

export default NotificationTypes;