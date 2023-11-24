"use client";

import * as z from "zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import { Category, Color, Image, Product, Size } from "@prisma/client";
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

interface ProductFormProps {
  initialData: Product | null;
  sizes: Size[];
  colors: Color[];
  categories: Category[];
  //   images: Image[];
}

const formSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  //   imageUrl: z.string().min(1),
  isFeatured: z.boolean(),
  isArchived: z.boolean(),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  categoryId: z.string().min(1),
});

const ProductForm: FC<ProductFormProps> = ({
  initialData,
  sizes,
  colors,
  categories,
  //   images,
}) => {
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      price: "",
      isFeatured: true,
      isArchived: false,
      sizeId: "",
      colorId: "",
      categoryId: "",
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
        const res = await axios.post("/api/" + params.storeId + "/products", {
          name: values.name,
          price: values.price,
          isFeatured: values.isFeatured,
          isArchived: values.isArchived,
          sizeId: values.sizeId,
          colorId: values.colorId,
          categoryId: values.categoryId,
        });

        // TODO: SUCCESS MESSAGE
        router.push("/" + params.storeId + "/products");
      } else {
        console.log("first");
        const res = await axios.patch(
          "/api/" + params.storeId + "/products/" + initialData.id,
          {
            name: values.name,
            price: values.price,
            isFeatured: values.isFeatured,
            isArchived: values.isArchived,
            sizeId: values.sizeId,
            colorId: values.colorId,
            categoryId: values.categoryId,
          }
        );

        // TODO: SUCCESS MESSAGE
        router.push("/" + params.storeId + "/products");
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
        "/api/" + params.storeId + "/products/" + initialData?.id
      );

      setIsLoading(false);
      router.push("/" + params.storeId + "/products");
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      router.refresh();
    }
  };

  const title = initialData ? "Edit Product" : "Create Product";
  const description = initialData
    ? "Update this Product 👽"
    : "Add a new Product 😉";
  const action = initialData ? "Update" : "Create";

  useEffect(() => {
    if (!initialData) {
      router.push("/" + params.storeId + "/products/create-new");
    }
  }, [initialData, router, params.storeId]);

  return (
    <>
      <DeleteModal
        title={
          "Delete" + " " + initialData?.name.toLowerCase() + " " + "product"
        }
        description="Your are sure to delete this product"
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
            <div className="grid gap-6 max-w-[250px]">
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
                name="sizeId"
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
                        items={sizes}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-3 flex items-center justify-end">
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

export default ProductForm;
