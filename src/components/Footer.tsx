import Link from 'next/link';
import styles from '@/components/Footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer_wrapper}>
      <div className={styles.footer_content}>
        <div className={styles.left_content}>
          <h2>Contact Us</h2>

          <p>
            Couldn&apos;t find what you&apos;re looking for? Contact us through email to get in touch!
          </p>
          <a
            href="mailto:contact@hack4impact.org"
            className={styles.footer_email}
            target="_blank"
            rel="noreferrer">
            contact@hack4impact.org
          </a>
        </div>

        <div className={styles.right_content}>
          <div className={styles.link_list}>
            <h2>Follow Us</h2>
            <a href="https://www.facebook.com/Hack4Impact/">Facebook</a>
            <a href="https://www.instagram.com/hack4impact/">Instagram</a>
            <a href="https://medium.com/@hack4impact">Medium</a>
            <a href="https://www.linkedin.com/company/hack4impact/">LinkedIn</a>
            <a href="https://github.com/hack4impact">GitHub</a>
          </div>

          <div className={styles.link_list}>
            <h2>Learn More</h2>
            <Link href="/about">
              Our Mission
            </Link>
            <Link href="/work#our-chapters">
              Our Chapters
            </Link>
          </div>

          <div className={styles.link_list}>
            <h2>Get Involved</h2>
            <Link href="/apply/chapter">
              Chapter Applications
            </Link>
            <Link href="/apply/nonprofit">
              Nonprofit Proposals
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.repo_links_wrapper}>
        <div className={styles.repo_links}>
          <a
            href="https://github.com/hack4impact/hack4impact-website"
            target="_blank"
            rel="noreferrer">
            Made with &#9829; by the Hack4Impact team
          </a>
          <a href="https://www.contentful.com/" target="_blank" rel="noreferrer">
            <img
              src="https://images.ctfassets.net/fo9twyrwpveg/7Htleo27dKYua8gio8UEUy/0797152a2d2f8e41db49ecbf1ccffdaa/PoweredByContentful_DarkBackground_MonochromeLogo.svg"
              alt="Powered by Contentful"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
