<template>
	<div id="loginRoot">
		<div id="loginContainer">
			<div class="row" id="loginTitle">
				<div class="col l12 m12 s12 push-l3">
					<p>Biblioteca Hapi</p>
				</div>
			</div>
			<div class="row inputContainer">
				<div class="col l8 m8 s8 offset-l1 offset-m1 offset-s1">
					<input type="text" id="usernameInput" v-model="user.username">
					<label for="usernameInput" class="active">Username</label>
				</div>
			</div>
			<div class="row inputContainer">
				<div class="col l8 m8 s8 offset-l1 offset-m1 offset-s1">
					<input type="password" id="passwordInput" v-model="user.password">
					<label for="passwordInput" class="active">Password</label>
				</div>
			</div>
			<div class="row checkboxContainer">
				<div class="col l4 m4 s4 offset-l1 offset-m1 offset-s1 push-l2">
					<p class="checkP">
						<input type="checkbox" id="librarian">
						<label for="librarian">Librarian</label>
					</p>
				</div>
				<div class="col l4 m4 s4 offset-l1 offset-m1 offset-s1">
					<p class="checkP">
						<input type="checkbox" id="student">
						<label for="student">Student</label>
					</p>
				</div>
			</div>
			<div class="row buttonsContainer">
				<div class="col l4 m4 s4 offset-l1 offset-m1 push-l2">
					<button class="btn" v-on:click="login()">Login</button>
				</div>
				<div class="col l4 m4 s4 offset-l1 offset-m1">
					<button class="btn" v-on:click="register()">Register</button>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>

	export default{
		name: 'login',
		data() {
			return{
				user: {
					username: '',
					password: '',
				}
			}
		},
		methods : {
			login(){
				var User= {
					username: this.user.username,
					password: this.user.password
				}
				if(this.user.username.length>0 && this.user.password.length>0){
					this.$http.post('http://localhost:8000/login',User).then((response)=>{
						if(response.body.success===true){
							swal(
								{
									title: 'Login con exito!',
									text: 'Bienvenido a la biblioteca '+response.body.username,
									type: 'success',
									confirmButtonColor: '#327A41'
								}
							);
							this.$router.push('/books');//redirect
						}else{
							swal({
								title: 'Error',
								text: response.body.message,
								type: 'error'
							});
							this.user.username = '';
							this.user.password = '';
						}
					});
				}else{
					swal({
						title: 'Login failed!',
						text: 'Username and password are required',
						type: 'warning'
					});
				}
			},
			register(){
				var nUser = this.user;
				var scope= [];
				if($('#librarian').is(':checked')){
					scope.push('librarian');
				}
				if($('#student').is(':checked')){
					scope.push('student');
				}
				nUser.scope = scope;
				this.$http.post('http://localhost:8000/register', nUser).then((response)=>{
					if(response.body.success === true){
						swal({
							title: 'Registered!',
							text: 'User registered succesfully!',
							type: 'success'
						});
					}else{
						alert({
							title: 'Oops!',
							text: 'Registration failed',
							type: 'error'
						});
					}
				});
			}
		}
	}
</script>

<style scoped>

	#loginContainer{
		background-color: lightgrey;
		width: 50vw;
		height: 60vh;
		margin: 10% auto;
		border-radius: 5px;
	}
	
	.checkP{
		margin-top: 0px;
		margin-left: 50px;
	}
	.inputContainer{
		margin-left: 9.5vw;
		margin-bottom: 5px;
	}

	.buttonsContainer{
		margin-top: 10px;
		margin-left: 50px;

	}

	p{
		font-size: 6vh;
		margin-bottom: 0;

	}

	#loginTitle{
		width: 100%;
		margin-bottom: 0;
		margin-left: 2.5vw;

	}

	label{
		color: black;
	}

	input{
		border-bottom: 1px solid black;
		box-shadow: 0 1px 0 0 black;
		color: black;
	}

	button{
		color: black;
	}
</style>
