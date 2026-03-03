import { View, StyleSheet, Pressable, Text, FlatList } from "react-native";

function WeatherCard({data}){
    // here i want to print the actual date with the temperature and the

    //console.log();
    return(
        <View style={styles.mainCard}>
            <View style={styles.city}>
                <Text style={styles.text}>Warsaw</Text>
            </View>
            <View style={styles.data}>
                <FlatList 
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={(item, index)=>{
                        
                    }}
                />
                
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
        elevation: 10,
        marginTop: 50,
        flexDirection: 'row'
    },
    city: {
    },
    data: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%',
        minWidth: 150,
        width: 150,
        marginTop: 5
    },
    dataText: {
        fontSize: 15
    },
    text: {
        fontSize: 20,
        padding: 30,
        justifyContent: 'flex-start',
        fontFamily: 'fantasy',
    }
});
