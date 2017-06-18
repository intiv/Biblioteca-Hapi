<template>
	<div id="menuRoot" >
		<table >
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
				<col style="width:7%">
				<col style="width:7%">
				<col style="width:6%">
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
					<th v-if="!prestados">Modificar</th>
					<th v-if="!prestados">Borrar</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="book in books">
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
					<td v-if="!prestados">
						<router-link :to="'/books/modify/'+book._id">
							<button v-on:click="modifyBook(book._id)" class="blackButton">Modificar</button>
						</router-link>
					</td>
					<td v-if="!prestados"><button v-on:click="deleteBook(book._id)">X</button></td>
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
				<button id="show-modal" v-on:click="showModal = true" v-if="buscados===false" class="btn">Buscar Libros</button>
				<button id="clear-search" v-on:click="clearSearch" class="btn" v-if="buscados===true">Limpiar Busqueda</button>
			</div>
		</div>
		<modal v-if="showModal" @close="showModal = false" @searched="setTable">
			
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
				showModal: false,
				buscados: false
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
					if(response.body.success){
						swal({
							title: 'Prestamo exitoso!',
							text: 'Disfrute su libro',
							type: 'success'
						});
					}else if(response.body.success===false){
						swal({
							title: 'Prestamo fallido!',
							text: 'No se pudo realizar el prestamo',
							type: 'error'
						});
					}
					this.getBooks();
				},(response)=>{
					swal({
						title: 'Prestamo fallido',
						text: 'Solo estudiantes pueden tomar libros prestados',
						type: 'warning'
					});
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
			},
			setTable(payload){
				this.books=payload;
				this.showModal = false;
				this.buscados=true;
			},
			clearSearch(){
				this.buscados=false;
				this.getBooks();
			}
		},
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
	
	.blackButton{
		color: black;
	}
</style>