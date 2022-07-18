import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { Filter } from './types';
import cloneDeep from 'lodash/cloneDeep';

enum FilterType {
  MULTIPLE_SELECTION,
  SINGLE_SELECTION,
  RANGE,
  COLOR,
}

// TODO: set options from store
export const sectionOptions: FilterOption[] = [
  {
    id: '1',
    name: 'Кальяны',
    checked: true,
  },
  {
    id: '2',
    name: 'Вейпы',
  },
  {
    id: '3',
    name: 'Жижи',
  },
];

export const brandOptions: FilterOption[] = [
  {
    id: '1',
    name: 'Test 1',
  },
  {
    id: '2',
    name: 'Test 2',
  },
];

export const colorOptions: FilterOption[] = [
  {
    id: '1',
    name: 'Красный',
    color: 'red',
  },
  {
    id: '2',
    name: 'Зеленый',
    color: 'green',
  },
];

const getFilters = ({
  sectionOptions,
  brandOptions,
  colorOptions,
  minPrice,
  maxPrice,
}: {
  sectionOptions: FilterOption[];
  brandOptions: FilterOption[];
  colorOptions: FilterOption[];
  minPrice: number;
  maxPrice: number;
}): Filter[] => {
  return [
    {
      title: 'Раздел',
      options: cloneDeep(sectionOptions),
      type: FilterType.SINGLE_SELECTION,
      onChange: (selectedOption: FilterOption | undefined) => {
        console.log(selectedOption);
      },
    },
    {
      title: 'Бренды',
      options: cloneDeep(brandOptions),
      type: FilterType.MULTIPLE_SELECTION,
      onChange: (selectedOptions: FilterOption[] | undefined) => {
        console.log(selectedOptions);
      },
    },
    {
      title: 'Цвет',
      options: cloneDeep(colorOptions),
      type: FilterType.COLOR,
      onChange: (selectedOptions: FilterOption[] | undefined) => {
        console.log(selectedOptions);
      },
    },
    {
      title: 'Цена',
      type: FilterType.RANGE,
      min: minPrice,
      max: maxPrice,
      onChange: (values: [number, number]) => {
        console.log(values);
      },
    },
  ];
};

export { FilterType, getFilters };
