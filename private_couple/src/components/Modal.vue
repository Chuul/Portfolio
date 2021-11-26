<template>
    <div class="container-fluid">
        <button class="btn btn-primary btn-space" @click="frmCreateAccountPopup.show(true)">
            Create Account
        </button>
        <!-- Create Account form -->
        <wj-popup id="frmCreateAccountPopup" :initialized="initForm">
            <form @submit.prevent="onSubmit(frmCreateAccountPopup)">
                <h4 class="modal-header">
                    Create Account
                    <button type="button" tabindex="-1" class="close wj-hide">&times;</button>
                </h4>
                <div class="modal-body">
                    <label>
                        Name:
                        <input class="form-control" required pattern=".{2,}" title="Please enter 2 characters or more." />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input class="form-control" type="email" required />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input name="pswdFrmCreate" class="form-control" type="password" required pattern=".{4,}"
                            v-model="pw1" title="Please enter 4 characters or more." />
                    </label>
                    <br />
                    <label>
                        Confirm Password:
                        <input class="form-control" name="cnfrmPswdFrmCreate" v-model="pw2" type="password" required
                            validateEqual="pswdFrmCreate"/>
                        <small
                            :hidden="cnfrmPswdFrmCreateValid">
                            Passwords don't match.
                        </small>
                    </label>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" type="submit">
                        Create Account
                    </button>
                </div>
            </form>
        </wj-popup>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                pw1: '',
                pw2: '',
                pw3: '',
                pw4: '',
                isRemember: false,
                frmLoginPopup: {},
                frmCreateAccountPopup: {},
                frmEditAccountPopup: {},
                cnfrmPswdFrmEditValid: true,
                cnfrmPswdFrmCreateValid: true
            }
        },
        methods: {
            initForm: function(popup){
                this[popup.hostElement.id] = popup;
            },
            onSubmit: function(popup){
                alert('form submitted');
                popup.hide();
            }
        },
        watch: {
            pw2: function(){
                this.cnfrmPswdFrmCreateValid = this.pw2 != this.pw1 ? false : true;
            },
            pw4: function(){
                this.cnfrmPswdFrmEditValid = this.pw4 != this.pw3 ? false : true;
            }
        }
    })

</script>

<style>
    .modal-body {
        min-width: 300px;
    }

    input:invalid {
        border-color: red;
    }

    body {
        margin-bottom: 24pt;
    }

    .btn-space {
        margin-right: 5px !important;
    }
</style>
