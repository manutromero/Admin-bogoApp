class Autenticacion {
  autEmailPass (email, password) {
    firebase.auth().signInWithEmailAndPassword(email,password)
      .then(result => {
        if(result.user.emailVerified){
          M.toast({html:`Bienvenido ${result.user.displayName}`, inDuration: 5000} );
          $('#avatar').attr('src', 'imagenes/usuario_auth.png')
        }else{
          firebase.auth().signOut()
          M.toast({html:`Porfavor realiza la verificacion del correo`, inDuration: 5000} );

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
        M.toast({html:`${error.message}`, inDuration: 5000} );

      })  

      firabase.auth().signOut()

      M.toast({html:`Bienvenido ${nombres}, debes realizar el proceso de verificacion `, inDuration: 5000} );

      $('.modal').modal('close')

    } ).catch(error => {

        M.toast({html:`${error.message}`, inDuration: 5000} );

    })



    
  }

  authCuentaGoogle () {
    console.log("click")
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
    .then( result => {
      $('#avatar').attr('src', result.user.photoURL)
      $('.modal').modal('close')
      M.toast({html:`Bienvenido ${result.user.displayName} !!`, inDuration: 5000} );

    } )
    .catch(error => {
      console.error(error)
      M.toast({html:`Erro al autenticarse con google ${error}`, inDuration: 5000} );

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
