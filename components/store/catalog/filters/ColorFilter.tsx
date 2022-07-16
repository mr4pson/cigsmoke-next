import ColorCheckbox from 'ui-kit/ColorCheckbox';
import { FilterOption } from '../../../../ui-kit/FilterCheckbox/types';
import { Filter, FilterBody, FilterTitle } from '../common';

type Props = {
  title: string;
  options?: FilterOption[];
  onChange: (selectedOptions: FilterOption[] | undefined) => void;
};

const ColorFilter: React.FC<Props> = ({ title, options, onChange }) => {
  const handleChange = (id: string) => (value: boolean) => {
    const curOption = options?.find((option) => option.id === id);
    curOption!.checked = value;
    const selectedOptions = options?.filter((option) => option.checked);

    onChange(selectedOptions);
  };

  return (
    <Filter>
      <FilterTitle>{title}</FilterTitle>
      <FilterBody>
        {options?.map((option) => (
          <ColorCheckbox
            style={{ marginBottom: '5px' }}
            color={option.color}
            key={`filter-checkbox-${option.id}`}
            label={option.name}
            checked={option.checked}
            onChange={handleChange(option.id)}
          />
        ))}
      </FilterBody>
    </Filter>
  );
};

export default ColorFilter;
