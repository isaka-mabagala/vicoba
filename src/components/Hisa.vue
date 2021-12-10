<template>
    <div>
        <div class="card border-none">
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="col">
                        Hisa: {{totalHisa | currency}}
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-sm btn-white" @click="pageModal('addHisa')">Ongeza</button>
                    </div>
                </div>
            </div>

            <div class="table-responsive mb-0">
                <table class="table table-sm card-table">
                    <thead>
                        <tr class="text-secondary">
                            <th>Tarehe</th>
                            <th>Hisa</th>
                            <th>Jumla kiasi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in hisa" :key="item">
                            <td>{{item.date | dateFormat('dd-mm-yyyy')}}</td>
                            <td>{{item.count}}</td>
                            <td>{{item.amount | currency}}</td>
                            <td class="text-right">
                                <button class="btn btn-sm btn-danger" @click="deleteHisa(index)">Futa</button>
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
                    <div v-if="addHisa" class="modal-body">
                        <AddHisa v-bind:index="index"/>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal end -->
    </div>
</template>

<script>
    import $ from 'jquery'
    import AddHisa from '../components/AddHisa'
    
    export default {
        name: 'Hisa',

        components: { AddHisa },

        props: ['index'],

        data() {
            return {
                hisa: [],
                totalHisa: 0,
                addHisa: false
            }
        },

        created() {
            this.$eventHub.$on('getHisa', () => {
                this.getHisa()
            })
        },

        mounted() {
            this.getHisa()
        },

        methods: {

            getHisa() {
                this.$localForage.getItem('member').then((value) => {
                    if(value != null) {
                        this.hisa = value[this.index].hisa
                        this.totalAmount()
                    }
                })
            },

            totalAmount() {
                this.totalHisa = 0

                this.$localForage.getItem('member').then((value) => {
                    if(value != null) {
                        this.hisa = value[this.index].hisa

                        this.hisa.forEach(value => {
                            this.totalHisa += parseInt(value.amount)
                        })
                    }
                })
            },

            deleteHisa(index) {
                
                this.$localForage.getItem('member').then((value) => {
                    if(value != null) {
                        let hisa = value[this.index].hisa
                        hisa.splice(index, 1)

                        this.$localForage.setItem('member', value).then(() => {
                            this.getHisa()
                        })
                    }
                })
            },

            pageModal(modal) {

                this.addHisa = false

                $('#page-modal').modal()
                switch(modal) {
                    case 'addHisa': this.addHisa = true
                    break
                }
            }
        }
    }
</script>