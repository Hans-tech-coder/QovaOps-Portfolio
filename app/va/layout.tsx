import { JsonLd } from "@/components/seo/JsonLd";
import { vaStructuredData } from "@/content/va/structured-data";
import { vaMetadata } from "./metadata";

// VA site (qovaops.triqova.com → /va via the host rewrite in next.config.ts).
export const metadata = vaMetadata;

export default function VaLayout({ children }: LayoutProps<"/va">) {
  return (
    <>
      {children}
      <JsonLd data={vaStructuredData} />
    </>
  );
}
