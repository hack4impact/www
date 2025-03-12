'use client'

import { useState } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { MdArrowDropDownCircle } from 'react-icons/md';
import classNames from 'classnames';
import styles from '@/components/apply/QuestionCell.module.scss';
import Hover from '@/components/common/Hover';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { FAQ } from '@/types/contentful';

export default function QuestionCell({ question, answer }: FAQ) {
  const [isOpen, setOpen] = useState(false);

  const toggleDisclosure = () => {
    setOpen(!isOpen);
  };

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <FaQuestion />
      </div>
      <div>
        <h3 className={styles.question}>{question}</h3>
        <div className={styles.disclosure}>
          <button
            onClick={toggleDisclosure}
            aria-expanded={isOpen}
            aria-controls={`panel-${question.replace(/\s+/g, '-').toLowerCase()}`}
            className={styles.disclosure_button}
          >
            <div className={styles.dropdown}>
              Answer{' '}
              <MdArrowDropDownCircle
                className={classNames(styles.dropdown_icon, {
                  [styles.selected]: isOpen,
                })}
              />
              <Hover color="#001aff" />
            </div>
          </button>
          {isOpen && (
            <div
              id={`panel-${question.replace(/\s+/g, '-').toLowerCase()}`}
              className={styles.disclosure_panel}
            >
              <div
                className={styles.answer}
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(answer.json),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
