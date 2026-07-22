import { createFileRoute } from "@tanstack/react-router";
import { useApplyPageSeo } from "@/lib/page-seo";
import { HeroSlider } from "@/components/site/HeroSlider";
import { BentoHome } from "@/components/site/BentoHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adphira LLC — Premium Software, AI & Digital Marketing" },
      { name: "description", content: "Adphira LLC builds premium websites, mobile apps, AI automation and growth marketing for ambitious businesses worldwide." },
      { property: "og:title", content: "Adphira LLC — Premium Software, AI & Digital Marketing" },
      { property: "og:description", content: "Websites, apps, AI automation and digital marketing engineered for growth." },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

function LandingPage() {
  useApplyPageSeo("/");
  return (
    <div className="bg-white text-espresso">
      <HeroSlider />
      <BentoHome />
    </div>
  );
}