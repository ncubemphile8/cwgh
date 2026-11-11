"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CWGH_LOGO } from "../../data";

const roles = [
  "Executive Director",
  "Senior Management",
  "Programme Manager",
  "Field Supervisor",
  "Field Officer",
  "Communications Officer",
  "Finance Officer",
  "System Administrator"
];

const initialTasks = [
  { id: 1, title: "Review weekly programme updates", owner: "Programme team", due: "Today · 15:00", status: false },
  { id: 2, title: "Approve field activity submissions", owner: "Field operations", due: "Today · 16:30", status: false },
  { id: 3, title: "Prepare agenda for management meeting", owner: "Secretariat", due: "Tomorrow · 09:00", status: true },
  { id: 4, title: "Compile monthly health advocacy summary", owner: "Advocacy team", due: "Friday · 12:00", status: false }
];

const meetings = [
  { day: "12", month: "NOV", title: "Programme coordination check-in", time: "09:30 – 10:15", place: "Online · Teams" },
  { day: "13", month: "NOV", title: "Field operations review", time: "11:00 – 12:00", place: "Conference room" },
  { day: "16", month: "NOV", title: "Senior management meeting", time: "09:00 – 10:30", place: "Harare Head Office" }
];

const attendanceRows = [
  { name: "Sample field officer", team: "Community participation", in: "08:05", out: "—", status: "On site" },
  { name: "Sample programme officer", team: "Youth health", in: "08:22", out: "—", status: "On site" },
  { name: "Sample supervisor", team: "Field operations", in: "07:54", out: "16:10", status: "Complete" }
];

const notifications = [
  { title: "Programme report awaiting review", detail: "A submitted report is ready for supervisor review.", when: "Today · 09:10" },
  { title: "Management meeting reminder", detail: "Prepare agenda items before the scheduled meeting.", when: "Today · 08:00" },
  { title: "Field follow-up due", detail: "A sample community visit record requires follow-up.", when: "Yesterday · 15:40" }
];

const fieldReports = [
  { location: "Example district visit", programme: "Community participation", submitted: "Today · 08:42", review: "Awaiting review" },
  { location: "Example facility engagement", programme: "Health service monitoring", submitted: "Yesterday · 14:16", review: "Reviewed" },
  { location: "Example youth outreach", programme: "Youth health", submitted: "10 Nov · 16:05", review: "Needs follow-up" }
];

