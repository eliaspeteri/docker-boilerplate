import { useEffect, useState } from 'react';
import { Configuration } from './components/configuration';
import { Dockerfiles } from './components/dockerfiles';
import { OptionRowComponent } from './components/optionRowComponent';
import { Options } from './components/options';
import { Volume } from './interfaces/volume.interface';
import { optionsList } from './options';

function App() {
  const [selected, setSelected] = useState<Set<number>>(() => new Set([2, 5, 6, 7]));
  const [isNetworkSelected, setNetworkSelected] = useState(true);
  const [isVolumesSelected, setVolumesSelected] = useState(true);

  const [networkName, setNetworkName] = useState('my-network');

  useEffect(() => {
    const userSettings = loadFromLocalStorageOrDefault();
    userSettings && setSelected((): Set<number> => new Set(userSettings));
  }, []);

  const loadFromLocalStorageOrDefault = () => {
    const userSettingsInLocalStorage = window.localStorage.getItem('userSettings');

    if (!userSettingsInLocalStorage) return [2, 5, 6, 7];
    return JSON.parse(userSettingsInLocalStorage);
  };

  const saveToLocalStorage = (selectionSet: Iterable<number> | ArrayLike<number>) =>
    window.localStorage.setItem('userSettings', JSON.stringify(Array.from(selectionSet)));

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
    const { name, image, command, ports, volumes, environmentVariables, build } = optionsList[serviceIndex];
    return (
      <div>
        <div>
          {'  '}
          <span className="text-vscblue">{name || image}</span>:
        </div>
        {'    '}
        <span className="text-vscblue">image</span>: <span className="text-vscyellow">{image}</span>
        {command && (
          <div>
            {'    '}
            <span className="text-vscblue">command</span>: <span className="text-vscyellow">{command}</span>
          </div>
        )}
        {ports && (
          <div>
            {'    '}
            <span className="text-vscblue">ports</span>:{' '}
            {ports?.map((port: string, index) => (
              <div key={index}>
                {'     '} - <span className="text-vscyellow">'{port}'</span>
              </div>
            ))}
          </div>
        )}
        {volumes && isVolumesSelected && (
          <div>
            {'    '}
            <span className="text-vscblue">volumes</span>:{' '}
            {volumes?.map((volume: Volume, index) => (
              <div key={index}>
                {'      '}-{' '}
                <span className="text-vscyellow">
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
            <span className="text-vscblue">networks</span>:{' '}
            <div>
              {'      '}- <span className="text-vscyellow">{networkName}</span>
            </div>
          </div>
        )}
        {environmentVariables && (
          <div>
            {'    '}
            <span className="text-vscblue">environment</span>:
            <div>
              {environmentVariables.map((variable: string, index: number) => (
                <div key={index}>
                  {'      '}- <span className="text-vscyellow">{variable}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {build && (
          <div>
            {'    '}
            <span className="text-vscblue">build</span>: <span className="text-vscyellow">{build}</span>
          </div>
        )}
      </div>
    );
  };

  const printNetworks = () => (
    <div>
      <span className="text-vscblue">networks</span>:
      <div>
        {'  '}
        {/* TODO: Make network name dynamic with input */}
        <span className="text-vscblue">{networkName}</span>:
        <div>
          {'    '}
          <span className="text-vscblue">driver</span>: <span className="text-vscyellow">bridge</span>
        </div>
      </div>
    </div>
  );

  const printVolumes = () => {
    // TODO: Prevent duplicates by converting to Set etc.
    return (
      <div>
        <span className="text-vscblue">volumes</span>:
        {Array.from(selected).map((item: number) =>
          optionsList[item].volumes?.map((volume: Volume, index: number) => (
            <div key={index}>
              {volume.source !== '.' &&
                !(volume.source.startsWith('.') || volume.source.startsWith('~') || volume.source.startsWith('/')) && (
                  <>
                    {'  '}
                    <span className="text-vscblue">{volume.source}</span>:
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
      <span className="text-vscblue">version</span>: <span className="text-vscyellow">'3'</span>
    </div>
  );

  return (
    <div className="App font-['Rubik'] text-center">
      <section className="grid grid-cols-2 lg:w-5/6 md:w-full mx-auto">
        <section>
          <h1 className="text-2xl pt-8 mx-auto">EZ-Compose</h1>
          <h2 className="text-1xl pt-4 pb-8 w-4/6 md:w-5/6 mx-auto">
            <p>
              It's tedious to build docker-compose files by hand. We've all been there. That's why we came up with{' '}
              <span className="text-green-400">EZ-Compose</span> to simplify and automate boilerplate processes. Your
              DevOps engineer friends at the parties you totally go to will thank you profusely.
            </p>
            <div className="py-2" />
            <p>
              We've made configuring container services easy as pie because some things aren't meant to be needlessly
              complicated. Simply enable the services you need, copy the configuration and{' '}
              <span className="text-red-400">hit the ground running.</span>
            </p>
            <div className="py-2" />
            <p>
              As a bonus, some services come with dockerfiles because the free world couldn't quite bring us images in
              Docker Hub for everything. But it certainly got us close. If you're curious,{' '}
              <a
                href="https://hub.docker.com/search/?q=&type=image&image_filter=official"
                className="text-blue-400 hover:text-blue-300"
                target={'_blank'}
                rel="noopener noreferrer"
              >
                here's a list of popular images for bedtime reading.
              </a>
            </p>
          </h2>
        </section>
        <OptionRowComponent
          setNetworkSelected={setNetworkSelected}
          setVolumesSelected={setVolumesSelected}
          updateSelected={updateSelected}
        />
        <Options
          options={optionsList}
          addItem={addItem}
          removeItem={removeItem}
          selected={selected}
          setNetworkSelected={setNetworkSelected}
          setVolumesSelected={setVolumesSelected}
          updateSelected={updateSelected}
        />
        <section className="sticky">
          <Configuration
            printVersion={printVersion}
            selected={selected}
            printNetworks={printNetworks}
            printVolumes={printVolumes}
            printService={printService}
            isNetworkSelected={isNetworkSelected}
            isVolumesSelected={isVolumesSelected}
          />
          <div className="py-4" />
          <Dockerfiles selected={selected} optionsList={optionsList} />
          <div className="py-4" />
        </section>
        <div className="py-8" />
      </section>
    </div>
  );
}

export default App;
