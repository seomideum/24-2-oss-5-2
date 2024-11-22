import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

const API_URL = "https://672f34b9229a881691f22c51.mockapi.io/api/v1/cities";

const DetailPage = () => {
  const [searchParams] = useSearchParams();
  const cityId = searchParams.get("id");
  const [city, setCity] = useState(null);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await fetch(`${API_URL}/${cityId}`);
        const data = await response.json();
        setCity(data);
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    };
    if (cityId) fetchCity();
  }, [cityId]);

  if (!city) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>도시 상세 정보</h1>
      <div className="mb-3">
        <strong>ID:</strong> {city.id}
      </div>
      <div className="mb-3">
        <strong>도시명:</strong> {city.name}
      </div>
      <div className="mb-3">
        <strong>인구:</strong> {city.population.toLocaleString()}
      </div>
      <div className="mb-3">
        <strong>면적:</strong> {city.area} km²
      </div>
      <div className="mb-3">
        <strong>우편주소:</strong> {city.zipcode}
      </div>
      <Link to="/list" className="btn btn-secondary">목록으로</Link>
      <Link to={`/update?id=${city.id}`} className="btn btn-primary ms-2">수정</Link>
    </div>
  );
};

export default DetailPage;
