import Link from "next/link";

export default function ProjectCard({ title, slug, tags, description }) {
  return (
    <Link href={`/works/${slug}`}>
      <div>
        {/* ProjectCard — content coming soon */}
        <h3>{title}</h3>
        <p>{description}</p>
        <ul>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
