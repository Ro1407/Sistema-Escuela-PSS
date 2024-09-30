"use client";

import { Button } from "@/components/ui/button";
import { validateUser } from "@/lib/actions";

import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

type AuthState = {
  error: string | null;
};

const initialState: AuthState = {
  error: null,
};

export default function LoginForm() {
  const [state, dispatch] = useFormState<AuthState, FormData>(validateUser, initialState);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Bienvenido</h1>
          <p className="text-gray-500 dark:text-gray-400">Iniciar sesión</p>
        </div>
        <form action={dispatch} className="space-y-4">
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
                required
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
                required
                minLength={4}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            </div>
          </div>
          <LoginButton/>
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.error && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                <p className="text-sm text-red-500">{state.error}</p>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Iniciar sesión
    </Button>
  );
}