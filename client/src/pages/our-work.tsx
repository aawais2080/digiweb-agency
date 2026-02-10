import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, ChevronDown, X } from "lucide-react";
import { projects, categories, types, designs, addOns, brandings } from "@/data/portfolio";

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const isActive = value !== "All";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
          isActive
            ? "bg-primary text-white border-primary"
            : "bg-white border-border text-foreground hover:border-primary/50"
        }`}
      >
        {isActive ? value : label}
        {isActive ? (
          <X
            size={14}
            className="ml-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onChange("All");
            }}
          />
        ) : (
          <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-border py-2 min-w-[200px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  value === option
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function OurWork() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [designFilter, setDesignFilter] = useState("All");
  const [addOnFilter, setAddOnFilter] = useState("All");
  const [brandingFilter, setBrandingFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (categoryFilter !== "All" && project.category !== categoryFilter) return false;
      if (typeFilter !== "All" && project.type !== typeFilter) return false;
      if (designFilter !== "All" && project.design !== designFilter) return false;
      if (addOnFilter !== "All" && project.addOn !== addOnFilter) return false;
      if (brandingFilter !== "All" && project.branding !== brandingFilter) return false;
      return true;
    });
  }, [categoryFilter, typeFilter, designFilter, addOnFilter, brandingFilter]);

  const activeFilterCount = [categoryFilter, typeFilter, designFilter, addOnFilter, brandingFilter].filter(
    (f) => f !== "All"
  ).length;

  const clearAllFilters = () => {
    setCategoryFilter("All");
    setTypeFilter("All");
    setDesignFilter("All");
    setAddOnFilter("All");
    setBrandingFilter("All");
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1]">
            Projects we're <span className="text-primary italic">proud</span> of
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore all completed projects we're proud to showcase. Filter to find your ideal project type.
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <FilterDropdown label="Category" options={categories} value={categoryFilter} onChange={setCategoryFilter} />
            <FilterDropdown label="Type" options={types} value={typeFilter} onChange={setTypeFilter} />
            <FilterDropdown label="Design" options={designs} value={designFilter} onChange={setDesignFilter} />
            <FilterDropdown label="Add-On" options={addOns} value={addOnFilter} onChange={setAddOnFilter} />
            <FilterDropdown label="Branding" options={brandings} value={brandingFilter} onChange={setBrandingFilter} />

            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 px-4 py-2.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear all ({activeFilterCount})
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-4">No projects match your current filters.</p>
              <Button variant="outline" className="rounded-full" onClick={clearAllFilters}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Link key={project.id} href={`/our-work/${project.slug}`}>
                  <div className="group cursor-pointer">
                    <div className="relative rounded-2xl overflow-hidden bg-white border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-[16/10] overflow-hidden bg-muted">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full text-muted-foreground">
                          {project.type}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 px-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <ExternalLink size={14} className="text-muted-foreground" />
                      </div>
                      <span className="text-sm text-muted-foreground">{project.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight mb-6">
            Ready to become our next <span className="text-primary">success story</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Let's discuss how we can bring your project to life with the same dedication and quality.
          </p>
          <Link href="/contact">
            <Button size="lg" className="rounded-full text-lg px-8 h-14 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
              Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
