"use client";

import { Button } from "@/components/ui/button";
import { validateUser } from "@/lib/actions";

import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import { useFormState, useFormStatus } from "react-dom";
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
  const [state, dispatch] = useFormState<AuthState, FormData>(validateUser, initialState);
  const pathname = usePathname();
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (state.redirectPath && pathname !== state.redirectPath) {
      window.location.href = state.redirectPath; 
    }
  }, [state.redirectPath, pathname]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = form.username as HTMLFormElement;
    const password = form.password as HTMLFormElement;

    if(!username.value){
        setFormError('Por favor, ingrese su nombre de usuario');
        return;
    }
    if(!password.value){
      setFormError('Por favor, ingrese su contraseña');
      return;
    }

    setFormError(null);
    dispatch(formData);
  }

  function ErrorMessage({ error }: { error: string | null }) {
    if (!error) return null;

    return (
        <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
        >
          <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
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
        <form onSubmit={handleSubmit}  action={dispatch} className="space-y-4">
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
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
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
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            </div>
          </div>
          <LoginButton/>
          <ErrorMessage error={formError || state.error} />
        </form>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" aria-disabled={pending} type="submit">
      Iniciar sesión
    </Button>
  );
}