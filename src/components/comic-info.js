import moment from "moment";
import GenreBox from "./genre-box";
import Head from "next/head";

export default function ComicInfo({ comic }) {
  return (
    <div className="w-auto h-auto bg-[rgba(255,255,255,0.1)] rounded-xl p-8 flex transition-all duration-500 ease-in-out lg:flex-row flex-col gap-8 sm:items-center">
      <>
        <Head>
          <title>Komik {comic.title} - Nimetoon</title>
        </Head>
      </>
      <div className="lg:w-[400px] w-fit h-fit flex items-center justify-center rounded-xl overflow-hidden">
        <picture>
          <img src={comic.images} className="w-full h-auto" alt="" />
        </picture>
      </div>
      <div
        className={`w-full h-auto overflow-hidden flex flex-col text-xs transition-all duration-500 ease-in-out text-gray-300 lg:px-8 gap-4 lg:gap-8`}
      >
        <div className="grid grid-cols-12">
          <div className="w-full h-auto flex items-center px-4 col-span-4">
            Title
          </div>
          <div className="w-full h-auto flex items-center px-4 col-span-8">
            {comic.title}
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="w-full h-auto flex items-center px-4 col-span-4">
            Alternative Title
          </div>
          <div className="w-full h-auto flex items-center px-4 col-span-8">
            {comic.alt_title}
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="w-full h-auto flex items-center px-4 col-span-4">
            Genres
          </div>
          {comic.genres ? (
            <div className="w-full h-auto flex items-center px-4 col-span-8 flex-wrap gap-2 py-2">
              {JSON.parse(comic.genres) !== null &&
                JSON.parse(comic.genres).map((g, ind) => (
                  <GenreBox id={g} key={ind} />
                ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="grid grid-cols-12">
          <div className="w-full h-auto flex items-center px-4 col-span-4">
            Language
          </div>
          <div className="w-full h-auto flex items-center px-4 col-span-8">
            {comic.lang ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center rounded-full overflow-hidden">
                  <picture>
                    <img src={comic.lang.images} alt="" />
                  </picture>
                </div>
                <div className="text-xs">{comic.lang.name}</div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="w-full h-auto flex items-center px-4 col-span-4">
            Original Language
          </div>
          <div className="w-full h-auto flex items-center px-4 col-span-8">
            {comic.ori_lang ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center rounded-full overflow-hidden">
                  <picture>
                    <img src={comic.ori_lang.images} alt="" />
                  </picture>
                </div>
                <div className="text-xs">{comic.ori_lang.name}</div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="w-full h-auto flex items-center px-4 col-span-4">
            Status
          </div>
          <div className="w-full h-auto flex items-center px-4 col-span-8">
            {comic.status?.name}
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="w-full h-auto flex items-center px-4 col-span-4">
            Latest updated at
          </div>
          <div className="w-full h-auto flex items-center px-4 col-span-8">
            {moment(comic.updated_at).fromNow()}
          </div>
        </div>
        <div className="w-full text-gray-400 leading-5 mt-4">
          {comic?.descriptions}
        </div>
      </div>
    </div>
  );
}
