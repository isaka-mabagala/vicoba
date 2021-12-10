<template>
    <form @submit="onSubmit">
        <div class="form-group row">
            <label class="col-2 col-form-label text-right">Kiasi</label>
            <div class="col-10">
                <input type="number" class="form-control form-control-sm" :value="amount" @input="amount = $event.target.value" required>
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
		name: 'AddJamii',

        props: ['index'],

        data() {
            return {
                amount: null
            }
        },

        methods: {

            onSubmit(e) {
                e.preventDefault()

                let d = Date.now()
                let amount = this.amount

                let data = {"date":d, "amount":amount}

                this.$localForage.getItem('member').then((value) => {
                    value[this.index].jamii.push(data)

                    this.$localForage.setItem('member', value).then(() => {
                        this.$eventHub.$emit('getJamii')
                        $('#page-modal').modal('hide')
                        this.formReset()
                    })
                })
            },

            formReset() {
                this.amount = null
            }
        }
	}
</script>