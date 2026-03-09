import { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

function HoursCard({data}){
    let dayLabel = '';

    // formatting data
    const formatHour = (isoString) => {
        const date = new Date(isoString); // shows each date 
        const now = new Date();

        const today = now.getDate();
        const day = date.getDate();

        // check if the date is today or tommorow
        if( day === today){
            dayLabel = 'Today';
            //console.log(dayLabel);
        }else if( day == today + 1 ){
            dayLabel = 'Tommorow';
            //console.log(dayLabel)
        }else {
            dayLabel = `${date.toLocaleDateString('pl-PL')}`;
            //console.log(dayLabel);
        }
        const hours = date.getHours();

        return `${dayLabel} ${hours}:00`;



    };

    const hourlyData = data.map((h, i) => ({
        id: i.toString(),
        time: formatHour(h.time),
        temperature: h.temperature
    }));



    return (
        <View style={styles.mainContainer}>
            <Text style={styles.text}>Weather forecast</Text>
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
        fontSize: 25,
        padding: 10,
        fontWeight: 'bold'
    }
})