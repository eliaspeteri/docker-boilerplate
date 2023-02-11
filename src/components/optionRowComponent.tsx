import { ChangeEvent, useState } from 'react';

interface Props {
  setNetworkSelected: (checked: boolean) => void;
  setVolumesSelected: (checked: boolean) => void;
  updateSelected: (selection: number[]) => void;
  copyToClipboard: () => void;
}

export function OptionRowComponent(props: Props) {
  const [copied, setCopied] = useState(false);

  return (
    <section className="grid grid-cols-4 w-8/12 gap-y-4 py-8 mx-auto">
      {/* Checkbox Group */}
      <section className="col-span-2">
        <label htmlFor="network" className="align-middle">
          network?
        </label>

        <input
          id="network"
          type="checkbox"
          defaultChecked
          onChange={(e: ChangeEvent<HTMLInputElement>) => props.setNetworkSelected(e.target.checked)}
          className="ml-2 scale-125"
        />
      </section>
      <section className="col-span-2">
        <label htmlFor="volumes" className="align-middle">
          volumes?
        </label>
        <input
          id="volumes"
          type="checkbox"
          defaultChecked
          onChange={(e: ChangeEvent<HTMLInputElement>) => props.setVolumesSelected(e.target.checked)}
          className="ml-2 scale-125"
        />
      </section>

      {/* Quick Button Group */}
      <div className="grid grid-flow-col col-span-4">
        <button
          className="rounded-lg bg-vscwhite p-2 px-8 text-vscblack hover:bg-slate-300"
          onClick={() => props.updateSelected([5, 6, 7])}
        >
          node
        </button>
        <div className="w-4" />
        <button
          className="rounded-lg bg-vscwhite p-2 px-6 text-vscblack hover:bg-slate-300"
          onClick={() => props.updateSelected([2, 19, 26, 27])}
        >
          wordpress
        </button>
        <div className="w-4" />
        <button
          className="rounded-lg bg-vscwhite p-2 px-6 text-vscblack hover:bg-slate-300"
          onClick={() => props.updateSelected([5, 12, 28])}
        >
          nextcloud
        </button>
        <div className="w-4" />

        <button
          className="rounded-lg bg-vscwhite p-2 px-8 drop-shadow text-vscblack hover:bg-slate-300"
          onClick={() => {
            props.copyToClipboard();
            setCopied(true);
            setTimeout(() => setCopied(false), 5000);
          }}
        >
          {copied ? 'copied!' : 'copy'}
        </button>
      </div>
    </section>
  );
}
