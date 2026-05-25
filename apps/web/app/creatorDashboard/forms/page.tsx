"use client";

import { useState } from "react";
import { useGetForms, useCreateForm } from "~/hooks/api/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { FormListCard } from "~/components/forms/form-list-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(55, "Title must be 55 characters or less"),
  description: z.string().max(300, "Description must be 300 characters or less").optional(),
});

type CreateFormInputType = z.infer<typeof createFormSchema>;

export default function FormsPage() {
  const { forms, isLoading, isError, error } = useGetForms();
  const {
    createFormAsync,
    isError: createError,
    error: createErrorMsg,
    isPending,
  } = useCreateForm();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateFormInputType>({
    resolver: zodResolver(createFormSchema),
  });

  const onSubmit: SubmitHandler<CreateFormInputType> = async (data) => {
    try {
      setSubmitError(null);
      await createFormAsync({
        title: data.title,
        description: data.description || undefined,
      });
      reset();
      setIsDialogOpen(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create form. Please try again.";
      setSubmitError(message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading forms...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">
          Error loading forms: {error?.message || "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 pt-24 font-display">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Forms</h1>
        <p className="text-gray-600">Manage and view all your forms</p>
      </div>

      {forms.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No forms yet</h3>
              <p className="text-gray-500 mb-6">Create your first form to get started</p>
              <Button onClick={() => setIsDialogOpen(true)}>Create New Form</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <FormListCard form={form} />
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button size="lg" onClick={() => setIsDialogOpen(true)}>
          Create New Form
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              Enter the title and optional description for your new form
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Form Title *</Label>
              <Input
                id="title"
                placeholder="Enter form title"
                maxLength={55}
                disabled={isSubmitting}
                {...register("title")}
              />
              {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter form description (optional)"
                maxLength={300}
                disabled={isSubmitting}
                rows={4}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-600 text-sm">{errors.description.message}</p>
              )}
            </div>
            {submitError && (
              <div className="bg-red-100 text-red-700 text-sm p-3 rounded-md">{submitError}</div>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Form"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
