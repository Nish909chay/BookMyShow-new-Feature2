---

## 🧠 Design Evolution

<table>
  <thead>
    <tr>
      <th>Attempt</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Instant SMS (In-Memory)</strong></td>
      <td>Initial logic using <code>setTimeout</code> to delay SMS by 1 min; not production safe</td>
    </tr>
    <tr>
      <td><strong>Redis + Cron (Upstash)</strong></td>
      <td>Attempted Redis queue with Upstash and Vercel cron — not supported on free tier</td>
    </tr>
    <tr>
      <td><strong>GitHub Actions</strong></td>
      <td>Final working system uses GitHub Actions every minute to trigger <code>/api/sms-cron</code> via secure endpoint</td>
    </tr>
  </tbody>
</table>

---

## 🏗️ System Design (WIP)

<table>
  <tr>
    <th>What BookMyShow Would Need to Implement Such a Service</th>
    <th>My System Design</th>
  </tr>
  <tr>
    <td style="vertical-align:top; min-width:240px;">
      <!-- Add later: Leave space for BookMyShow's system requirements -->
      <br><br><br>
    </td>
    <td style="vertical-align:top;">
      <ul>
        <li><strong>Enterprise-grade SMS pipeline</strong>: <code>GitHub Actions</code> as CRON trigger</li>
        <li><strong>Persistent message queue (e.g., Kafka)</strong>: <code>Redis</code> (initially attempted with Upstash)</li>
        <li><strong>Scalable job scheduler</strong>: <code>GitHub Actions</code> (every 1 min)</li>
        <li><strong>Fault tolerance, retry logic</strong>: Basic validation and logging</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🧪 Testing & Verification

- SMS received after 1-minute delay ✅  
- Environment variables injected via GitHub + Vercel + Local `.env` ✅  
- Protected `/api/sms-cron` with Bearer token for GitHub Workflow ✅  
- Logging in both local and cloud environments ✅  

---

## 🔒 Security Measures

- No secrets in code
- All secrets managed via `.env`, Vercel, GitHub Actions Secrets
- `/api/sms-cron` protected with Bearer token (`SMS_CRON_SECRET`)
- SMS logic only executes if request is authenticated

---

## 📝 Future Improvements

- Move SMS queue to Redis or Durable KV
- Add retry logic for failed SMS
- Build dashboard to monitor queued and sent messages
- Optimize logging for production

---
