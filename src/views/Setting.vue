<template>
    <div class="dashboard d-flex flex-column">
        <div class="header">
            <div class="d-flex align-items-center">
                <i @click="backButton()" class="icofont-circled-left icofont-2x back-btn c-pointer"></i>
                <h4 class="ml-2 header-title"> Mpangilio </h4>
            </div>
        </div>
        <div class="dashboard-main-wrapper d-flex animate__fadeIn">
            <div class="dashboard-content container-fluid nice-scroll">
                <div class="page">
                    <form @submit="onSubmit">
                        <div class="form-group row">
                            <label class="col-2 col-form-label text-right">Jina la kikundi</label>
                            <div class="col-6">
                                <input type="text" class="form-control form-control-sm" :value="option.name" @input="option.name = $event.target.value.trim()" required>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label text-right">Thamani ya hisa</label>
                            <div class="col-6">
                                <input type="number" class="form-control form-control-sm" :value="option.amount" @input="option.amount = $event.target.value" required>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label text-right">Riba ya mkopo</label>
                            <div class="col-6">
                                <div class="input-group">
                                    <input type="number" class="form-control form-control-sm" :value="option.rate" @input="option.rate = $event.target.value" required>
                                    <div class="input-group-append">
                                        <span class="input-group-text">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-6 offset-2">
                                <button type="submit" class="btn btn-sm btn-success">Hifadhi</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Copyright/>
    </div>
</template>

<script>
    import Copyright from '../components/Copyright'
	
	export default {
		name: 'Member',

        components: { Copyright },

        data() {
            return {
                option: {}
            }
        },

        mounted() {
            this.getOption()
        },

        methods: {

            onSubmit(e) {
                e.preventDefault()
                var oS = this

                this.$localForage.setItem('option', oS.option).then(() => {
                    this.$toastr.success('mpangilio umehifadhiwa kikamilifu.')
                })
            },

            getOption() {
                this.$localForage.getItem('option').then((value) => {
                    if(value != null) {
                        this.option = value
                    }
                })
            },

            backButton() {
                let path = this.$routerHistory.previous().path
                this.$router.push(path)
            }
        }
	}

</script>