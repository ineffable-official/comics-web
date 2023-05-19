export default function DataMasterSection({
  title,
  lists,
  apiRoute,
  dataDestroy,
  dataSubmit,
}) {
  return (
    <div className="w-full h-auto p-4 border-[1px] rounded-xl bg-gray-50 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)] mt-2">
      <div className="text-sm font-medium">{title}</div>
      <div className="flex flex-wrap mt-3 gap-2">
        {lists
          ? lists.map((t) => (
              <form key={t.id} onSubmit={(e) => dataDestroy(e, apiRoute, t.id)}>
                <div className="pl-2 pr-1 py-1 flex bg-gray-200 rounded-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
                  {title === "Countries" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full overflow-hidden">
                        <picture>
                          <img src={t.images} alt="" />
                        </picture>
                      </div>
                      <div className="text-xs">{t.name}</div>
                    </div>
                  ) : (
                    <div className="text-xs">{t.name}</div>
                  )}
                  <button
                    type="submit"
                    className="text-[8px] ml-2 w-4 h-4 hover:bg-gray-300 rounded-md flex items-center justify-center dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
                    onClick={(e)=>{dataDestroy(e, apiRoute, t.id)}}
                  >
                    <i className="fa-light fa-x"></i>
                  </button>
                </div>
              </form>
            ))
          : ""}
        <form className="m-0 p-0" onSubmit={(e) => dataSubmit(e, apiRoute)}>
          <div className="p-1 flex bg-gray-200 rounded-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
            {title === "Countries" ? (
              <input
                type="text"
                name="images"
                className="w-24 text-xs px-2 bg-transparent focus:bg-gray-100 rounded-md outline-none dark:focus:bg-[rgba(255,255,255,0.2)]"
                placeholder="Images link"
              />
            ) : (
              ""
            )}
            <input
              type="text"
              name="name"
              className="w-24 text-xs px-2 bg-transparent focus:bg-gray-100 rounded-md outline-none dark:focus:bg-[rgba(255,255,255,0.2)]"
              placeholder="Name"
            />
            <button
              type="submit"
              className="w-4 h-4 rounded-md bg-gray-300 ml-1 text-gray-700 text-[8px] dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300 "
            >
              <i className="fa-light fa-send"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
