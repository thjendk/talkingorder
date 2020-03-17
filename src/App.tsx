import React, { useState } from "react";
import styled from "styled-components";

const ListClickItem = styled.p`
  padding: 5px;
  border: 1px solid lightgrey;
  margin: 5px;

  :hover {
    font-weight: bolder;
    cursor: pointer;
    border: 1px solid black;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
`;

const BoxContainer = styled.div`
  border: 1px solid grey;
`;

const CenterH2 = styled.h2`
  text-align: center;
`;

function App() {
  const [newParticipant, setNewParticipant] = useState("");
  const [talking, setTalking] = useState<string[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);
  const [current, setCurrent] = useState("");

  const handleAddJoined = () => {
    if (!newParticipant) return;
    setParticipants(participants.concat([newParticipant]));
    setNewParticipant("");
  };

  const handleTalking = (i: number) => {
    setCurrent(talking[i]);
    setTalking(talking.filter((p, index) => index !== i));
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Talerække</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleAddJoined();
        }}
      >
        <button type="submit">Tilføj deltager</button>
        <input
          style={{ width: "90%" }}
          value={newParticipant}
          onChange={e => setNewParticipant(e.target.value)}
          placeholder="Navn på deltager"
        />
      </form>
      <hr />
      <div>
        <CenterH2>Taler</CenterH2>
        <BoxContainer style={{ textAlign: "center" }}>
          <CenterH2>{current || "Ingen talere endnu..."}</CenterH2>
        </BoxContainer>
      </div>
      <hr />
      <GridContainer>
        <div>
          <CenterH2>Deltagere</CenterH2>
          <BoxContainer>
            {participants.map(person => (
              <ListClickItem
                style={{ textAlign: "right" }}
                onClick={() => setTalking(talking.concat([person]))}
              >
                {person}
              </ListClickItem>
            ))}
          </BoxContainer>
        </div>
        <div>
          <CenterH2>Talerække</CenterH2>
          <BoxContainer>
            {talking.map((person, i) => (
              <ListClickItem onClick={() => handleTalking(i)}>
                {i + 1}: {person}
              </ListClickItem>
            ))}
          </BoxContainer>
        </div>
      </GridContainer>
    </div>
  );
}

export default App;
