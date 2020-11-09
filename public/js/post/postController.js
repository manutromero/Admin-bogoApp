$(() => {



  $('#btnModalPost').click(() => {
    $('#tituloNewPost').val('')
    $('#descripcionNewPost').val('')
    $('#linkVideoNewPost').val('')
    $('#btnUploadFile').val('')
    $('.determinate').attr('style', `width: 0%`)
    sessionStorage.setItem('imgNewPost', null)

    // TODO: Validar que el usuario esta autenticado

    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)

    $('#modalPost').modal('open')
  })
  console.log("SOY CONTROLADOR POST")
  $('#btnRegistroPost').click(() => {
    const objPost = new Post()
    const user = firebase.auth().currentUser
    // TODO: Validar que el usuario esta autenticado

    if(user == null){
       M.toast({html:`Para crear el post debes estar autenticado`, inDuration: 4000} );
       return
    }

  
    const titulo = $('#tituloNewPost').val()
    const descripcionCorta = $('#descripcionNewPost').val()
    const fechaHecho = $('#FechadelHecho').val()
    const Puntos = $('#Puntos').val()
    const PuntosInteres = $('#PuntosInteres').val()
    const TiempoRecorrido = $('#TiempoRecorrido').val()

    //Formulario Poinst
    const PointsdataArray = []
    $(".collapsible-body").each(function(index, element){

        let id = index+1 
        console.log(id)
        console.log("index",index)
        let latitud = parseFloat($(element).find(`#Latitud_${id}`).val())
        let longitud = parseFloat($(element).find(`#Longitud_${id}`).val())
        console.log("--->Latitud_ ",latitud)
        console.log("---> longitud", longitud)

        var jsonData = {
          Title: $(element).find(`#route_name_${id}`).val(),
          Point: id,
          Address: $(element).find(`#adress_name_${id}`).val(),
          Description: $(element).find(`#descripcion_${id}`).val(),
          Images: ["https://firebasestorage.googleapis.com/v0/b/bogoapp-59711.appspot.com/o/PalacioDeJusticia-2.jpg?alt=media&token=18651b3d-d9d1-42be-8521-e952bd146936"],
          GeoCoordinates: new firebase.firestore.GeoPoint(latitud,longitud),
          Audio: [{
            TitleAudio: $(element).find(`#title_audo_${id}`).val(),
            URL: $(element).find(`#Audio_url_${id}`).val()
          }],
          RelatedData: [{
            Description: $(element).find(`#Descripcion_relacionados_${id}`).val(),
            URL: $(element).find(`#URL_relacionados_${id}`).val(),
            title: $(element).find(`#Title_relacionado_${id}`).val()
          }],
        }

        console.log("jsonData",jsonData)
        PointsdataArray.push(jsonData)
    })
    console.log("PointsdataArray",PointsdataArray)
    const imagenLink = sessionStorage.getItem('imgNewPost') == 'null'
      ? null
      : sessionStorage.getItem('imgNewPost')

    objPost
      .crearPost(
        user.uid,
        user.email,
        titulo,
        descripcionCorta,
        imagenLink,
        fechaHecho,
        Puntos,
        PuntosInteres,
        TiempoRecorrido,
        PointsdataArray
      )
      .then(resp => {
        M.toast({html:`Post creado correctamente`, inDuration: 4000} );
        $('.modal').modal('close')
      })
      .catch(err => {
        M.toast({html:`Error => ${err}`, inDuration: 4000} );
      })
  })

  $('#btnUploadFile').on('change', e => {
    // TODO: Validar que el usuario esta autenticado

    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)

    const file = e.target.files[0]

    // TODO: Referencia al storage
    
  })




})
