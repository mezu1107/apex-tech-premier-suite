import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { BackToTop, MobileStickyCTA, ScrollProgress, WhatsAppButton } from "../components/site/Floaters";
import { AIChatbot } from "../components/site/AIChatbot";

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
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

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
      { title: "Adphira LLC — Empowering Businesses Through Smart Technology" },
      { name: "description", content: "Premium software, mobile, AI and cloud solutions that accelerate business growth." },
      { name: "author", content: "Adphira LLC" },
      { name: "theme-color", content: "#0A4B4F" },
      { property: "og:title", content: "Adphira LLC — Empowering Businesses Through Smart Technology" },
      { property: "og:description", content: "Premium software, mobile, AI and cloud solutions that accelerate business growth." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Adphira LLC" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Adphira LLC — Empowering Businesses Through Smart Technology" },
      { name: "twitter:description", content: "Premium software, mobile, AI and cloud solutions that accelerate business growth." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5cf8e153-d4c5-4239-baaf-25de8738d935/id-preview-68459d0c--b993533d-5164-47da-bf10-c44cf44e30b4.lovable.app-1784289810988.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5cf8e153-d4c5-4239-baaf-25de8738d935/id-preview-68459d0c--b993533d-5164-47da-bf10-c44cf44e30b4.lovable.app-1784289810988.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.jpg", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isChromeless = pathname.startsWith("/admin") || pathname.startsWith("/auth");

  return (
    <QueryClientProvider client={queryClient}>
      {!isChromeless && <ScrollProgress />}
      {!isChromeless && <Header />}
      <main className="min-h-screen">
        <Outlet />
      </main>
      {!isChromeless && <Footer />}
      {!isChromeless && <BackToTop />}
      {!isChromeless && <WhatsAppButton />}
      {!isChromeless && <AIChatbot />}
      {!isChromeless && <MobileStickyCTA />}
      {!isChromeless && <div className="h-16 lg:hidden" />}
    </QueryClientProvider>
  );
}
