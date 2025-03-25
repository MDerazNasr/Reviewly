"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/language-context";

const formSchema = z.object({
  concern: z.string().min(10, {
    message: "Concern must be at least 10 characters.",
  }),
});

export default function ConcernForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concern: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulate a form submission delay
    setTimeout(() => {
      // In a real app, this would send data to an API
      console.log(values);

      // Redirect to thank you page
      router.push("/thank-you");
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="concern"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">{t("describeConcern")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("tellWhatHappened")}
                  className="resize-none h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            type="submit"
            className={`w-full custom-primary-button font-bold py-2 px-4 rounded ${isSubmitting ? 'opacity-70' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? t("submitting") : t("submitConcern")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
