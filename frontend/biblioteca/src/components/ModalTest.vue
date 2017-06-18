<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
	        <div class="modal-header">
	        	<slot name="header">
	        	<h4>Buscar Libro</h4>
		        	<div class="row">
						<div class="col l8 m8 s8">
			            	<input type="text" id="searchID" v-model="identificacion">
			            	<label for="searchID" class="active">ID</label>
			          	</div>	
		          		<div class="col l4 m4 s4">
		          			<div class="input-field">
					          <select v-model="buscar">
					            <option value="" disabled selected>Elegir opcion</option>
					            <option value="titulo">Titulo</option>
					            <option value="id">Id</option>
					            <option value="genero">Genero</option>
					            <option value="autor">Autor</option>
					            <option value="keywords">Key</option>
					          </select>
					          
					        </div>
		          		</div>
		          	</div>
	          	</slot>
	        </div>
	        <div class="modal-body">
	 	       <slot name="body">
	    	        <p v-if="book.titulo!=''">
	    	        	<u>Titulo:</u> {{book.titulo}} <br><u>Genero:</u> {{book.genero}} <br><u>Autor:</u> {{book.autor}}<br><u>Año de Publicacion:</u> {{book.publicacion}}<br><u>Editorial:</u> {{book.editorial}}<br><u>Copias totales:</u> {{book.copias_total}}<br><u>Copias Disponibles:</u> {{book.copias_disponible}}<br><u>Descripcion:</u> {{book.descripcion}}
	    	        </p>
		        </slot>
	        </div>
	        <div class="modal-footer">
	            <slot name="footer">
	            	<div class="row">
		              	<div class="col l4 m4 s4">
							<button v-on:click="getBook()" class="btn waves-effect waves-light">Buscar</button>
		              	</div>
		              	<div class="col l4 m4 s4 offset-l1 offset-m1 offset-s1">
			            	<button class="modal-default-button btn waves-effect waves-light" v-on:click="$emit('close')">
			            		Cerrar
			              	</button>
		              	</div>
	              	</div>
	            </slot>
	        </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
	export default{
		name: 'modal',
		data() {
			return {
				book : {
					titulo : '',
					genero : '',
					autor : ''
				},
				identificacion : '',
				buscar : 'id'
			}
		},
		methods : {
			getBook(){
				switch(this.buscar){
					case 'id':
						this.$http.get('http://localhost:8000/books/searchbyid/'+this.identificacion).then((response)=>{
							if(response.body.success){
								this.book=response.body.libro;
								//this.$emit('searched',response.body);
							}else{
								swal({
									title: 'Lo sentimos! :(',
									text: 'No se encontro ningun libro con esa ID',
									type: 'error',
									closeOnConfirm: true
								});
							}
						});
						break;
					case 'titulo':
						this.$http.get('http://localhost:8000/books/searchbyname/'+this.identificacion).then((response)=>{
							if(response.body.success){
								if(response.body.libros.length>0){
									this.$emit('searched',response.body.libros);
								}else{
									swal({
										title: 'Lo sentimos! :(',
										text: 'No se encontro ningun libro con ese titulo\n'+request.body.message,
										type: 'error',
										closeOnConfirm: true
									});
								}
							}else{
								swal({
									title: 'Lo sentimos! :(',
									text: 'No se encontro ningun libro con ese titulo\n'+request.body.message,
									type: 'error',
									closeOnConfirm: true
								});
							}
						});
						break;
					case 'genero':
						this.$http.get('http://localhost:8000/books/searchbygenre/'+this.identificacion).then((response)=>{
							if(response.body.success){
								if(response.body.libros.length>0){
									this.$emit('searched',response.body.libros);
								}else{
									swal({
										title: 'Busqueda fallo!',
										text: 'No se encontro ningun libro',
										type: 'warning'
									});
									this.$emit('close');
								}
							}else if(response.body.message){
								swal({
									title: 'Lo sentimos! :(',
									text: response.body.message,
									type: 'error',
									closeOnConfirm: true
								});
							}else{
								swal({
									title: 'Lo sentimos! :(',
									text: 'No se encontro ningun libro de ese genero',
									type: 'error',
									closeOnConfirm: true
								});
							}
						});
						break;	
					case 'autor':
						this.$http.get('http://localhost:8000/books/searchbyauthor/'+this.identificacion).then((response)=>{
							if(response.body.success){
								this.$emit('searched',response.body.libros)
							}else{
								swal({
									title: 'Lo sentimos! :(',
									text: 'No se encontro ningun libro de ese autor',
									type: 'error',
									closeOnConfirm: true
								});
							}
						});
						break;
					case 'keywords':
						var keys=this.identificacion.split(',');
						var query='?'
						for (var i = 0; i <keys.length; i++) {
							query+=("key="+keys[0]);	
						}
						this.$http.get('http://localhost:8000/books/searchbykey'+query).then((response)=>{
							if(response.body.success){
								this.$emit('searched',response.body.libros);
							}else{
								swal({
									title: 'Lo sentimos! :(',
									text: 'No se encontro ningun libro con alguna de esas keywords',
									type: 'error',
									closeOnConfirm: true
								});
							}
						});
						break;
					default:
						swal({
							title: 'Error!',
							text: 'Ocurrio un error con la busqueda. Elija su opcion de busqueda otra vez e intente de nuevo',
							type: 'error',
							closeOnConfirm: true
						});
						break;			
				}
			},
			mounted(){
				$('select').material_select();
        
			}
		}
	}
</script>

<style scoped>
	.modal-mask {
		position: fixed;
		z-index: 9998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		display: table;
		transition: opacity .3s ease;
	}

	.modal-wrapper {
	  display: table-cell;
	  vertical-align: middle;
	}

	.greenTest{
		background-color: darkgreen !important;
	}

	.modal-container {
		width: 45vw;
		height: 45vh;
		max-height: 60vh;
		margin: 0 auto;

		padding: 20px 30px;
		background-color: #fff;
		border-radius: 2px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
		transition: all .3s ease;
		font-family: Helvetica, Arial, sans-serif;
		display: block;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.modal-footer{
		padding-bottom: 7px;
	}

	.modal-header h3 {
	  margin-top: 0;
	  margin-left: 25%;
	  color: #42b983;
	}

	select{
		display: inline;
	}

	.modal-body {
	  margin: 20px 0;
	  margin-left: 25px;
	}

	.modal-enter {
	  opacity: 0;
	}

	.modal-leave-active {
	  opacity: 0;
	}

	.modal-enter .modal-container,
	.modal-leave-active .modal-container {
	  -webkit-transform: scale(1.1);
	  transform: scale(1.1);
	}
</style>