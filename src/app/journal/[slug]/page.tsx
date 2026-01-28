interface JournalPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function JournalPostPage({ params }: JournalPostPageProps) {
  const { slug } = await params;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Journal: {slug}</h1>
    </div>
  );
}
