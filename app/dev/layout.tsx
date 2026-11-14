import { JsonLd } from "@/components/seo/JsonLd";
import { devStructuredData } from "@/content/dev/structured-data";
import { devMetadata } from "./metadata";

// Developer site (hansobena.triqova.com → /dev via the host rewrite in next.config.ts).
export const metadata = devMetadata;

export default function DevLayout({ children }: LayoutProps<"/dev">) {
  return (
    <>
      {children}
      <JsonLd data={devStructuredData} />
    </>
  );
}
