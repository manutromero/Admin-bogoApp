class Post {
    
  constructor () {
      // TODO inicializar firestore y settings
      this.db = firebase.firestore()
     
    
  }

  crearPost (uid, emailUser, titulo, descripcionCorta, imagenLink, fechaHecho,Puntos,PuntosInteres,TiempoRecorrido) {
        
    return this.db.collection('Routes').add({
        autor: emailUser,
        TitleRoute: titulo,
        ShortDescription: descripcionCorta,
        Image: imagenLink,
        thumbnail: imagenLink,
        Poinst: parseInt(Puntos),
        PointsInterest: parseInt(PuntosInteres),
        Time: parseInt(TiempoRecorrido),
        Dates: fechaHecho
    })
    .then(refDoc => {
        console.log(`Id del post => ${refDoc.id}`)
    })
    .catch(error => {
        console.log(`error creando el post => ${error}`)
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
