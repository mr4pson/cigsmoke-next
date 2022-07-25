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
import { convertQueryParams } from './helpers';

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
  const query = convertQueryParams(router.query);
  console.log(query);

  const filtersConfig = {
    sectionOptions: categories.map(({ id, name, url }) => ({
      id,
      name,
      url,
      checked: !!query.categories?.find((categoryUrl) => categoryUrl === url),
    })) as FilterOption[],
    brandOptions: brands.map(({ id, name, url }) => ({
      id,
      name,
      url,
      checked: !!query.brands?.find((brandUrl) => brandUrl === url),
    })) as FilterOption[],
    colorOptions: colors.map(({ id, name, url, code }) => ({
      id,
      name,
      url,
      color: code,
      checked: !!query.colors?.find((colorUrl) => colorUrl === url),
    })) as FilterOption[],
    minPrice: priceRange.minPrice!,
    maxPrice: priceRange.maxPrice!,
  };
  const [localFilters, setLocalFilters] = useState(getFilters(filtersConfig));

  const handleResetFilters = () => {
    setLocalFilters([]);
    setTimeout(() => {
      setLocalFilters(getFilters(filtersConfig));
    });
  };

  const hanldeResetBtnClick = () => {
    router.push({
      pathname: '/catalog',
      query: {},
    });

    handleResetFilters();
  };

  useEffect(() => {
    handleResetFilters();
  }, [categories, brands, colors, priceRange]);

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
