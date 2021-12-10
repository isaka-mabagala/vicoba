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
		name: 'LoanPayment',

        props: ['index'],

        data() {
            return {
                amount: null,
                rate: null,
                option: {}
            }
        },

        mounted() {
            this.appOption()
        },

        methods: {

            onSubmit(e) {
                e.preventDefault()

                this.$localForage.getItem('member').then((value) => {
                    var loan = value[this.index].loan
                    var payment = value[this.index].loan.payment

                    var d = Date.now()
                    var amount = this.amount
                    var rate = this.option.rate
                    var remain = 0

                    if(payment.length) {
                        let last = (payment.length - 1)
                        remain = (payment[last].remain - amount)
                        remain = remain + ((remain / 100) * rate)
                        remain = remain.toFixed(0)
                    }
                    else {
                        remain = ((parseInt(loan.amount) + parseInt(loan.interest)) - amount)
                        remain = remain + ((remain / 100) * rate)
                        remain = remain.toFixed(0)
                    }

                    let data = {"date":d, "amount":amount, "remain":remain}
                    payment.push(data)

                    this.$localForage.setItem('member', value).then(() => {
                        this.$eventHub.$emit('getLoan')
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
                this.amount = null
            }
        }
	}
</script>