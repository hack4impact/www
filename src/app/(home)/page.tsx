import styles from '@/app/(home)/home.module.scss';
import LinkButton from '@/components/LinkButton';
import Container from '@/components/Container';
import Hero from '@/components/Hero';
import StaggerAnimOnScroll from '@/components/StaggerAnimOnScroll';
import { StaggerItem } from '@/components/StaggerAnimOnScroll';

// type Props = {
//   featuredProjects: Project[];
// }

export default function Home() {
  return (
    <main style={{ marginTop: 0 }}>
      <Hero />
      <Container>
        <h2>Our Initiatives</h2>
        {/* <StaggerAnimOnScroll className={styles.card_row}> */}
        {/* <StaggerItem> */}
        {/*       <Card */}
        {/*         title="Chapter Network" */}
        {/*         subtitle="We mentor" */}
        {/*         description="We help new chapters help their local community by providing established communication channels with veteran chapters and mentors" */}
        {/*         href="/work#our-chapters" */}
        {/*         buttonTitle="Current Chapters"> */}
        {/*         <FaNetworkWired /> */}
        {/*       </Card> */}
        {/* </StaggerItem> */}
        {/* <StaggerItem> */}
        {/*       <Card */}
        {/*         title="Nonprofit Projects" */}
        {/*         subtitle="We build" */}
        {/*         description="We help nonprofits do the good they are meant to be doing more efficiently. By building them the custom software they need, they can focus on their important work" */}
        {/*         href="/work" */}
        {/*         buttonTitle="Current Projects"> */}
        {/*         <FaHandshake size={34} /> */}
        {/*       </Card> */}
        {/* </StaggerItem> */}
        {/* <StaggerItem> */}
        {/*       <Card */}
        {/*         title="Chapter Resources" */}
        {/*         subtitle="We share" */}
        {/*         description="Our 6 years of experience in building socially impactful technology has given our chapters and members the tools to help nonprofits" */}
        {/*         href="https://www.notion.so/h4i/Hack4Impact-Home-a8145b7695d64f04bca8acb5094d5c83" */}
        {/*         isExternalLink */}
        {/*         buttonTitle="Our Resources"> */}
        {/*         <FaFolder /> */}
        {/*       </Card> */}
        {/* </StaggerItem> */}
        {/* </StaggerAnimOnScroll> */}
      </Container>
      <Container>
        {/*   <h2>Featured Projects</h2> */}
        // <StaggerAnimOnScroll>
          {/*     {featuredProjects.map(item => ( */}
          {/* <StaggerItem key={item.name}> */}
          {/*         <ProjectView {...item} /> */}
          {/* </StaggerItem> */}
          {/*     ))} */}
        // </StaggerAnimOnScroll>
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
