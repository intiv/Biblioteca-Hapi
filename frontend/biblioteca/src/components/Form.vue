<template>
	<div id="formRoot">
		<h4>Adicion de Libro</h4>
		<form>
			<div class="row">
				<div class="input-field col l8 m8 s8">
					<input type="text" id="tituloInput" class="validate" v-model="book.titulo">
					<label for="tituloInput" class="active">Titulo</label>
				</div>
			</div>
			<div class="row">
				<div class="input-field col l8 m8 s8">
					<input type="text" id="generoInput" v-model="book.genero">
					<label for="generoInput" class="active">Genero</label>
				</div>
			</div>
					
			<div class="row">
				<div class="input-field col l8 m8 s8">
					<input type="text" id="autorInput" v-model="book.autor">
					<label for="autorInput" class="active">Autor</label>
				</div>
			</div>
					
			<div class="row">
				<div class="input-field col l8 m8 s8">
					<input type="text" id="publicacionInput" v-model="book.publicacion">
					<label for="publicacionInput" class="active">Año de Publicacion</label>
				</div>
			</div>
					
			<div class="row">
				<div class="input-field col l8 m8 s8">
					<input type="text" id="editorialInput" v-model="book.editorial">
					<label for="editorialInput" class="active">Editorial</label>
				</div>
			</div>
					
			<div class="row">
				<div class="input-field col l8 m8 s8">
					<input type="text" id="descripcionInput" v-model="book.descripcion">
					<label for="descripcionInput" class="active">Descripcion</label>
				</div>
			</div>
					
			<div class="row">
				<div class="input-field col l8 m8 s8">
					<input type="text" id="keywordsInput" v-model="keywordsRaw">
					<label for="keywordsInput" class="active">Keywords</label>
				</div>
			</div>
					
			<div class="row">
				<div class="input-field col l8 m8 s8">
					<input type="text" id="copiasInput" v-model="book.copias_total">
					<label for="copiasInput" class="active">Copias Totales</label>
				</div>
			</div>

		</form>
		<div class="row" id="botones">
			<div class="col l4 offset-l1">
				<button class="btn" v-on:click="createBook">Finalizar</button>
			</div>
			<div class="col l6">
				<button class="btn">Cancelar</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'form',
		data() {
			return{
				book : {
					titulo: '',
					genero: '',
					autor: '',
					publicacion: '',
					editorial: '',
					descripcion: '',
					keywords: [],
					copias_total: 0,
					copias_disponible: 0,
					prestado: 0
				},
				keywordsRaw : ''

			}
		},
		methods : {
			createBook(){
				this.book.keywords = this.keywordsRaw.split(',');
				this.book.copias_disponible=this.book.copias_total;
				this.$http.post('http://localhost:8000/books/create',this.book).then((response)=>{
					alert('Libro creado con exito!');
				});
			}
		}
	}
</script>

<style scoped>
	#tituloContainer{
		margin-bottom: 10px;
	}

	#botones{
		margin-bottom: 1px;
	}

	h4{
		margin-left: 37%;
		margin-bottom: 10px;
	}
	#formRoot{
		height: 80vh;
	}

	.row{
		margin-left: 25%;
	}

	form{
		display: block;
		overflow-y: scroll;
		overflow-x: hidden;
		height: 60vh;
		max-height: 100%;
		padding-top: 30px;
	}
</style>