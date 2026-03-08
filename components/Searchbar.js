import { StyleSheet, TextInput, View, Text, Pressable } from "react-native";
import { useState } from "react";
import {Ionicons} from '@expo/vector-icons';

function Searchbar({setCity, onSearch}){
    const [isIconChecked, setIsIconChecked] = useState(false);
    const [text, onChangeText] = useState('');

    function handleSearch(){
        onSearch();
        setTimeout(()=> setIsIconChecked(false), 1000);
    }

    function handleOnSearch(){
        setCity(text);
        onChangeText('');

        setIsIconChecked(true);
        handleSearch();
    }

    return (
        <View style={styles.searchContainer}> 
            <View style={styles.box}>
                <TextInput
                    placeholder="Search city"
                    style={styles.input}
                    value={text}
                    onChangeText={onChangeText}
                />
            </View>
            <View style={styles.checkbox}>
                <Pressable onPress={handleOnSearch}>
                    <Ionicons 
                        name={isIconChecked ? 'checkmark-done-outline' : 'checkmark-outline'} 
                        size={32} 
                        color='black'/>
                </Pressable>
            </View>
        </View>
    );
}

export default Searchbar;

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: 'white',
        marginTop: 50,
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        elevation: 20,
        justifyContent: 'center'
    },
    box:{
        width: '90%',
    }, 
    checkbox: {
        justifyContent: 'center'
    },
    input: {
        padding: 10,
        marginLeft: 10,
        fontSize: 16
       
    }
});