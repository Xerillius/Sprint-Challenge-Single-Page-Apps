import React, { useEffect, useState } from "react";
import axios from 'axios';
import SearchForm from './SearchForm';
import CharacterCard from './CharacterCard';
import styled from 'styled-components';

export default function CharacterList() {
  // TODO: Add useState to track data from useEffect
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);

  let pageCount;

  const getPageCount = async function() {
    let res = await axios.get("https://rickandmortyapi.com/api/character");
    pageCount = res.data.info.pages;
  }

  getPageCount();

  const getCharacters = async function() {
    let res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
    setCharacters(res.data.results);
  }

  const filter = filter => {
    filterCharacters(filter);
  }

  const filterCharacters = async function(val) {
    let filter;
    if(val == null) {
      filter = "";
    } else {
      filter=`name=${val.name}&status=${val.status}`;
    }
    let res = await axios.get(`https://rickandmortyapi.com/api/character/?` + filter);
    setCharacters(res.data.results);
  }

  function changePage(val) {
    if(val === -1) { // Move back
      if(page === 1) {
        setPage(pageCount);
      } else {
        setPage(page - 1);
      }
    } else { // Move along
      if(page === pageCount) {
        setPage(1);
      } else {
        setPage(page + 1);
      }
    }
  }  

  useEffect(() => {
    getCharacters();
  }, [page]);

  return (
    <CharListDiv>
      <SearchForm filterCharacters={filter} />
      <section className="page-buttons">
        <button onClick={() => changePage(-1)}>Prev</button>
        <button onClick={() => changePage(1)}>Next</button>
      </section>
      <CharacterDiv>
        {characters.map(character => {
          return (
            <CharacterCard 
              key={character.id}
              stats={character}
            />
          );
        })}
      </CharacterDiv>
    </CharListDiv>

  );
}

const CharListDiv = styled.div`
  width: 90%;
  margin: auto;
  text-align: center;
`

const CharacterDiv = styled.div`
  margin-top: 4%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`