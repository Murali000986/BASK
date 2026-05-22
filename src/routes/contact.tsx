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
      { title: "Contact — Northbeam Digital Agency Chennai" },
      { name: "description", content: "Start a project with Northbeam. Get in touch by form, email, phone or WhatsApp." },
    ],
  }),
});

type FormValues = {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
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
    defaultValues: { service: "Web Development", budget: "₹2L – ₹5L" },
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    console.log("Contact submission", data);
    setSent(true);
    reset();
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
                <Field label="Budget" className="sm:col-span-2">
                  <select {...register("budget")} className="input">
                    {["< ₹2L","₹2L – ₹5L","₹5L – ₹15L","₹15L+","Not sure yet"].map((o) => (
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
            <InfoCard icon={MapPin} title="Studio">
              Northbeam Studio<br />Anna Salai, Chennai, India
            </InfoCard>
            <InfoCard icon={Mail} title="Email">
              <a href="mailto:hello@northbeam.studio" className="hover:text-ink">hello@northbeam.studio</a>
            </InfoCard>
            <InfoCard icon={Phone} title="Phone">
              <a href="tel:+919800000000" className="hover:text-ink">+91 98000 00000</a>
            </InfoCard>

            <a
              href="https://wa.me/919800000000"
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

            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
              <div className="relative aspect-[4/3] w-full bg-[radial-gradient(60%_60%_at_50%_50%,#dbeafe,#f1f5f9)]">
                <div className="absolute inset-0 grid-faint" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-lift">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <p className="mt-2 font-display text-[15px] font-700 text-ink">Chennai, India</p>
                  <p className="text-[12px] text-ink-muted">13.0827° N, 80.2707° E</p>
                </div>
              </div>
            </div>
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
