interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Project: {slug}</h1>
    </div>
  );
}
