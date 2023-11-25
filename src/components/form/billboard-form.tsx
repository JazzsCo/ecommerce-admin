"use client";

import * as z from "zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { Billboard } from "@prisma/client";
import { FC, useEffect, useState } from "react";
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
import DeleteModal from "@/components/delete-modal";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/ui/image-upload";

interface BillboardFormProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().min(1),
});

const BillboardForm: FC<BillboardFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      imageUrl: "",
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
        const res = await axios.post("/api/" + params.storeId + "/billboards", {
          name: values.name,
          imageUrl: values.imageUrl,
        });

        // TODO: SUCCESS MESSAGE
        router.push("/" + params.storeId + "/billboards");
      } else {
        console.log("first");
        const res = await axios.patch(
          "/api/" + params.storeId + "/billboards/" + initialData.id,
          {
            name: values.name,
            imageUrl: values.imageUrl,
          }
        );

        // TODO: SUCCESS MESSAGE
        router.push("/" + params.storeId + "/billboards");
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

  const title = initialData ? "Edit Billboard" : "Create Billboard";
  const description = initialData
    ? "Update this Billboard 👽"
    : "Add a new Billboard 😉";
  const action = initialData ? "Update" : "Create";

  useEffect(() => {
    if (!initialData) {
      router.push("/" + params.storeId + "/billboards/create-new");
    }
  }, [initialData, router, params.storeId]);

  return (
    <>
      <DeleteModal
        title={
          "Delete" + " " + initialData?.name.toLowerCase() + " " + "billboard"
        }
        description="Your are sure to delete this billboard"
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
            <div className="flex flex-col space-y-3">
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
                          placeholder="Billboard name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="imageUrl"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Background</FormLabel>
                    <FormControl>
                      <ImageUpload
                        label="Upload an Image"
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
            </div>

            <div className="mt-3 flex items-center justify-end">
              <Button
                type="submit"
                size="lg"
                variant="secondary"
                disabled={loading}
              >
                {action}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default BillboardForm;
