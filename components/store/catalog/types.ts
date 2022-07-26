import { TFilters } from "redux/types";
import { Brand, Category, Color, PriceRange } from "swagger/services";
import { FilterOption } from "ui-kit/FilterCheckbox/types";
import { FilterType } from "./constants";

export type Filter = {
  title: string;
  type: FilterType;
  options?: FilterOption[];
  min?: number;
  max?: number;
  onChange: (
    selectedOptions: (FilterOption[] | undefined) &
      FilterOption &
    [number, number],
  ) => void;
};

export type TFiltersConfig = {
  categories: Category[],
  brands: Brand[],
  colors: Color[],
  priceRange: PriceRange,
  filters: TFilters,
}