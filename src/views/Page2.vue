<template>
    <div class="dashboard d-flex flex-column">
        <div class="header">
            <div class="d-flex align-items-center">
                <i @click="backButton()" class="icofont-circled-left icofont-2x back-btn c-pointer"></i>
                <h4 class="ml-2 header-title"> PAGE 2 </h4>
            </div>
        </div>
        <div class="dashboard-main-wrapper d-flex animate__fadeIn">
            <div class="dashboard-content container-fluid nice-scroll">
                <div class="page">
                    <div class="text-center my-6 text-muted">
                        <!--  -->
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
		name: 'Page2',

        components: { Copyright },

        data() {
            return {
                username: null,
                hostname: null
            }
        },

        mounted() {
            this.username = this.$os.userInfo().username
            this.hostname = this.$os.hostname()
        },

        methods: {

            backButton() {
                let path = this.$routerHistory.previous().path
                this.$router.push(path)
            }
        }
	}

</script>