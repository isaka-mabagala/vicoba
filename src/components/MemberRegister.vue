<template>
    <form @submit="onSubmit">
        <div class="form-group row">
            <label class="col-4 col-form-label text-right">Jina la kwanza</label>
            <div class="col-8">
                <input type="text" class="form-control form-control-sm" :value="form.f_name" @input="form.f_name = $event.target.value.trim()" required>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-4 col-form-label text-right">Jina la mwisho</label>
            <div class="col-8">
                <input type="text" class="form-control form-control-sm" :value="form.s_name" @input="form.s_name = $event.target.value.trim()" required>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-4 col-form-label text-right">Namba ya simu</label>
            <div class="col-8">
                <input type="text" class="form-control form-control-sm" :value="form.phone" @input="form.phone = $event.target.value" pattern="\d*" minlength="10" maxlength="10" required>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-8 offset-4">
                <button type="button" class="btn btn-sm btn-secondary mx-2" @click="formReset()" data-dismiss="modal">Funga</button>
                <button type="submit" class="btn btn-sm btn-success mx-2">Hifadhi</button>
            </div>
        </div>
    </form>
</template>

<script>
    import $ from 'jquery'
	
	export default {
		name: 'MemberRegister',

        props: ['members'],

        data() {
            return {
                form: []
            }
        },

        methods: {

            onSubmit(e) {
                e.preventDefault()

                let f_name = this.form.f_name
                let s_name = this.form.s_name
                let phone = this.form.phone

                let data = {"id":Date.now(), "f_name":f_name, "s_name":s_name, "phone":phone, "hisanzia":[], "hisa":[], "jamii":[],
                            "loan":{"amount":null, "interest":null, "date":null, "payment":[]}
                        }
                this.members.push(data)

                this.$localForage.setItem('member', this.members).then(() => {
                    this.$toastr.success('mwanachama kasajiriwa kikamilifu')
                    this.formReset()
                    this.$eventHub.$emit('getMembers')
                    $('#page-modal').modal('hide')
                })
            },

            formReset() {
                this.form = []
            }
        }
	}
</script>