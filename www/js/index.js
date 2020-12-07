
var firebaseConfig = {
    apiKey: "AIzaSyBzTOBw2Rdl421HEJi4XbOOVNo9yhBoM2M",
    authDomain: "example-firestore-f62e4.firebaseapp.com",
    databaseURL: "https://example-firestore-f62e4.firebaseio.com",
    projectId: "example-firestore-f62e4",
    storageBucket: "example-firestore-f62e4.appspot.com",
    messagingSenderId: "482244992891",
    appId: "1:482244992891:web:f3745d53a5d540c4"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

var ref = firebase.storage().ref()

document.getElementById('camera').addEventListener('click', capturarFoto)

function capturarFoto() {

    navigator.camera.getPicture(onSuccess, onFail,{
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        // sourceType: Camera.PictureSourceType.CAMERA,
        // mediaType: Camera.MediaType.PICTURE,
        // targetHeight: 300,
        // targetWidth: 400
    })
    function onSuccess(imageURI) {
        var image = document.getElementById('image')

        // img = "data:image/jpeg;base64," + imageURI
        // image.src = "data:image/jpeg;base64," + imageURI
        image.src = imageURI

        var path = imageURI // "file://storage/0/downloads/exampple.png"

        getFileContentAsBase64(path, function(base64Image){

            alert(base64Image)

        })
        // alert(imageURI)

        // var name = 'photo'
        
        // var upload = ref.child('files/ ' + name).putString(img, 'data_url')

        // upload.then( snapshot => {
        //     snapshot.ref.getDownloadURL().then( downloadURL => {
        //         var imgURL = downloadURL
        //         alert('La imagen se subio ' + imgURL)
        //     })
        // })
    }
    function onFail(message) {
        alert('Fail', message)
    }

}

function getFileContentAsBase64(path, callback){
    window.resolveLocalFileSystemURL(path, gotFile, fail)

    function fail(e) {
        alert('Cannot found requested file')
    }
    function gotFile(fileEntry) {
        fileEntry.file(function(file){
            var reader = new FileReader()
            reader.onloadend = function(e){
                var content = this.result
                callback(content)
            }
            reader.readAsDataURL(file)
        })
    }
}

/* <preference name="AndroidPersistentFileLocation" value="Compatibility" /> */
// Intslacion requerida:
    // cordova plugin add cordova-plugin-camera
