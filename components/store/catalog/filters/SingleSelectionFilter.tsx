import { useState } from 'react';
import styled, { css } from 'styled-components';
import { FilterOption } from '../../../../ui-kit/FilterCheckbox/types';
import { Filter, FilterBody, FilterTitle } from '../common';

type Props = {
  title: string;
  options?: FilterOption[];
  onChange: (selectedOption: FilterOption) => void;
};

const SingleSelectionFilter: React.FC<Props> = ({
  title,
  options,
  onChange,
}) => {
  const [stateOptions, setStateOptions] = useState(options);

  const handleChange = (id: string) => () => {
    const options = [...stateOptions!];
    const activeOption = options?.find((option) => option.checked);

    if (activeOption) {
      activeOption!.checked = false;
    }

    const curOption = options?.find((option) => option.id === id);
    curOption!.checked = true;

    setStateOptions(options);
    onChange(curOption!);
  };

  return (
    <Filter>
      <FilterTitle>{title}</FilterTitle>
      <FilterBody>
        {stateOptions?.map((option) => (
          <Selection
            key={`filter-selection-${option.id}`}
            selected={!!option.checked}
            onClick={handleChange(option.id)}
          >
            {option.name}
          </Selection>
        ))}
      </FilterBody>
    </Filter>
  );
};

const Selection = styled.div<{
  selected: boolean;
}>`
  width: fit-content;
  border-radius: 2px;
  margin-bottom: 5px;
  font-size: 14px;
  line-height: 14px;
  padding: 3px 8px;
  border-radius: 3px;
  cursor: pointer;

  ${(props) => {
    if (props.selected) {
      return css`
        background-color: #f0bc5e;
        color: #fff;
      `;
    }
  }}
`;

export default SingleSelectionFilter;
