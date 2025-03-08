import styles from '@/components/Hero.module.scss';
import Container from '@/components/Container';
import AnimatedRole from '@/components/AnimatedRole';
import LinkButton from '@/components/LinkButton';

export default function Home() {
  return (
    <div className={styles.root}>
      <Container className={styles.container}>
        <div className={styles.content}>
          <h1>
            <span className={styles.subheader}>We are</span>
            <AnimatedRole />
            <span>for social change</span>
          </h1>
          <p>
            Building powerful nonprofit software as a <strong>tool for social good</strong>
          </p>
          <LinkButton className={styles.cta} href="apply/nonprofit">
            Work with us
          </LinkButton>
        </div>
        <div className={styles.image_container}>
          <img
            width="450"
            height="450"
            src="/images/bog-stone-mountain.jpg"
            alt="Bits of Good having a good time climbing Stone Mountain in Atlanta"
          />
        </div>
      </Container>
      <div className={styles.background}>
        <div className={styles.b1} />
        <div className={styles.b2} />
        <div className={styles.b3} />
      </div>
    </div>

  );
}
