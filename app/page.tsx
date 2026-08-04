import { redirect } from "next/navigation";

export default function RootPage() {
  // Direct redirect to dashboard or load dashboard
  redirect("/dashboard");
}
