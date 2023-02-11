import { ChangeEvent } from 'react';

interface Props {
  setNetworkSelected: (checked: boolean) => void;
  setVolumesSelected: (checked: boolean) => void;
  updateSelected: (selection: number[]) => void;
  copyToClipboard: () => void;
}

export function OptionRowComponent(props: Props) {
  return (
    <section className="flex flex-col justify-end pb-4">
      {/* Checkbox Group */}
      <div className="flex flex-row justify-center p-4">
        <div>
          <label htmlFor="network">network?</label>

          <input
            id="network"
            type="checkbox"
            defaultChecked
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.setNetworkSelected(e.target.checked)}
          />
        </div>
        <div className="w-4" />
        <div>
          <label htmlFor="volumes">volumes?</label>
          <input
            id="volumes"
            type="checkbox"
            defaultChecked
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.setVolumesSelected(e.target.checked)}
          />
        </div>
      </div>

      {/* Quick Button Group */}
      <div className="flex flex-row justify-center p-4">
        <button
          className="rounded bg-vscwhite px-2 text-vscblack hover:bg-slate-300"
          onClick={() => props.updateSelected([5, 6, 7])}
        >
          node
        </button>
        <div className="w-4" />
        <button
          className="rounded bg-vscwhite px-2 text-vscblack hover:bg-slate-300"
          onClick={() => props.updateSelected([2, 19, 26, 27])}
        >
          wordpress
        </button>
        <div className="w-4" />
        <button
          className="rounded bg-vscwhite px-2 text-vscblack hover:bg-slate-300"
          onClick={() => props.updateSelected([5, 12, 28])}
        >
          nextcloud
        </button>
        <div className="w-4" />

        <button
          className="rounded bg-vscwhite px-2 text-vscblack hover:bg-slate-300"
          onClick={() => props.copyToClipboard()}
        >
          copy
        </button>
      </div>
    </section>
  );
}
