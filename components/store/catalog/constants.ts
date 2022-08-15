import { pushQueryParams } from 'common/helpers/manageQueryParams.helper';
import cloneDeep from 'lodash/cloneDeep';
import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { Filter } from './types';

enum FilterType {
  MULTIPLE_SELECTION,
  SINGLE_SELECTION,
  RANGE,
  COLOR,
}

const getFilters = ({
  sectionOptions,
  subSectionOptions,
  brandOptions,
  colorOptions,
  minPrice,
  maxPrice,
}: {
  sectionOptions: FilterOption[];
  subSectionOptions: FilterOption[];
  brandOptions: FilterOption[];
  colorOptions: FilterOption[];
  minPrice: number;
  maxPrice: number;
}): Filter[] => {
  return [
    {
      title: 'Категории',
      options: cloneDeep(sectionOptions),
      type: FilterType.SINGLE_SELECTION,
      onChange: (selectedOption: FilterOption | undefined) => {
        const categories = [selectedOption?.url!];

        pushQueryParams([
          { name: 'categories', value: categories },
          { name: 'subCategories', value: [] },
          { name: 'brands', value: [] },
          { name: 'colors', value: [] },
          { name: 'minPrice', value: null },
          { name: 'maxPrice', value: null },
        ]);
      },
    },
    {
      title: 'Подкатегории',
      options: cloneDeep(subSectionOptions),
      type: FilterType.SINGLE_SELECTION,
      onChange: (selectedOption: FilterOption | undefined) => {
        const subCategories = [selectedOption?.url!];

        pushQueryParams([
          { name: 'subCategories', value: subCategories },
          { name: 'brands', value: [] },
          { name: 'colors', value: [] },
          { name: 'minPrice', value: null },
          { name: 'maxPrice', value: null },
        ]);
      },
    },
    {
      title: 'Бренды',
      options: cloneDeep(brandOptions),
      type: FilterType.MULTIPLE_SELECTION,
      onChange: (selectedOptions: FilterOption[] | undefined) => {
        const brands = selectedOptions?.map((option) => option.url);

        pushQueryParams([{ name: 'brands', value: brands }]);
      },
    },
    {
      title: 'Цвет',
      options: cloneDeep(colorOptions),
      type: FilterType.COLOR,
      onChange: (selectedOptions: FilterOption[] | undefined) => {
        const colors = selectedOptions?.map((option) => option.url);

        pushQueryParams([{ name: 'colors', value: colors }]);
      },
    },
    {
      title: 'Цена',
      type: FilterType.RANGE,
      min: minPrice,
      max: maxPrice,
      onChange: ([minPrice, maxPrice]: [number, number]) => {
        pushQueryParams([
          { name: 'minPrice', value: minPrice },
          { name: 'maxPrice', value: maxPrice },
        ]);
      },
    },
  ];
};

export { FilterType, getFilters };
