import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { Mail, MapPin, Phone, MessageCircle, ArrowUpRight, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact BASK — Hire a Digital Marketing & Web Dev Agency | bask.studio" },
      {
        name: "description",
        content:
          "Contact BASK to start your web development, digital marketing, web service development or video production project. Book a free call or send us a message — we reply within one business day.",
      },
      {
        name: "keywords",
        content:
          "contact BASK, hire BASK, BASK digital marketing inquiry, BASK web service dev inquiry, BASK web development, start a project with BASK, book free call BASK",
      },
      { property: "og:title", content: "Contact BASK — Start Your Digital Marketing or Web Dev Project" },
      { property: "og:description", content: "Get in touch with BASK. We build websites, run digital marketing and develop web services for modern brands worldwide." },
      { property: "og:url", content: "https://bask.studio/contact" },
      { property: "og:image", content: "https://bask.studio/og-image.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://bask.studio/contact" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact BASK Digital Agency",
          url: "https://bask.studio/contact",
          description: "Contact BASK for web development, digital marketing and web service development projects.",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-9042846208",
            email: "murali701081@gmail.com",
            contactType: "customer service",
            availableLanguage: "English",
          },
        }),
      },
    ],
  }),
});

type FormValues = {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
};

function ContactPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: { service: "Web Development" },
  });

  const onSubmit = async (data: FormValues) => {
    const payload = {
      access_key: "3f46e85b-3694-456d-b536-7cd0dfc3d6ce",
      ...data,
      subject: "New Contact Form Submission - BASK",
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error("Fetch failed");
      
      setSent(true);
      reset();
    } catch (error) {
      console.warn("Submission error:", error);
      alert("Failed to send. Please try again later.");
    }
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Tell us about your project."
        subtitle="Share a few details and we'll get back within one business day. Prefer talking? Use WhatsApp or book a call directly."
      />

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-soft md:p-10">
            {sent ? (
              <div className="flex flex-col items-start gap-3 py-10">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-soft text-brand">
                  <Check className="h-6 w-6" />
                </span>
                <h3 className="font-display text-[22px] font-700 text-ink">Message received.</h3>
                <p className="text-[15px] text-ink-muted">
                  Thanks — we'll get back within one business day.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 rounded-full border border-line bg-white px-4 py-2 text-[13.5px] font-500 text-ink hover:bg-surface-muted"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" error={errors.name?.message}>
                  <input
                    {...register("name", { required: "Required" })}
                    className="input"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Required",
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                    })}
                    className="input"
                    placeholder="you@brand.com"
                  />
                </Field>
                <Field label="Company (optional)">
                  <input {...register("company")} className="input" placeholder="Brand or company" />
                </Field>
                <Field label="Service">
                  <select {...register("service")} className="input">
                    {["Web Development","Ecommerce","Software Development","Digital Marketing","Video Production","Video Editing","Other"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Project details" error={errors.message?.message} className="sm:col-span-2">
                  <textarea
                    rows={5}
                    {...register("message", { required: "Required", minLength: { value: 10, message: "Tell us a bit more" } })}
                    className="input resize-none"
                    placeholder="What are you building? Timelines, goals, anything we should know."
                  />
                </Field>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3.5 text-[15px] font-500 text-white shadow-soft transition-all hover:shadow-lift disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="space-y-4">

            <InfoCard icon={Mail} title="Email">
              <a href="mailto:murali701081@gmail.com" className="hover:text-ink">murali701081@gmail.com</a>
            </InfoCard>
            <InfoCard icon={Phone} title="Phone">
              <a href="tel:+919042846208" className="hover:text-ink">+91-9042846208</a>
            </InfoCard>

            <a
              href="https://wa.me/919042846208"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 transition-all hover:shadow-soft"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-[15px] font-700 text-ink">Chat on WhatsApp</p>
                  <p className="text-[12.5px] text-ink-muted">Usually replies in under 30 minutes</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label, children, error, className = "",
}: { label: string; children: React.ReactNode; error?: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[12.5px] font-600 uppercase tracking-wider text-ink-muted">{label}</span>
      {children}
      {error && <span className="mt-1 block text-[12.5px] text-destructive">{error}</span>}
    </label>
  );
}

function InfoCard({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-soft">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-soft text-brand">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[12.5px] font-600 uppercase tracking-wider text-ink-muted">{title}</p>
          <div className="mt-1 text-[14.5px] text-ink-soft">{children}</div>
        </div>
      </div>
    </div>
  );
}
