import axios from "axios";
import { useRef, useState } from "react";

export default function OptionSelect({
  id,
  placeHolder,
  apiRoute,
  optionName,
  defaultValue,
}) {
  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const [list, setList] = useState([]);

  const searchData = (e, apiRoute, result) => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL + `${apiRoute}?search=${e.target.value}`
      )
      .then((res) => {
        result(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const selectOption = (input, data, result) => {
    input.current.value = data.name;
    result.current.value = data.id;
  };

  return (
    <div className="relative">
      <input
        type="text"
        id={id}
        placeholder={placeHolder}
        className="w-[128px] h-8 rounded-lg px-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
        onChange={(e) => {
          searchData(e, apiRoute, setList);
        }}
        ref={inputRef}
        defaultValue={defaultValue ? defaultValue.name : ""}
      />
      {list.length > 0 ? (
        <div className="absolute w-full h-auto p-2 bg-[rgba(255,255,255,0.1)] top-10 rounded-lg">
          {list.map((a) => (
            <div
              className="w-full h-auto py-2 flex items-center justify-center text-xs hover:bg-[rgba(255,255,255,0.1)] rounded-lg"
              key={a.id}
              onClick={(e) => {
                selectOption(inputRef, a, selectRef);
              }}
            >
              {apiRoute === "/countries" ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center rounded-full overflow-hidden">
                    <picture>
                      <img src={a.images} alt="" />
                    </picture>
                  </div>
                  <div className="text-xs">{a.name}</div>
                </div>
              ) : (
                a.name
              )}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      <input
        type="hidden"
        name={optionName}
        ref={selectRef}
        onChange={(e) => {}}
        defaultValue={defaultValue ? defaultValue.id : ""}
      />
    </div>
  );
}
