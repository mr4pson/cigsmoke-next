import ColorFilter from 'components/store/catalog/filters/ColorFilter';
import {
  getFilters,
  FilterType,
  sectionOptions,
  brandOptions,
  colorOptions,
} from 'components/store/catalog/constants';
import MultipleSelectionFilter from 'components/store/catalog/filters/MultipleSelectionFilter';
import RangeFilter from 'components/store/catalog/filters/RangeFilter';
import SingleSelectionFilter from 'components/store/catalog/filters/SingleSelectionFilter';
import { useState } from 'react';
import styled from 'styled-components';
import { FilterOption } from 'ui-kit/FilterCheckbox/types';

const FilterBar = () => {
  const filtersConfig = {
    sectionOptions,
    brandOptions,
    colorOptions,
    minPrice: 1000,
    maxPrice: 10000,
  };
  const [filters, setFilters] = useState(getFilters(filtersConfig));

  const handleResetFilters = () => {
    setFilters([]);
    setTimeout(() => {
      setFilters(getFilters(filtersConfig));
    });
  };

  return (
    <FilterBarContent>
      {filters.map(
        (filter, key) =>
          (filter.type === FilterType.SINGLE_SELECTION && (
            <SingleSelectionFilter
              key={`filter-${key}`}
              title={filter.title}
              options={filter.options}
              onChange={
                filter.onChange as (selectedOptions: FilterOption) => void
              }
            />
          )) ||
          (filter.type === FilterType.MULTIPLE_SELECTION && (
            <MultipleSelectionFilter
              key={`filter-${key}`}
              title={filter.title}
              options={filter.options}
              onChange={
                filter.onChange as (
                  selectedOptions: FilterOption[] | undefined,
                ) => void
              }
            />
          )) ||
          (filter.type === FilterType.COLOR && (
            <ColorFilter
              key={`filter-${key}`}
              title={filter.title}
              options={filter.options}
              onChange={
                filter.onChange as (
                  selectedOptions: FilterOption[] | undefined,
                ) => void
              }
            />
          )) ||
          (filter.type === FilterType.RANGE && (
            <RangeFilter
              key={`filter-${key}`}
              title={filter.title}
              min={filter.min!}
              max={filter.max!}
              onChange={filter.onChange as (values: [number, number]) => void}
            />
          )),
      )}
      <ResetButton onClick={handleResetFilters}>
        <span>Сбросить</span>
        <img src="assets/images/reset-icon.png" />
      </ResetButton>
    </FilterBarContent>
  );
};

const FilterBarContent = styled.div`
  min-width: 272px;
`;

const ResetButton = styled.button`
  background: #000;
  color: #fff;
  padding: 8.5px 17px;
  border-radius: 4px;
  max-width: 142px;
  display: block;
  margin: 25px auto 0;
  cursor: pointer;

  span {
    font-size 16px;
    margin-right: 7px;
  }
`;

export default FilterBar;
