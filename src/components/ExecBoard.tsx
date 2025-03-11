'use client'

import Container from '@/components/Container';
import AnimatedStagger, { StaggerItem } from '@/components/AnimatedStagger';
import type { ExecMember } from '@/types/contentful';
import styles from '@/components/ExecBoard.module.scss';
import { IoMdArrowDropright as ArrowIcon } from 'react-icons/io';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ExecModal from './ExecModal';

type Props = {
  execMembers: ExecMember[];
};

export default function ExecBoard({ execMembers }: Props) {
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<number | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = (index: number) => {
    setSelectedMemberIndex(index);
    setModalOpened(true);
  }

  const closeModal = () => {
    setModalOpened(false);
  }

  return (
    <Container>
      <h2>National Board</h2>
      <AnimatedStagger className={styles.list_container}>
        {execMembers.map(({ name, title, photo }, index) => (
          <StaggerItem
            key={name}
            animHidden={{ opacity: 0, y: 100 }}
            animShow={{ opacity: 1, y: 0 }}>
            <button
              className={styles.member_container}
              aria-label={`Learn more about ${name}`}
              onClick={() => openModal(index)}>
              <img src={photo.url} alt={photo.description} />
              <h3>{name}</h3>
              <p>{title}</p>
              <p aria-hidden={true} className={styles.about_button}>
                About me <ArrowIcon size={28} />
              </p>
            </button>
          </StaggerItem>
        ))}
      </AnimatedStagger>

      {modalOpened && selectedMemberIndex !== null && typeof document !== 'undefined' &&
        createPortal(
          <ExecModal
            execMember={execMembers[selectedMemberIndex]}
            close={closeModal}
          />,
          document.getElementById('modal-root') || document.body
        )
      }
    </Container>
  );
}
