interface ChapterPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Chapter: {slug}</h1>
    </div>
  );
}
