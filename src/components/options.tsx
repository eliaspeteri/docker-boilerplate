import React, { ChangeEvent } from 'react';

import { Option } from '../interfaces/option.interface';
import { OptionComponent } from './optionComponent';

type Props = {
  options: Option[];
  addItem: (index: number) => void;
  removeItem: (index: number) => void;
  selected: Set<number>;
  setNetworkSelected: (checked: boolean) => void;
  setVolumesSelected: (checked: boolean) => void;
  updateSelected: (newSet: number[]) => void;
};

export function Options(props: Props) {
  const Colors = new Map();
  Colors.set('Web', 'green');
  Colors.set('DB', 'yellow');
  Colors.set('Cache', 'red');
  Colors.set('CLI', 'sky');
  Colors.set('Lang', 'purple');
  Colors.set('Proxy', 'indigo');
  Colors.set('Monitor', 'teal');
  Colors.set('Docker', 'cyan');

  return (
    <div className="flex flex-col">
      {props.options.map((option: Option, index: number) => (
        <OptionComponent
          key={index}
          option={option}
          index={index}
          Colors={Colors}
          addItem={props.addItem}
          removeItem={props.removeItem}
          selected={props.selected}
        />
      ))}
    </div>
  );
}
