import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';

const UserImages = ({ title, thumbnails, setOpen, setDisplay }) => {
  return (
    <ImagesWrapper>
      <h3>{title}</h3>
      <ImagesContentWrapper>
        {thumbnails.slice(0, 6).map((image, index) => {
          return (
            <motion.li
              key={`user-images-${index}`}
              custom={index * 0.02}
              initial="init"
              whileInView="animate"
              viewport={{ once: true }}
              variants={variants.fadInSlideUp}
              onClick={() => {
                setOpen(true);
                setDisplay('flex');
              }}
            >
              <motion.div
                custom={index * 0.08}
                initial="init"
                whileInView="animate"
                viewport={{ once: true }}
                variants={variants.slideInFromRigh}
                style={{
                  backgroundImage: `url(/api/images/${image})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  width: '80px',
                  height: '80px',
                }}
              />
              {index > 4 ? (
                <span>{`+${thumbnails.length - index - 1}`}</span>
              ) : (
                ''
              )}
            </motion.li>
          );
        })}
      </ImagesContentWrapper>
    </ImagesWrapper>
  );
};

const ImagesWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  h3 {
    text-align: start;
    font-size: 1.5rem;
    margin: 0;
  }
`;

const ImagesContentWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  li {
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${color.textPrimary};
    box-shadow: 0px 2px 6px ${color.boxShadow};
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    span {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #ffffff78;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default UserImages;
