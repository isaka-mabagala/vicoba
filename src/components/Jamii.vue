<template>
    <div>
        <div class="card border-none">
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="col">
                        Jamii: {{totalJamii | currency}}
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-sm btn-white" @click="pageModal('addJamii')">Ongeza</button>
                    </div>
                </div>
            </div>

            <div class="table-responsive mb-0">
                <table class="table table-sm card-table">
                    <thead>
                        <tr class="text-secondary">
                            <th>Tarehe</th>
                            <th>kiasi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in jamii" :key="item">
                            <td>{{item.date | dateFormat('dd-mm-yyyy')}}</td>
                            <td>{{item.amount | currency}}</td>
                            <td class="text-right">
                                <button class="btn btn-sm btn-danger" @click="deleteJamii(index)">Futa</button>
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
                    <div v-if="addJamii" class="modal-body">
                        <AddJamii v-bind:index="index"/>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal end -->
    </div>
</template>

<script>
    import $ from 'jquery'
    import AddJamii from '../components/AddJamii'
    
    export default {
        name: 'Jamii',

        components: { AddJamii },

        props: ['index'],

        data() {
            return {
                jamii: [],
                totalJamii: 0,
                addJamii: false
            }
        },

        created() {
            this.$eventHub.$on('getJamii', () => {
                this.getJamii()
            })
        },

        mounted() {
            this.getJamii()
        },

        methods: {

            getJamii() {
                this.$localForage.getItem('member').then((value) => {
                    if(value != null) {
                        this.jamii = value[this.index].jamii
                        this.totalAmount()
                    }
                })
            },

            totalAmount() {
                this.totalJamii = 0

                this.$localForage.getItem('member').then((value) => {
                    if(value != null) {
                        this.jamii = value[this.index].jamii

                        this.jamii.forEach(value => {
                            this.totalJamii += parseInt(value.amount)
                        })
                    }
                })
            },

            deleteJamii(index) {
                
                this.$localForage.getItem('member').then((value) => {
                    if(value != null) {
                        let jamii = value[this.index].jamii
                        jamii.splice(index, 1)

                        this.$localForage.setItem('member', value).then(() => {
                            this.getJamii()
                        })
                    }
                })
            },

            pageModal(modal) {

                this.addJamii = false

                $('#page-modal').modal()
                switch(modal) {
                    case 'addJamii': this.addJamii = true
                    break
                }
            }
        }
    }
</script>