<template>
    <div>
        <div class="card border-none">
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="col">
                        Hisanzia: {{totalHisanzia | currency}}
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-sm btn-white" @click="pageModal('addHisanzia')">Ongeza</button>
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
                        <tr v-for="(item, index) in hisanzia" :key="item">
                            <td>{{item.date | dateFormat('dd-mm-yyyy')}}</td>
                            <td>{{item.count}}</td>
                            <td>{{item.amount | currency}}</td>
                            <td class="text-right">
                                <button class="btn btn-sm btn-danger" @click="deleteHisanzia(index)">Futa</button>
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
                    <div v-if="addHisanzia" class="modal-body">
                        <AddHisanzia v-bind:index="index"/>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal end -->
    </div>
</template>

<script>
    import $ from 'jquery'
    import AddHisanzia from '../components/AddHisanzia'
	
	export default {
		name: 'Hisanzia',

        components: { AddHisanzia },

        props: ['index'],

        data() {
            return {
                hisanzia: [],
                totalHisanzia: 0,
                addHisanzia: false
            }
        },

        created() {
            this.$eventHub.$on('getHisanzia', () => {
                this.getHisanzia()
            })
        },

        mounted() {
            this.getHisanzia()
        },

        methods: {

            getHisanzia() {
                this.$localForage.getItem('member').then((value) => {
                    if(value != null) {
                        this.hisanzia = value[this.index].hisanzia
                        this.totalAmount()
                    }
                })
            },

            totalAmount() {
                this.totalHisanzia = 0

                this.$localForage.getItem('member').then((value) => {
                    if(value != null) {
                        this.hisanzia = value[this.index].hisanzia

                        this.hisanzia.forEach(value => {
                            this.totalHisanzia += parseInt(value.amount)
                        })
                    }
                })
            },

            deleteHisanzia(index) {
                
                this.$localForage.getItem('member').then((value) => {
                    if(value != null) {
                        let hisanzia = value[this.index].hisanzia
                        hisanzia.splice(index, 1)

                        this.$localForage.setItem('member', value).then(() => {
                            this.getHisanzia()
                        })
                    }
                })
            },

            pageModal(modal) {

                this.addHisanzia = false

                $('#page-modal').modal()
                switch(modal) {
                    case 'addHisanzia': this.addHisanzia = true
                    break
                }
            }
        }
	}
</script>