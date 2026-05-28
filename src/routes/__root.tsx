import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { AiChatWidget } from "@/components/site/AiChatWidget";

import appCss from "../styles.css?url";

const GOOGLE_CLIENT_ID = "324285586332-k7ej66de4ug77d50bfbuctl9splfmumc.apps.googleusercontent.com";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index, follow" },
      { name: "googlebot", content: "index, follow" },
      { name: "theme-color", content: "#4f46e5" },
      { name: "author", content: "BASK" },
      {
        name: "keywords",
        content:
          "BASK, BASK digital agency, BASK web development, BASK web dev, BASK web service dev, BASK web service development, BASK digital marketing, bask studio, digital marketing agency, web development company, web design, software development, video production, ecommerce website, SEO agency, social media marketing, brand design, UI UX design",
      },
      // Open Graph
      { property: "og:site_name", content: "BASK" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bask.studio" },
      { property: "og:title", content: "BASK — Digital Agency | Web Dev, Digital Marketing & Web Services" },
      {
        property: "og:description",
        content:
          "BASK is a full-service digital agency offering web development, digital marketing, web service development, video production, software development and ecommerce. Helping brands grow worldwide.",
      },
      { property: "og:image", content: "https://bask.studio/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "BASK Digital Agency — Web Development, Digital Marketing & Web Services" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@baskstudio" },
      { name: "twitter:title", content: "BASK — Digital Agency | Web Dev, Digital Marketing & Web Services" },
      {
        name: "twitter:description",
        content:
          "BASK is a full-service digital agency offering web development, digital marketing, web service development, video production, software development and ecommerce. Helping brands grow worldwide.",
      },
      { name: "twitter:image", content: "https://bask.studio/og-image.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://bask.studio" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Organization", "ProfessionalService"],
          name: "BASK",
          alternateName: ["BASK Digital Agency", "BASK Studio", "BASK Digital Marketing", "BASK Web Service Dev"],
          url: "https://bask.studio",
          logo: "https://bask.studio/bask-logo.jpg",
          image: "https://bask.studio/og-image.jpg",
          description:
            "BASK is a full-service digital agency offering web development, digital marketing, web service development, video production, software development and ecommerce. Helping modern brands grow worldwide.",
          slogan: "One studio. Everything a modern brand needs.",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-9042846208",
            email: "murali701081@gmail.com",
            contactType: "customer service",
            availableLanguage: "English",
          },
          sameAs: [
            "https://www.instagram.com/mr_dine_tn29/",
            "https://www.linkedin.com/in/murali-n-8316b0390/",
            "https://www.youtube.com/@dineshvlogs..2",
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "BASK Services",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "BASK Digital Marketing", description: "Performance marketing, SEO, social media and content programs that compound." } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "BASK Web Service Development", description: "End-to-end web service development including REST APIs, full-stack web apps and SaaS products." } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "BASK Web Development", description: "Marketing sites and product surfaces built with React, Next.js and TanStack." } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "BASK Video Production", description: "End-to-end video production for brand films and ad creative." } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "BASK Software Development", description: "Internal tools, dashboards and SaaS products built to scale." } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "BASK Ecommerce Development", description: "Conversion-led storefronts on Shopify and headless stacks." } },
            ],
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <AiChatWidget />
        </QueryClientProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
