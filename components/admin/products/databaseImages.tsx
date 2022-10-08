import color from 'components/store/lib/ui.colors';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { axiosInstance } from 'common/axios.instance';
import Delete from '../../../assets/delete.svg';
import CloseSVG from '../../../assets/close_black.svg';
import { useAppDispatch } from 'redux/hooks';
import { setDefaultImageList } from 'redux/slicers/mutipleImagesSlicer';

const DatabaseImages = ({ setOpen, index }) => {
  const dispatch = useAppDispatch();
  const [images, setImages] = useState([]);
  const [onView, setOnView] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [[start, end], setPagination] = useState([0, 12]);
  useEffect(() => {
    (async () => {
      setLoaded(false);
      const resp = await axiosInstance.get('/images');
      setImages(resp.data);
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (isLoaded) setOnView(images.slice(start, end));
  }, [images]);

  const handleImageDelete = async (fileName) => {
    setLoaded(false);
    await axiosInstance.delete(`/images/${fileName}`);
    const resp = await axiosInstance.get('/images');
    setImages(resp.data);
    setLoaded(true);
  };
  const handlePagination = (start, end, e) => {
    e.preventDefault();
    // e.stopPropagation();
    setLoaded(false);
    setOnView(images.slice(start, end));
    setPagination([start, end]);
    setSelectedIndex(end);
    setLoaded(true);
  };
  const handleClick = (item) => () => {
    console.log(item);
    dispatch(
      setDefaultImageList({
        file: { name: item.filename, url: `/api/images/${item.filename}` },
        index,
      }),
    );
    setOpen(false);
  };
  return (
    <Contaienr>
      <Wrapper>
        <CloseBtn onClick={() => setOpen(false)}>
          <CloseSVG />
        </CloseBtn>
        <ImagesWrapper>
          {isLoaded
            ? onView.map((item: any, index) => {
                return (
                  <li key={index}>
                    <img
                      src={`/api/images/${item.filename}`}
                      alt={item.filename}
                      onClick={handleClick(item)}
                    />
                    <div className="title-wrapper">
                      <span>{item.filename}</span>
                      <button
                        onClick={() => handleImageDelete(item.filename)}
                        className="delete-wrapper"
                      >
                        <span>Удалить изображение</span>
                        <span>
                          <Delete />
                        </span>
                      </button>
                    </div>
                  </li>
                );
              })
            : 'loading...'}
        </ImagesWrapper>
        <Pageination>
          {isLoaded
            ? images.map((item, index) => {
                if (index % 12 == 0) {
                  return index == 0 ? (
                    ''
                  ) : (
                    <li
                      style={{
                        borderColor:
                          selectedIndex == index
                            ? color.hover
                            : color.btnPrimary,
                      }}
                      onClick={(e) => handlePagination(index - 12, index, e)}
                    >
                      <button>
                        {index - 12} - {index}
                      </button>
                    </li>
                  );
                }
              })
            : 'loading...'}
          {isLoaded ? (
            <li
              onClick={(e) =>
                handlePagination(images.length - 12, images.length, e)
              }
            >
              <button>
                {images.length - 12} - {images.length}
              </button>
            </li>
          ) : (
            'loading...'
          )}
        </Pageination>
      </Wrapper>
    </Contaienr>
  );
};

const Contaienr = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff36;
  z-index: 9;
`;

const Wrapper = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  background-color: ${color.textPrimary};
  border-radius: 25px;
  box-shadow: 0px 0px 10px -2px #000;
  padding: 20px;
  position: relative;
`;

const ImagesWrapper = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow-y: scroll;
  grid-gap: 50px;
  li {
    width: 200px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    img {
      width: 50%;
      height: 50%;
      object-fit: contain;
    }
    .title-wrapper {
      width: 100%;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 10px;
      .delete-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        span {
          color: ${color.hover};
        }
      }
    }
  }
`;

const Pageination = styled.ul`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-contet: flex-start;
  align-items: center;
  gap: 15px;
  overflow-x: scroll;
  overflow-y: hidden;
  li {
    width: 100px;
    min-width: 100px;
    height: 50px;
    border: 1px solid #000;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    button {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
`;

const CloseBtn = styled.span`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px -2px #000;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -30px;
  top: -30px;
`;

export default DatabaseImages;
