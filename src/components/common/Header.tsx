import styles from '@/components/common/Header.module.scss';

type Props = {
  title: string;
  children?: React.ReactNode;
};

export default function Header({ title, children }: Props) {
  return (
    <>
      <div className={styles.content}>
        <h1>{title}</h1>
        <span>{children}</span>
      </div>
      <div className={styles.divider} />
    </>
  );
};
