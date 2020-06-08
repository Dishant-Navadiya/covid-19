import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Linking,
} from "react-native";
import "react-native-paper";
import {
  Appbar,
  Searchbar,
  List,
  Dialog,
  Paragraph,
  FAB,
} from "react-native-paper";
import axios from "axios";
import Leval from "./component/Level";

export default App = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
  const [fetch, setfetch] = useState({ state: "", city: "" });
  const [search, setSearch] = useState("");
  const [stateCount, setStateCount] = useState(null);
  const [dialogContent, setdialogContent] = useState({
    cityNameStore: "",
    Confirmed: "",
    Active: "",
    Recovered: "",
    Deceased: "",
  });

  useEffect(() => {
    axios
      .get("https://api.covid19india.org/state_district_wise.json")
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        setErr(err);
      });
    axios
      .get("https://api.covid19india.org/data.json")
      .then((response) => {
        setStateCount(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const hideDialog = () => {
    setOpen(false);
  };

  const hendleDialogBox = (name, catchCity) => {
    setOpen(true);
    setfetch({ state: name, city: catchCity });
    setdialogContent({
      cityNameStore: data[name]["districtData"][catchCity],
      Confirmed: data[name]["districtData"][catchCity].confirmed,
      Active: data[name]["districtData"][catchCity].active,
      Recovered: data[name]["districtData"][catchCity].recovered,
      Deceased: data[name]["districtData"][catchCity].deceased,
    });
  };

  return (
    <SafeAreaView>
      <Appbar.Header color="black" style={{ backgroundColor: "#fafafa" }}>
        <Appbar.Content title="Covid-19 India" />
      </Appbar.Header>
      <Searchbar
        placeholder="Search Here"
        onChange={(text) => setSearch(text.nativeEvent.text)}
      />
      <ScrollView>
        <Leval />

        <List.Section title="States">
          {Object.keys(data).map((name, index) => {
            const stateCode = data[name]["statecode"];
            let finalStateCount = null;
            if (stateCount !== null) {
              finalStateCount = stateCount["statewise"].filter(
                (e) => e["statecode"] === stateCode
              )[0]["confirmed"];
            }
            return (
              <List.Accordion
                key={index}
                title={`${name}`}
                description={` [${finalStateCount}]`}
              >
                {Object.keys(data[name]["districtData"]).map(
                  (cityName, index) => {
                    return (
                      <List.Item
                        key={index}
                        title={cityName}
                        onPress={() => hendleDialogBox(name, cityName)}
                      />
                    );
                  }
                )}
              </List.Accordion>
            );
          })}
        </List.Section>
      </ScrollView>
      <FAB
        style={{
          color: "white",
          position: "absolute",
          margin: 16,
          right: 0,
          top: 600,
          backgroundColor: "#424242",
        }}
        small={false}
        icon="instagram"
        onPress={() =>
          Linking.openURL("https://www.instagram.com/thedishantnavadiya")
        }
      />
      <Dialog visible={open} onDismiss={hideDialog}>
        <Dialog.Title>{fetch !== null ? fetch.city : ""}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            <Text style={style.t1}> Confirmed: </Text>
            <Text style={style.t2}>{dialogContent.Confirmed} </Text>
          </Paragraph>
          <Paragraph>
            <Text style={style.t3}> Active: </Text>
            <Text style={style.t4}>{dialogContent.Active} </Text>
          </Paragraph>
          <Paragraph>
            <Text style={style.t5}> Recovered: </Text>
            <Text style={style.t6}>{dialogContent.Recovered} </Text>
          </Paragraph>
        </Dialog.Content>
      </Dialog>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
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
    color: "#1565c0",
    letterSpacing: 1,
  },
  t4: {
    color: "#0d47a1",
    fontWeight: "bold",
    fontSize: 17,
  },
  t5: {
    color: "#66bb6a",
    letterSpacing: 1,
  },
  t6: {
    color: "#4caf50",
    fontWeight: "bold",
    fontSize: 17,
  },
});
