import React, { useState, useRef, KeyboardEvent } from 'react';
import Select, { OptionsType, OptionTypeBase } from 'react-select';

interface Chip {
  value: string;
  label: string;
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<Chip[]>([]);
  const [options, setOptions] = useState<OptionsType<OptionTypeBase>>([
    { value: 'john', label: 'John Doe' },
    { value: 'jane', label: 'Jane Doe' },
    { value: 'nick', label: 'Nick Giannopoulos' },
    { value: 'alice', label: 'Alice Johnson' },
    { value: 'bob', label: 'Bob Smith' },
    { value: 'emma', label: 'Emma Watson' },
    { value: 'michael', label: 'Michael Jordan' },
    { value: 'olivia', label: 'Olivia Martinez' },
    { value: 'peter', label: 'Peter Parker' },
    { value: 'sarah', label: 'Sarah Williams' },
    { value: 'tom', label: 'Tom Cruise' },
  ]);

  const inputRef = useRef<Select<OptionTypeBase>>(null);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const newChip: Chip = { value: inputValue.toLowerCase(), label: inputValue };
      setChips([...chips, newChip]);
      setOptions(options.filter((option) => option.value !== newChip.value));
      setInputValue('');
    } else if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      // Handle backspace to remove the last chip
      const lastChip = chips[chips.length - 1];
      setChips(chips.slice(0, -1));
      setOptions([...options, { value: lastChip.value, label: lastChip.label }]);
    }
  };

  const handleChipRemove = (removedChip: Chip) => {
    setChips(chips.filter((chip) => chip.value !== removedChip.value));
    setOptions([...options, { value: removedChip.value, label: removedChip.label }]);
  };

  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: 50,
      minHeight: 36,
    }),
  };
 
  interface MultiValueProps {
    data: { label: string; value: string };
    innerProps: React.HTMLAttributes<HTMLDivElement>;
    removeProps: { onClick: () => void };
  }
  const MultiValue: React.FC<MultiValueProps> = ({ data, innerProps, removeProps }) => (
    <div style={{backgroundColor:'#DCDCDC' , borderRadius:20 ,  padding:4, marginLeft:10, paddingLeft:20}}{...innerProps} className="chip">
      {data.label}
      <span style={{color:'black', fontSize:'10px', fontWeight:'bold', marginLeft:5, marginRight:10}} {...removeProps}>X</span>
    </div>
  );

  return (
    <div style={{margin:'10%'}}>
      <Select
        inputValue={inputValue}
        isClearable={false}
        isSearchable={true}
        onChange={null}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        options={options}
        components={{ MultiValue }}
        isMulti
        ref={inputRef}
        styles={customStyles}
      />
    </div>
  );
};

export default App;
