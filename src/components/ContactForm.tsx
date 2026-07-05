import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Send } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const MOTIFS = [
  "Question générale",
  "Commande groupe / événement",
  "Allergènes / intolérances",
  "Privatisation terrasse",
  "Autre",
] as const;

const NEEDS_DATE = new Set<string>([
  "Commande groupe / événement",
  "Privatisation terrasse",
]);

const schema = z
  .object({
    name: z.string().trim().min(2, "Votre nom est requis").max(100),
    phone: z
      .string()
      .trim()
      .min(6, "Téléphone requis")
      .max(30)
      .regex(/^[0-9+()\s.-]+$/, "Numéro invalide"),
    email: z
      .string()
      .trim()
      .max(255)
      .email("Email invalide")
      .optional()
      .or(z.literal("")),
    motif: z.enum(MOTIFS, { required_error: "Sélectionnez un motif" }),
    date: z.date().optional(),
    message: z.string().trim().min(5, "Message trop court").max(1000),
    consent: z.literal(true, {
      errorMap: () => ({ message: "Consentement requis" }),
    }),
    // honeypot
    website: z.string().max(0).optional(),
  })
  .refine(
    (v) => !NEEDS_DATE.has(v.motif) || v.date instanceof Date,
    { path: ["date"], message: "Date souhaitée requise" },
  );

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      website: "",
      consent: false as unknown as true,
    },
  });

  const motif = form.watch("motif");
  const showDate = motif && NEEDS_DATE.has(motif);

  async function onSubmit(values: FormValues) {
    if (values.website && values.website.length > 0) {
      // honeypot triggered — silently succeed
      setSent(true);
      return;
    }
    setSubmitting(true);
    try {
      // Placeholder: log payload. Branchez ici votre backend / email.
      await new Promise((r) => setTimeout(r, 600));
      setSent(true);
      form.reset();
      toast.success("Message envoyé", {
        description: "Merci, nous revenons vers vous sous 24-48h.",
      });
    } catch {
      toast.error("Une erreur est survenue. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="p-8 bg-background border border-border/60 text-center">
        <h3 className="font-display text-2xl mb-3">Merci !</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Nous avons bien reçu votre message. Nous revenons vers vous sous 24-48h.
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => setSent(false)}
        >
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-8 bg-background border border-border/60 text-left space-y-5"
        noValidate
      >
        {/* Honeypot */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
        >
          <label>
            Ne pas remplir
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...form.register("website")}
            />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom *</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone *</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="06 12 34 56 78"
                    autoComplete="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (optionnel)</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="vous@exemple.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="motif"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motif de la demande *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisissez un motif" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MOTIFS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {showDate && (
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date souhaitée *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full md:w-[280px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "PPP", { locale: fr })
                          : "Choisir une date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                      locale={fr}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Dites-nous tout…"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm text-muted-foreground font-normal">
                  J'accepte que mes informations soient utilisées pour me
                  recontacter. *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary-glow transition h-auto"
          >
            <Send className="w-4 h-4" />
            {submitting ? "Envoi…" : "Envoyer le message"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