export default function PortalDashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState("Executive Director");
  const [activeTab, setActiveTab] = useState("Overview");
  const [tasks, setTasks] = useState(initialTasks);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("cwgh-demo-session") !== "active") {
      router.replace("/portal");
      return;
    }
    setRole(sessionStorage.getItem("cwgh-demo-role") || "Executive Director");
    setReady(true);
  }, [router]);

  function signOut() {
    sessionStorage.removeItem("cwgh-demo-session");
    sessionStorage.removeItem("cwgh-demo-role");
    router.replace("/portal");
  }

  function toggleTask(id: number) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, status: !task.status } : task));
  }

  function actionNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  }

  const navItems = [
    { label: "Overview", icon: "◫" },
    { label: "My tasks", icon: "✓" },
    { label: "Reports", icon: "▤" },
    { label: "Attendance", icon: "◷" },
    { label: "Meetings", icon: "▦" },
    { label: "Notifications", icon: "♢" },
    { label: "Field operations", icon: "⌖" },
    { label: "Documents", icon: "▱" },
    { label: "Team & roles", icon: "♙" }
  ];

  if (!ready) {
    return <main className="portal-loading"><div className="loading-orbit" /><p>Opening your CWGH workspace…</p></main>;
  }

  return (
    <main className="portal-dashboard">
      <aside className="portal-sidebar">
        <Link href="/" className="portal-sidebar-brand"><img src={CWGH_LOGO} alt="CWGH logo" /><span>STAFF<br />WORKSPACE</span></Link>
        <div className="portal-side-label">WORKSPACE</div>
        <nav>
          {navItems.map((item) => (
            <button key={item.label} className={activeTab === item.label ? "active" : ""} onClick={() => setActiveTab(item.label)}>
              <span className="side-icon">{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-help"><span>NEED SUPPORT?</span><p>Contact your system administrator for portal access or permissions.</p><a href="mailto:cwgh@mweb.co.zw">Contact Secretariat ↗</a></div>
          <button className="sign-out" onClick={signOut}>↩ Sign out</button>
          <Link className="back-public" href="/">← Public website</Link>
        </div>
      </aside>

      <div className="portal-main">
        <header className="portal-topbar">
          <div><span className="portal-breadcrumb">CWGH WORKSPACE /</span><strong>{activeTab}</strong></div>
          <div className="portal-top-actions"><span className="demo-pill">DEMO ENVIRONMENT</span><span className="notification-bell">♢<i /></span><div className="user-chip"><span className="user-avatar">CW</span><span><b>CWGH Preview</b><small>{role}</small></span></div></div>
        </header>
        <div className="portal-content">
          <div className="portal-welcome-row">
            <div><span className="eyebrow"><i /> CWGH STAFF OPERATIONS</span><h1>{activeTab === "Overview" ? "Good afternoon, CWGH." : activeTab + "."}</h1><p>{activeTab === "Overview" ? "Here is the organisation's activity snapshot and what needs attention." : "A demonstration view of the " + activeTab.toLowerCase() + " workspace."}</p></div>
            <label className="role-switch">Preview role <select value={role} onChange={(event) => setRole(event.target.value)}>{roles.map((item) => <option key={item}>{item}</option>)}</select></label>
          </div>

          {notice ? <div className="portal-toast" role="status">{notice}</div> : null}
          <div className="sample-banner"><b>Sample data</b><span>This is a UI prototype. The records and metrics below are illustrative and are not CWGH operational figures.</span></div>

          {activeTab === "Overview" ? (
            <>
              <div className="portal-metric-grid">
                <div className="portal-metric"><span>ACTIVE PROJECTS</span><strong>08</strong><small>Sample view · across workstreams</small><i>↗</i></div>
                <div className="portal-metric"><span>TASKS TO REVIEW</span><strong>12</strong><small>Sample view · pending action</small><i>◷</i></div>
                <div className="portal-metric"><span>REPORTS SUBMITTED</span><strong>24</strong><small>Sample view · this month</small><i>▤</i></div>
                <div className="portal-metric"><span>UPCOMING MEETINGS</span><strong>03</strong><small>Sample view · next 7 days</small><i>▦</i></div>
              </div>
              <div className="portal-columns">
                <section className="portal-panel">
                  <div className="panel-heading"><div><span className="eyebrow"><i /> ACTION REQUIRED</span><h2>Priority tasks</h2></div><button onClick={() => setActiveTab("My tasks")}>View all ↗</button></div>
                  <div className="task-list">
                    {tasks.slice(0, 4).map((task) => (
                      <label key={task.id} className={"task-row " + (task.status ? "task-done" : "")}>
                        <input type="checkbox" checked={task.status} onChange={() => toggleTask(task.id)} />
                        <span className="task-check" />
                        <span className="task-copy"><b>{task.title}</b><small>{task.owner}</small></span>
                        <span className="task-due">{task.due}</span>
                      </label>
                    ))}
                  </div>
                </section>
                <section className="portal-panel meeting-panel">
                  <div className="panel-heading"><div><span className="eyebrow"><i /> YOUR CALENDAR</span><h2>Upcoming meetings</h2></div><button onClick={() => setActiveTab("Meetings")}>Calendar ↗</button></div>
                  <div className="meeting-list">
                    {meetings.map((meeting) => (
                      <div className="meeting-row" key={meeting.title}><div className="meeting-date"><b>{meeting.day}</b><span>{meeting.month}</span></div><div><b>{meeting.title}</b><small>{meeting.time} · {meeting.place}</small></div></div>
                    ))}
                  </div>
                </section>
              </div>
              <section className="portal-panel field-panel">
                <div className="panel-heading"><div><span className="eyebrow"><i /> FIELD ACTIVITY</span><h2>Latest field submissions</h2></div><button onClick={() => setActiveTab("Field operations")}>Open field desk ↗</button></div>
                <div className="portal-table-wrap"><table className="portal-table"><thead><tr><th>ACTIVITY / LOCATION</th><th>PROGRAMME</th><th>SUBMITTED</th><th>STATUS</th></tr></thead><tbody>{fieldReports.map((report) => <tr key={report.location}><td>{report.location}</td><td>{report.programme}</td><td>{report.submitted}</td><td><span className={"status-label " + (report.review === "Reviewed" ? "status-green" : "status-amber")}>{report.review}</span></td></tr>)}</tbody></table></div>
              </section>
            </>
          ) : null}

          {activeTab === "My tasks" ? (
            <section className="portal-panel full-panel"><div className="panel-heading"><div><span className="eyebrow"><i /> WORK QUEUE</span><h2>Tasks & follow-ups</h2></div><button onClick={() => actionNotice("Task creation is available in the connected production workflow.")}>＋ New task</button></div><div className="task-list">{tasks.map((task) => <label key={task.id} className={"task-row " + (task.status ? "task-done" : "")}><input type="checkbox" checked={task.status} onChange={() => toggleTask(task.id)} /><span className="task-check" /><span className="task-copy"><b>{task.title}</b><small>{task.owner}</small></span><span className="task-due">{task.due}</span></label>)}</div></section>
          ) : null}

          {activeTab === "Attendance" ? (
            <section className="portal-panel full-panel">
              <div className="panel-heading"><div><span className="eyebrow"><i /> STAFF TIME & PRESENCE</span><h2>Attendance overview</h2></div><button onClick={() => actionNotice("Live clock-in, location controls and supervisor approval require the connected staff system.")}>＋ Record attendance</button></div>
              <div className="sample-banner"><b>Illustrative records</b><span>These examples are not actual CWGH staff attendance. Production attendance needs approved policies for working hours, corrections, leave and location privacy.</span></div>
              <div className="portal-table-wrap"><table className="portal-table"><thead><tr><th>STAFF MEMBER</th><th>TEAM</th><th>CHECK IN</th><th>CHECK OUT</th><th>STATUS</th></tr></thead><tbody>{attendanceRows.map((row) => <tr key={row.name}><td>{row.name}</td><td>{row.team}</td><td>{row.in}</td><td>{row.out}</td><td><span className="status-label status-green">{row.status}</span></td></tr>)}</tbody></table></div>
            </section>
          ) : null}

          {activeTab === "Notifications" ? (
            <section className="portal-panel full-panel"><div className="panel-heading"><div><span className="eyebrow"><i /> ALERT CENTRE</span><h2>Updates & reminders</h2></div><button onClick={() => actionNotice("Notification delivery will be enabled after email and calendar services are connected.")}>Notification settings</button></div><div className="meeting-list">{notifications.map((item) => <div className="meeting-row meeting-row-large" key={item.title}><div className="meeting-date"><b>•</b><span>NEW</span></div><div><b>{item.title}</b><small>{item.detail}</small><small>{item.when}</small></div></div>)}</div></section>
          ) : null}

          {activeTab === "Meetings" ? (
            <section className="portal-panel full-panel"><div className="panel-heading"><div><span className="eyebrow"><i /> ORGANISATIONAL CALENDAR</span><h2>Meetings & deadlines</h2></div><button onClick={() => actionNotice("Meeting creation would connect to CWGH's shared calendar.")}>＋ Schedule meeting</button></div><div className="meeting-list">{meetings.map((meeting) => <div className="meeting-row meeting-row-large" key={meeting.title}><div className="meeting-date"><b>{meeting.day}</b><span>{meeting.month}</span></div><div><b>{meeting.title}</b><small>{meeting.time} · {meeting.place}</small><small>Agenda and reminders can be shared with invited staff.</small></div><button onClick={() => actionNotice("Meeting details preview opened.")}>Details ↗</button></div>)}</div></section>
          ) : null}

          {activeTab === "Reports" ? (
            <section className="portal-panel full-panel"><div className="panel-heading"><div><span className="eyebrow"><i /> REPORTING CENTRE</span><h2>Reports & approvals</h2></div><button onClick={() => actionNotice("The report editor is a planned production feature.")}>＋ New report</button></div><div className="report-grid"><div className="report-card"><span>PROGRAMME REPORT</span><h3>Monthly programme summary</h3><p>Activity outputs, challenges, results and next steps.</p><b className="status-label status-amber">Awaiting review</b></div><div className="report-card"><span>FIELD REPORT</span><h3>Community visit report</h3><p>Location, visit purpose, people reached and observations.</p><b className="status-label status-green">Reviewed</b></div><div className="report-card"><span>MANAGEMENT REPORT</span><h3>Weekly management brief</h3><p>Progress, key decisions, risks and outstanding actions.</p><b className="status-label status-amber">Draft</b></div></div></section>
          ) : null}

          {activeTab === "Field operations" ? (
            <section className="portal-panel full-panel"><div className="panel-heading"><div><span className="eyebrow"><i /> FIELD DESK</span><h2>Community activity & monitoring</h2></div><button onClick={() => actionNotice("A secure field report form will be connected in the production release.")}>＋ Submit field report</button></div><div className="field-feature"><div className="field-map-placeholder"><span>⌖</span><b>FIELD ACTIVITY MAP</b><small>Map and GPS records will appear here when configured.</small></div><div className="field-feature-copy"><h3>Designed for teams on the move.</h3><p>Mobile-first check-ins, visit records, photographs, offline drafts and supervisor verification are planned for field officers and supervisors.</p><ul><li>Location and visit details</li><li>Community engagement records</li><li>Photo and document evidence</li><li>Offline draft and later sync</li></ul></div></div></section>
          ) : null}

          {activeTab === "Documents" ? (
            <section className="portal-panel full-panel"><div className="panel-heading"><div><span className="eyebrow"><i /> KNOWLEDGE & FILES</span><h2>Document library</h2></div><button onClick={() => actionNotice("Upload permissions and secure storage are part of the backend integration.")}>＋ Upload document</button></div><div className="resource-row"><div className="resource-number">01</div><div className="resource-copy"><span className="card-tag">PUBLIC RESOURCE</span><h3>CWGH Annual Report 2025</h3><p>Approved public annual report.</p></div><a className="resource-open" href="https://drive.google.com/file/d/1zs4ONsrwX-DPrkE0R4s-Cnucwy_9jqSr/view?usp=sharing" target="_blank" rel="noreferrer">↗</a></div><div className="resource-row"><div className="resource-number">02</div><div className="resource-copy"><span className="card-tag">PUBLIC RESOURCE</span><h3>2027 National Health Budget Position Paper</h3><p>Published CWGH policy resource.</p></div><a className="resource-open" href="https://docs.google.com/document/d/12lU5VAWW6DqLHumYFNGtS1BZ-0qSnW0C/edit?usp=sharing" target="_blank" rel="noreferrer">↗</a></div></section>
          ) : null}

          {activeTab === "Team & roles" ? (
            <section className="portal-panel full-panel"><div className="panel-heading"><div><span className="eyebrow"><i /> ACCESS STRUCTURE</span><h2>Team hierarchy & permissions</h2></div><button onClick={() => actionNotice("Only authorised administrators can create real staff accounts.")}>＋ Add employee</button></div><div className="role-grid">{roles.map((item, index) => <div className="role-card" key={item}><span>LEVEL 0{index + 1}</span><h3>{item}</h3><p>{["Organisation-wide oversight, strategy and final approvals.","Department oversight, resource coordination and review.","Programme delivery, milestones, budgets and team reports.","Field team supervision, quality checks and report verification.","Assigned activities, attendance and field or programme submissions.","Approved public communications, campaigns and media content.","Restricted finance workflows, reconciliations and budget reporting.","Technical configuration, access administration and security oversight."][index]}</p></div>)}</div></section>
          ) : null}

          <div className="portal-footnote">CWGH Staff Workspace · Preview build · Demonstration records only · Real authentication, data storage and permissions are not yet connected.</div>
        </div>
      </div>
    </main>
  );
}