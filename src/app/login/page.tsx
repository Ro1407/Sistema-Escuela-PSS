import LoginForm from "@/components/login/login-form";
import { Metadata } from "next";

const metadata: Metadata = {
  title: 'Iniciar sesión',
}

export default async function LoginPage() {
  return (
    <LoginForm/>
  );
}