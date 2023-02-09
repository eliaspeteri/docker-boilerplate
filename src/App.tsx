import { useEffect, useState } from 'react';
import './App.css';
import { Configuration } from './components/configuration';
import { Options } from './components/options';
import { TodoList } from './components/todoList';
import { Volume } from './interfaces/volume.interface';
import { optionsList } from './options';

function App() {
  const [selected, setSelected] = useState<Set<number>>(
    () => new Set([2, 5, 6, 7])
  );
  const [isNetworkSelected, setNetworkSelected] = useState(true);
  const [isVolumesSelected, setVolumesSelected] = useState(true);

  const [networkName, setNetworkName] = useState('my-network');

  useEffect(() => {
    const userSettings = loadFromLocalStorageOrDefault();
    userSettings && setSelected((): Set<number> => new Set(userSettings));
  }, []);

  const loadFromLocalStorageOrDefault = () => {
    const userSettingsInLocalStorage =
      window.localStorage.getItem('userSettings');

    if (!userSettingsInLocalStorage) return [2, 5, 6, 7];
    return JSON.parse(userSettingsInLocalStorage);
  };

  const saveToLocalStorage = (
    selectionSet: Iterable<number> | ArrayLike<number>
  ) =>
    window.localStorage.setItem(
      'userSettings',
      JSON.stringify(Array.from(selectionSet))
    );

  const addItem = (item: number) => {
    setSelected((prev: Set<number>) => {
      const next = new Set(prev).add(item);
      saveToLocalStorage(next);
      return next;
    });
  };

  const removeItem = (item: number) => {
    setSelected((prev: Set<number>) => {
      const next = new Set(prev);

      next.delete(item);

      saveToLocalStorage(next);
      return next;
    });
  };

  const updateSelected = (newSelectionSet: number[]) => {
    setSelected(() => {
      const next = new Set(newSelectionSet);
      saveToLocalStorage(next);
      return next;
    });
  };

  const printService = (serviceIndex: number) => {
    const { name, image, command, ports, volumes, environmentVariables } =
      optionsList[serviceIndex];
    return (
      <div>
        <div>
          {'  '}
          <span className='text-vscblue'>{name || image}</span>:
        </div>
        {'    '}
        <span className='text-vscblue'>image</span>:{' '}
        <span className='text-vscyellow'>{image}</span>
        {command && (
          <div>
            {'    '}
            <span className='text-vscblue'>command</span>:{' '}
            <span className='text-vscyellow'>{command}</span>
          </div>
        )}
        {ports && (
          <div>
            {'    '}
            <span className='text-vscblue'>ports</span>:{' '}
            {ports?.map((port: string) => (
              <div>
                {'     '} - <span className='text-vscyellow'>'{port}'</span>
              </div>
            ))}
          </div>
        )}
        {volumes && isVolumesSelected && (
          <div>
            {'    '}
            <span className='text-vscblue'>volumes</span>:{' '}
            {volumes?.map((volume: Volume) => (
              <div>
                {'      '}-{' '}
                <span className='text-vscyellow'>
                  {`${volume.source}:${volume.target}`}
                  {volume.flags && `:${volume.flags}`}
                </span>
              </div>
            ))}
          </div>
        )}
        {isNetworkSelected && (
          <div>
            {'    '}
            <span className='text-vscblue'>networks</span>:{' '}
            <div>
              {'      '}- <span className='text-vscyellow'>{networkName}</span>
            </div>
          </div>
        )}
        {environmentVariables && (
          <div>
            {'    '}
            <span className='text-vscblue'>environment</span>:
            <div>
              {environmentVariables.map((variable: string) => (
                <div>
                  {'      '}- <span className='text-vscyellow'>{variable}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const printNetworks = () => (
    <div>
      <span className='text-vscblue'>networks</span>:
      <div>
        {'  '}
        {/* TODO: Make network name dynamic with input */}
        <span className='text-vscblue'>{networkName}</span>:
        <div>
          {'    '}
          <span className='text-vscblue'>driver</span>:{' '}
          <span className='text-vscyellow'>bridge</span>
        </div>
      </div>
    </div>
  );

  const printVolumes = () => {
    // TODO: Prevent duplicates by converting to Set etc.
    return (
      <div>
        <span className='text-vscblue'>volumes</span>:
        {Array.from(selected).map((item: number) =>
          optionsList[item].volumes?.map((volume: Volume) => (
            <div>
              {volume.source !== '.' &&
                !(
                  volume.source.startsWith('.') ||
                  volume.source.startsWith('~') ||
                  volume.source.startsWith('/')
                ) && (
                  <>
                    {'  '}
                    <span className='text-vscblue'>{volume.source}</span>:
                  </>
                )}
            </div>
          ))
        )}
      </div>
    );
  };
  const printVersion = () => (
    <div>
      <span className='text-vscblue'>version</span>:{' '}
      <span className='text-vscyellow'>'3'</span>
    </div>
  );

  return (
    <div className='App'>
      <div className='h-16' />
      <Options
        options={optionsList}
        addItem={addItem}
        removeItem={removeItem}
        selected={selected}
        setNetworkSelected={setNetworkSelected}
        setVolumesSelected={setVolumesSelected}
        updateSelected={updateSelected}
      />
      <Configuration
        printVersion={printVersion}
        selected={selected}
        printNetworks={printNetworks}
        printVolumes={printVolumes}
        printService={printService}
        isNetworkSelected={isNetworkSelected}
        isVolumesSelected={isVolumesSelected}
      />
      {/* <TodoList /> */}
    </div>
  );
}

export default App;
