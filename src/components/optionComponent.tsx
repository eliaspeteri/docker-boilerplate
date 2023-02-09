import { ChangeEvent } from 'react';
import { Option } from '../interfaces/option.interface';

interface Props {
  index: number;
  option: Option;
  Colors: Map<string, string>;
  addItem: (index: number) => void;
  removeItem: (index: number) => void;
  selected: Set<number>;
}

export function OptionComponent(props: Props) {
  return (
    <div key={props.index}>
      <label className="float-left pl-2" htmlFor={props.option.alias || props.option.name || props.option.image}>
        {props.option.tag}
      </label>
      <label
        htmlFor={props.option.alias || props.option.name || props.option.image}
        className={`flex flex-row px-4 py-1 bg-${props.Colors.get(
          props.option.tag ?? 'vscblack'
        )}-500 hover:bg-${props.Colors.get(
          props.option.tag ?? 'vscblack'
        )}-600 float-right rounded-l-lg align-middle cursor-pointer`}
      >
        {props.option.alias || props.option.name || props.option.image}
        <input
          id={props.option.alias || props.option.name || props.option.image}
          type="checkbox"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            e.target.checked ? props.addItem(props.index) : props.removeItem(props.index)
          }
          checked={props.selected.has(props.index)}
          className="scale-150 w-3 relative left-2"
        />
      </label>
    </div>
  );
}
