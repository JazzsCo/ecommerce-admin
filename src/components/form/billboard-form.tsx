"use client";

import * as z from "zod";
import { FC, useEffect } from "react";
import { Billboard, Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "@/components/heading";
import ApiAlert from "@/components/api-alert";
import DeleteButton from "@/components/delete-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useOrigin } from "@/hook/use-origin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import ImageUpload from "../ui/image-upload";

interface BillboardFormProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().min(1),
});

const BillboardForm: FC<BillboardFormProps> = ({ initialData }) => {
  const router = useRouter();
  const origin = useOrigin();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      imageUrl: "",
    },
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("VALUES", values);

      // form.reset();
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      router.refresh();
    }
  };

  const title = initialData ? "Update Billboard" : "Create Billboard";
  const description = initialData
    ? "Update the Billboard 👽"
    : "Create a new Billboard 😉";
  const action = initialData ? "Update" : "Create";

  useEffect(() => {
    if (!initialData) {
      router.push("/" + params.storeId + "/billboards/create-new");
    }
  }, [initialData, router, params.storeId]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            // onClick={() => setIsDeleting(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-6">
            <FormField
              name="imageUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Background</FormLabel>
                  <FormControl>
                    <ImageUpload
                      images={field.value ? [field.value] : []}
                      disable={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Store name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-end">
            <Button type="submit" size="lg" variant="secondary">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BillboardForm;
