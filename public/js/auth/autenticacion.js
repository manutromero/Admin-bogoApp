class Autenticacion {
  autEmailPass (email, password) {
    firebase.auth().signInWithEmailAndPassword(email,password)
      .then(result => {
        if(result.user.emailVerified){
          Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
          $('#avatar').attr('src', 'imagenes/usuario_auth.png')
        }else{
          firebase.auth().signOut()
          Materialize.toast(`Porfavor realiza la verificacion del correo`, 5000)
        }
      })
    
    $('.modal').modal('close')
   
  }

  crearCuentaEmailPass (email, password, nombres) {
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then( result => {
      result.user.updateProfile({
        displayNane: nombres
      })

      const configuracion = {
        url: 'http://localhost:3000/'
      }

      result.user.sendEmailVerification(configuracion).catch(error => {
        Materialize.toast(error.message, 4000)
      })  

      firabase.auth().signOut()

      Materialize.toast(`Bienvenido ${nombres}, debes realizar el proceso de verificacion `, 4000)

      $('.modal').modal('close')

    } ).catch(error => {
        Materialize.toast(error.message, 4000)
    })



    
  }

  authCuentaGoogle () {
    console.log("click")
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
    .then( result => {
      $('#avatar').attr('src', result.user.photoURL)
      $('.modal').modal('close')
      Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
    } )
    .catch(error => {
      console.error(error)
      Materialize.toast(`Erro al autenticarse con google ${error} `, 4000)
    })
    
  }

  authCuentaFacebook () {
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authTwitter () {
    // TODO: Crear auth con twitter
  }
}
