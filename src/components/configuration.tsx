type Props = {
  printVersion: () => JSX.Element;
  selected: number[];
  printService: (index: number) => JSX.Element;
  printNetworks: () => JSX.Element;
  printVolumes: () => JSX.Element;
  isNetworkSelected: boolean;
  isVolumesSelected: boolean;
  configurationForClipboard: string;
};

export function Configuration({
  printVersion,
  selected,
  printService,
  printNetworks,
  printVolumes,
  isNetworkSelected,
  isVolumesSelected,
  configurationForClipboard,
}: Props) {
  const printServiceHeader = () => {
    if (selected.length > 0) {
      configurationForClipboard += 'services:\n';

      return (
        <div>
          <span className="text-vscblue">services</span>:
        </div>
      );
    }
  };
  return (
    <pre className="bg-vscblack text-left text-vscwhite p-3 overflow-auto rounded-r-lg">
      <code>
        {printVersion()}
        {printServiceHeader()}
        {selected.map((itemIndex: number) => (
          <div key={itemIndex}>
            {printService(itemIndex)}
            <br />
          </div>
        ))}
        {isNetworkSelected && printNetworks()}
        <br />
        {selected && isVolumesSelected && printVolumes()}
      </code>
    </pre>
  );
}
