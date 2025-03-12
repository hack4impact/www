import styles from '@/components/common/Summary.module.scss';
import { Project } from '@/types/contentful';

import { determineLinkName } from '@/utils/helpers';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default function Summary({ photo, name, tags, description, link }: Project) {
  return (
    <div className={styles.root}>
      <img className={styles.image} src={photo.url} alt={photo.description} />
      <div className={styles.text_container}>
        <b className={styles.title}>{name}</b>
        <div className={styles.tags}>
          {tags.map(tag => (
            <div key={tag} className={styles.tag}>
              {tag}
            </div>
          ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(description.json) }}></div>
        {link && (
          <a href={link} target="_blank" rel="noreferrer">
            {determineLinkName(link)}
          </a>
        )}
      </div>
    </div>
  );
}; 
