
import React from 'react';
import { Text,StyleSheet ,TouchableOpacity,View} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Faculty(){
    const navigation = useNavigation();
  return(<> 
  <View style={styles.container}>
  <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('addfaculty')}
      >
        <Text style={styles.buttonText}>+ Add issue</Text>
      </TouchableOpacity>
    
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('dailyupdate')}
      >
        <Text style={styles.buttonText}>+ daily update</Text>
      </TouchableOpacity>
      </View>
  </>)
}

const styles=StyleSheet.create({
    container:{
      marginTop:250
    },
    button: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingLeft:20,
        marginBottom: 10,
        textAlign:"center",
        borderRadius: 5,
        width:"60%",
        marginLeft:80
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        marginLeft:22
      },
})