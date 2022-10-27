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
import { motion } from 'framer-motion';
import variants from '../lib/variants';
import {
  Brand,
  Category,
  Color,
  PriceRange,
  Size,
  Tag,
} from 'swagger/services';
import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { convertQueryParams, getFiltersConfig } from './helpers';
import { devices } from '../lib/Devices';
import color from '../lib/ui.colors';
import ArrowRightSVG from '../../../assets/arrowGray.svg';
import CloseSVG from '../../../assets/close.svg';

type Props = {
  categories: Category[];
  subCategories: Category[];
  brands: Brand[];
  colors: Color[];
  tags: Tag[];
  sizes: Size[];
  priceRange: PriceRange;
  expanded: any;
  handleExpantionChange: any;
};

const FilterBar: React.FC<Props> = ({
  categories,
  subCategories,
  brands,
  colors,
  tags,
  sizes,
  priceRange,
  expanded,
  handleExpantionChange,
}) => {
  const router = useRouter();
  const filters = convertQueryParams(router.query);
  const [filtersConfig, setFiltersConfig] = useState(
    getFiltersConfig({
      categories,
      subCategories,
      brands,
      colors,
      priceRange,
      filters,
      tags,
      sizes,
    }),
  );
  // const [expanded, setExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(getFilters(filtersConfig));

  const handleResetFilters = () => {
    clearQueryParams();
  };

  const hanldeResetBtnClick = () => {
    handleResetFilters();
  };

  // const handleExpantionChange = () => {
  //   setExpanded((prev) => !prev);
  // };

  useEffect(() => {
    const filters = convertQueryParams(getQueryParams(window.location.search));
    setFiltersConfig(
      getFiltersConfig({
        categories,
        subCategories,
        brands,
        colors,
        priceRange,
        filters,
        tags,
        sizes,
      }),
    );
  }, [categories, subCategories, brands, colors, priceRange, tags, sizes]);

  useEffect(() => {
    setLocalFilters(getFilters(filtersConfig));
  }, [filtersConfig]);
  // useEffect(() => handleExpantionChange(), []);

  return (
    <FilterBarContent expanded={expanded}>
      <FiltersWrapper>
        {localFilters.map(
          (filter, key) =>
            (filter.type === FilterType.SINGLE_SELECTION &&
              !!filter.options?.length && (
                <SingleSelectionFilter
                  key={`filter-${key}`}
                  title={filter.title}
                  options={filter.options}
                  onChange={
                    filter.onChange as (selectedOptions: FilterOption) => void
                  }
                />
              )) ||
            (filter.type === FilterType.MULTIPLE_SELECTION &&
              !!filter.options?.length && (
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
            (filter.type === FilterType.COLOR && !!filter.options?.length && (
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
            (filter.type === FilterType.RANGE &&
              !!filter.min &&
              !!filter.max && (
                <RangeFilter
                  key={`filter-${key}`}
                  title={filter.title}
                  min={filter.min!}
                  max={filter.max!}
                  onChange={
                    filter.onChange as (values: [number, number]) => void
                  }
                />
              )),
        )}
        <ResetButton
          initial="init"
          whileInView="animate"
          custom={0.2}
          viewport={{ once: true }}
          variants={variants.fadInSlideUp}
          onClick={hanldeResetBtnClick}
        >
          <span>Сбросить</span>
          <img src="assets/images/reset-icon.png" />
        </ResetButton>
      </FiltersWrapper>
      {/* {!expanded && (
        <ShowBtn onClick={handleExpantionChange}>
          <ArrowRightSVG />
        </ShowBtn>
      )} */}
      <CloseBtn
        whileInView="hover"
        whileTap="tap"
        variants={variants.boxShadow}
        onClick={handleExpantionChange}
        title="Закрыть фильтры"
      >
        <span>Закрыть фильтры</span>
        <span>
          <CloseSVG />
        </span>
      </CloseBtn>
    </FilterBarContent>
  );
};

const FilterBarContent = styled.div<any>`
  min-width: 272px;

  @media ${devices.laptopS} {
    min-width: 220px;
  }

  @media ${devices.mobileL} {
    position: fixed;
    z-index: 1000;
    background: #fff;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    display: block;
    transform: translate(-100%, 0);
    transition: all 0.3s;
    // overflow-y: auto;
    transform: ${(props) =>
      !props.expanded ? 'translate(-100%, 0)' : 'translate(0, 0)'};
  }
`;

const FiltersWrapper = styled.div`
  @media ${devices.mobileL} {
    overflow-y: auto;
    height: 100vh;
    padding: 20px;
  }
`;

const ResetButton = styled(motion.button)`
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

const ShowBtn = styled.button`
  background: #000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -30px;
  top: calc(50vh - 20px);
  display: none;

  svg {
    transform: scale(2.5);
    margin-right: -5px;
    cursor: pointer;
  }

  @media ${devices.mobileL} {
    display: flex;
  }
`;

const CloseBtn = styled(motion.button)`
  display: none;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${color.btnPrimary};
  padding: 10px;
  border-radius: 15px;
  span {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: ${color.textPrimary};
  }
  @media ${devices.mobileL} {
    display: flex;
  }
`;

export default FilterBar;
