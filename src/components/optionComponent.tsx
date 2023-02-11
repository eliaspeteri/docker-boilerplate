import { ChangeEvent } from 'react';
import { Option } from '../interfaces/option.interface';

interface Props {
  index: number;
  option: Option;
  Colors: Map<string, string>;
  addItem: (index: number) => void;
  removeItem: (index: number) => void;
  selected: number[];
}

export function OptionComponent(props: Props) {
  return (
    <div key={props.index} className="py-1">
      <label className="float-left pl-2" htmlFor={props.option.alias || props.option.name || props.option.image}>
        {props.option.tag}
      </label>
      <label
        htmlFor={props.option.alias || props.option.name || props.option.image}
        className={`flex flex-row py-1 px-3 ${
          props.selected.includes(props.index)
            ? `bg-${props.Colors.get(props.option.tag ?? 'vscblack')}-500 w-56 hover:w-60`
            : `bg-${props.Colors.get(props.option.tag ?? 'vscblack')}-700 w-44 hover:w-48`
        } transition-all float-right rounded-l-lg align-middle cursor-pointer`}
      >
        {props.option.alias || props.option.name || props.option.image}
        <input
          id={props.option.alias || props.option.name || props.option.image}
          type="checkbox"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            e.target.checked ? props.addItem(props.index) : props.removeItem(props.index)
          }
          checked={props.selected.includes(props.index)}
          className="scale-150 w-3 relative left-2 hidden"
        />
      </label>
    </div>
  );
}
