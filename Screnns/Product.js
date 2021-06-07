import Swipeout from 'react-native-swipeout';
import  React,{useState,useEffect  }  from 'react';
import {View,StyleSheet,FlatList,Text,Image, Dimensions,Alert, ToastAndroid, Modal,TextInput, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'; 
import firebaseConfig from '../Firebase/firebase';
import ProductDao from '../Dao/ProductDao'
import * as ImagePicker from 'expo-image-picker' ;


    const Product=()=>{  
        const[data,setData]=useState([]);
        const[modalVisible,setModalVisible]=useState(false);
        hideDialog=()=>{
            setModalVisible(false);
        };
        showDialog=()=>{
            setModalVisible(true);
        }

        const[currentItem,setCurrentItem]=useState(null);
        setCurrent=async(item)=>{
            await setCurrentItem(item);
        }

        const getAllProduct=()=>{
           //value la tao thu muc me chua cac muc con
          firebaseConfig.database().ref().child('sinhvien').on('value',(snap)=>{
              var items=[];
            snap.forEach((child)=>{
               let item={
                   key:child.key,
                   name:child.val().name,
                   images:child.val().images,
                   tuoi:child.val().tuoi,
                   email:child.val().email,
               };
               items.push(item);
            });
            setData(items)
          });
       };
         useEffect(()=>{
             getAllProduct();
         },[]);

        return(
            <View style={styles.container}>
                  <Text style={styles.text}> Danh Sach Sinh Vien</Text>
                  <FlatList data={data} renderItem={({item})=><ListItem item={item} showDialog={showDialog} setCurrent={setCurrent}/>}></FlatList>

                  <TouchableOpacity style={styles.fab} onPress={()=>{showDialog(),setCurrent(null)} }>
                      <Text style={styles.textthem}>+</Text>
                  </TouchableOpacity>
                  {/* neu item duoc chon */}
                  <Modal animationType="slide" transparent={true} visible={modalVisible}>
                      {currentItem ? (
                          <ProductUpdate item={currentItem} hideDialog={hideDialog}></ProductUpdate>
                      ):(
                          <ProductInsert  hideDialog={hideDialog}></ProductInsert>
                      )}
                  </Modal>
            </View>
         );
    };
    const ListItem=(props)=>{
        const SwipeoutSettings={
            autoClose:true,
            onClose:()=>{
                console.log('close swipeout');
             //   props.setCurrent(null);
            },
            onOpen:()=>{
                console.log('Open swipeout');
                props.setCurrent(props.item);

            },
            right:[
                {
                    text:'Update',
                    type:'secondary',
                    onPress:()=>{
                        console.log('Update');
                        props.showDialog();
                    }
                },
                {
                    text:'Delete',
                    type:'delete',
                    onPress:()=>{
                        Alert.alert(
                            'Delete',
                            'ban co muon xoa'+props.item.name+"?",
                            [
                                {text:'no',onPress:()=> ToastAndroid.show("dong cua so xoa",ToastAndroid.SHORT),type:'cancle'},
                                {text:'yes',onPress:()=>ProductDao.delete(props.item.key)}
                            ],
                            {cancelable:true}
                        )
                    }
                }
            ]
        };
        return(
             <Swipeout {...SwipeoutSettings}>
                 <View style={styles.ListContainer}>
                   <Image
                   //ủi lay anh tren mang
                     source={{uri: props.item.images}}
                     style={{borderWidth:1,backgroundColor:'black',width:50,height:50}}
                   />
                   <View>
                       <Text style={{marginLeft:10,fontSize:20}}>Name:{props.item.name}</Text>
                       <Text style={{marginLeft:10}}>Email:{props.item.email}</Text>
                       <Text style={{marginLeft:10}}>Tuoi:{props.item.tuoi}</Text>
                   </View>
                 </View>

             </Swipeout>
        );
    };
    const ProductInsert= (props) =>{
    
        const [name,setname]=useState('');
        const[images,setImages]=useState('https://i.pinimg.com/originals/db/16/ec/db16ec09002992068c01ce7d6a4f5e06.jpg');
        const[tuoi,setTuoi]=useState('');
        const[email,setEmail]=useState('');
       //ham chon anh
        const chooseImages=async()=>{
           const result=await ImagePicker.launchImageLibraryAsync({
               mediaTypes:ImagePicker.MediaTypeOptions.Image,
               allowsEditing:true,
               aspect:[4,3]
           });
           if(!result.cancelled){
               console.log(images);
               setImages(result.uri);
           }
        };
        return(
            <View style={styles.centerredView}>
               <View style={styles.modelView}>
                   <Text style={styles.modeltext}>Insert sinh vien</Text>
                   <TouchableWithoutFeedback onPress={() => chooseImages()}>
                       <Image source={{uri:images,width:130,height:130}}
                       style={{borderWidth:1,borderColor:'black'}}></Image>
                   </TouchableWithoutFeedback>
                   <View style={styles.lineDialog}>
                      <Text style={styles.textDialog}>name:</Text>
                      <TextInput style={styles.input} value={name} onChangeText={(text)=>setname(text)}></TextInput>
                   </View>
                   <View style={styles.lineDialog}>
                      <Text style={styles.textDialog}>email:</Text>
                      <TextInput style={styles.input} value={email} onChangeText={(text)=>setEmail(text)}></TextInput>
                   </View>
                   <View style={styles.lineDialog}>
                      <Text style={styles.textDialog}>tuoi:</Text>
                      <TextInput style={styles.input} value={tuoi} onChangeText={(text)=>setTuoi(text)}></TextInput>
                   </View>
                   
                   <View style={styles.modelButton}>
                   <TouchableOpacity style={styles.openButton}
                                         onPress={()=>{
                                             props.hideDialog();
                                         }}
                       >
                        <Text style={styles.textStyle}>Cancle</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.openButton}
                                         onPress={()=>{
                                            ProductDao.insert(name,images,tuoi,email);
                                             props.hideDialog();
                                         }}
                       >
                        <Text style={styles.textStyle}>Insert</Text>
                       </TouchableOpacity>
                   </View>
               </View>
            </View>
        );
    };
    const ProductUpdate=(props)=>{
        const [key,setkey] =useState(props.item.key);
        const[name,setname]=useState(props.item.name);
        const[images,setImages]=useState(props.item.images);
        const[tuoi,setTuoi]=useState(props.item.tuoi);
        const[email,setEmail]=useState(props.item.email);
         //ham chon anh
         const chooseImages=async()=>{
            const result=await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Image,
                allowsEditing:true,
                aspect:[4,3]
            });
            if(!result.cancelled){
                console.log(images);
                setImages(result.uri);
            }
         };
        
        return(
            <View style={styles.centerredView}>
               <View style={styles.modelView}>
                   <Text style={styles.modeltext}>Update sinh vien</Text>

                   <TouchableWithoutFeedback onPress={() => chooseImages()}>
                       <Image source={{uri:images,width:130,height:130}}
                       style={{borderWidth:1,borderColor:'black'}}></Image>
                   </TouchableWithoutFeedback>
                   <View style={styles.lineDialog}>
                      <Text style={styles.textDialog}>name:</Text>
                      <TextInput style={styles.input} value={name} onChangeText={(text)=>setname(text)}></TextInput>
                   </View>
                   <View style={styles.lineDialog}>
                      <Text style={styles.textDialog}>email:</Text>
                      <TextInput style={styles.input} value={email} onChangeText={(text)=>setEmail(text)}></TextInput>
                   </View>
                   <View style={styles.lineDialog}>
                      <Text style={styles.textDialog}>tuoi:</Text>
                      <TextInput style={styles.input} value={tuoi} onChangeText={(text)=>setTuoi(text)}></TextInput>
                   </View>
                   
                   <View style={styles.modelButton}>
                   <TouchableOpacity style={styles.openButton}
                                         onPress={()=>{
                                             props.hideDialog();
                                         }}
                       >
                        <Text style={styles.textStyle}>Cancle</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.openButton}
                                         onPress={()=>{
                                            ProductDao.update(key,name,images,tuoi,email);
                                             props.hideDialog();
                                         }}
                       >
                        <Text style={styles.textStyle}>Update</Text>
                       </TouchableOpacity>
                   </View>
               </View>
            </View>
        );
    }
  export default Product;

 
    const {width,height} =Dimensions.get('window');
    const styles=StyleSheet.create({
        container:{
            width:400,
            flex:1,
            justifyContent:'center'
        },
        text:{
            fontSize:24,
            marginTop:30,
            marginLeft:60
        },
        
        ListContainer:{
            backgroundColor:'#f1f1f1',
            flexDirection:'row',
            margin:width * 3.6 / 280.5,
            padding:width*3.6/187.5,
            borderRadius:width*3.6/187.5
        },
        centerredView:{
            marginTop:30,
            backgroundColor:'#cccccc',
            width: 250,
           alignSelf:'center',
           height:550
          
        },
        input: {
            padding: 10,
            marginTop: 5,
            marginBottom: 10,
            width: width / 1.5,
            height: height / 20,
            fontSize: 16,
            borderRadius: 8,
            borderWidth: 1,
        },
        modelView:{
            margin:width * 3.6 / 187.5,
        },
        modeltext:{
            fontSize: 24,
           alignSelf:'center'
        },
        modelButton:{
            flexDirection:'row',
        },
        openButton: {
            marginTop: 10,
            backgroundColor: '#6495ed',
            padding: 10,
            width:100,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft:14,
            borderRadius: 8
    
        },
        textthem:{
            margin:10,
            fontSize: 24,
        }
    });
