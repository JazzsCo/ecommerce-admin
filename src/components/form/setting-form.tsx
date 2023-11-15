"use client";

import * as z from "zod";
import { FC, useState } from "react";
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
import axios from "axios";
import {
  Circle,
  CircleDashed,
  CircleDot,
  CircleEllipsis,
  CircleEqual,
  CircleSlash,
  Clipboard,
  LucideCircleDashed,
  Trash,
} from "lucide-react";
import DeleteModal from "@/components/delete-button";

interface SettingFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

const SettingForm: FC<SettingFormProps> = ({ initialData }) => {
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
      const res = await axios.patch("/api/stores/" + params.storeId, {
        name: values.name,
      });

      //TODO: added toast message
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      router.refresh();
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      const res = await axios.delete("/api/stores/" + params.storeId);

      console.log("first", res);

      setIsLoading(false);
      router.push("/" + params.storeId);
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <DeleteModal
        title="Delete Store"
        description="Your are sure to delete this store"
        isOpen={isDeleting}
        isLoading={isLoading}
        onClose={onClose}
        onDelte={onDelete}
      />
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Heading
            title="Settings"
            description="Manage your store setting 🦭"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => setIsDeleting(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
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
              <Button
                type="submit"
                size="lg"
                variant="secondary"
                disabled={loading}
              >
                Update
              </Button>
            </div>
          </form>
        </Form>

        <Separator className="h-[0.5px]" />

        <ApiAlert
          title="NEXT_PUBLIC_API_URL"
          description={origin + "/api/stores/" + params.storeId}
          role="user"
        />
      </div>
    </>
  );
};

export default SettingForm;
