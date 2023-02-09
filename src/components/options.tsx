import React, { ChangeEvent } from 'react';

import { Option } from '../interfaces/option.interface';

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
    <>
      <div className="grid grid-cols-3 mx-auto w-3/4 gap-y-2">
        {props.options.map((option: Option, index: number) => (
          <div>
            <label htmlFor={option.image} className="float-left px-4 align-middle">
              {option.name || option.image}
            </label>

            <div className="float-right">
              {option.tags?.map((tag) => (
                <span className={`px-4 bg-${Colors.get(tag)}-500 rounded-l-lg align-middle`}>{tag}</span>
              ))}
              <input
                id={option.image}
                type="checkbox"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  e.target.checked ? props.addItem(index) : props.removeItem(index)
                }
                checked={props.selected.has(index)}
                className="scale-150"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center py-4">
        <div>
          <label htmlFor="network" className="text-1xl">
            network?
          </label>

          <input
            id="network"
            type="checkbox"
            defaultChecked
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.setNetworkSelected(e.target.checked)}
          />
        </div>
        <div className="w-4" />
        <div>
          <label htmlFor="volumes" className="text-1xl">
            volumes?
          </label>
          <input
            id="volumes"
            type="checkbox"
            defaultChecked
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.setVolumesSelected(e.target.checked)}
          />
        </div>
      </div>

      <div className="flex justify-center py-4">
        <button
          className="rounded bg-vscwhite px-2 text-vscblack hover:bg-slate-300"
          onClick={() => props.updateSelected([5, 6, 7])}
        >
          node
        </button>
        <div className="w-4" />
        <button
          className="rounded bg-vscwhite px-2 text-vscblack hover:bg-slate-300"
          onClick={() => props.updateSelected([2, 18, 25, 26])}
        >
          wordpress
        </button>
        <div className="w-4" />
        <button
          className="rounded bg-vscwhite px-2 text-vscblack hover:bg-slate-300"
          onClick={() => props.updateSelected([5, 11, 27])}
        >
          nextcloud
        </button>
      </div>
    </>
  );
}
