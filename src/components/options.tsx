import React, { ChangeEvent } from 'react';

import { IOption } from '../interfaces/option.interface';

type Props = {
  options: IOption[];
  addItem: (index: number) => void;
  removeItem: (index: number) => void;
  selected: Set<number>;
  setNetworkSelected: (checked: boolean) => void;
  setVolumesSelected: (checked: boolean) => void;
  updateSelected: (newSet: number[]) => void;
};

export function Options(props: Props) {
  return (
    <>
      <div className='grid grid-cols-6 gap-y-2'>
        {props.options.map((option: IOption, index: number) => (
          <>
            <label htmlFor={option.image}>{option.name || option.image}</label>
            <input
              id={option.image}
              type='checkbox'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                e.target.checked
                  ? props.addItem(index)
                  : props.removeItem(index)
              }
              checked={props.selected.has(index)}
            />
          </>
        ))}
      </div>
      <div className='flex flex-row justify-center py-4'>
        <div>
          <label htmlFor='network' className='text-1xl'>
            network?
          </label>

          <input
            id='network'
            type='checkbox'
            defaultChecked
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              props.setNetworkSelected(e.target.checked)
            }
          />
        </div>
        <div className='w-4'></div>
        <div>
          <label htmlFor='volumes' className='text-1xl'>
            volumes?
          </label>
          <input
            id='volumes'
            type='checkbox'
            defaultChecked
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              props.setVolumesSelected(e.target.checked)
            }
          />
        </div>
      </div>

      <div className='flex justify-center py-4'>
        <button
          className='bg-vscwhite hover:bg-slate-300 text-vscblack rounded px-2'
          onClick={() => props.updateSelected([5, 6, 7])}
        >
          node
        </button>
        <div className='w-4'></div>
        <button
          className='bg-vscwhite hover:bg-slate-300 text-vscblack rounded px-2'
          onClick={() => props.updateSelected([2, 18, 25, 26])}
        >
          wordpress
        </button>
      </div>
    </>
  );
}
