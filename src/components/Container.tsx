import classNames from 'classnames';
import styles from '@/components/Container.module.scss'

type Props = {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: Props) {
  return (
    <section className={classNames('contain', className, styles.root)}>
      {children}
    </section>
  )
}
