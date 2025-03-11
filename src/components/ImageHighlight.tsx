
import styles from '@/components/ImageHighlight.module.scss';
import classNames from 'classnames';

type Props = React.ImgHTMLAttributes<null> & {
  className?: string;
};

export default function ImageHighlight({ src = '', alt = '', className = '', ...props }: Props) {
  return (
    <div className={classNames(styles.angle_bracket_wrapper, className)}>
      <div className={styles.shadow_wrapper}>
        <img src={src} alt={alt} {...props} />
      </div>
    </div>
  );
}

