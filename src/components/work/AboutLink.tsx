import styles from '@/components/work/AboutLink.module.scss';

type Props = {
  link?: string;
  children: React.ReactNode;
};

export default function AboutLink({ link, children }: Props) {
  return link ? (
    <li className={styles.about_link}>
      <a href={link} target="_blank" rel="noreferrer">
        {children}
      </a>
    </li>
  ) : null;
};
