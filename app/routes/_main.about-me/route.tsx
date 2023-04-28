export default function AboutMe() {
  return (
    <main className=" w-full min-w-0 max-w-4xl px-6 py-12 pt-4 md:px-8">
      <div className="mb-20 mt-8 text-lg text-stone-500 md:mt-24">
        <div className="mb-10 flex flex-row-reverse items-center">
          <h1
            className="mb-4 w-full animate-fade-rotate-in-lg text-5xl font-bold text-stone-700 sm:text-4xl md:text-5xl lg:text-6xl xl:col-span-12 xl:col-start-4"
            id="about-me"
          >
            about me
          </h1>

          <div className="hidden w-64 animate-fade-slide-in opacity-0 lg:block">
            <img src="/assets/sheet.svg" alt="" className="object-contain" />
          </div>
        </div>

        <p className="mb-4 animate-fade-rotate-in xl:col-span-12 xl:col-start-4">
          Hello there! My name is Alì (like Alì Baba or Muhammad Alì), and I'm a
          full-stack web developer based in Milan, Italy. I'm passionate about
          all aspects of product development, but I have a particular affinity
          for <span className="shadow-mark">UX/UI design</span> and{' '}
          <span className="shadow-mark">domain-driven design</span>. Throughout
          my career, I've primarily worked as a front-end developer using React.
          However, I pride myself on being a jack of all trades and a master of
          one.
        </p>

        <p className="mb-4 animate-fade-rotate-in xl:col-span-12 xl:col-start-4">
          I'm constantly learning and expanding my skillset to become a more
          well-rounded product developer. Currently, I work at{' '}
          <a
            draggable="false"
            className="inline-block max-w-[100vw] flex-shrink-0 select-none bg-transparent text-base shadow-mark"
            target="_blank"
            rel="noopener noreferrer"
            href="https://vas.it/"
          >
            <span
              className=" z-[5] inline-block rounded font-sans font-bold underline"
              tabIndex={0}
            >
              VAS
            </span>
          </a>
          , where I have the opportunity to develop and implement well-thought
          web applications for a wide range of clients in the domain of
          educational technology. My goal is to create the infrastructure to
          create the most user-friendly and seamless experience for our
          products.
        </p>

        <p className="mb-4 animate-fade-rotate-in xl:col-span-12 xl:col-start-4">
          When I'm not busy coding, you can find me walking in the park with my
          son, trying out new sushi restaurants with my wife, or reading up on
          the latest industry trends.
        </p>

        <p className="mb-4 animate-fade-rotate-in xl:col-span-12 xl:col-start-4">
          Thank you for taking the time to get to know me a little better. If
          you're interested in learning more about my work or would like to
          collaborate on a project,{' '}
          <span className="shadow-mark">
            please don't hesitate to reach out!
          </span>
        </p>
      </div>
    </main>
  )
}
