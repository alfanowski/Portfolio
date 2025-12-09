import ProjectList from "@/components/ProjectList";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
};

async function fetchRepos(): Promise<Repo[]> {
  const res = await fetch(
    "https://api.github.com/users/alfanowski/repos?sort=updated&per_page=9",
    {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    console.error("Failed to fetch repos:", res.status, res.statusText);
    return [];
  }
  return res.json();
}

export default async function Projects() {
  const repos = await fetchRepos();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 font-mono">
      <div className="absolute inset-0 z-0 bg-black bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <ProjectList repos={repos} />
    </section>
  );
}