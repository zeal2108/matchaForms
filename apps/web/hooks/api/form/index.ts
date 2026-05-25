import { trpc } from "~/trpc/client";

export const useGetForms = () => {
  const { data, isLoading, isError, isSuccess, status, failureCount, error } =
    trpc.forms.getFormsByUserId.useQuery();

  return {
    forms: data || [],
    isLoading,
    isError,
    isSuccess,
    status,
    failureCount,
    error,
  };
};

export const useCreateForm = () => {
  const {
    mutateAsync: createFormAsync,
    mutate: createForm,
    isError,
    isSuccess,
    status,
    failureCount,
    error,
    isPending,
  } = trpc.forms.createForm.useMutation();

  return {
    createFormAsync,
    createForm,
    isError,
    isSuccess,
    status,
    failureCount,
    error,
    isPending,
  };
};

export const useCreateFormField = () => {
  const {
    mutateAsync: createFormFieldAsync,
    mutate: createFormField,
    isError,
    isSuccess,
    status,
    failureCount,
    error,
    isPending,
  } = trpc.forms.createFormField.useMutation();

  return {
    createFormFieldAsync,
    createFormField,
    isError,
    isSuccess,
    status,
    failureCount,
    error,
    isPending,
  };
};
