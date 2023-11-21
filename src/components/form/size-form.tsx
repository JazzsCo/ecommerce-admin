"use client";

import * as z from "zod";
import { FC, useEffect, useState } from "react";
import { Size, Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "@/components/heading";
import ApiAlert from "@/components/api-alert";
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
import axios from "axios";

interface SizeFormProps {
  initialData: Size | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
});

const SizeForm: FC<SizeFormProps> = ({ initialData }) => {
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

  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setIsDeleting(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // if (!initialData) {
      //   const res = await axios.post("/api/" + params.storeId + "/sizes", {
      //     name: values.name,
      //     value: values.price,
      //   });

      //   // TODO: SUCCESS MESSAGE
      //   router.push("/" + params.storeId + "/sizes");
      // } else {
      //   console.log("first");
      //   const res = await axios.patch(
      //     "/api/" + params.storeId + "/sizes/" + initialData.id,
      //     {
      //       name: values.name,
      //       value: values.price,
      //     }
      //   );

      //   // TODO: SUCCESS MESSAGE
      //   router.push("/" + params.storeId + "/sizes");
      // }

      console.log("VALUES", values);
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      router.refresh();
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      const res = await axios.delete(
        "/api/" + params.storeId + "/billboards/" + initialData?.id
      );

      setIsLoading(false);
      router.push("/" + params.storeId + "/billboards");
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      router.refresh();
    }
  };

  const title = initialData ? "Edit Size" : "Create Size";
  const description = initialData ? "Update this Size 👽" : "Add a new Size 😉";
  const action = initialData ? "Update" : "Create";

  useEffect(() => {
    if (!initialData) {
      router.push("/" + params.storeId + "/sizes/create-new");
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
            onClick={() => setIsDeleting(true)}
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
                      placeholder="Size name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      disabled={loading}
                      placeholder="Price"
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

export default SizeForm;
