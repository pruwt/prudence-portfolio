import CaseStudy from "@/components/CaseStudy";
import { caseStudies } from "@/data/caseStudies";

export default function NeithaPage() {
  const study = caseStudies.find((s) => s.slug === "neitha");
  const nextStudy = caseStudies.find((s) => s.slug === study.nextSlug);
  return <CaseStudy study={study} nextStudy={nextStudy} />;
}
