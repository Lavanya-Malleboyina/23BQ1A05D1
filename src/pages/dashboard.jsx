import { useEffect, useState } from "react";
import api from "../services/api";
import NotifyCard from "../components/notifyCard";
import PriNotify from "../components/prinotify";

function Dashboard() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [type, setType] = useState("");
  const [readNotifications, setReadNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, [page, type]);

  const fetchNotifications = async () => {
    try {
      let url = `/notifications?limit=${limit}&page=${page}`;

      if (type) {
        url += `&notification_type=${type}`;
      }

      const response = await api.get(url);

      console.log(response.data.notifications);

      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error(error);
    }
  };

  const markAsRead = (id) => {
    if (!readNotifications.includes(id)) {
      setReadNotifications([...readNotifications, id]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Campus Notifications</h1>

      <PriorityNotifications notifications={notifications} />

      <div style={{ marginBottom: "20px" }}>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Notifications</option>
          <option value="Event">Event</option>
          <option value="Result">Result</option>
          <option value="Placement">Placement</option>
        </select>
      </div>

      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.ID}
            notification={notification}
            isRead={readNotifications.includes(
              notification.ID
            )}
            onRead={markAsRead}
          />
        ))
      ) : (
        <p>No notifications found.</p>
      )}

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page}
        </span>

        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Dashboard;