import { cacheLife } from "next/cache";
import type { Brand } from "@/content/profile";
import { site } from "@/content/site";

// Cached at build time (cacheComponents forbids a bare new Date() in the
// prerendered shell). The year updates on the next deploy.
async function CopyrightYear() {
  "use cache";
  cacheLife("max");
  return <>{new Date().getFullYear()}</>;
}

/** Footer strip from the brand sheet (BRAND_GUIDE §6). */
export function Footer({ brand }: { brand: Brand }) {
  return (
    <footer className="mt-8 border-t border-dashed border-line py-8">
      <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="qo-label text-muted">
          {brand.name} by{" "}
          <a
            href={site.triqovaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dashed underline-offset-4 transition-colors hover:text-fg"
          >
            triqova
            <span className="sr-only"> (opens in a new tab)</span>
          </a>{" "}
          <span aria-hidden="true">|</span>{" "}
          {brand.secondaryLine}
        </p>
        <p className="font-mono text-xs text-muted">
          © <CopyrightYear /> {brand.name}
        </p>
      </div>
    </footer>
  );
}
