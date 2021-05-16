import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card'

const Countries = () => {

    const [ data, setData ] = useState([]); // Toute nos données dans useState
    const [ sortedData, setSortedData ] = useState([]); // On trie nos données
    const [ playOnce, setPlayOnce ] = useState([ true ]);
    const [ rangeValue, setRangeValue ] = useState([40]);
    const [ selectedRadio, setSelectedRadio ] = useState(['']);
    const radios = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

    useEffect(() =>{ 
        if (playOnce) {
            axios
            .get('https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag')
            .then((res) =>{ 
                setData(res.data)
                setPlayOnce(false);
            });
        }       
        const sortedCountry = () => {
            const countryObj = Object.keys(data).map((i) => data[i]); 
            const sortedArray = countryObj.sort((a,b) => {
                return b.population - a.population;
            })
            sortedArray.length = rangeValue;
            setSortedData(sortedArray)
        }
        sortedCountry();
    }, [data, rangeValue, playOnce]);

    return (
        <div className='countries'>
            <div className='sort-container'>
                <input 
                    type='range' 
                    min='1' 
                    max='250'
                    value={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)} 
                />
                <ul>
                    {radios.map((radio) => { // On boucle sur la const radios
                        return (
                            <li key={radio}> {/*On attribut une key a chaque objet présent dans la const radio*/}
                            <input
                                type="radio"
                                value={radio}
                                id={radio}
                                checked={radio === selectedRadio}
                                onChange={(e) => setSelectedRadio(e.target.value)}
                                />
                            <label htmlFor={radio}>{radio}</label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="cancel">
                {selectedRadio && <h5 onClick={() => setSelectedRadio('')}>Annuler recherche</h5>}
            </div>
            <ul className='countries-list'>
                {sortedData
                    .filter((country) => country.region.includes(selectedRadio))
                    .map((country) => (
                    <Card country={country} key={country.name}/> // On envoie les données de country à <Card /> (props) + On assigne une key name à chaque données
                ))}
            </ul>
        </div>
    );
};

export default Countries;