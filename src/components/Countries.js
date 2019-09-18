import React from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom'
import Loading from './Loading';
import Error from '../components/Error';
import { flagBaseUrl, flagStyle, flagSize } from '../assets/flags';

const FETCH_COUNTRIES = gql`
{
  countries {
    name,
    code,
    native,
    phone,
    currency,
    languages {
      name,
      native
    },
    continent {
      name
    }
  }
}
`; // end FETCH_COUNTRIES query

function GetCountries(props) {
  
  const { history } = props;
  // console.log(history); // For debugging
  
  // Navigate to a given country's page upon clicking on it
  const onClickHandler = function (country) {
    history.push(`/countries/${country.code}`);
  } // end onClickHandler()
  
  // Destructure the useQuery fetch results
  const { loading, error, data } = useQuery(FETCH_COUNTRIES);
  
  if (loading) return <Loading />;

  if (error) return <Error />;

  // Pull out countries array from the data object
  const countries = data.countries;  
  
  /* // For debugging
  console.log(typeof countries);
  console.log(`-------countries-------`);
  console.log(countries[0]); // Inspect first country
  console.log(`-------countries-------`);
 */

  return (
    <div >
      <table 
        className="table table-striped table-dark tabl-row"
        >
        <thead className="table-head">
          <tr>
            <th>Country</th>
            <th>Code</th>
            <th>Flag</th>
            <th>Continent</th>
            <th>Language</th>
            <th>Native</th>
            <th>Phone</th>
            <th>Currency</th>
          </tr>
        </thead>
        
        {
          // Loop through all the countries
          countries.map(country => {
 
            // Grab the country code of each country
            let flagCode = country.code;
            // Generate custom url for each country's flag
            let flagUrl = `${flagBaseUrl}${flagCode}${flagStyle}${flagSize}`;

            return (
              <tbody key={`${country.code}${country.name}`}>
              
                <tr onClick={ () => onClickHandler(country)}>
              
                  <td>{country.name}</td>
                  <td>{country.code}</td>
                  
                  {/* Image alt name is important for accessibility purposes */}
                  <td><img src={flagUrl} alt={`${country.name} flag`}/></td>
                  <td>{country.continent.name}</td>

                  {/* Loop through languages array and access 
                  each object's properties */}
                  <td>{country.languages.map(
                    language => (`${language.name} `)
                  )}</td>
                  <td>{country.languages.map(
                    language => (`${language.native} `)
                    )}</td>
                  <td>{country.phone}</td>
                  <td>{country.currency}</td>
                
                </tr>
              </tbody>

            )// end return

          }) // end countries.map
        } 
      </table>
    </div>

  ); // end return

} // end GetCountries

/* return <Link to={`/countries/${country.code.toUpperCase()}`}> </Link> */
export default withRouter(GetCountries);

/** Countries Instructions
 * 
 * 1. Countries list at `/countries` must contain the list of
 * countries and the languages spoken in that country.
 * 
 * 2. Both in English and native languages. It should also
 * contain the continent it is located in.
 * 
 */