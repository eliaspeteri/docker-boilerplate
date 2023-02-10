import { Option } from '../interfaces/option.interface';

interface Props {
  selected: Set<number>;
  optionsList: Option[];
}

export function Dockerfiles(props: Props) {
  return (
    <>
      {Array.from(props.selected).map(
        (index) =>
          props.optionsList[index].dockerfile && (
            <pre key={index} className="text-left p-3 bg-vscblack overflow-auto">
              {props.optionsList[index].dockerfile}
            </pre>
          )
      )}
    </>
  );
}
