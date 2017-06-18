<template>
  <div id="app">
  	<div class="container" v-if="isLogin()===false">
		<div class="row">
			<div class="col l12 m12 s12">
				<nav>
					<div class="nav-wrapper">
						<a class="brand-logo center">Biblioteca</a>
						<ul id="nav-mobile" class="right">
							<li><button v-on:click="Logout()" class="btn">Logout</button></li>
						</ul>
					</div>
				</nav>
			</div>
		</div>
		<div class="row" id="body">
			<div class="col l2 m2 s2">
				<aside id="sidebar">
				
					<div class="linkContainer" v-bind:class="{current : (isCurrentRoute()===1)}">
						<a>
						<router-link to="/books">
							<p>Libros</p>
						</router-link>
						</a>
					</div>
				
					<div class="linkContainer"  v-bind:class="{current : (isCurrentRoute()===3)}">
						<a>
							<router-link to="/books/search">
								<p>Buscar libros</p>
							</router-link>
						</a>
					</div>

					<div class="linkContainer" v-bind:class="{current : (isCurrentRoute()===4)}">
						<a>
							<router-link to="/books/borrowed">
								<p>Libros Prestados</p>
							</router-link>
						</a>
					</div>	
				</aside>
			</div>
			<div class="col l10 m10 s10" id="contentRender">
				<router-view></router-view>
			</div>
		</div>
	</div>		
  	<div v-if="isLogin()===true">
  		<router-view></router-view>
  	</div>
  </div>

</template>

<script>
	export default {
	  name: 'app',
	  data(){
	  	return {
	  		Selected : false
	  	}
	  },
	  methods : {
	  	isCurrentRoute(){
	  		switch(this.$route.path){
	  			case '/books': return 1; break;
	  			case '/books/create': return 2; break;
	  			case '/books/search': return 3; break;
	  			case '/books/borrowed': return 4; break;
	  		}
	  	},
	  	isLogin(){
	  		if(this.$route.path==='/login'){
	  			return true;
	  		}else{
	  			return false;
	  		}
	  	},
	  	Logout(){
	  		this.$http.put('http://localhost:8000/logout').then((response)=>{
	  			this.$router.push('/login');
	  		});
	  	}
	  }
	}
</script>


<style>
	#sidebar{
		text-align: center;
		height: 80vh;
		background-color: #327A41;
		font-size: 2vh; 
		filter: saturate(100%);
		padding-top: 30%;
		border: 2px solid #184223;
		width: 12vw;
	}

	#app{
		margin-top: 10px;
		height:100vh;
		width: 100vw;
	}

	.container{
		width: 80vw;
	}

	.current{
		background-color: darkgreen;
	}

	#contentRender{
		height: 80vh;
		width: 67.2vw;
		border: 2px #171717 solid;
		background-color: #f2f2f2;
		padding: 0;
	}
	
	router-link{
		background-color: #462E22;
	}

	*{
		font-family: 'Roboto', sans-serif;
	}
	body{
		
		background-image: url('./books.jpg');
		font-family: "Roboto";
	}

	nav{
		background-color: #743B2F;
		font-size: 5vh;
		width:80vw;
		box-shadow: 1px 1px 10px black;
		border: 2px solid #3D1E19;
	}

	a{
		color: white;
		height: 100%;
		margin-top: 0px;
		margin-bottom: 0px;
	}

	hr{
		margin-top: 0;
		margin-bottom: 0;
	}
	
	.btn{
		background-color: #327A41;
	}

	.btn:hover{
		background-color: #006400;
		transition: background-color 0.3s ease-in-out;
	}

	.linkContainer{
		height: 10%;
		text-align: center;
		padding-top: 3px;
		border: 1px solid darkgreen;
	}

	.linkContainer:hover{
		background-color: darkgreen;
		transition: background-color 0.3s ease-in-out;
	}

	router-link>p{
		margin-top: 0;
		margin-bottom: 0;
	}

	#nav-mobile{
		margin-right: 10px;
		padding-bottom: 10px;
	}
</style>
