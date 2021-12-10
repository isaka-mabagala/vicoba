<template>
    <form @submit="onSubmit">
        <div class="form-group row">
            <label class="col-4 col-form-label text-right">Jina la kwanza</label>
            <div class="col-8">
                <input type="text" class="form-control form-control-sm" :value="members[index].f_name" @input="form.f_name = $event.target.value.trim()" required>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-4 col-form-label text-right">Jina la mwisho</label>
            <div class="col-8">
                <input type="text" class="form-control form-control-sm" :value="members[index].s_name" @input="form.s_name = $event.target.value.trim()" required>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-4 col-form-label text-right">Namba ya simu</label>
            <div class="col-8">
                <input type="text" class="form-control form-control-sm" :value="members[index].phone" @input="form.phone = $event.target.value" pattern="\d*" minlength="10" maxlength="10" required>
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
		name: 'MemberEdit',

        props: ['members', 'index'],

        data() {
            return {
                form: {}
            }
        },

        methods: {

            onSubmit(e) {
                e.preventDefault()

                if(this.form.f_name) {
                    this.members[this.index].f_name = this.form.f_name
                }
                if(this.form.s_name) {
                    this.members[this.index].s_name = this.form.s_name
                }
                if(this.form.phone) {
                    this.members[this.index].phone = this.form.phone
                }

                this.$localForage.setItem('member', this.members).then(() => {
                    this.$eventHub.$emit('getMembers')
                    this.formReset()
                    $('#page-modal').modal('hide')
                })
            },

            formReset() {
                this.form = []
            }
        }
	}
</script>