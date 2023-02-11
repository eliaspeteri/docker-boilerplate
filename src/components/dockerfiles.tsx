import { Option } from '../interfaces/option.interface';

interface Props {
  selected: number[];
  optionsList: Option[];
}

export function Dockerfiles(props: Props) {
  return (
    <>
      {props.selected.map(
        (index) =>
          props.optionsList[index].dockerfile && (
            <pre key={index} className="text-left p-3 bg-vscblack overflow-auto my-4 rounded-r-lg">
              {props.optionsList[index].dockerfile}
            </pre>
          )
      )}
    </>
  );
}
