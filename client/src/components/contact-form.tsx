import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactForm({ open, onOpenChange }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "web-development",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceLabels: Record<string, string> = {
      "web-development": "Web Development",
      "graphic-design": "Graphic Design",
      "video-editing": "Video Editing",
      seo: "SEO Optimization",
      sem: "SEM Marketing",
    };

    try {
      // Integration with your Web3Forms Key
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "50fc39da-a0c2-42b3-9cbd-7168deaffd48",
          subject: `Popup Form Inquiry from ${formData.name}`,
          from_name: "Digiweb Agency (Popup Form)",
          name: formData.name,
          email: formData.email,
          company: formData.company || "Not provided",
          service: serviceLabels[formData.service] || formData.service,
          message: formData.message,
          replyto: formData.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Thanks for reaching out! We'll get back to you soon.");
        // Clear form and close modal
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "web-development",
          message: "",
        });
        onOpenChange(false);
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Let's work together
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Tell us about your project and we'll get back to you within 24
            hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="popup-name" className="text-foreground font-medium">
              Your Name
            </Label>
            <Input
              id="popup-name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-border focus:border-primary h-11"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="popup-email"
              className="text-foreground font-medium"
            >
              Email
            </Label>
            <Input
              id="popup-email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-border focus:border-primary h-11"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="popup-company"
                className="text-foreground font-medium"
              >
                Company
              </Label>
              <Input
                id="popup-company"
                name="company"
                placeholder="Optional"
                value={formData.company}
                onChange={handleChange}
                className="border-border focus:border-primary h-11"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="popup-service"
                className="text-foreground font-medium"
              >
                Service
              </Label>
              <select
                id="popup-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-primary bg-background text-foreground h-11 text-sm"
              >
                <option value="web-development">Web Development</option>
                <option value="graphic-design">Graphic Design</option>
                <option value="video-editing">Video Editing</option>
                <option value="seo">SEO Optimization</option>
                <option value="sem">SEM Marketing</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="popup-message"
              className="text-foreground font-medium"
            >
              Message
            </Label>
            <Textarea
              id="popup-message"
              name="message"
              placeholder="Briefly describe your project goals..."
              value={formData.message}
              onChange={handleChange}
              required
              className="border-border focus:border-primary min-h-24 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-full border-border hover:bg-accent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
