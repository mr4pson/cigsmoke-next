import styled from 'styled-components';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import color from '../../lib/ui.colors';
import TextField from '@mui/material/TextField';
import variants from 'components/store/lib/variants';
import Close from '../../../../assets/close_black.svg';

const UserCommment = (props: any) => {
  const { comment, setComment, setIsOpen } = props;

  return (
    <CommentContainer
      custom={0.2}
      initial="init"
      animate="animate"
      variants={variants.fadInSlideUp}
    >
      <CommentWrapper>
        <span onClick={() => setIsOpen(false)} className="comment-close-btn">
          <Close />
        </span>
        <CommentContent>
          <h2>Комментарий к заказу</h2>
          <div className="comment-info">
            <span>Укажите дополнительную информацию к заказу.</span>
            <span>Например, как добраться или позвонить вам.</span>
          </div>
          <TextField
            fullWidth
            label="Введите текст комментария"
            multiline
            rows={4}
            value={comment}
            defaultValue=""
            onChange={(e: any) => setComment(e.target.value)}
          />
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Сохранить комментарий
          </motion.button>
        </CommentContent>
      </CommentWrapper>
    </CommentContainer>
  );
};

const CommentContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff5e;
  z-index: 25;
  border-radius: 25px;
`;

const CommentWrapper = styled.div`
  width: 450px;
  height: 430px;
  border-radius: 20px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  padding: 40px;
  position: relative;
  .comment-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
`;

const CommentContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
  h2 {
    font-size: 1.1rem;
  }
  .comment-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px;
  }
  button {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
    cursor: pointer;
    font-family: 'intro';
  }
`;
export default UserCommment;
