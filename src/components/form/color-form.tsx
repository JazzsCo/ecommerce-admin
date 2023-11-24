"use client";

import * as z from "zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { Color } from "@prisma/client";
import { useForm } from "react-hook-form";
import { TwitterPicker } from "react-color";
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

interface ColorFormProps {
  initialData: Color | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

const ColorForm: FC<ColorFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
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
        const res = await axios.post("/api/" + params.storeId + "/colors", {
          name: values.name,
          value: values.value,
        });

        // TODO: SUCCESS MESSAGE
        router.push("/" + params.storeId + "/colors");
      } else {
        console.log("first");
        const res = await axios.patch(
          "/api/" + params.storeId + "/colors/" + initialData.id,
          {
            name: values.name,
            value: values.value,
          }
        );

        // TODO: SUCCESS MESSAGE
        router.push("/" + params.storeId + "/colors");
      }

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
        "/api/" + params.storeId + "/colors/" + initialData?.id
      );

      setIsLoading(false);
      router.push("/" + params.storeId + "/colors");
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      router.refresh();
    }
  };

  const title = initialData ? "Edit Color" : "Create Color";
  const description = initialData
    ? "Update this Color 👽"
    : "Add a new Color 😉";
  const action = initialData ? "Update" : "Create";

  useEffect(() => {
    if (!initialData) {
      router.push("/" + params.storeId + "/colors/create-new");
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
                          placeholder="Color name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="value"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <>
                        {field.value && (
                          <div className="flex items-center space-x-2">
                            <div
                              className="p-2 w-7 h-7 rounded-full"
                              style={{
                                background: field.value,
                              }}
                            />

                            <h3 className="px-2 py-0.5 bg-muted rounded text-sm -tracking-tighter">
                              {field.value}
                            </h3>
                          </div>
                        )}
                        <TwitterPicker
                          color={field.value}
                          onChange={(value) => field.onChange(value.hex)}
                          triangle="hide"
                          styles={{
                            default: {
                              body: {
                                marginTop: 10,
                              },
                            },
                          }}
                        />
                      </>
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

export default ColorForm;
