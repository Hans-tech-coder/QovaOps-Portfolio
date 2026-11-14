import { PortfolioPage } from "@/components/layout/PortfolioPage";
import { devProfile } from "@/content/dev/profile";

export default function DevHome() {
  return <PortfolioPage profile={devProfile} />;
}
