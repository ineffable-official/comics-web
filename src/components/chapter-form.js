import axios from "axios";
import { useEffect, useState } from "react";

export default function ChapterForm({ comic }) {
  const [token, setToken] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    var title = form.getAll("title");
    if (title) {
      form.delete("title");
    }

    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/chapters", form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.status) {
          window.location.reload(false);
        }
        alert(res.data.message);
      })
      .catch((err) => {
        throw err;
      });
  };

  

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    setToken(token ? token : null);
  }, []);

  return (
    <div className="w-full my-2 bg-[rgba(255,255,255,0.1)] rounded-lg p-4 overflow-x-scroll">
      <div className="text-xs text-gray-400">Add Chapter</div>
      <form action="" className="mt-2" onSubmit={handleSubmit}>
        <div className="w-full flex gap-2">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="w-[128px] h-8 rounded-lg px-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
          />
          <input type="hidden" name="comic" value={comic.id} />
          <input
            type="number"
            name="vol_num"
            id="vol-num"
            placeholder="Volume Number"
            className="w-[128px] h-8 rounded-lg px-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
          />
          <input
            type="number"
            name="chap_num"
            id="chap-num"
            placeholder="Chapter Number"
            className="w-[128px] h-8 rounded-lg px-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
          />
          <textarea
            rows={4}
            className="min-w-[256px] rounded-lg p-2 bg-[rgba(255,255,255,0.1)] text-xs outline-none focus:bg-[rgba(255,255,255,0.2)]"
            name="images_list"
            placeholder="Images List (Array)"
          ></textarea>
          <button type="submit" className="">
            <div className="w-8 h-8 flex items-center justify-center bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.25)] rounded-xl">
              <i className="fa-light fa-send"></i>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
