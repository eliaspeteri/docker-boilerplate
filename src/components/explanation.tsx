export function Explanation() {
  return (
    <>
      <section>
        <h1 className="text-2xl pt-8 mx-auto">EZ-Compose</h1>
        <article className="text-1xl pt-4 pb-8 lg:w-3/6 md:w-5/6 mx-auto">
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
        </article>
      </section>
    </>
  );
}
