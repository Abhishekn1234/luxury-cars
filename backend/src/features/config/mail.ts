import fetch from "node-fetch"; // npm i node-fetch@2
import dotenv from "dotenv";

dotenv.config();

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

// Formspree response type
interface FormspreeResponse {
  ok: boolean;
  error?: string;
  [key: string]: any;
}

export async function sendSimpleMessage(options: MailOptions) {
  try {
    const response = await fetch("https://formspree.io/f/xvzpwygr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: options.from,
        email: options.to,
        subject: options.subject,
        message: options.text ?? options.html ?? "",
      }),
    });

    // Cast unknown JSON to FormspreeResponse
    const result = (await response.json()) as FormspreeResponse;

    if (!response.ok) {
      console.warn("Formspree warning:", result.error || "Unknown error");
    } else {
      console.log("Formspree submission successful:", result);
    }
  } catch (error) {
    console.error("Formspree error:", error);
    throw error;
  }
}
