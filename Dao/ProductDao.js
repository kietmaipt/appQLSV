import {ToastAndroid, ToastAndroind} from "react-native";
import firebaseConfig from "../Firebase/firebase";
module.exports.delete=(key)=>{
    firebaseConfig
    .database()
    .ref()
    .child('sinhvien')
    .child(key)
    .remove()
    .then(()=>{
        ToastAndroid.show("xoa thanh cong",ToastAndroid.SHORT);
        return true;

    })
    .catch((error)=>{
        ToastAndroid.show('that bai',ToastAndroid.SHORT);
        return false;
    })
}
const UploadImages=async(name,uri)=>{
    const path='images/'+name+'.jpg';
    return new Promise(async(res,rej)=>{
        const response=await fetch(uri);
        const file=await response.blob();

        let upload=firebaseConfig.storage().ref(path).put(file);


        upload.on(
            'statte_changed',
            (snapshot)=>{},
            (err)=>{
                rej(err);
            },
            async()=>{
              const url=await upload.snapshot.ref.getDownloadURL();
              res(url);
            }
        );
    });
};
module.exports.insert =async (name,images,tuoi,email)=>{
    const removeUri=await UploadImages(name,images);
    firebaseConfig
    .database()
    .ref()
    .child('sinhvien')
    .push({
        name:name,
        images:removeUri,
        tuoi:tuoi,
        email:email
    })
    .then(()=>{
        ToastAndroid.show('them thanh cong',ToastAndroid.SHORT);
    })
    .catch((error)=>{
        ToastAndroid.show('them that bai',ToastAndroid.SHORT);
    });
};
module.exports.update=async (key,name,images,tuoi,email)=>{
    const removeUri=await UploadImages(name,images);
    firebaseConfig
    .database()
    .ref()
    .child('sinhvien')
    .child(key)
    .set({
        name:name,
        images:removeUri,
        tuoi:tuoi,
        email:email
    })
    .then(()=>{
        console.log('cap  nhat thanh cong');
        ToastAndroid.show('cap  nhat thanh cong',ToastAndroid.SHORT);
    })
    .catch(()=>{
        ToastAndroid.show('cap nhat that bai',ToastAndroid.SHORT);
    })
}
