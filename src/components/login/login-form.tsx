"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { validateUser } from "@/lib/actions";
import { AtSymbolIcon, ExclamationCircleIcon, KeyIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type AuthState = {
  error: string | null;
  redirectPath: string | null;
};

const initialState: AuthState = {
  error: null,
  redirectPath: null,
};

export default function LoginForm() {
  const [state, setState] = useState<AuthState>(initialState);
  const pathname = usePathname();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (state.redirectPath && pathname !== state.redirectPath) {
      window.location.href = state.redirectPath;
    }
  }, [state.redirectPath, pathname]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = form.username as HTMLFormElement;
    const password = form.password as HTMLFormElement;

    if (!username.value) {
      setFormError("Por favor, ingrese su nombre de usuario");
      return;
    }
    if (!password.value) {
      setFormError("Por favor, ingrese su contraseña");
      return;
    }

    setFormError(null);
    setIsSubmitting(true);
    setProgress(10);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 80) {
          return prev + 2;
        }
        return prev;
      });
    }, 100);

    try {
      const result = await validateUser(state, formData);
      setState(result);
      setProgress(100);
    } catch (error) {
      setFormError("Ocurrió un error durante la validación");
      console.error("Error during validation:", error);
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => setIsSubmitting(false), 500);
    }
  };

  function ErrorMessage({ error }: { error: string | null }) {
    if (!error) return null;

    return (
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
        <p className="text-sm text-red-500">{formError || state.error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Bienvenido</h1>
          <p className="text-gray-500 dark:text-gray-400">Iniciar sesión</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="user">
              Usuario
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 pl-10"
                id="user"
                type="text"
                name="username"
                placeholder="Usuario"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
              Contraseña
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 pl-10"
                id="password"
                placeholder="••••••••"
                type="password"
                name="password"
                minLength={4}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <LoginButton isSubmitting={isSubmitting} />
          {isSubmitting && <Progress className="mt-4" value={progress} />}
          <ErrorMessage error={formError || state.error} />
        </form>
      </div>
    </div>
  );
}

function LoginButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button className="mt-4 w-full" type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Cargando..." : "Iniciar sesión"}
    </Button>
  );
}
