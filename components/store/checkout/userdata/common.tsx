import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import { styleProps } from 'components/store/lib/types';

const DetailsRowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${(p: styleProps) => p.justifycontent};
  align-items: center;
  gap: 10px;
`;
const DetailsColumnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 5px;
  label {
    width: 96%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding: 5px;
    span {
      font-family: 'intro';
    }
    .tool-tip {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: help;
    }
    .required {
      color: ${color.hover};
    }
  }
`;

export { DetailsRowWrapper, DetailsColumnWrapper };
