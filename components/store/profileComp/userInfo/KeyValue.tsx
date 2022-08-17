import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { handleEdit, handleHover } from './helpers';
import { useState } from 'react';

const KeyValue = (props: any) => {
  const { keyData, valueData, delay, settingsRef, setActive } = props;
  const [ishovered, setHovered] = useState(false);
  return (
    <KeyValueWrapper
      initial="init"
      whileInView="animate"
      custom={delay}
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
      className="key-value-wrapper"
      onMouseEnter={() => handleHover(ishovered, setHovered)}
      onMouseLeave={() => handleHover(ishovered, setHovered)}
    >
      <span className="key">{keyData}</span>
      <div className="value">
        <span>{valueData}</span>
        <span
          style={{ display: !ishovered ? 'none' : 'block' }}
          className="edit-data"
          onClick={() => handleEdit(settingsRef, setActive)}
        >
          Изменить данные
        </span>
      </div>
    </KeyValueWrapper>
  );
};

const KeyValueWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 50px;
  padding: 10px 20px;
  font-size: 1rem;
  &:hover {
    background-color: #0000000d;
  }
  .key {
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: ${color.textSecondary};
  }
  .value {
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    .edit-data {
      cursor: pointer;
      color: ${color.textSecondary};
      &:hover {
        color: ${color.hover};
      }
    }
  }
`;

export default KeyValue;
