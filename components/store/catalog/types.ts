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
