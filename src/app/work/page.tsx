import { Suspense } from 'react';
import Head from 'next/head';
import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import Summary from '@/components/common/Summary';
import ChapterTable from '@/components/work/ChapterTable';
import AnimatedStagger, { StaggerItem } from '@/components/common/AnimatedStagger';
import { getNationalInitiatives, getChapters } from '@/lib/api';
import { Project } from '@/types/contentful';

export default async function Work() {
  const nationalInitiatives = await getNationalInitiatives();
  const chapters = await getChapters();

  return (
    <main>
      <Head>
        <title>Our Work</title>
      </Head>
      <Header title="Our Work" />
      <Container>
        <h2>National Initiatives</h2>
        <AnimatedStagger>
          {nationalInitiatives.map((item: Project) => (
            <StaggerItem key={item.name}>
              <Summary {...item} />
            </StaggerItem>
          ))}
        </AnimatedStagger>
      </Container>
      <Container>
        <Suspense fallback={<div>Loading chapters...</div>}>
          <ChapterTable chapters={chapters} />
        </Suspense>
      </Container>
    </main>
  );
};
