import Header from '@/components/Header';
import Banner from '@/components/Banner';
import Container from '@/components/Container';
import AnimatedSpring from '@/components/AnimatedSpring';
import ExecBoard from '@/components/ExecBoard';
import Values from '@/components/Values';
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
