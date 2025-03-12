import Head from 'next/head';
import Header from '@/components/common/Header';
import ImageHighlight from '@/components/common/ImageHighlight';
import Container from '@/components/common/Container';
import LinkButton from '@/components/common/LinkButton';
import AnimatedStagger, { StaggerItem } from '@/components/common/AnimatedStagger';
import styles from '@/app/apply/apply.module.scss';
import classNames from 'classnames';
import QuestionCell from '@/components/apply/QuestionCell';
import Link from 'next/link';
import Hover from '@/components/common/Hover';
import { Application } from '@/types/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { IoMdArrowDropright as ArrowIcon } from 'react-icons/io';

type Props = {
  content: Application;
};

export default function Apply({ content }: Props) {
  return (
    <main>
      <Header title="Apply">
        <div className={styles.switch_control}>
          <Link href="/apply/chapter"
            className={classNames({
              [styles.selected]: content.applicationType === 'New Chapters',
            })}>
            For New Chapters
            <Hover />
          </Link>
          <Link href="/apply/nonprofit"
            className={classNames({
              [styles.selected]: content.applicationType === 'Nonprofits',
            })}>
            For Non Profits
            <Hover />
          </Link>
        </div>
      </Header>
      <div style={{ marginTop: 20 }}>
        <Container className="row spaced aligned wrap">
          <div className={styles.requirements}>
            <h2>{content.headerTitle}</h2>
            <div
              style={{ marginBottom: 40 }}
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(content.description.json),
              }}
            />
            <LinkButton href={content.applicationLink} className={styles.link_button} external>
              Apply Here
              <ArrowIcon />
            </LinkButton>
          </div>
          <div className={styles.image_wrap}>
            <ImageHighlight
              src={content.photo.url}
              alt=""
              width="400"
              height="300"
              className={styles.image}
            />
          </div>
        </Container>
        <Container>
          <h2>FAQs</h2>
          <AnimatedStagger>
            {content.faqsCollection.items.map(({ question, answer }) => (
              <StaggerItem key={`${content.applicationType}-${question}`}>
                <QuestionCell question={question} answer={answer} />
              </StaggerItem>
            ))}
          </AnimatedStagger>
        </Container>
      </div>
    </main >
  );
};
