import Checkbox from 'react-custom-checkbox';
import styled from 'styled-components';
import { FilterCheckboxSize } from './types';

type Props = {
  label?: string;
  checked?: boolean;
  style?: Object;
  size?: FilterCheckboxSize;
  onChange?: (value: boolean) => void;
};

const FilterCheckbox: React.FC<Props> = ({
  label,
  checked,
  style,
  size,
  onChange,
}) => {
  const sizeValue = size === FilterCheckboxSize.Big ? 24 : 16;
  const dimensions = size === FilterCheckboxSize.Big ? 18 : 12;
  return (
    <div style={style}>
      <Checkbox
        icon={<Checked dimensions={dimensions} />}
        onChange={onChange}
        checked={checked}
        borderColor="#F0BC5E"
        size={sizeValue}
        borderWidth={1}
        borderRadius={2}
        style={{ cursor: 'pointer' }}
        labelStyle={{
          marginLeft: '10px',
          userSelect: 'none',
          cursor: 'pointer',
        }}
        label={label}
      />
    </div>
  );
};

const Checked = styled.div<{ dimensions: number }>`
  height: ${(prop) => prop.dimensions}px;
  width: ${(prop) => prop.dimensions}px;
  border-radius: 2px;
  background-color: #f0bc5e;
`;

export default FilterCheckbox;
