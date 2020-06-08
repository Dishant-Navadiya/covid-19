import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import axios from "axios";

const LeftContent = (props) => (
  <Avatar.Icon
    {...props}
    icon="check-all"
    color="white"
    style={{ backgroundColor: "#424242" }}
  />
);

const Leval = () => {
  const [card, setCard] = useState({
    active: "",
    confirmed: "",
    deaths: "",
    deltaconfirmed: "",
    deltadeaths: "",
    deltarecovered: "",
    lastupdatedtime: "",
    recovered: "",
    state: "",
    statecode: "",
    statenotes: "",
  });
  const [err, setErr] = useState("");

  useEffect(() => {
    axios
      .get("https://api.covid19india.org/data.json")
      .then((res) => {
        setCard({
          active: res.data.statewise[0].active,
          confirmed: res.data.statewise[0].confirmed,
          deaths: res.data.statewise[0].deaths,
          deltaconfirmed: res.data.statewise[0].deltaconfirmed,
          deltadeaths: res.data.statewise[0].deltadeaths,
          deltarecovered: res.data.statewise[0].deltarecovered,
          lastupdatedtime: res.data.statewise[0].lastupdatedtime,
          recovered: res.data.statewise[0].recovered,
          state: res.data.statewise[0].state,
          statecode: res.data.statewise[0].statecode,
          statenotes: res.data.statewise[0].statenotes,
        });
      })
      .catch((err) => {
        setErr(err);
      });
  }, []);

  return (
    <Card>
      <Card.Title
        title="Last updated time"
        subtitle={card.lastupdatedtime !== "" ? card.lastupdatedtime : ""}
        left={LeftContent}
      />
      <Card.Cover source={require("../assets/card_Main.png")} />
      <Card.Content>
        <Title style={style.title}>Coronavirus Outbreak in India</Title>
        <Paragraph style={style.paragraph1}>
          <Text style={style.t1}> Confirmed: </Text>
          <Text style={style.t2}>{card.confirmed} </Text>
          <Text style={style.t3}>
            {card.deltaconfirmed > 0 ? "+[" + card.deltaconfirmed + "]" : "+0"}
          </Text>
        </Paragraph>
        <Paragraph style={style.paragraph2}>
          <Text style={style.t4}> Active: </Text>
          <Text style={style.t5}>{card.active}</Text>
        </Paragraph>
        <Paragraph style={style.paragraph3}>
          <Text style={style.t11}> Recovered: </Text>
          <Text style={style.t6}>{card.recovered} </Text>
          <Text style={style.t7}>
            {card.deltarecovered > 0 ? "+[" + card.deltarecovered + "]" : "+0"}
          </Text>
        </Paragraph>
        <Paragraph style={style.paragraph4}>
          <Text style={style.t8}> Deceased: </Text>
          <Text style={style.t9}>{card.deaths} </Text>
          <Text style={style.t10}>
            {card.deltarecovered > 0 ? "+[" + card.deltadeaths + "]" : "+0"}
          </Text>
        </Paragraph>
      </Card.Content>
    </Card>
  );
};
const style = StyleSheet.create({
  title: {
    paddingHorizontal: 30,
  },
  paragraph1: {
    paddingHorizontal: 60,
    paddingVertical: 5,
  },
  t1: {
    color: "#e53935",
    letterSpacing: 1,
  },
  t2: {
    color: "#f44336",
    fontWeight: "bold",
    fontSize: 17,
  },
  t3: {
    color: "#ef9a9a",
  },
  paragraph2: {
    paddingHorizontal: 60,
    paddingVertical: 5,
  },
  t4: {
    color: "#1565c0",
    letterSpacing: 1,
  },
  t5: {
    color: "#0d47a1",
    fontWeight: "bold",
    fontSize: 17,
  },
  paragraph3: {
    paddingHorizontal: 60,
    paddingVertical: 5,
  },
  t6: {
    color: "#4caf50",
    fontWeight: "bold",
    fontSize: 17,
  },
  t7: {
    color: "#81c784",
  },
  paragraph4: {
    paddingHorizontal: 60,
    paddingVertical: 5,
  },
  t8: {
    color: "#bdbdbd",
    letterSpacing: 1,
  },
  t9: {
    color: "#9e9e9e",
    fontWeight: "bold",
    fontSize: 17,
  },
  t10: {
    color: "#bdbdbd",
  },
  t11: {
    color: "#66bb6a",
    letterSpacing: 1,
  },
});
export default Leval;
