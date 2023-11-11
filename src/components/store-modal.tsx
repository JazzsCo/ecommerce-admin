"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hook/use-store-modal";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1),
});

const StoreModal = () => {
  const router = useRouter();
  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const store = await axios.post("/api/stores", {
        name: values.name,
      });

      form.reset();
      storeModal.onClose();
      router.push("/" + store.data?.id);
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage your products and categories."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    placeholder="Shoe store 👟"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end space-x-2 mt-2">
            <Button
              variant="outline"
              size="lg"
              disabled={loading}
              onClick={storeModal.onClose}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              size="lg"
              type="submit"
              disabled={loading}
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default StoreModal;
