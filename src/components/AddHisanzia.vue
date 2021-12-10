<template>
    <form @submit="onSubmit">
        <div class="form-group row">
            <label class="col-2 col-form-label text-right">Hisa</label>
            <div class="col-10">
                <input type="number" class="form-control form-control-sm" :value="count" @input="count = $event.target.value" required>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-10 offset-2">
                <button type="button" class="btn btn-sm btn-secondary mx-2" @click="formReset()" data-dismiss="modal">Funga</button>
                <button type="submit" class="btn btn-sm btn-success mx-2">Hifadhi</button>
            </div>
        </div>
    </form>
</template>

<script>
    import $ from 'jquery'
	
	export default {
		name: 'AddHisanzia',

        props: ['index'],

        data() {
            return {
                count: null,
                option: {}
            }
        },

        mounted() {
            this.appOption()
        },

        methods: {

            onSubmit(e) {
                e.preventDefault()

                let d = Date.now()
                let count = this.count
                let amount = (this.option.amount * count)

                let data = {"date":d, "count":count, "amount":amount}

                this.$localForage.getItem('member').then((value) => {
                    value[this.index].hisanzia.push(data)

                    this.$localForage.setItem('member', value).then(() => {
                        this.$eventHub.$emit('getHisanzia')
                        $('#page-modal').modal('hide')
                        this.formReset()
                    })
                })
            },

            appOption() {
                this.$localForage.getItem('option').then((value) => {
                    this.option = value
                })
            },

            formReset() {
                this.count = null
            }
        }
	}
</script>