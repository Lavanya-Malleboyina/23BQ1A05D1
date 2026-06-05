function PriorityNotifications({ notifications }) {
  const priorityMap = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  const topNotifications = [...notifications]
    .sort(
      (a, b) =>
        (priorityMap[b.Type] || 0) -
        (priorityMap[a.Type] || 0)
    )
    .slice(0, 10);

  return (
    <div
      style={{
        border: "2px solid green",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h2>Priority Notifications</h2>

      {topNotifications.map((item) => (
        <div key={item.ID}>
          <strong>{item.Type}</strong>
          <p>{item.Message}</p>
        </div>
      ))}
    </div>
  );
}

export default PriorityNotifications;