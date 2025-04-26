'use client'
import { useRef, useEffect, useState } from 'react';
import styles from '@/components/work/ChapterTable.module.scss';
import { Chapter } from '@/types/contentful';
import ChapterFeature from '@/components/work/ChapterFeature';
import { useSearchParams } from 'next/navigation';

type Props = {
  chapters: Chapter[];
};

export default function ChapterTable({ chapters }: Props) {
  const selectRibbonRef = useRef<HTMLDivElement>(null);
  const [selectedChapter, setSelectedChapter] = useState(0);
  const searchParams = useSearchParams();
  const chapterSlug = searchParams.get('chapter') || '';

  // if someone passes a chapter slug in the URL,
  // scroll to the "our chapters" section
  // and select that chapter in the carousel
  useEffect(() => {
    const chapterMatchingSlug = chapters.findIndex(({ slug }) => slug === chapterSlug);
    if (chapterMatchingSlug > 0) {
      document.getElementById('our-chapters')?.scrollIntoView({ behavior: 'smooth' });
      handleTabChange(chapterMatchingSlug);
    }
  }, [chapterSlug, chapters]);

  // scroll to the currently selected chapter
  const handleTabChange = (index: number) => {
    if (!selectRibbonRef.current) return;

    const { scrollWidth, clientWidth } = selectRibbonRef.current;
    const thumbnailWidth = scrollWidth / chapters.length;
    // get the middle of our ribbon, relative to the screen width
    // (we'll use this to center up the currently selected chapter for smaller screens)
    const ribbonMidpoint = (clientWidth - thumbnailWidth) / 2;

    // auto-scroll so our selectd chapter lands in the center of the ribbon
    const offsetToCenter = index * thumbnailWidth - ribbonMidpoint + 5;
    const min = 0; // don't auto-scroll past the beginning of our list
    const max = scrollWidth - clientWidth + 10; // don't auto-scroll past the end of our list
    const adjustedOffsetToCenter = Math.min(Math.max(offsetToCenter, min), max);

    // now, shift the ribbon to the scroll position we want using CSS
    selectRibbonRef.current.style.transform = `translateX(-${adjustedOffsetToCenter}px)`;
    setSelectedChapter(index);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h2 id="our-chapters">Our Chapters</h2>
        <p className={styles.chapter_count}>{chapters.length} chapters and counting</p>
      </div>

      {/* Custom Tab List */}
      <div className={styles.chapter_select_ribbon}>
        <div className={styles.chapter_select_option_container} ref={selectRibbonRef}>
          {chapters.map(({ name, universityLogo }, index) => (
            <button
              key={name}
              className={`${styles.chapter_select_option} ${selectedChapter === index ? styles.selected : ''}`}
              onClick={() => handleTabChange(index)}
              role="tab"
              aria-selected={selectedChapter === index}
              aria-controls={`tabpanel-${index}`}
              id={`tab-${index}`}
            >
              <img
                src={universityLogo.url}
                alt={universityLogo.description}
                height="50"
                width="50"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Custom Tab Panels */}
      <div className={styles.tab_panels}>
        {chapters.map((item, index) => (
          <div
            key={item.name}
            role="tabpanel"
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            hidden={selectedChapter !== index}
            className={styles.tab_panel}
          >
            {selectedChapter === index && <ChapterFeature {...item} />}
          </div>
        ))}
      </div>
    </div>
  );
}
