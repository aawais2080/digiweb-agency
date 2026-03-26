import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { Suspense, lazy } from "react"; // Add these
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// 1. Create a Dynamic Canonical Component
const CanonicalTag = () => {
  const [location] = useLocation();
  // This constructs the clean URL without the messy query parameters
  const canonicalUrl = `https://digiweb-agency.com${location === "/" ? "" : location}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};
// Lazy load your pages
const Home = lazy(() => import("@/pages/home"));
const Services = lazy(() => import("@/pages/services"));
const OurWork = lazy(() => import("@/pages/our-work"));
const ProjectDetail = lazy(() => import("@/pages/project-detail"));
const Team = lazy(() => import("@/pages/team"));
const Process = lazy(() => import("@/pages/process"));
const Contact = lazy(() => import("@/pages/contact"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/our-work" component={OurWork} />
        <Route path="/our-work/:slug" component={ProjectDetail} />
        <Route path="/team" component={Team} />
        <Route path="/process" component={Process} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
