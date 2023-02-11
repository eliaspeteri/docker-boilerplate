type Props = {
  printVersion: () => JSX.Element;
  selected: number[];
  printService: (index: number) => JSX.Element;
  printNetworks: () => JSX.Element;
  printVolumes: () => JSX.Element;
  isNetworkSelected: boolean;
  isVolumesSelected: boolean;
};

export function Configuration(props: Props) {
  return (
    <pre className="bg-vscblack text-left text-vscwhite p-3 overflow-auto rounded-r-lg">
      {props.printVersion()}
      {props.selected.length > 0 && (
        <div>
          <span className="text-vscblue">services</span>:
        </div>
      )}
      {props.selected.map((itemIndex: number) => (
        <div key={itemIndex}>
          {props.printService(itemIndex)}
          <br />
        </div>
      ))}
      {props.isNetworkSelected && props.printNetworks()}
      <br />
      {props.selected && props.isVolumesSelected && props.printVolumes()}
    </pre>
  );
}
