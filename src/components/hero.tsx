import backgroundImage from '../assets/config.jpg';

export function Explanation() {
  return (
    <section className="flex flex-col h-screen relative">
      <img
        src={backgroundImage}
        className="absolute -z-20 opacity-75 h-screen lg:w-screen lg:object-fill sm:object-none"
      />
      <div className="absolute w-screen h-screen bg-gradient-to-t from-slate-900 -z-10" />
      <div className="py-32" />
      <section className="text-left w-10/12 ml-auto sm:mx-autooutline">
        <h1 className="text-stroke text-8xl font-extrabold text-[#f2f2f2] pt-8">dcompose 💀</h1>
        <article className="text-stroke-thin text-1xl pt-4 lg:w-5/12 sm:w-11/12 pb-8 text-gray-100">
          <p>
            It's tedious to build docker-compose files by hand. We've all been there. That's why we came up with{' '}
            <span className="text-green-400">dcompose</span> to simplify and automate boilerplate processes. Your DevOps
            engineer friends at the parties you totally go to will thank you profusely.
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
            <div className="py-2" />
          </p>
          <p>Ready to go? Hit the arrow below to get started.</p>
        </article>
      </section>
      <section className="absolute inset-x-0 bottom-0 h-24">
        <a
          href="#configuration"
          className="scroll-smooth animate-bounce px-5 py-3 rounded-full bg-gray-800 text-2xl text-purple-500 drop-shadow"
        >
          &darr;
        </a>
      </section>
    </section>
  );
}
