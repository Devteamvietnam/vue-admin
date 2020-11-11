<template>
<div class="account-settings-info-view">
    <a-row :gutter="12">
        <a-col :md="12" :lg="16">
            <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item ref="fullname" prop="fullname"> {{$t('base.fullname')}}
                    <a-input allow-clear v-model="form.fullname" @blur="() => { $refs.fullname.onFieldBlur();}">
                    </a-input>
                </a-form-model-item>
                <a-form-model-item prop="city"> {{$t('base.city')}}
                    <a-select allow-clear v-model="form.city" placeholder="Please select your city">
                        <a-select-option v-for="item in items" :key="item" :value="item">
                            {{ item }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item required prop="date"> {{$t('base.birthdate')}}
                    <a-date-picker v-model="form.date" type="date" placeholder="Pick a birthdate" style="width: 100%;" />
                </a-form-model-item>
                <a-form-model-item ref="address" prop="address"> {{$t('base.address')}}
                    <a-input allow-clear v-model="form.address" @blur="() => { $refs.address.onFieldBlur();}" />
                </a-form-model-item>
                <a-form-model-item ref="gender" prop="gender"> {{$t('base.gender')}}
                    <a-select allow-clear v-model="form.gender" placeholder="Please select your gender">
                        <a-select-option v-for="gender in genders" :key="gender" :value="gender">
                            {{ gender }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item ref="phonenumber" prop="phonenumber"> {{$t('base.phonenumber')}}
                    <a-input v-model="form.phonenumber" allow-clear>
                        <a-select slot="addonBefore" style="width: 70px">
                            <a-select-option v-for="phonenumber in phonenumbers" :key="phonenumber" :value="phonenumber">
                                {{ phonenumber }}
                            </a-select-option>
                        </a-select>
                    </a-input>
                </a-form-model-item>

                <a-form-model-item ref="job" prop="job"> {{$t('base.job')}}
                    <a-select allow-clear v-model="form.job" placeholder="Please select your job">
                        <a-select-option v-for="job in jobs" :key="job" :value="job">
                            {{ job }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>

                <a-form-model-item :wrapper-col="{ span: 14, offset: 1 }">
                    <a-button type="primary" @click="onSubmit">
                        Update
                    </a-button>
                    <a-button style="margin-left: 10px;" @click="resetForm">
                        Reset
                    </a-button>
                </a-form-model-item>
            </a-form-model>

        </a-col>
        <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
            <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
                <a-icon type="cloud-upload-o" class="upload-icon" />
                <div class="mask">
                    <a-icon type="plus" />
                </div>
                <img :src="option.img" />
            </div>
        </a-col>

    </a-row>

    <avatar-modal ref="modal" @ok="setavatar" />
    <div>
        <a-back-top />
        <strong style="color: rgba(64, 64, 64, 0.6)"></strong>
    </div>
</div>
</template>

<script>
import AvatarModal from './AvatarModal'
export default {
    name: 'BaseSettings',
    i18n: require('./i18n'),
    data() {
        return {
            items: ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Bạc Liêu'],
            genders: ['Male', 'Female', 'Other'],
            phonenumbers: ['+84', '+024', '+028'],
            jobs: ['IT', 'Manager', 'Planner', 'Developer'],
            preview: {},
            option: {
                img: 'https://avatars3.githubusercontent.com/u/55986641?s=460&u=2b38c969e4e0c6f56a6052112c14383408f9e2a3&v=4',
                info: true,
                size: 1,
                outputType: 'jpg',
                canScale: false,
                autoCrop: true,
                // The width and height will only take effect when the automatic screenshot is turned on
                autoCropWidth: 180,
                autoCropHeight: 180,
                fixedBox: true,
                // Turn on width and height ratio
                fixed: true,
                fixedNumber: [1, 1],
            },
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 14
            },
            form: {
                fullname: '',
                address: '',
                date: '',
                city: '',
                gender: '',
                job: '',
                phonenumber: ''
            },
            rules: {
                fullname: [{
                        required: true,
                        message: 'Please input full name',
                        trigger: 'blur'
                    },
                    {
                        min: 5,
                        max: 15,
                        message: 'Length should be 5 to 15',
                        trigger: 'blur'
                    },
                ],
                city: [{
                    required: true,
                    message: 'Please select city',
                    trigger: 'change'
                }],
                gender: [{
                    required: true,
                    message: 'Please select gender',
                    trigger: 'change'
                }],
                date: [{
                    required: true,
                    message: 'Please pick a date',
                    trigger: 'change'
                }],
                birthdate: [{
                    type: 'array',
                    required: true,
                    message: 'Please select Birthdate',
                    trigger: 'change',
                }, ],
                address: [{
                    required: true,
                    message: 'Please select Address',
                    trigger: 'change'
                }, ],
                job: [{
                    required: true,
                    message: 'Please select Job',
                    trigger: 'change'
                }, ],
                phonenumber: [{
                        required: true,
                        message: 'Please input Phone number',
                        trigger: 'blur'
                    },
                    {
                        max: 10,
                        message: 'Length should be 10 ',
                        trigger: 'blur'
                    },
                ],
            },
        }
    },
    components: {
        AvatarModal
    },
    methods: {
        setavatar(url) {
            this.option.img = url
        },
        onSubmit() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    console.log('submit!!', this.form);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.ruleForm.resetFields();
        },
    }
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
    height: 200px;
    width: 100%;
}

.ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 1.4rem;
        padding: 0.5rem;
        background: rgba(222, 221, 221, 0.7);
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .mask {
        opacity: 0;
        position: absolute;
        background: rgba(0, 0, 0, 0.4);
        cursor: pointer;
        transition: opacity 0.4s;

        &:hover {
            opacity: 1;
        }

        i {
            font-size: 2rem;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -1rem;
            margin-top: -1rem;
            color: #d6d6d6;
        }
    }

    img,
    .mask {
        width: 100%;
        max-width: 180px;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
    }
}
</style>
