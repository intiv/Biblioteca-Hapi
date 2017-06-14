<template>
	<div id="menuRoot">
		<table>
			<colgroup>
				<col style="width:10%">
				<col style="width:10%">
				<col style="width:10%">
				<col style="width:3%">
				<col style="width:10%">
				<col style="width:21%">
				<col style="width:10%">
				<col style="width:3%">
				<col style="width:3%">
				<col style="width:10%">
				<col style="width:10%">
			</colgroup>
			<thead>
				<tr>
					<th>Titulo</th>
					<th>Genero</th>
					<th>Autor</th>
					<th>Año Publicacion</th>
					<th>Editorial</th>
					<th>Descripcion</th>
					<th>Keywords</th>
					<th>Copias Totales</th>
					<th>Copias Disponibles</th>
					<th v-if="!prestados">Prestar</th>
					<th v-if="!prestados">Borrar</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="book in books" :key="$route">
					<td>{{book.titulo}}</td>
					<td>{{book.genero}}</td>
					<td>{{book.autor}}</td>
					<td>{{book.publicacion}}</td>
					<td>{{book.editorial}}</td>
					<td>{{book.descripcion}}</td>
					<td>{{book.keywords}}</td>
					<td>{{book.copias_total}}</td>
					<td>{{book.copias_disponible}}</td>
					<td v-if="!prestados"><button v-on:click="borrowBook(book._id)">Prestar</button></td>
					<td v-if="!prestados"><button v-on:click="deleteBook(book._id)">Borrar</button></td>
				</tr>
			</tbody>
		</table>
		<div class="row">
			<div class="col l4 push-l3">
				<router-link to="/books/create" v-if="!prestados">
					<button class="btn">Agregar Libro</button>
				</router-link>
			</div>
			<div class="col l4 push-l2">
				<button id="show-modal" v-on:click="showModal = true" class="btn">Buscar Libro</button>
			</div>
		</div>
		<modal v-if="showModal" @close="showModal = false">
			
		</modal>
	</div>
</template>

<script>
	import Modal from './ModalTest.vue'
	export default{
		name: 'tabla',
		data() {
			return {
				books: [],
				prestados: false,
				showModal: false
			}
		},
		methods : {
			getBooks(){
				this.$http.get('http://localhost:8000/books').then((response)=>{
					this.books=response.body;
				});
			},
			borrowBook(id){
				this.$http.put('http://localhost:8000/books/borrowbook/'+id).then((response)=>{
					this.getBooks();
				});

			},
			deleteBook(id){
				this.$http.delete('http://localhost:8000/books/delete/'+id).then((response)=>{
					this.getBooks();
				});
			},
			getBorrowedBooks(){
				this.$http.get('http://localhost:8000/books/borrowed').then((response)=>{
					this.books=response.body;
				});
			}
		},
		
		/*watch : {
			this.$route.path : function(val){
				location.reload();
			}
		},*/
		components : {
			Modal
		},
		beforeMount(){
			if(this.$route.path==='/books'){
				this.prestados=false;
			}else if(this.$route.path==='/books/borrowed'){
				this.prestados=true;
			}
			if(!this.prestados){
				this.getBooks();
			}else{
				this.getBorrowedBooks();
			}
		}
	}
</script>

<style scoped>
	table{
		max-height: 100% !important;
		height: 70vh;
		width: 66.25vw;
		overflow-y: scroll;
		overflow-x: auto;
		display: block;
		border: none;
		font-size: 2vh;
	}
	
	th,td{
		border: 1px solid black;
		border-collapse: collapse;
	}

	th{
		text-align: center;
		filter: saturate(40%);
		
		border: 2px solid black;
	}

	thead{
		background-color: lightgrey;
	}

	td{
		text-align: left;
	}

	tbody{
		overflow-y: scroll;
	}

	#menuRoot{
		width: 100%;
	}

	.btn{
		background-color: #327A41;
		margin-left: 3px;
		margin-top: 15px;
	}

	.btn:hover{
		background-color: #006400;
		transition: background-color 0.3s ease-in-out;
	}
	
</style>