import { DemoClient } from "@/app/demo/DemoClient";
import { PageShell } from "@/components/PageShell";

export default function DemoPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        <DemoClient />
      </main>
    </PageShell>
  );
}
