
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import { StyleSheet, Text, TouchableOpacity, View, LogBox} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import Player  from './Player'


export default function App() {

  LogBox.ignoreAllLogs(true);

  const [audioIndex, setarAudioIndex] = useState(0);

  const [playing, setPlaying] = useState(false);

  const [audio,setarAudio] = useState(null);

  const [musicas,setarMusicas] = useState([

    {
      nome: 'Sweet Child O Mine',
      artista: 'Guns n Roses',
      playing: false,
      file:{uri: 'https://ia803208.us.archive.org/14/items/SweetChildOMine_201304/Sweet%20Child%20O%2527%20Mine.mp3'}
    },
    
    {
      nome: 'Septette for a dead princess',
      artista: 'ZUN - Junya Ota',
      playing: false,
      file: {uri:'https://ia801805.us.archive.org/17/items/Touhou-06-EOSD-Soundtrack/Septette%20for%20the%20Dead%20Princess.mp3'}
    },

    {
      nome: 'Lullaby of Deserted Hell',
      artista: 'ZUN - Junya Ota',
      playing: false,
      file: {uri: 'https://ia600204.us.archive.org/12/items/touhou-11-original-soundtrack/10.%20Lullaby%20of%20Deserted%20Hell.mp3'}
    },

    {
      nome: ' Emotional Skyscraper ~ Cosmic Mind ',
      artista: 'ZUN - Junya Ota',
      playing: false,
      file: {uri:'https://ia801601.us.archive.org/22/items/touhou-12-original-soundtrack/13.%20Emotional%20Skyscraper%20~%20Cosmic%20Mind.mp3'}
    },

  ]);

  const changeMusic = async () =>{
    let curFile = null;
     let newMusics = musicas.filter((val, k)=>{
       if(id == k){
           musicas[k].playing = true;
           
           curFile = musicas[k].file;
           setPlaying(true);
           setarAudioIndex(id);
       }
       else{
        musicas[k].playing = false;
       }
       return musicas[k];
     })

     if(audio != null){
      audio.unloadAsync();
     }

     let curAudio = new Audio.Sound();
     try{
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
     }catch(error){}

    setarAudio(curAudio);
     setarMusicas(newMusics);

  }

  return (
    <View style={{flex: 1}}>

    <ScrollView style={styles.container}>
      <StatusBar hidden/>
      <View style={styles.header}>
        <Text style={{textAlign: 'center', color:'white', fontSize:25}}>App Música - Projeto Integrador - Turma </Text>
      </View>

      <View style={styles.table}>
            <Text style={{width: '50%',color:'rgb(200,200,200)'}}>Música</Text>
            <Text style={{width: '50%',color:'rgb(200,200,200)'}}>Artista</Text>
      </View>

      {
        musicas.map((val, k)=>{

          if(val.playing){
            return(
            <View style={styles.table}>
              <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%', flexDirection:'row'}}>
                  <Text style={{width: '50%',color:'#1DB954'}}><AntDesign name="play" size={15} color="#1DB954"/>  {val.nome}</Text>
                  <Text style={{width: '50%',color:'#1DB954'}}>{val.artista}</Text>
              </TouchableOpacity>
            </View>
            );
          }else{
            return(
              <View style={styles.table}>
                <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%', flexDirection:'row'}}>
                    <Text style={{width: '50%',color:'white'}}><AntDesign name="play" size={15} color="white"/>  {val.nome}</Text>
                    <Text style={{width: '50%',color:'white'}}>{val.artista}</Text>
                </TouchableOpacity>
              </View>
              );
          }
        })
      }
    <View style={{paddingBottom:200}}></View>
    </ScrollView>
    <Player playing={playing} setPlaying={setPlaying} setarAudioIndex={setarAudioIndex} audioIndex={audioIndex} musicas={musicas}
      setarMusicas={setarMusicas} audio={audio} setarAudio={setarAudio}
    ></Player>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222'
  },
  header:{
    backgroundColor:'#1DB954',
    width: '100%',
    padding:20
  },
  table:{
    flexDirection:'row',
    padding: 20,
    borderBottomColor:'white',
    borderBottomWidth: 1
  }

})