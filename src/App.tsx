import React, { useEffect, useState } from 'react';
import planets from './planets.json';

interface Planet {
  name: string;
  image: string;
}

const App: React.FC = () => {
  const [planetData, setPlanetData] = useState<Planet[]>([]);

  useEffect(() => {
    setPlanetData(planets);

    const fetchPlanetData = async () => {
      try {
        const planetResults = await Promise.all(
          planets.map((planet) => {
            return fetch(`https://api.api-ninjas.com/v1/planets?name=${planet.name}`, {
              method: 'GET',
              headers: {
                'X-Api-Key': '+N8VDmi3IPpD6ygKcZzhoA==cD7b1gv1GcElTiR6',
                'Content-Type': 'application/json',
              },
            }).then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            });
          })
        );
        const mergedData = planets.map((planet, index) => ({
          ...planet,
          ...planetResults[index][0],
        }));
        setPlanetData(mergedData);
      } catch (error: any) {
        throw new Error(error);
      }
    };
    fetchPlanetData();
  }, []);

  return (
    <>
      <div className='planet-container box'>
        {planetData.map((planet, index) => (
          <span
            key={index}
            className='planet'
            style={
              {
                '--i': index + 1,
              } as React.CSSProperties
            }
          >
            <h3>{planet.name}</h3>
          </span>
        ))}
      </div>
    </>
  );
};

export default App;
