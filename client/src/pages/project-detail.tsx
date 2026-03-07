import { useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ExternalLink, ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";
import { projects } from "@/data/portfolio";

function ProjectContactForm({ projectName }: { projectName: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const currentUrl = window.location.href;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "50fc39da-a0c2-42b3-9cbd-7168deaffd48",
          subject: `Portfolio Lead: Interested in ${projectName}`,
          from_name: "DigiWeb Portfolio",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || "Not provided",
          project_interest: projectName,
          page_url: currentUrl,
          message: `User is interested in a project similar to: ${projectName}. 
                    \nCompany: ${formData.company || "N/A"}
                    \nURL: ${currentUrl}`,
          replyto: formData.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Details sent! We'll contact you shortly.");
        setFormData({ name: "", email: "", phone: "", company: "" });
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 p-8 bg-white rounded-2xl border border-border/50 shadow-sm">
      <h3 className="text-xl font-bold mb-1 text-foreground">
        Want a similar website as {projectName}?
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Fill out this quick form and we'll get back to you within one business
        day.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="rounded-lg border-border focus:border-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Work Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded-lg border-border focus:border-primary h-11"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Phone Number *
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+92 3XX XXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              required
              className="rounded-lg border-border focus:border-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="company"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Company Name
            </Label>
            <Input
              id="company"
              name="company"
              placeholder="e.g. DigiWeb Agency"
              value={formData.company}
              onChange={handleChange}
              className="rounded-lg border-border focus:border-primary h-11"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto rounded-full px-8 h-12 bg-primary hover:bg-primary/90 text-white font-bold transition-all"
        >
          {isSubmitting ? (
            "Sending Inquiry..."
          ) : (
            <>
              Get a Similar Quote <Send className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);

  const recentProjects = useMemo(
    () => projects.filter((p) => p.slug !== slug).slice(0, 3),
    [slug],
  );

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 pb-24 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Project Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link href="/our-work">
            <Button className="rounded-full">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Our Work
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4">
          <Link
            href="/our-work"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to all projects
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="rounded-2xl overflow-hidden bg-white border border-border/50 shadow-sm">
              <img
                src={project.image}
                alt={project.name}
                className="w-full aspect-[16/10] object-cover"
              />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-[1.1]">
                {project.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {project.description}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Type
                  </h3>
                  <p className="text-foreground">{project.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Category
                  </h3>
                  <p className="text-foreground">{project.category}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Services Delivered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="bg-secondary/20 text-foreground text-sm px-3 py-1.5 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-bold hover:underline mb-4"
              >
                Visit the live website <ExternalLink size={16} />
              </a>

              <ProjectContactForm projectName={project.name} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Recent <span className="text-primary">projects</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {recentProjects.map((p) => (
              <Link key={p.id} href={`/our-work/${p.slug}`}>
                <div className="group cursor-pointer">
                  <div className="relative rounded-2xl overflow-hidden bg-white border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full text-muted-foreground">
                        {p.type}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 px-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <ExternalLink
                        size={14}
                        className="text-muted-foreground"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {p.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
