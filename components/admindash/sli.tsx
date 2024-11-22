import { FC } from 'react';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onValueChange: (value: number) => void;
}

const Slider: FC<SliderProps> = ({ min, max, value, onValueChange }) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onValueChange(Number(e.target.value))}
      className="w-full"
    />
  );
};

export default Slider;
