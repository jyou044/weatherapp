/**
 * Code written by Jason You
 */
import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { StyleSheet, Text, View, Image, Button, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {API_KEY} from '@env';

function WeatherScreen({navigation}) {
  // obtain API_KEY environment variable
  const apiKey = API_KEY;
  const [isLoading, setLoading] = useState(false); // Check for loading
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [location, setLocation] = useState(null);
  const [data, setData] = useState([]);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [dateValue, setDate] = useState();

  const [items, setItems] = useState([
    {label: 'Toronto, Canada', value: 'Toronto'},
    {label: 'Ottawa, Canada', value: 'Ottawa'},
    {label: 'Seoul, Korea', value: 'Seoul'},
    {label: 'New York, United States', value: 'NYC'}
  ]);

  function setLatLon() {
    switch(value) {
      case "Toronto":
        console.log("In toronto");
        setLat("43.651070");
        setLon("-79.347015");
        break;
      case "Ottawa":
        console.log("In ottawa");
        setLat("45.424721");
        setLon("-75.695000");
        break;
      case "Seoul":
        console.log("In seoul");
        setLat("37.5665");
        setLon("126.9780");
        break;
      case "NYC":
        console.log("In new york");
        setLat("40.730610");
        setLon("-73.935242");
        break;
    }
    console.log('lat: ',lat,'lon: ', lon);
  }

  const locationAlert = () =>
  Alert.alert(
    "Select Location",
    "Please select a location to proceed",
    [
      {
        text: "Close",
        onPress: () => console.log("User pressed close"),
        style: "cancel",
      },
    ],
    {
      cancelable: true
    }
  );

  const getWeatherData = async () => {
    try {
      const apiUri = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
      console.log("apiUri: ", apiUri);
      const response = await fetch(apiUri);
      setDate(new Date().toLocaleString());
      setLoading(true);
      setLocation(value);
      const json = await response.json();
      setData(json); // Set data

      console.log('json: ',json);
      return json;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.titleText}>Real Time Weather App</Text>

      <View style={styles.picker}>
        <DropDownPicker
        placeholder='Location'
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={setLatLon}
      />

      </View>
      <View style={styles.button}>
        <Button 
          title="Forecast" 
          color="#6699CC"
          onPress={value === null ? locationAlert : getWeatherData}/>
      </View>
      {isLoading || location === null ? 
        (<View style={styles.loading}>
          {isLoading ? (<Text style={styles.loadingText}>Loading...</Text>) : <Text style={styles.welcomeText}>Select Location</Text>}
        </View>) : 
        (<View style={{justifyContent: 'center'}}>
          <Text style={styles.weatherLocation}>{location}</Text>
          <Image style={styles.image} source={{uri:'http://openweathermap.org/img/w/'+data.weather[0].icon+'.png'}}></Image>
          <Text style={styles.weatherTitle}>Temp</Text>
          <Text style={styles.weather}>{data.main.temp} °C</Text>
          <Text style={styles.weatherTitle}>Weather Forecast</Text>
          <Text style={styles.weather}>{data.weather[0].description}</Text>
          <Text style={styles.timeText}>Time (EST): {dateValue}</Text>
         </View>)}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        alignItems: 'center'
      },
    titleText: {
      marginTop: 25,
      marginBottom: 15,
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'Roboto'
    },
    picker: {
      marginTop: 15,
      marginBottom: 15,
      marginLeft: 10,
      marginRight: 10
    },
    image: {
      width: 150,
      height: 150,
      margin: 5
    },
    button: {
      alignSelf: 'stretch',
      alignContent: 'center',
      margin: 10
    },
    loading: {
      margin: 10
    },
    loadingText: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Roboto'
    },
    welcomeText: {
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'Roboto'
    },
    weatherLocation: {
      margin: 5,
      fontWeight: 'bold',
      fontSize: 30,
      fontFamily: 'Roboto'
    },
    weatherTitle: {
      margin: 5,
      fontWeight: 'bold',
      fontSize: 20,
      fontFamily: 'Roboto'
    },
    weather: {
      margin: 5,
      fontSize: 20,
      fontFamily: 'Roboto'
    },
    timeText: {
        fontSize: 12,
        fontWeight: 'bold'
    }
  });

  export default WeatherScreen;