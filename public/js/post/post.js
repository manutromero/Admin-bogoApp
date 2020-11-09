class Post {
    
  constructor () {
      // TODO inicializar firestore y settings
      this.db = firebase.firestore()
     
    
  }

  crearPost (uid,
     emailUser,
     titulo, 
     descripcionCorta, 
     imagenLink, 
     fechaHecho,
     Puntos,
     PuntosInteres,
     TiempoRecorrido,
     PointsdataArray) {
        
    return this.db.collection('Routes').add({
        autor: emailUser,
        TitleRoute: titulo,
        ShortDescription: descripcionCorta,
        Image: "https://firebasestorage.googleapis.com/v0/b/bogoapp-59711.appspot.com/o/ElBogotazo.jpg?alt=media&token=ceaf26d7-354e-4a6e-8c5f-a673a15c2288",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/bogoapp-59711.appspot.com/o/ElBogotazo.jpg?alt=media&token=ceaf26d7-354e-4a6e-8c5f-a673a15c2288",
        Poinst: parseInt(Puntos),
        PointsInterest: parseInt(PuntosInteres),
        Time: parseInt(TiempoRecorrido),
        Dates: fechaHecho,
    })
    .then(refDoc => {
        console.log(`Id del post => ${refDoc.id}`)
        const idRoute = refDoc.id
        console.log(idRoute,"idRoute")
        this.db.collection('RouteDetails').add({
            Image:"https://firebasestorage.googleapis.com/v0/b/bogoapp-59711.appspot.com/o/ElBogotazo.jpg?alt=media&token=ceaf26d7-354e-4a6e-8c5f-a673a15c2288",
            Points: PointsdataArray,
            TitleRoute: titulo
        }).then(res =>{
            console.log("AGREGADO -->" , res.id, idRoute)
            this.db.collection('RouteDetails').doc(res.id).set({
                RouteID: res.id
            },
            {
                merge: true
            })
             this.addWithMerge(res.id, idRoute)
        }).catch(error => {console.log("Error en pust a route details ->", error)})
    })
    .catch(error => {
        console.log(`error creando el post => ${error}`)
    })

  }

  addWithMerge(RouteID, id){

      console.log("RouteID",RouteID, "id", id)

      this.db.collection('Routes').doc(id).set({
        RouteID: RouteID
      },{
          merge: true
      })

  }

  consultarTodosPost () {
      this.db.collection("Routes").onSnapshot(querySnapshot => {
          $('#posts').empty()
          if(querySnapshot.empty){
            $('#posts').append(this.obtenerTemplatePostVacio())
          }else{
            querySnapshot.forEach(post => {
                console.log(post)
                let postHtml = this.obtenerPostTemplate(
                    post.data().autor,
                    post.data().TitleRoute,
                    post.data().ShortDescription,
                    post.data().Image,
                    post.data().Dates,
                    post.data().Poinst,
                    post.data().PointsInterest,
                    post.data().Time,
                );
                $('#posts').append(postHtml)  
            });
          }
      })
  }

  consultarPostxUsuario (emailUser) {
    
  }

  obtenerTemplatePostVacio () {
    return `<article class="post">
      <div class="post-titulo">
          <h5>Crea el primer Post a la comunidad</h5>
      </div>
      <div class="post-calificacion">
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-vacia" href="*"></a>
      </div>
      <div class="post-video">
          <iframe type="text/html" width="500" height="385" src='https://www.youtube.com/embed/bTSWzddyL7E?ecver=2'
              frameborder="0"></iframe>
          </figure>
      </div>
      <div class="post-videolink">
          Video
      </div>
      <div class="post-descripcion">
          <p>Crea el primer Post a la comunidad</p>
      </div>
      <div class="post-footer container">         
      </div>
  </article>`
  }

  obtenerPostTemplate (
    autor, titulo, descripcionCorta, imagenLink, fechaHecho,Puntos,PuntosInteres,TiempoRecorrido
  ) {
    if (imagenLink) {
      return `<article class="post">
            <div class="post-titulo">
                <h5>${titulo}</h5>
            </div>
            <div class="post-calificacion">
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-vacia" href="*"></a>
            </div>
            <div class="post-video">                
            <img id="imgVideo" src='${imagenLink}' class="post-imagen-video" 
                alt="Imagen Video">     
            </div>
            <div class="post-descripcion">
                <p>${descripcionCorta}</p>
            </div>
            <div class="post-footer container">
                <div class="row">
                    <div class="col m6">
                        Fecha: ${fechaHecho}
                    </div>
                    <div class="col m6">
                        Autor: ${autor}
                    </div>        
                </div>
                <div class="row">
                <div class="col m6">
                    Puntos: ${Puntos}
                </div>
                <div class="col m6">
                    Puntos de interes: ${PuntosInteres}
                </div>        
            </div>
            </div>
        </article>`
    }

    return `<article class="post">
                <div class="post-titulo">
                    <h5>${titulo}</h5>
                </div>
                <div class="post-calificacion">
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-vacia" href="*"></a>
                </div>
                <div class="post-descripcion">
                    <p>${descripcionCorta}</p>
                </div>
                <div class="post-footer container">
                    <div class="row">
                        <div class="col m6">
                            Fecha: ${fechaHecho}
                        </div>
                        <div class="col m6">
                            Autor: ${autor}
                        </div>        
                    </div>
                </div>
            </article>`
  }
}
