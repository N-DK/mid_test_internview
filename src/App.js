import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState();

  function convertSeconds(seconds) {
    // Tính số giờ
    let hours = Math.floor(seconds / 3600);
    // Tính số phút còn lại sau khi đã lấy giờ
    let minutes = Math.floor((seconds % 3600) / 60);
    // Tính số giây còn lại sau khi đã lấy phút
    let remainingSeconds = seconds % 60;

    // Trả về kết quả dạng chuỗi
    return `${hours} giờ ${minutes} phút ${remainingSeconds} giây`;
  }

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axios.get(
        "https://apisolfive.app.tranviet.site/v2/api/get/playlist/info?id=6IACDA86"
      );
      console.log(response.data.data.data);
      setData(response.data.data.data);
    };
    fetchAPI();
  }, []);

  return (
    <div style={{ background: "#0d1620", color: "#fff" }} className="">
      <div className="p-5">
        <div>
          <div className="d-flex mb-4 align-items-center">
            <div
              style={{ width: 200, height: 200 }}
              className="me-3 rounded overflow-hidden"
            >
              <img className="w-100 h-100" src={data?.thumbnail} />
            </div>
            <div>
              <p className="mb-4 fs-2 fw-800">{data?.title}</p>
              <div>
                <p>Danh sách phát • Solfive</p>
                <p>{data?.song?.total} bài hát • {convertSeconds(data?.song?.totalDuration)}</p>
                <p>{data?.sortDescription}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          {data?.song?.items.map((item, index) => (
            <div
              key={index}
              className="d-flex align-items-center mb-3 border-bottom pb-2"
            >
              <div
                style={{ justifyContent: "space-between" }}
                className="d-flex w-100"
              >
                <div style={{ flex: 1 }} className="d-flex align-items-center">
                  <div className="rounded overflow-hidden me-4">
                    <img src={item.thumbnail} />
                  </div>
                  <a>{item.title}</a>
                </div>
                <div style={{ flex: 1 }} className="d-flex align-items-center">
                  <div
                    style={{ justifyContent: "space-between" }}
                    className="d-flex align-items-center w-100"
                  >
                    <p className="mb-0">
                      {item.artists.map((artist, index) => (
                        <span key={index}>{artist.name}, </span>
                      ))}
                    </p>
                    <p className="mb-0">04:03</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
