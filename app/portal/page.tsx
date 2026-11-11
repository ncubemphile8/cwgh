"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CWGH_LOGO } from "../data";

export default function PortalLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username.trim().toLowerCase() === "cwgh" && password === "cwgh2026") {
      sessionStorage.setItem("cwgh-demo-session", "active");
      sessionStorage.setItem("cwgh-demo-role", "Executive Director");
      router.push("/portal/dashboard");
      return;
    }
    setError("Those demonstration credentials do not match. Please try again.");
  }

  return (
    <main className="portal-login-page">
      <div className="portal-login-backdrop" />
      <div className="container portal-login-wrap">
        <div className="portal-login-aside">
          <Link href="/" className="portal-back">← Back to public website</Link>
          <div className="portal-lockup"><img src={CWGH_LOGO} alt="CWGH logo" /><span>STAFF PORTAL</span></div>
          <span className="eyebrow eyebrow-light"><i /> INTERNAL WORKSPACE</span>
          <h1>One organisation.<br /><em>Working together.</em></h1>
          <p>A connected workspace for CWGH teams, programme activity, meetings, reports and community field operations.</p>
          <div className="portal-role-preview">
            <span>DESIGNED FOR EVERY LEVEL</span>
            <div>Executive leadership <i>·</i> Programme teams <i>·</i> Field staff</div>
          </div>
        </div>
        <div className="login-card">
          <div className="login-card-head">
            <span className="login-icon">↗</span>
            <span className="eyebrow"><i /> SECURE STAFF ACCESS</span>
            <h2>Welcome back.</h2>
            <p>Sign in to your CWGH workspace.</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="username">Username</label>
            <input id="username" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter your username" required />
            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input id="password" autoComplete="current-password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required />
              <button type="button" onClick={() => setShowPassword((shown) => !shown)}>{showPassword ? "Hide" : "Show"}</button>
            </div>
            {error ? <p className="login-error" role="alert">{error}</p> : null}
            <button className="button button-orange login-submit" type="submit">Sign in to workspace <span>↗</span></button>
          </form>
          <div className="demo-note">
            <strong>Demonstration access</strong>
            <span>Username: <b>cwgh</b></span>
            <span>Password: <b>cwgh2026</b></span>
            <p>Preview credentials only. This sample login is not production authentication and must be replaced with individual, server-verified staff accounts before real employee data is used.</p>
          </div>
          <div className="login-privacy">This preview contains sample workflow data only. No real employee or beneficiary records are stored.</div>
        </div>
      </div>
    </main>
  );
}