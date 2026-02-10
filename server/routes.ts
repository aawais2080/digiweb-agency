import type { Express } from "express";
import { createServer, type Server } from "http";
import { Resend } from "resend";

const RECIPIENT_EMAIL = "hello@digiweb-agency.com";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, company, service, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }

      const resend = getResend();

      const serviceLabels: Record<string, string> = {
        "web-development": "Web Development",
        "graphic-design": "Graphic Design",
        "video-editing": "Video Editing",
        "seo": "SEO Optimization",
        "sem": "SEM Marketing",
      };

      await resend.emails.send({
        from: "Digiweb Contact Form <onboarding@resend.dev>",
        to: RECIPIENT_EMAIL,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Company</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${company || "Not provided"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Service</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${serviceLabels[service] || service}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Message</td><td style="padding: 8px;">${message.replace(/\n/g, "<br>")}</td></tr>
          </table>
          <p style="margin-top: 16px; color: #888; font-size: 12px;">Sent from Digiweb Agency website contact form</p>
        `,
        replyTo: email,
      });

      return res.json({ success: true });
    } catch (error: any) {
      console.error("Contact form error:", error);
      return res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
  });

  app.post("/api/contact/quick", async (req, res) => {
    try {
      const { name, phone, projectName } = req.body;

      if (!name || !phone) {
        return res.status(400).json({ error: "Name and phone are required." });
      }

      const resend = getResend();

      await resend.emails.send({
        from: "Digiweb Quick Contact <onboarding@resend.dev>",
        to: RECIPIENT_EMAIL,
        subject: `Quick Contact Request${projectName ? ` - Similar to ${projectName}` : ""}`,
        html: `
          <h2>Quick Contact Request</h2>
          ${projectName ? `<p><strong>Interested in a project similar to:</strong> ${projectName}</p>` : ""}
          <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>
          </table>
          <p style="margin-top: 16px; color: #888; font-size: 12px;">Sent from Digiweb Agency website - project detail page</p>
        `,
      });

      return res.json({ success: true });
    } catch (error: any) {
      console.error("Quick contact form error:", error);
      return res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
  });

  return httpServer;
}
