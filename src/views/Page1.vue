<template>
	<div class="dashboard d-flex flex-column">
        <div class="header">
            <div class="d-flex align-items-center">
                <i @click="backButton()" class="icofont-circled-left icofont-2x back-btn c-pointer"></i>
                <h4 class="ml-2 header-title"> PAGE 1 </h4>
            </div>
        </div>
        <div class="dashboard-main-wrapper d-flex animate__fadeIn">
            <!---------------------- template left navbar ---------------------->
            <nav id="nav-left-sidebar" class="nav-left-sidebar d-flex flex-column">
                <ul class="nav flex-column h-100 nice-scroll">                 
                    <li class="nav-item active c-pointer my-1 mr-1">
                        <span class="nav-link">Link 1</span>
                    </li>
                    <li class="nav-item c-pointer my-1 mr-1">
                        <span class="nav-link">Link 2</span>
                    </li>
                </ul>
            </nav>
            <div class="dashboard-wrapper">
                <!---------------------- template dashboard-content ---------------------->
                <div class="dashboard-content container-fluid nice-scroll">
                    <div class="page">
                        <div class="text-center my-6 text-muted">
                            <!--  -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Copyright/>
	</div>
</template>

<script>
    import $ from 'jquery'
    import Copyright from '../components/Copyright'


	export default {
		name: 'Page1',

        components: { Copyright },

        mounted() {

            $(".nav-item").on("click", function() { // menu link
                $(".nav-item").removeClass('active')
                $(this).addClass('active')
            })
        },

		methods: {
            
            backButton() {
                let path = this.$routerHistory.previous().path
                this.$router.push(path)
            }
        }
	}

</script>
