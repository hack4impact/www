import Link from 'next/link';
import classNames from 'classnames';
import styles from './LinkButton.module.scss';
import Hover from './Hover';

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  id?: string;
  type?: string;
  external?: boolean;
};

export default function Button({
  children,
  href = '/',
  className,
  id,
  type = 'primary',
  external = false,
}: Props) {
  if (external) {
    return (
      <a
        id={id}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classNames(styles.button, className, styles[type])}>
        {children}
        <Hover />
      </a>
    );
  }
  return (
    <Link href={href} id={id} className={classNames(styles.button, className, styles[type])}>
      {children}
      <Hover />
    </Link>
  );
};
