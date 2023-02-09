type Props = {
  printVersion: () => JSX.Element;
  selected: Set<number>;
  printService: (index: number) => JSX.Element;
  printNetworks: () => JSX.Element;
  printVolumes: () => JSX.Element;
  isNetworkSelected: boolean;
  isVolumesSelected: boolean;
};

export function Configuration(props: Props) {
  return (
    <pre className='bg-vscblack rounded text-left text-vscwhite p-3 overflow-auto'>
      {props.printVersion()}
      {Array.from(props.selected).length > 0 && (
        <div>
          <span className='text-vscblue'>services</span>:
        </div>
      )}
      {Array.from(props.selected).map((itemIndex: number) => (
        <>
          {props.printService(itemIndex)}
          <br />
        </>
      ))}
      {props.isNetworkSelected && props.printNetworks()}
      <br />
      {props.selected && props.isVolumesSelected && props.printVolumes()}
    </pre>
  );
}
