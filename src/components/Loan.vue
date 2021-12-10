<template>
    <div>
        <div class="card border-none">
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="ml-auto">
                        <button class="btn btn-sm btn-danger mr-2" data-toggle="modal" data-target="#page-modal-delete" :disabled="!loan.amount">Futa</button>
                        <button class="btn btn-sm btn-white ml-2" :disabled="loan.amount" @click="pageModal('addLoan')">Kopa</button>
                    </div>
                </div>
            </div>
            <div v-if="loan.amount" class="card-header">
                <div class="row align-items-center">
                    <div class="mr-auto">
                        <p>Mkopo: {{loan.amount | currency}}</p>
                        <p>Riba: {{loan.interest | currency}}</p>
                        <p>Marejesho: {{repayment | currency}}</p>
                    </div>
                    <div class="ml-auto text-center">
                        <p>Tarehe</p>
                        <p>{{loan.date | dateFormat('dd-mm-yyyy')}}</p>
                    </div>
                </div>
            </div>
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="mr-auto">
                        <h5>Marejesho</h5>
                    </div>
                    <div class="ml-auto">
                        <button class="btn btn-sm btn-white" :disabled="!loan.amount" @click="pageModal('loanPayment')">Rejesho</button>
                    </div>
                </div>
            </div>

            <div class="table-responsive mb-0">
                <table class="table table-sm card-table">
                    <thead>
                        <tr class="text-secondary">
                            <th>Tarehe</th>
                            <th>Kiasi</th>
                            <th>Baki</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in loan.payment" :key="item">
                            <td>{{item.date | dateFormat('dd-mm-yyyy')}}</td>
                            <td>{{item.amount | currency}}</td>
                            <td>{{item.remain | currency}}</td>
                            <td class="text-right">
                                <button class="btn btn-sm btn-danger" @click="deletePayment(index)">Futa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- modal -->
        <div class="modal fade" id="page-modal" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div v-if="addLoan" class="modal-body">
                        <AddLoan v-bind:index="index"/>
                    </div>
                    <div v-if="loanPayment" class="modal-body">
                        <LoanPayment v-bind:index="index"/>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal end -->
        <!-- modal delete -->
        <div class="modal fade" id="page-modal-delete" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body text-danger">
                        Mkopo utafutwa pamoja ma marejesho yake yote.
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-secondary" data-dismiss="modal">Sitisha</button>
                        <button class="btn btn-sm btn-danger" @click="deleteLoan()">Futa</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal delete end -->
    </div>
</template>

<script>
    import $ from 'jquery'
    import AddLoan from '../components/AddLoan'
    import LoanPayment from '../components/LoanPayment'
    
    export default {
        name: 'Loan',

        components: { AddLoan, LoanPayment },

        props: ['index'],

        data() {
            return {
                loan: {},
                repayment: 0,
                addLoan: false,
                loanPayment: false
            }
        },

        created() {
            this.$eventHub.$on('getLoan', () => {
                this.getLoan()
            })
        },

        mounted() {
            this.getLoan()
        },

        methods: {

            getLoan() {
                this.$localForage.getItem('member').then((value) => {
                    if(value != null) {
                        this.loan = value[this.index].loan
                        this.totalLoan()
                    }
                })
            },

            totalLoan() {

                this.$localForage.getItem('member').then((value) => {
                    if(value != null) {
                        let loan = value[this.index].loan

                        this.repayment = parseInt(loan.amount) + parseInt(loan.interest)
                    }
                })
            },

            deleteLoan() {
                
                this.$localForage.getItem('member').then((value) => {
                    if(value != null) {
                        let loan = value[this.index].loan
                        loan.amount = null
                        loan.interest = null
                        loan.date = null
                        loan.payment = []

                        this.$localForage.setItem('member', value).then(() => {
                            this.getLoan()
                            $('#page-modal-delete').modal('hide')
                        })
                    }
                })
            },

            deletePayment(index) {
                
                this.$localForage.getItem('member').then((value) => {
                    if(value != null) {
                        let payment = value[this.index].loan.payment
                        payment.splice(index, 1)

                        this.$localForage.setItem('member', value).then(() => {
                            this.getLoan()
                        })
                    }
                })
            },

            pageModal(modal) {

                this.addLoan = false
                this.loanPayment = false

                $('#page-modal').modal()
                switch(modal) {
                    case 'addLoan': this.addLoan = true
                    break

                    case 'loanPayment': this.loanPayment = true
                    break
                }
            }
        }
    }
</script>