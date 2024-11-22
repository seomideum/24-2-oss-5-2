import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

const API_URL = "https://672f34b9229a881691f22c51.mockapi.io/api/v1/cities";

const UpdatePage = () => {
  const [searchParams] = useSearchParams();
  const cityId = searchParams.get("id");
  const [city, setCity] = useState({
    name: "",
    population: "",
    area: "",
    zipcode: "",
  });

  useEffect(() => {
    if (cityId) {
      const fetchCity = async () => {
        try {
          const response = await fetch(`${API_URL}/${cityId}`);
          const data = await response.json();
          setCity(data);
        } catch (error) {
          console.error("Error fetching city:", error);
        }
      };
      fetchCity();
    }
  }, [cityId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCity((prevCity) => ({
      ...prevCity,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await fetch(`${API_URL}/${cityId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(city),
      });
      alert("수정되었습니다!");
    } catch (error) {
      console.error("Error updating city:", error);
    }
  };

  return (
    <div className="container">
      <h1>도시 정보 수정</h1>
      <form>
        <div className="mb-3">
          <label className="form-label">도시명</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={city.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">인구</label>
          <input
            type="number"
            className="form-control"
            name="population"
            value={city.population}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">면적</label>
          <input
            type="number"
            className="form-control"
            name="area"
            value={city.area}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">우편주소</label>
          <input
            type="text"
            className="form-control"
            name="zipcode"
            value={city.zipcode}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <button onClick={handleSave} className="btn btn-primary">저장</button>
      <Link to="/list" className="btn btn-secondary ms-2">취소</Link>
    </div>
  );
};

export default UpdatePage;
