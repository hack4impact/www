import Summary from '@/components/common/Summary';
import { Chapter } from '@/types/contentful';
import styles from '@/components/work/ChapterFeature.module.scss';
import ImageHighlight from '@/components/common/ImageHighlight';
import AnimatedStagger, { StaggerItem } from '@/components/common/AnimatedStagger';
import AboutLink from '@/components/work/AboutLink';
import {
  IoIosGlobe as WebsiteLinkIcon,
  IoIosHeart as SocialMediaLinkIcon,
  IoIosCodeWorking as CodeRepoLinkIcon,
} from 'react-icons/io';

export default function ChapterFeature({
  name,
  photo,
  location,
  email,
  establishedDate,
  incubating,
  websiteLink,
  socialMediaLink,
  socialMediaLinkType,
  codeRepoLink,
  projects,
}: Chapter) {
  return (
    <div className={styles.root}>
      <div className={styles.about_chapter_container}>
        <div className={styles.text_content}>
          <hgroup>
            <h4 className={styles.established_date}>
              {incubating ? <strong>Incubating</strong> : <span>EST. {establishedDate}</span>}
            </h4>
            <h3>{name}</h3>
          </hgroup>
          <p className={styles.subheading}>
            Located in {location}{' '}
            <a className={styles.contact} href={'mailto:' + email} target="_blank" rel="noreferrer">
              Contact
            </a>
          </p>
          <ul className={styles.links}>
            <AboutLink link={websiteLink}>
              <WebsiteLinkIcon /> Learn more on their site
            </AboutLink>
            <AboutLink link={socialMediaLink}>
              <SocialMediaLinkIcon /> Follow on {socialMediaLinkType}
            </AboutLink>
            <AboutLink link={codeRepoLink}>
              <CodeRepoLinkIcon /> Browse their project repos
            </AboutLink>
          </ul>
        </div>
        <ImageHighlight
          className={styles.image}
          src={photo.url}
          alt={photo.description}
          height="355"
          width="500"
        />
      </div>
      {projects?.items?.length ? (
        <>
          <h4>Featured Projects</h4>
          <AnimatedStagger>
            {projects.items.map(item => (
              <StaggerItem key={item.name}>
                <Summary {...item} />
              </StaggerItem>
            ))}
          </AnimatedStagger>
        </>
      ) : null}
    </div>
  );
};
