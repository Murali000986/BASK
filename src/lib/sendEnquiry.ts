import { createServerFn } from "@tanstack/react-start";
import { sendEmail } from "@/utils/replitmail";

export type EnquiryData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  stage: string;
  source: string;
};

const serviceMap: Record<string, string> = {
  web: "Website Design",
  ecommerce: "Ecommerce Store",
  campaign: "Brand Campaign",
  video: "Video Production",
  software: "Software / App",
};
const timelineMap: Record<string, string> = {
  asap: "ASAP (within a month)",
  "1-3m": "1 – 3 months",
  "3-6m": "3 – 6 months",
  flexible: "Just exploring",
};
const stageMap: Record<string, string> = {
  early: "Early-stage startup",
  growing: "Growing brand",
  established: "Established business",
  enterprise: "Enterprise",
};
const sourceMap: Record<string, string> = {
  google: "Google search",
  social: "Social media",
  referral: "A referral",
  other: "Somewhere else",
};

export const sendEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as EnquiryData)
  .handler(async ({ data }) => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    body{font-family:Arial,sans-serif;background:#f8fafc;margin:0;padding:0}
    .wrap{max-width:560px;margin:32px auto;background:#fff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden}
    .header{background:#0f172a;padding:28px 32px}
    .header h1{color:#fff;font-size:20px;margin:0;font-weight:700}
    .header p{color:#94a3b8;font-size:13px;margin:4px 0 0}
    .body{padding:28px 32px}
    .row{padding:10px 0;border-bottom:1px solid #f1f5f9;display:flex;gap:16px}
    .row:last-child{border-bottom:none}
    .label{color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;width:130px;flex-shrink:0;padding-top:2px}
    .value{color:#0f172a;font-size:14px;font-weight:500}
    .footer{background:#f8fafc;padding:16px 32px;text-align:center;color:#94a3b8;font-size:12px}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>New Project Enquiry</h1>
      <p>Submitted via Northbeam website onboarding</p>
    </div>
    <div class="body">
      <div class="row"><span class="label">Name</span><span class="value">${data.name}</span></div>
      <div class="row"><span class="label">Email</span><span class="value">${data.email}</span></div>
      <div class="row"><span class="label">Phone</span><span class="value">${data.phone}</span></div>
      <div class="row"><span class="label">Service</span><span class="value">${serviceMap[data.service] ?? data.service}</span></div>
      <div class="row"><span class="label">Budget</span><span class="value">${data.budget}</span></div>
      <div class="row"><span class="label">Timeline</span><span class="value">${timelineMap[data.timeline] ?? data.timeline}</span></div>
      <div class="row"><span class="label">Business Stage</span><span class="value">${stageMap[data.stage] ?? data.stage}</span></div>
      <div class="row"><span class="label">Found via</span><span class="value">${sourceMap[data.source] ?? data.source}</span></div>
    </div>
    <div class="footer">Northbeam Studio · Chennai · northbeam.studio</div>
  </div>
</body>
</html>`;

    const text = `New Project Enquiry — Northbeam

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${serviceMap[data.service] ?? data.service}
Budget: ${data.budget}
Timeline: ${timelineMap[data.timeline] ?? data.timeline}
Business Stage: ${stageMap[data.stage] ?? data.stage}
Found via: ${sourceMap[data.source] ?? data.source}`;

    await sendEmail({
      subject: `New Enquiry: ${data.name} — ${serviceMap[data.service] ?? data.service}`,
      html,
      text,
    });

    return { ok: true };
  });
