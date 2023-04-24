export default function AboutMe() {
  return (
    <main className=" w-full min-w-0 max-w-4xl px-6 py-12 pt-4 md:px-8">
      <div className="mb-20 mt-8 text-lg text-stone-600 md:mt-24">
        <h1
          className="h1 mb-4 w-full text-5xl font-bold text-stone-700 sm:text-4xl md:text-5xl lg:text-6xl xl:col-span-12 xl:col-start-4"
          id="about-me"
        >
          about me
        </h1>
        <p className="mb-4 xl:col-span-12 xl:col-start-4">
          I'm a full-stack web developer based in Milano, Italy working at{' '}
          <a
            draggable="false"
            className="inline-block max-w-[100vw] flex-shrink-0 select-none bg-transparent text-base"
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
          . I am passionate about all round product development.
        </p>
        <p className=" mb-4 text-lg xl:col-span-12 xl:col-start-4">
          I love programming and I find it the most intriguing activity to do in
          this world. Taking the time to <b>read the problem</b>, finding a{' '}
          <b>creative solution</b>, <b>learning</b> the skills to{' '}
          <b>execute it</b>, foster it and admire its growth and development:
          super exciting!
        </p>

        <p className="mb-4 xl:col-span-12 xl:col-start-4">
          Beside work, I enjoy pondering about faith, philosophy and life in
          general, I could spend days talking and exchanging thoughts and ideas
          without never getting bored.
        </p>

        <p className="mb-4 xl:col-span-12 xl:col-start-4">
          I have been blessed with a loving wife with whom I've watched a lot of
          k-dramas when we had time for it, now we are full-time wild-keepers of
          a lovely little beast.
        </p>
      </div>
    </main>
  )
}
