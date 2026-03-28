export default function ReportsPage() {
  return (
    <div className="container">
      <h2>Complaints & Feedback Center</h2>
      <p>Admins can view and manage user complaints about the Track-Drug platform here.</p>
      <div className="card" style={{marginTop: 30}}>
        <h3>Recent Complaints</h3>
        <ul>
          <li>"Unable to add new supplier on mobile." <span style={{color:'#00c3ff'}}>— staff1@example.com</span></li>
          <li>"Dark mode toggle not working on Safari." <span style={{color:'#00c3ff'}}>— tech@example.com</span></li>
          <li>"Stock report export missing some medicines." <span style={{color:'#00c3ff'}}>— pharma@example.com</span></li>
          <li>"Login page loads slowly at night." <span style={{color:'#00c3ff'}}>— staff2@example.com</span></li>
        </ul>
      </div>
    </div>
  );
}