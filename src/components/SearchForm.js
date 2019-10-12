import React, { useState } from "react";
import styled from 'styled-components';

export default function SearchForm(props) {
  const [filter, setFilter] = useState({name: "", status: ""});
 
  const handleChange = e => {
    setFilter({...filter, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.filterCharacters(filter);
  }
 
  return (
    <Search onSubmit={handleSubmit}>
      <label htmlFor="name">Name: 
        <input 
          id="name"
          value={filter.name}
          name="name"
          type="text"
          onChange={handleChange}
        />
      </label>
      <label>
        Status: 
        <select
          name="status"
          value={filter.status}
          onChange={handleChange}
        >
          <option></option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
        </select>
      </label>
      

      <button type="submit">Filter</button>
    </Search>
  );
}

const Search = styled.form`
  width: 60%;
  margin: 2% auto;
  display: flex;
  flex-direction: row;
  wrap: no-wrap;
  justify-content: space-around;
`