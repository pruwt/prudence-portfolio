import CaseStudy from "@/components/CaseStudy";
import { caseStudies } from "@/data/caseStudies";

export default function MaliPage() {
  const study = caseStudies.find((s) => s.slug === "mali");
  const nextStudy = caseStudies.find((s) => s.slug === study.nextSlug);
  return <CaseStudy study={study} nextStudy={nextStudy} />;
}
