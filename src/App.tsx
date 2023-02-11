import { useLayoutEffect, useState } from 'react';
import { Configuration } from './components/configuration';
import { Dockerfiles } from './components/dockerfiles';
import { Explanation } from './components/explanation';
import { OptionRowComponent } from './components/optionRowComponent';
import { Options } from './components/options';
// import { Questionnaire } from './components/questionnaire/questionnaire';
import { useCheckboxSet } from './hooks/useCheckboxSet';
import { Volume } from './interfaces/volume.interface';
import { optionsList } from './options';

function App() {
  const { selected, addItem, removeItem, updateSelected } = useCheckboxSet();
  const [isNetworkSelected, setNetworkSelected] = useState(true);
  const [isVolumesSelected, setVolumesSelected] = useState(true);

  const [networkName, setNetworkName] = useState('my-network');

  useLayoutEffect(() => {
    const userSettings = loadFromLocalStorageOrDefault();
    userSettings && updateSelected(userSettings);
  }, []);

  const loadFromLocalStorageOrDefault = () => {
    const userSettingsInLocalStorage = window.localStorage.getItem('userSettings');

    if (!userSettingsInLocalStorage) return [5, 6, 7];
    return JSON.parse(userSettingsInLocalStorage);
  };

  const printService = (serviceIndex: number) => {
    const { name, image, command, ports, volumes, environmentVariables, build, dockerfile } = optionsList[serviceIndex];
    return (
      <div>
        <div>
          {'  '}
          <span className="text-vscblue">{name || image}</span>:
        </div>
        {(image && (
          <>
            {'    '}
            <span className="text-vscblue">image</span>: <span className="text-vscyellow">{image}</span>
          </>
        )) ?? (
          <div>
            {'    '}
            <span className="text-vscblue">build</span>: <span className="text-vscyellow">{build}</span>
          </div>
        )}
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
    const volumes: (Volume[] | undefined)[] = [];
    selected.forEach((option) => volumes.push(optionsList[option].volumes));

    const isVolumeLocal = (volume: Volume) => {
      return volume.source.startsWith('.') || volume.source.startsWith('~') || volume.source.startsWith('/');
    };

    const printVolume = (index: number, volume: Volume) => (
      <div key={index}>
        <span className="text-vscblue">
          {'  '}
          {volume.source}
        </span>
        :
      </div>
    );

    const filteredVolumesMappedToJSX = () => {
      return volumes.map((volumes: Volume[] | undefined) =>
        volumes?.map((volume: Volume, index: number) => !isVolumeLocal(volume) && printVolume(index, volume))
      );
    };

    return (
      <div>
        {volumes.length > 0 ? (
          <>
            <span className="text-vscblue">volumes</span>:{filteredVolumesMappedToJSX()}
          </>
        ) : null}
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
      <a
        href="#configuration"
        className="absolute left-0 bg-vscblack p-5 py-4 rounded-br-lg -translate-y-full focus:translate-y-0 transition-all"
      >
        Skip to content
      </a>
      <Explanation />
      {/* <Questionnaire selected={selected} addItem={addItem} removeItem={removeItem} /> */}
      <section id="configuration">
        <OptionRowComponent
          setNetworkSelected={setNetworkSelected}
          setVolumesSelected={setVolumesSelected}
          updateSelected={updateSelected}
        />

        <section className="grid grid-cols-2 lg:w-5/6 md:w-full mx-auto">
          <Options
            options={optionsList}
            addItem={addItem}
            removeItem={removeItem}
            selected={selected}
            setNetworkSelected={setNetworkSelected}
            setVolumesSelected={setVolumesSelected}
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
            <Dockerfiles selected={selected} optionsList={optionsList} />
          </section>
          <div className="py-8" />
        </section>
      </section>
    </div>
  );
}

export default App;
