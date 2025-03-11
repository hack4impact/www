import styles from '@/app/home.module.scss';
import LinkButton from '@/components/LinkButton';
import Container from '@/components/Container';
import Hero from '@/components/Hero';
import AnimatedStagger from '@/components/AnimatedStagger';
import { StaggerItem } from '@/components/AnimatedStagger';
import Card from '@/components/Card';
import Summary from '@/components/Summary';
import type { Project } from '@/types/contentful.d.ts';
import { getFeaturedProjects } from '@/lib/api';

import { FaNetworkWired, FaHandshake, FaFolder } from 'react-icons/fa6';

export default async function Home() {

  const projects = await getFeaturedProjects();

  return (
    <main style={{ marginTop: 0 }}>
      <Hero />
      <Container>
        <h2>Our Initiatives</h2>
        <AnimatedStagger className={styles.card_row}>
          <StaggerItem>
            <Card
              title="Chapter Network"
              subtitle="We mentor"
              description="We help new chapters help their local community by providing established communication channels with veteran chapters and mentors"
              href="/work#our-chapters"
              buttonTitle="Current Chapters">
              <FaNetworkWired />
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card
              title="Nonprofit Projects"
              subtitle="We build"
              description="We help nonprofits do the good they are meant to be doing more efficiently. By building them the custom software they need, they can focus on their important work"
              href="/work"
              buttonTitle="Current Projects">
              <FaHandshake size={34} />
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card
              title="Chapter Resources"
              subtitle="We share"
              description="Our 6 years of experience in building socially impactful technology has given our chapters and members the tools to help nonprofits"
              href="https://www.notion.so/h4i/Hack4Impact-Home-a8145b7695d64f04bca8acb5094d5c83"
              isExternalLink
              buttonTitle="Our Resources">
              <FaFolder />
            </Card>
          </StaggerItem>
        </AnimatedStagger>
      </Container>
      <Container>
        <h2>Featured Projects</h2>
        <AnimatedStagger>
          {projects.map((item: Project) => (
            <StaggerItem key={item.name}>
              <Summary {...item} />
            </StaggerItem>
          ))}
        </AnimatedStagger>
        <div className={styles.button_row}>
          <LinkButton href="/work#our-chapters">See all chapters</LinkButton>
          <LinkButton href="/apply/nonprofit" type="secondary">
            Propose your nonprofit project
          </LinkButton>
        </div>
      </Container>
    </main>
  );
};
