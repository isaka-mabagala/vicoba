<template>
	<div id="app">
        <router-view/>
	</div>
</template>

<script>

    export default {
        name: 'App',

        created() {
            
            this.$localForage.config({ // config app data storage
                name: 'sync-drive'
            })
        },

        mounted() {
            this.option()
        },

        methods: {

            goHome() { // redirect to home page
                let path = this.$router.currentRoute.path

                if(path === '/index.html') {
                    this.$router.push('/')
                }
            },

            option() { // store options
                this.$localForage.getItem('option').then((value) => {
                    if(value === null) {
                        let option = {
                            "name":"VICOBA",
                            "amount":30000,
                            "rate":2
                        }
                        this.$localForage.setItem('option', option).then(() => {
                            this.member()
                            this.$router.push('/')
                        })
                    }
                    else {
                        this.goHome()
                    }
                })
            },

            member() { // store member
                this.$localForage.getItem('member').then((value) => {
                    if(value === null) {
                        this.$localForage.setItem('member',[])
                    }
                })
            }
        }
    }

</script>