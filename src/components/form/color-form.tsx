"use client";

import * as z from "zod";
import { FC } from "react";
import { Store } from "@prisma/client";
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

interface ColorFormProps {
  initialData?: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

const ColorForm: FC<ColorFormProps> = ({ initialData }) => {
  const router = useRouter();
  const origin = useOrigin();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
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

  const title = initialData ? "Update Color" : "Create Color";
  const description = initialData
    ? "Update the Color 👽"
    : "Create a new Color 😉";
  const action = initialData ? "Update" : "Create";

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

      {/* <Separator className="h-[0.5px]" /> */}

      {/* <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={origin + "/api/stores/" + params.storeId}
        role="admin"
      /> */}
    </div>
  );
};

export default ColorForm;
