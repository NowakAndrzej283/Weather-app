import { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

function HoursCard({data}){
    console.log('inside hourscard', data);
    const id = data.id || [];
    const temps = data.temperature

    console.log('temperatures are ', temps);

    const hourlyData = data.map((h, i) => ({
        id: i.toString(),
        time: h.time,
        temperature: h.temperature
    }));

    console.log('this is horulydata ', hourlyData);

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.text}>Upcoming weather</Text>
                <View style={styles.display}> 
                    <FlatList
                        data={hourlyData}
                        keyExtractor={item => item.id}
                        renderItem={({item})=> (
                            <View style={styles.item}>
                                <Text>{item.time}</Text>
                                <Text>{item.temperature}°C</Text>
                            </View>
                        )}
                    />
            </View>
        </View>
    );
}   
export default HoursCard;

const styles = StyleSheet.create({
    mainContainer:{ 
        justifyContnet: 'center',
        flex: 1,
        alignItems: 'center'
    },
    item: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        elevation: 20,
        borderWidth: 1,
        borderColor: '#333030'
    },
    display: {
        flex: 1,
        padding: 10,
        width: '100%'
    },
    text: {
        color: 'white',
        fontSize: 22,
        padding: 10,
    }
})