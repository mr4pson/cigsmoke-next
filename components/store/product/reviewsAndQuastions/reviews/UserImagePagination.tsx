import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import React from 'react';

const UserImagePicker = (props: any) => {
  return (
    <UserImageList>
      {props.images.map((item, index) => {
        return (
          <UserImageItems
            key={`user-review-image-${index}`}
            custom={index * 0.001}
            initial="init"
            whileInView="animate"
            variants={variants.fadInSlideUp}
            onClick={() => {
              props.setSelectedIndex(index);
              if (index != props.selectedIndex) {
                props.paginate(index > props.selectedIndex ? 1 : -1);
              }
            }}
          >
            <motion.img
              custom={index * 0.005}
              initial="init"
              animate="animate"
              variants={variants.slideInFromRigh}
              src={props.image}
            />
          </UserImageItems>
        );
      })}
      {props.imagesData != null ? (
        <UserImageItems
          whileHover="hover"
          whileTap="tap"
          custom={1.1}
          variants={variants.grow}
          onClick={() => props.setImagesData(props.imagesData + 1)}
        >
          <span>Еще...</span>
        </UserImageItems>
      ) : (
        ''
      )}
    </UserImageList>
  );
};

const UserImageList = styled.ul`
  width: 100%;
  height: 600px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  user-select: none;
  padding: 10px;
`;

const UserImageItems = styled(motion.li)`
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #e5f2ff;
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  cursor: pointer;
  border-radius: 10px;
  span {
    font-family: 'intro';
    padding: 20px;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

export default UserImagePicker;
