$(() => {
	$('.tooltipped').tooltip({ delay: 50 });
	$('.modal').modal();


	$(document).on("click",".collapsible-header", function(){
		if($('.collapsible-body').hasClass("Is-visible")){
			$(this).siblings('.collapsible-body').removeClass("Is-visible")
		}else{
			$(this).siblings('.collapsible-body').addClass("Is-visible")
		}
	})


	$("#btnAddPunto").click(function(){
		var countItem = $(".collapsible-body").length
		$("#ContainerPoints").append(`

		<li>
		<div class="collapsible-header">
		  <i class="material-icons">place</i>
			  Punto ${countItem + 1}
		  <span class="badge">1</span></div>
		  <div class="collapsible-body">

			  <div class="row">
				  <div class="input-field col s6">
					  <input id="route_name_${countItem + 1}" type="text" class="validate" required>
					  <label for="route_name">Nombre Punto</label>
					</div>
				  <div class="input-field col s6">
					<input id="adress_name_${countItem + 1}" type="text" class="validate" required>
					<label for="adress_name">Dirección</label>
				  </div>
				</div>

			  <div class="row">
				  <div class="input-field col s12">
					<input id="descripcion_${countItem + 1}" type="email" class="validate" required>
					<label for="descripcion">Description</label>
				  </div>
				</div>

				<h5>Audio</h5>
			   <div class="row">
				  <div class="input-field col s6">
					  <input id="title_audo_${countItem + 1}" type="text" class="validate" required> 
					  <label for="title_audo">Titulo de audio</label>
					</div>
				  <div class="input-field col s6">
					<input id="Audio_url_${countItem + 1}" type="text" class="validate" required>
					<label for="Audio_url">URL Audio</label>
				  </div>
				</div>
				

				<h5>Images</h5>
				<div class="row">
				  <div class="progress-panel">
					  <label for="btnUploadFile">Imagen del punto:</label>
					  <input type="file" value="upload" id="btnUploadFile" />
					  <div class="progress">
						  <div class="determinate" style="width: 0%"></div>
					  </div>
				  </div>
				 </div>
				 
				 <h5>GeoCoordenada</h5>
				 <div class="row">
					<div class="input-field col s6">
						<input id="Latitud_${countItem + 1}" type="number" class="validate" required>
						<label for="Latitud">Latitud</label>
					  </div>
					<div class="input-field col s6">
					  <input id="Longitud_${countItem + 1}" type="number" class="validate">
					  <label for="Longitud">Longitud</label>
					</div>
			  </div>

			  <h5>Datos relacionados</h5>
			  <div class="row">
				 <div class="input-field col s4">
					 <input id="Descripcion_relacionados_${countItem + 1}" type="text" class="validate" required>
					 <label for="Descripcion_relacionados">Descripcion relacionados</label>
				   </div>
				 <div class="input-field col s4">
				   <input id="URL_relacionados_${countItem + 1}" type="text" class="validate" required>
				   <label for="URL_relacionados">URL Recurso</label>
				 </div>
				 <div class="input-field col s4">
				  <input id="Title_relacionado_${countItem + 1}" type="text" class="validate" required>
				  <label for="Title_relacionado">Titulo Dato relacinado</label>
				</div>
			   </div>
		  </div>
	  </li>
		
		
		`)
	})


	// TODO: Adicionar el service worker

	// Init Firebase nuevamente
	firebase.initializeApp(firebaseConfig);

	// TODO: Registrar LLave publica de messaging

	// TODO: Solicitar permisos para las notificaciones

	// TODO: Recibir las notificaciones cuando el usuario esta foreground

	// TODO: Recibir las notificaciones cuando el usuario esta background

  // TODO: Listening real time
	const post = new Post()
	post.consultarTodosPost()

	// TODO: Firebase observador del cambio de estado
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			$('#btnInicioSesion').text('Salir');
			if (user.photoURL) {
				$('#avatar').attr('src', user.photoURL);
			} else {
				$('#avatar').attr('src', 'imagenes/usuario_auth.png');
			}
		} else {
			$('#btnInicioSesion').text('Iniciar Sesión');
			$('#avatar').attr('src', 'imagenes/usuario.png');
		}
	});

	// TODO: Evento boton inicio sesion
	$('#btnInicioSesion').click(() => {
		const user = firebase.auth().currentUser;

		if (user) {
			$('#btnIniciarSesion').text('Iniciar Secion');
			return firebase
				.auth()
				.signOut()
				.then(() => {
					$('#avatar').attr('src', 'imagenes/usuario.png');
					M.toast('se realizo un signOut correcto', 4000);
				})
				.catch((error) => {
					M.toast(`Error al realizar signOut => ${error}`, 4000);
				});
		}

		$('#emailSesion').val('');
		$('#passwordSesion').val('');
		$('#modalSesion').modal('open');
	});

	$('#avatar').click(() => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				$('#avatar').attr('src', 'imagenes/usuario.png');
				M.toast({html:`SignOut correcto`, inDuration: 4000} );
			})
			.catch((error) => {
				M.toast({html:`Error al realizar el SignOut ${error}`, inDuration: 4000} );
			});
	});

	$('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad');
    const post = new Post()
    post.consultarTodosPost()
	});

	$('#btnMisPost').click(() => {
		//$('#tituloPost').text('Mis Posts')
		//Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)
	});
});
