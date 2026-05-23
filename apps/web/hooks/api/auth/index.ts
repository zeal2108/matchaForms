import { trpc } from "~/trpc/client";

export const useSignup = () => {
  const {
    mutateAsync: createUserWithEmailAsync,
    mutate: createUserWithEmail,
    isError,
    isSuccess,
    status,
    failureCount,
    error,
    isIdle,
  } = trpc.auth.createUserWithEmail.useMutation();

  return {
    createUserWithEmailAsync,
    createUserWithEmail,
    isError,
    isSuccess,
    status,
    failureCount,
    error,
    isIdle,
  };
};

export const useLogin = () => {
  const {
    mutateAsync: signInUserWithEmailAsync,
    mutate: signInUserWithEmail,
    isError,
    isSuccess,
    status,
    failureCount,
    error,
    isIdle,
  } = trpc.auth.signInUserWithEmail.useMutation();

  return {
    signInUserWithEmailAsync,
    signInUserWithEmail,
    isError,
    isSuccess,
    status,
    failureCount,
    error,
    isIdle,
  };
};

export const useGetUser = () => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    status,
    failureCount,
    error,
  } = trpc.auth.getLoggedInUser.useQuery();

  return {
    user: data,
    isLoading,
    isError,
    error,
    isSuccess,
    status,
    failureCount,
  };
};
