import SavedShows from "../components/SavedShows";

function Account() {
  return (
    <>
      <div className="w-full text-white">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/61e79073-50cf-4f7b-9a23-73290e6f7dca/d0322828-6d63-4f5f-92fb-30f492e7cca4/IN-en-20230410-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background-img"
          className="h-[400px] w-full  object-cover"
        />
        <div className="fixed top-0 right-0 bg-black/60 h-[400px] w-full" />
        <div className="absolute top-40 left-10 ">
          <h1 className="text-3xl md:text-5xl font-bold">My Shows</h1>
        </div>
      </div>
      <SavedShows />
    </>
  );
}

export default Account;
