import {
  clearQueryParams,
  getQueryParams,
  pushQueryParams,
} from 'common/helpers/manageQueryParams.helper';
import { FilterType, getFilters } from 'components/store/catalog/constants';
import ColorFilter from 'components/store/catalog/filters/ColorFilter';
import MultipleSelectionFilter from 'components/store/catalog/filters/MultipleSelectionFilter';
import RangeFilter from 'components/store/catalog/filters/RangeFilter';
import SingleSelectionFilter from 'components/store/catalog/filters/SingleSelectionFilter';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Brand, Category, Color, PriceRange } from 'swagger/services';
import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { convertQueryParams, getFiltersConfig } from './helpers';

type Props = {
  categories: Category[];
  brands: Brand[];
  colors: Color[];
  priceRange: PriceRange;
};

const FilterBar: React.FC<Props> = ({
  categories,
  brands,
  colors,
  priceRange,
}) => {
  const router = useRouter();
  const filters = convertQueryParams(router.query);
  const [filtersConfig, setFiltersConfig] = useState(
    getFiltersConfig({
      categories,
      brands,
      colors,
      priceRange,
      filters,
    }),
  );
  const [localFilters, setLocalFilters] = useState(getFilters(filtersConfig));

  const handleResetFilters = () => {
    clearQueryParams();
  };

  const hanldeResetBtnClick = () => {
    handleResetFilters();
  };

  useEffect(() => {
    const filters = convertQueryParams(getQueryParams());
    console.log(filters, getQueryParams());
    setFiltersConfig(
      getFiltersConfig({
        categories,
        brands,
        colors,
        priceRange,
        filters,
      }),
    );
  }, [categories, brands, colors, priceRange]);

  useEffect(() => {
    setLocalFilters(getFilters(filtersConfig));
  }, [filtersConfig]);

  return (
    <FilterBarContent>
      {localFilters.map(
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
      <ResetButton onClick={hanldeResetBtnClick}>
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
