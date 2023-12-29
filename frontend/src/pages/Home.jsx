import { Feed } from "../components";


const Home = () => {

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md" />
        <span className="violet_gradient text-center"> AI - Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        PromptZ is a community of writers who share and discover new ideas through AI-powered prompts.
        Create and share your own prompts, or use the ones created by others to get inspired.
      </p>

      {/*Feed*/}
      <Feed />
    </section>
  )
}

export default Home