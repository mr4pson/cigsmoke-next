import Checkbox from 'react-custom-checkbox';
import styled from 'styled-components';

type Props = {
  label: string;
  checked?: boolean;
  style?: Object;
  onChange?: (value: boolean) => void;
};

const FilterCheckbox: React.FC<Props> = ({
  label,
  checked,
  style,
  onChange,
}) => {
  return (
    <div style={style}>
      <Checkbox
        icon={<Checked />}
        onChange={onChange}
        checked={checked}
        borderColor="#F0BC5E"
        size={16}
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

const Checked = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 2px;
  background-color: #f0bc5e;
`;

export default FilterCheckbox;
