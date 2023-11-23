"use client";

import * as z from "zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import { Billboard, Category } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Select from "@/components/select-component";
import DeleteModal from "@/components/delete-modal";
import { Separator } from "@/components/ui/separator";

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

const CategoryForm: FC<CategoryFormProps> = ({ initialData, billboards }) => {
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
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
      if (!initialData) {
        const res = await axios.post("/api/" + params.storeId + "/categories", {
          name: values.name,
          billboardId: values.billboardId,
        });

        // TODO: SUCCESS MESSAGE
        router.push("/" + params.storeId + "/categories");
      } else {
        console.log("first");
        const res = await axios.patch(
          "/api/" + params.storeId + "/categories/" + initialData.id,
          {
            name: values.name,
            billboardId: values.billboardId,
          }
        );

        // TODO: SUCCESS MESSAGE
        router.push("/" + params.storeId + "/categories");
      }
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
        "/api/" + params.storeId + "/categories/" + initialData?.id
      );

      setIsLoading(false);
      router.push("/" + params.storeId + "/categories");
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      router.refresh();
    }
  };

  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData
    ? "Update this Category 👽"
    : "Add a new Category 😉";
  const action = initialData ? "Update" : "Create";

  useEffect(() => {
    if (!initialData) {
      router.push("/" + params.storeId + "/categories/create-new");
    }
  }, [initialData, router, params.storeId]);

  return (
    <>
      <DeleteModal
        title={
          "Delete" + " " + initialData?.name.toLowerCase() + " " + "category"
        }
        description="Your are sure to delete this category"
        isOpen={isDeleting}
        isLoading={isLoading}
        onClose={onClose}
        onDelete={onDelete}
      />

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
                        placeholder="Category name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="billboardId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billboards</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        disabled={loading}
                        placeholder="Select a billboard 🫨"
                        onChange={field.onChange}
                        items={billboards}
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
    </>
  );
};

export default CategoryForm;
