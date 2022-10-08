import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import { styleProps } from 'components/store/lib/types';

const UserSelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itmes: flex-start;
  gap: 20px;
  border-radius: 15px;
  padding: 15px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  margin-top: ${(P: styleProps) => P.margintop};
  user-select: none;
  h1 {
    font-size: 1.2rem;
    font-family: 'intro';
    margin: 0;
  }
`;

export { UserSelectWrapper };
