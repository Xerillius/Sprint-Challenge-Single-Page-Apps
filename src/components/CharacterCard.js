import React from "react";
import styled from 'styled-components';

const Div = styled.div`
  border: 1px solid black;
  padding: 1%;
  width: 22%;
  margin: 1%;
  h3 {
    text-align: center
  }
  img {
    width: 100%;
  }
`

export default function CharacterCard(props) {
  return (
    <Div>
      <h3>{props.stats.name}</h3>
      <img src={props.stats.image} />
      <section>
        Status: {props.stats.status} <br/>
        Gender: {props.stats.gender}
      </section>
    </Div>    
  );
}
