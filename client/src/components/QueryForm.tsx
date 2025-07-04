import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  itsNumber: z.string().min(1, "ITS Number is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().optional(), // ✅ Email optional
  whatsappNumber: z.string().min(10, "Please enter a valid mobile number"),
  jamaat: z.enum(["Najmi", "Saifee", "Taiyebi", "Hakimi", "Ibrahimi","Muffadal Park" ,"Mehaman"], {
    required_error: "Please select your Jamaat",
  }),
  category: z.enum(["Accommodation", "Relay Zone","Mawaid", "Others"], {
    required_error: "Please select a category",
  }),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function QueryForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itsNumber: "",
      name: "",
      email: "",
      whatsappNumber: "",
      jamaat: undefined,
      category: undefined,
      subject: "",
      description: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const GOOGLE_APPS_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbw4g0gGoWM6FTJHjQWAXGDciQ8nlD7rOQa3owzSwjGGpMsOnaBeeovu2nSofVjSSUl8Uw/exec";

      const formData = new FormData();
      formData.append("itsNumber", data.itsNumber);
      formData.append("name", data.name);
      formData.append("email", data.email || "");
      formData.append("whatsappNumber", data.whatsappNumber);
      formData.append("jamaat", data.jamaat);
      formData.append("category", data.category);
      formData.append("subject", data.subject);
      formData.append("description", data.description);

      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      if (result.toLowerCase().includes("success")) {
        return { success: true, result };
      } else {
        throw new Error("Google Sheets submission failed");
      }
    },
    onSuccess: () => {
      toast({
        title: "Query Submitted Successfully!",
        description:
          "Your query has been saved to the database. You will receive a response shortly.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit query. Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await submitMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="submit-query" className="bg-white rounded-lg material-shadow-2 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Submit Your Query</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
         Have a question or need assistance? Fill out the form below and our support team will get back to you as soon as possible. <b>Please do not submit queries related to zone change.</b>
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* ITS Number & Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="itsNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ITS Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your ITS Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email & WhatsApp */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number *</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 border border-r-0 bg-gray-100 text-gray-500 rounded-l-md text-sm">
                          +91
                        </span>
                        <Input
                          type="tel"
                          placeholder="1234567890"
                          className="rounded-l-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Jamaat & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="jamaat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jamaat *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your Jamaat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Najmi">Najmi</SelectItem>
                        <SelectItem value="Saifee">Saifee</SelectItem>
                        <SelectItem value="Taiyebi">Taiyebi</SelectItem>
                        <SelectItem value="Hakimi">Hakimi</SelectItem>
                        <SelectItem value="Ibrahimi">Ibrahimi</SelectItem>
                        <SelectItem value="Muffadal Park">Muffadal Park</SelectItem>
                        <SelectItem value="Mehaman">Mehaman</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Accommodation">Accommodation</SelectItem>
                        <SelectItem value="Relay Zone">Relay Zone</SelectItem>
                        <SelectItem value="Mawaid">Mawaid</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Subject */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject *</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief subject of your query" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Provide full details of your query"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button type="submit" disabled={isSubmitting} className="px-6 py-3">
                {isSubmitting ? (
                  <>
                    <span className="material-icons animate-spin mr-2">refresh</span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <span className="material-icons mr-2">send</span>
                    Submit Query
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
