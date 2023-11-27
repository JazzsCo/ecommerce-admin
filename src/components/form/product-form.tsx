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
  FormDescription,
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
import { Checkbox } from "../ui/checkbox";
import ImageUpload from "../ui/image-upload";

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
  sizes: Size[];
  colors: Color[];
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  imageUrl: z.string().min(1).array(),
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
}) => {
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          price: initialData.price,
          imageUrl: initialData.images.map((image) => image.url),
          isFeatured: initialData.isFeatured,
          isArchived: initialData.isArchived,
          sizeId: initialData.sizeId,
          colorId: initialData.colorId,
          categoryId: initialData.categoryId,
        }
      : {
          name: "",
          price: "",
          imageUrl: [],
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
          imageUrl: values.imageUrl,
          isFeatured: values.isFeatured,
          isArchived: values.isArchived,
          sizeId: values.sizeId,
          colorId: values.colorId,
          categoryId: values.categoryId,
        });
        // TODO: SUCCESS MESSAGE
        // router.push("/" + params.storeId + "/products");
      } else {
        console.log("first");
        const res = await axios.patch(
          "/api/" + params.storeId + "/products/" + initialData.id,
          {
            name: values.name,
            price: values.price,
            imageUrl: values.imageUrl,
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
            <div className="flex flex-col space-y-5">
              <FormField
                name="imageUrl"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Images</FormLabel>
                    <FormControl>
                      <ImageUpload
                        label="Upload Images"
                        images={field.value}
                        disable={loading}
                        onChange={(url) =>
                          field.onChange([...field.value, url])
                        }
                        onRemove={(url) =>
                          field.onChange([
                            ...field.value.filter(
                              (currentUrl) => currentUrl !== url
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-7 m-auto sm:m-0">
                <div className="flex flex-col gap-6 max-w-[250px]">
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
                            placeholder="Product name"
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
                            disabled={loading}
                            placeholder="Price"
                            type="number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 max-w-[250px]">
                  <FormField
                    name="sizeId"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sizes</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            disabled={loading}
                            placeholder="Select a size 🐉"
                            onChange={field.onChange}
                            items={sizes}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="colorId"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Colors</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            disabled={loading}
                            placeholder="Select a color 🫨"
                            onChange={field.onChange}
                            items={colors}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="categoryId"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categories</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            disabled={loading}
                            placeholder="Select a category 🫨"
                            onChange={field.onChange}
                            items={categories}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 max-w-[250px]">
                  <FormField
                    name="isFeatured"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Featured</FormLabel>
                        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border dark:border-slate-800 p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormDescription>
                            This action is to featured you product to the
                            dashboard.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="isArchived"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Archived</FormLabel>
                        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border dark:border-slate-800 p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormDescription>
                            This action is to archived you product to the
                            dashboard.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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
