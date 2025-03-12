import Header from '@/components/common/Header';
import Banner from '@/components/about/Banner';
import Container from '@/components/common/Container';
import AnimatedSpring from '@/components/common/AnimatedSpring';
import ExecBoard from '@/components/about/ExecBoard';
import Values from '@/components/about/Values';
import { getExecMembers } from '@/lib/api';

export default async function About() {

  const execMembers = await getExecMembers();

  return (
    <main>
      <Header title="About" />
      <Banner />
      <Container>
        <h2>Our Mission</h2>
        <AnimatedSpring />
      </Container>
      <Values />
      <ExecBoard
        execMembers={execMembers} />
    </main>
  );
}
