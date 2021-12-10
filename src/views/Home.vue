<template>
	<div class="dashboard d-flex flex-column">
        <div class="dashboard-main-wrapper animate__fadeIn">
            <div class="position-relative">
                <img class="w-100" src="../assets/images/bg.jpg" alt="background">

                <div class="bg-title d-flex align-items-center justify-content-end">
                    <div class="col-6">
                        <h1 class="title">{{ title }}</h1>
                    </div>
                </div>
            </div>
            <div class="dashboard-content container-fluid nice-scroll">
                <!---------------------- template pages ---------------------->
                <div class="page">
                    <div class="d-flex justify-content-between">
                        <div class="card border-none shadow-none bg-transparent col-5 mx-2">
                            <router-link class="mr-2" to="/member">
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <i class="icofont-users-alt-5 icofont-4x"></i>
                                        </div>
                                        <div class="col">
                                            <h3 class="text-uppercase text-muted mb-2"> Wanachama </h3>
                                            <h5 class="mb-2"> Sajili na simamia wanachama wa kikundi </h5>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div class="card border-none shadow-none bg-transparent col-5 mx-2">
                            <router-link class="mr-2" to="/setting">
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <i class="icofont-settings-alt icofont-4x"></i>
                                        </div>
                                        <div class="col">
                                            <h3 class="text-uppercase text-muted mb-2"> Mpangilio </h3>
                                            <h5 class="mb-2"> Pangilia uendeshaji wa mfumo katika kikundi </h5>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Copyright/>
	</div>
</template>

<script>
	import Copyright from '../components/Copyright'
	
	export default {
		name: 'Home',

        data() {
            return {
                title: null
            }
        },

		components: { Copyright },

        mounted() {
            this.setTitle()
        },

        methods: {

            setTitle() {
                this.$localForage.getItem('option').then((value) => {
                    if(value != null) {
                        this.title = value.name
                    }
                })
            }
        }
	}
</script>