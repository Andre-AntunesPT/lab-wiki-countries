import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CountriesList() {
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApi() {
      const apiURL = 'https://ih-countries-api.herokuapp.com/countries';
      const response = await fetch(apiURL);
      const data = await response.json();
      setCountries(data);
      setLoading(false);
    }
    fetchApi();
  }, []);

  return (
    <>
      {!loading && (
        <div className="container">
          <div className="row">
            <div className="col-5" style={{ maxHeight: '90vh' }}>
              <div className="list-group">
                {countries
                  .sort((a, b) => a.alpha2Code.localeCompare(b.alpha2Code))
                  .map((country) => {
                    return (
                      <>
                        <div key={country._id}>
                          <img
                            className="flag"
                            src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                            alt="Flag"
                          />
                          <Link
                            className="list-group-item list-group-item-action"
                            to={country.alpha3Code}
                          >
                            {country.name.official}
                          </Link>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CountriesList;
