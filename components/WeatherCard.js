import { View, StyleSheet, Pressable, Text, FlatList } from "react-native";
import { useState } from "react";

function WeatherCard({data}){
    // getting the actual timeZone hours 
    const now = new Date();
    //console.log('Actual hours', now);
    now.setMinutes(0, 0, 0);

    // change the Date prototype
    Date.prototype.addHours = function(h){
        this.setTime(this.getTime() + (h*60*60*1000));
        return this;
    }
    now.addHours(1);

    const currentWeather = data.find(item => {
        const forecastDate = new Date(item.time);
        return forecastDate.getTime() === now.getTime();
    });

    console.log('The current Weather is ', currentWeather);

    const currentWeatherInfo = [
        currentWeather
    ];

    return(
        <View style={styles.mainCard}>
            <View style={styles.city}>
                <Text style={styles.text}> Warsaw </Text>
            </View>
            <View style={styles.data}>
                { currentWeather &&
                    <FlatList 
                        data={currentWeatherInfo || []}
                        keyExtractor={item => item.id}
                        renderItem={({item})=>(
                            <View style={styles.data}>
                                <Text style={styles.dataText}>Date: {new Date(item.time).toLocaleDateString('pl-PL')}</Text>
                                <Text style={styles.dataText}>Last Update: {new Date(item.time).getHours()}:00</Text>
                                <Text style={styles.dataText}>{item.temperature}°C</Text>
                                
                            </View>
                        )}
                    />
                }
            </View>

        </View>

    );


}
export default WeatherCard;

const styles = StyleSheet.create({
    mainCard: {
        alignContent: 'flex-start',
        backgroundColor: '#1cc9a3',
        borderColor: '#045858',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 50,
        marginTop: 50,
        flexDirection: 'row'
    },
    data: {
        height: '100%',
        minWidth: 150,
        width: 150,
        flexDirection: 'column-reverse',
        marginTop: 2
    },
    dataText: {
        fontSize: 16,
        fontFamily: 'arial'
    },
    text: {
        fontSize: 20,
        padding: 30,
        justifyContent: 'flex-start',
        fontFamily: 'fantasy',
    },
    item: {
        padding: 5,
        margin: 4,
        backgroundColor: 'black'
    }
});
