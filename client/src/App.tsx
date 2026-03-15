import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";

// Lazy load the pages
const Home = lazy(() => import("@/pages/home"));
const Services = lazy(() => import("@/pages/services"));
const Process = lazy(() => import("@/pages/process"));
const Team = lazy(() => import("@/pages/team"));
const Contact = lazy(() => import("@/pages/contact"));
const OurWork = lazy(() => import("@/pages/our-work"));
const ProjectDetail = lazy(() => import("@/pages/project-detail"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    // Suspense shows a fallback (like a spinner or empty div) while the page chunk loads
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/process" component={Process} />
        <Route path="/team" component={Team} />
        <Route path="/our-work" component={OurWork} />
        <Route path="/our-work/:slug" component={ProjectDetail} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <SonnerToaster position="top-right" richColors />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
