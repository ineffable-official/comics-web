import moment from "moment";
import GenreBox from "./genre-box";

export default function AdminComicInfo({ comic }) {
  return (
    <div className="w-auto h-auto bg-[rgba(255,255,255,0.1)] rounded-xl p-4 flex transition-all duration-500 ease-in-out">
      <div className="w-[200px] h-fit flex items-center justify-center rounded-xl overflow-hidden">
        <picture>
          <img src={comic.images} alt="" />
        </picture>
      </div>
      <div
        className={`w-full h-auto overflow-hidden flex flex-col text-xs transition-all duration-500 ease-in-out text-gray-300`}
      >
        <div className="grid grid-cols-12">
          <div className="w-full h-12 flex items-center px-4 col-span-4">
            Title
          </div>
          <div className="w-full h-12 flex items-center px-4 col-span-8">
            {comic.title}
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="w-full h-12 flex items-center px-4 col-span-4">
            Alternative Title
          </div>
          <div className="w-full h-12 flex items-center px-4 col-span-8">
            {comic.alt_title}
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="w-full h-12 flex items-center px-4 col-span-4">
            Genres
          </div>
          <div className="w-full h-auto flex items-center px-4 col-span-8 flex-wrap gap-2 py-2">
            {console.log(comic.genres)}
            {JSON.parse(comic.genres) !== null &&
              JSON.parse(comic.genres).map((g, ind) => (
                <GenreBox id={g} key={ind} />
              ))}
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="w-full h-12 flex items-center px-4 col-span-4">
            Language
          </div>
          <div className="w-full h-12 flex items-center px-4 col-span-8">
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
          <div className="w-full h-12 flex items-center px-4 col-span-4">
            Original Language
          </div>
          <div className="w-full h-12 flex items-center px-4 col-span-8">
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
          <div className="w-full h-12 flex items-center px-4 col-span-4">
            Status
          </div>
          <div className="w-full h-12 flex items-center px-4 col-span-8">
            On going
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="w-full h-12 flex items-center px-4 col-span-4">
            Latest updated at
          </div>
          <div className="w-full h-12 flex items-center px-4 col-span-8">
            {moment().fromNow()}
          </div>
        </div>
      </div>
    </div>
  );
}
