import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://672f34b9229a881691f22c51.mockapi.io/api/v1/cities";

const ListPage = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  return (
    <div className="container">
      <h1>도시 목록</h1>
      <Link to="/update" className="btn btn-primary mb-3">도시 추가</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>도시명</th>
            <th>인구</th>
            <th>상세</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.id}>
              <td>{city.id}</td>
              <td>{city.name}</td>
              <td>{city.population.toLocaleString()}</td>
              <td>
                <Link to={`/detail?id=${city.id}`} className="btn btn-primary btn-sm">보기</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPage;
