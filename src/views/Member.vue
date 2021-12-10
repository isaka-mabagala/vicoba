<template>
    <div class="dashboard d-flex flex-column">
        <div class="header">
            <div class="d-flex align-items-center">
                <i @click="backButton()" class="icofont-circled-left icofont-2x back-btn c-pointer"></i>
                <h4 class="ml-2 header-title"> Wanachama </h4>
            </div>
        </div>
        <div class="dashboard-main-wrapper d-flex animate__fadeIn">
            <div class="dashboard-content container-fluid nice-scroll">
                <div class="page">
                    <div class="card border-none">
                        <div class="card-header">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h4 class="card-header-title">Wanachama: {{members.length}}</h4>
                                </div>
                                <div class="col-auto">
                                    <button class="btn btn-sm btn-white" @click="pageModal('MemberRegister')">Sajiri</button>
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive mb-0">
                            <table class="table table-sm card-table">
                                <thead>
                                    <tr class="text-secondary">
                                        <th>Majina kamili</th>
                                        <th>Namba ya simu</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(member, index) in members" :key="member">
                                        <td>{{member.f_name}} {{member.s_name}}</td>
                                        <td>{{member.phone}}</td>
                                        <td class="text-right" width="70px">
                                            <div class="dropdown">
                                                <a href="#" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true">
                                                    <i class="icofont-plus-circle"></i>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right">
                                                    <router-link class="dropdown-item" :to="{ name: 'member-record', params: { index: index } }">Rekodi</router-link>
                                                    <span class="dropdown-item c-pointer" @click="pageModal('MemberEdit'), memberIndex = index">Rekebisha</span>
                                                    <span class="dropdown-item c-pointer" data-toggle="modal" data-target="#page-modal-delete" @click="memberIndex = index">Futa</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- modal -->
            <div class="modal fade" id="page-modal" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div v-if="MemberRegister" class="modal-body">
                            <MemberRegister v-bind:members="members"/>
                        </div>
                        <div v-if="MemberEdit" class="modal-body">
                            <MemberEdit v-bind:members="members" v-bind:index="memberIndex"/>
                        </div>
                    </div>
                </div>
            </div>
            <!-- modal end -->
            <!-- modal delete -->
            <div class="modal fade" id="page-modal-delete" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div v-if="members.length" class="modal-body text-danger">
                            {{members[memberIndex].f_name}} {{members[memberIndex].s_name}},
                            atafutwa uwanachama pamoja na rekodi zake zote.
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-sm btn-secondary" data-dismiss="modal">Sitisha</button>
                            <button class="btn btn-sm btn-danger" @click="deleteMember()">Futa</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- modal delete end -->
        </div>
        <Copyright/>
    </div>
</template>

<script>
    import $ from 'jquery'
    import Copyright from '../components/Copyright'
    import MemberRegister from '../components/MemberRegister'
    import MemberEdit from '../components/MemberEdit'
	
	export default {
		name: 'Member',

        components: { Copyright, MemberRegister, MemberEdit },

        data() {
            return {
                members: [],
                MemberRegister: false,
                MemberEdit: false,
                memberIndex: 0
            }
        },

        created() {
            this.$eventHub.$on('getMembers', () => {
                this.getMembers()
            })
        },

        mounted() {

            this.getMembers()
        },

        methods: {

            getMembers() {
                this.$localForage.getItem('member').then((value) => {
                    if(value != null) {
                        this.members = value

                        this.members.sort((a, b) => {
                            var nameA = a.f_name+a.s_name
                            var nameB = b.f_name+b.s_name

                            var textA = nameA.toUpperCase()
                            var textB = nameB.toUpperCase()

                            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
                        })
                    }
                })
            },

            deleteMember() {
                this.members.splice(this.memberIndex, 1)
                this.memberIndex = 0

                this.$localForage.setItem('member', this.members).then(() => {
                    this.$toastr.success('mwanachama amefutwa kikamilifu')
                    $('#page-modal-delete').modal('hide')
                })
            },

            pageModal(modal) {

                this.MemberRegister = false
                this.MemberEdit = false

                $('#page-modal').modal()
                switch(modal) {
                    case 'MemberRegister': this.MemberRegister = true
                    break

                    case 'MemberEdit': this.MemberEdit = true
                    break
                }
            },

            backButton() {
                let path = this.$routerHistory.previous().path
                this.$router.push(path)
            }
        }
	}

</script>