import { Input, Slider as SliderInit } from 'antd';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Filter, FilterBody, FilterTitle } from '../common';
import debounce from 'lodash/debounce';

type Props = {
  title: string;
  min: number;
  max: number;
  onChange: (values: [number, number]) => void;
};

const RangeFilter: React.FC<Props> = ({ title, min, max, onChange }) => {
  const [[minVal, maxVal], setValues] = useState([min, max]);
  const Slider = SliderInit as any;

  const handleSliderChange = (values: [number, number]) => {
    setValues(values);
    delayedChange(values);
  };

  const handleMinValChange = (e) => {
    setValues([e.target.value, maxVal]);
  };

  const handleMaxValChange = (e) => {
    setValues([minVal, e.target.value]);
  };

  const delayedChange = useCallback(
    debounce((values) => onChange(values), 200),
    [],
  );

  return (
    <Filter>
      <FilterTitle>{title}</FilterTitle>
      <FilterBody>
        <FieldsWrapper>
          <Input
            min={min}
            max={max}
            value={minVal}
            suffix={<Suffix>₽</Suffix>}
            style={{
              maxWidth: '95px',
              marginRight: '50px',
              borderColor: '#F0BC5E',
              borderRadius: '4px',
            }}
            onChange={handleMinValChange}
          />
          <Input
            min={min}
            max={max}
            value={maxVal}
            suffix={<Suffix>₽</Suffix>}
            style={{
              maxWidth: '95px',
              borderColor: '#F0BC5E',
              borderRadius: '4px',
            }}
            onChange={handleMaxValChange}
          />
        </FieldsWrapper>
        <SliderWrapper>
          <Slider
            range
            step={10}
            min={min}
            max={max}
            handleStyle={{ backgroundColor: '#F0BC5E', borderColor: '#F0BC5E' }}
            trackStyle={{
              backgroundColor: '#F0BC5E',
              height: '2px',
              marginTop: '1px',
            }}
            defaultValue={[min, max]}
            onChange={handleSliderChange}
            value={[minVal, maxVal]}
          />
        </SliderWrapper>
      </FilterBody>
    </Filter>
  );
};

const SliderWrapper = styled.div`
  margin-top: 20px;

  .ant-slider-rail {
    height: 2px;
    margin-top: 1px;
  }
`;

const FieldsWrapper = styled.div`
  display: flex;
`;

const Suffix = styled.div`
  font-size: 14px;
`;

export default RangeFilter;
