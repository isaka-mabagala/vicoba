<template>
	<div class="dashboard d-flex flex-column">
        <div class="header">
            <div class="d-flex align-items-center">
                <i @click="backButton()" class="icofont-circled-left icofont-2x back-btn c-pointer"></i>
                <h4 class="ml-2 header-title"> {{member.f_name}} {{member.s_name}} </h4>
            </div>
        </div>
        <div class="dashboard-main-wrapper d-flex animate__fadeIn">
            <!---------------------- template left navbar ---------------------->
            <nav id="nav-left-sidebar" class="nav-left-sidebar d-flex flex-column">
                <ul class="nav flex-column h-100 nice-scroll">                 
                    <li class="nav-item active c-pointer my-1 mr-1" @click="switchTab('hisanzia')">
                        <span class="nav-link">Hisanzia</span>
                    </li>
                    <li class="nav-item c-pointer my-1 mr-1" @click="switchTab('hisa')">
                        <span class="nav-link">Hisa</span>
                    </li>
                    <li class="nav-item c-pointer my-1 mr-1" @click="switchTab('loan')">
                        <span class="nav-link">Mkopo</span>
                    </li>
                    <li class="nav-item c-pointer my-1 mr-1" @click="switchTab('jamii')">
                        <span class="nav-link">Jamii</span>
                    </li>
                </ul>
            </nav>
            <div class="dashboard-wrapper">
                <!---------------------- template dashboard-content ---------------------->
                <div class="dashboard-content container-fluid nice-scroll">
                    <div v-if="hisanzia" class="page animate animate__fadeIn">
                        <Hisanzia v-bind:index="index"/>
                    </div>
                    <div v-if="hisa" class="page animate animate__fadeIn">
                        <Hisa v-bind:index="index"/>
                    </div>
                    <div v-if="loan" class="page animate animate__fadeIn">
                        <Loan v-bind:index="index"/>
                    </div>
                    <div v-if="jamii" class="page animate animate__fadeIn">
                        <Jamii v-bind:index="index"/>
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
    import Hisanzia from '../components/Hisanzia'
    import Hisa from '../components/Hisa'
    import Loan from '../components/Loan'
    import Jamii from '../components/Jamii'


	export default {
		name: 'MemberRecord',

        components: { Copyright, Hisanzia, Hisa, Loan, Jamii },

        data() {
            return {
                index: this.$route.params.index,
                member: {},
                hisanzia: true,
                hisa: false,
                loan: false,
                jamii: false
            }
        },

        mounted() {

            $(".nav-item").on("click", function() { // menu link
                $(".nav-item").removeClass('active')
                $(this).addClass('active')
            })

            this.getMember()
        },

		methods: {

            getMember() {
                this.$localForage.getItem('member').then((value) => {
                    if(value != null) {
                        this.member = value[this.index]
                    }
                })
            },

            switchTab(tab) {
                this.hisanzia = false
                this.hisa = false
                this.loan = false
                this.jamii = false

                switch(tab) {
                    case 'hisanzia' : this.hisanzia = true
                    break

                    case 'hisa' : this.hisa = true
                    break

                    case 'loan' : this.loan = true
                    break

                    case 'jamii' : this.jamii = true
                    break
                }
            },
            
            backButton() {
                let path = this.$routerHistory.previous().path
                this.$router.push(path)
            }
        }
	}

</script>
