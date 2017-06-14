<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
	        <div class="modal-header">
	        	<slot name="header">
	        	<h4>Buscar Libro</h4>
		        	<div class="row">
						<div class="col l9 m9 s9">
			            	<input type="text" id="searchID" v-model="identificacion">
			            	<label for="searchID" class="active">ID</label>
			          	</div>	
		          		<div class="col l3 m3 s3">
		          			<button class="btn" v-on:click="getBook()">Buscar</button>
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
	            	<button class="modal-default-button" v-on:click="$emit('close')">
	            		OK
	              	</button>
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
				identificacion : ''
			}
		},
		methods : {
			getBook(){
				console.log('ID: '+this.identificacion);
				this.$http.get('http://localhost:8000/books/searchbyid/'+this.identificacion).then((response)=>{
					console.log('Response: ', response.body);
					this.book=response.body;
					console.log(this.book);
				});
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

	.modal-container {
		width: 45vw;
		height: 45vh;
		max-height: 60vh;
		margin: 0px auto;
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
	  color: #42b983;
	}

	.modal-body {
	  margin: 20px 0;
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