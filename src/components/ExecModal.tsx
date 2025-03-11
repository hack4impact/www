'use client'

import { ExecMember } from '@/types/contentful';
import { IoIosClose as CloseIcon } from 'react-icons/io';
import styles from './ExecModal.module.scss';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { useEffect } from 'react';

type Props = {
  execMember: ExecMember;
  close: () => void;
};

export default function ExecModal({
  execMember: { name, title, photo, description, linkedIn, email },
  close
}: Props) {

  useEffect(() => {
    // Prevent scrolling of the background when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = '';
    };
  }, [close]);

  return (
    <div className={styles.modal_backdrop}>
      <div className={styles.modal_content} aria-label={`More info about ${name}`}>
        <div className={styles.close_button_container}>
          <button onClick={close}>
            <CloseIcon size={44} />
          </button>
        </div>
        <img height="250" width="250" src={photo.url} alt={photo.description} />
        <hgroup>
          <h1>{name}</h1>
          <h2>{title}</h2>
        </hgroup>
        <div className={styles.links}>
          {email && <a href={`mailto:${email}`}>Email me</a>}
          {'•'}
          {linkedIn && <a href={linkedIn}>Find me on LinkedIn</a>}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(description.json),
          }}></div>
      </div>
    </div>
  );
};
