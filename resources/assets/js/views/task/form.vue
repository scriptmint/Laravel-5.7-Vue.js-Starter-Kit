<template>
    <form @submit.prevent="proceed">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="">Title</label>
                    <input class="form-control" type="text" value="" v-model="taskForm.title">
                </div>
                <div class="form-group" v-if="id">
                    <label for="">Progress ({{taskForm.progress}}%)</label><br />
                    <range-slider class="slider" min="0" max="100" step="1" v-model="taskForm.progress" @change="sliderChange"></range-slider>
                </div>
                <div class="form-group">
                    <label for="">Start Date</label>
                    <datepicker v-model="taskForm.start_date" :bootstrapStyling="true"></datepicker>
                </div>
                <div class="form-group">
                    <label for="">Due Date</label>
                    <datepicker v-model="taskForm.due_date" :bootstrapStyling="true"></datepicker>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="">Description</label>
                    <textarea class="form-control" type="text" value="" v-model="taskForm.description" rows="10"></textarea>
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-info waves-effect waves-light m-t-10">
            <span v-if="id">Update</span>
            <span v-else>Save</span>
        </button>
        <router-link to="/task" class="btn btn-danger waves-effect waves-light m-t-10" v-show="id">Cancel</router-link>
    </form>
</template>


<script>
    import datepicker from 'vuejs-datepicker'
    import RangeSlider from 'vue-range-slider'
    import 'vue-range-slider/dist/vue-range-slider.css'
    import helper from '../../services/helper'

    export default {
        data() {
            return {
                taskForm: new Form({
                    'title' : '',
                    'description' : '',
                    'start_date' : '',
                    'due_date' : '',
                    'progress' : 0
                })
            };
        },
        components : { datepicker,RangeSlider },
        props: ['id'],
        mounted() {
            if(this.id)
                this.getTasks();
        },
        methods: {
            sliderChange(value){
                this.taskForm.progress = value;
            },
            proceed(){
                this.taskForm.start_date = moment(this.taskForm.start_date).format('YYYY-MM-DD');
                this.taskForm.due_date = moment(this.taskForm.due_date).format('YYYY-MM-DD');
                if(this.id)
                    this.updateTask();
                else
                    this.storeTask();
            },
            storeTask(){
                this.taskForm.post('/api/task')
                .then(response => {
                    toastr['success'](response.message);
                    this.$emit('completed',response.task)
                })
                .catch(response => {
                    toastr['error'](response.message);
                });
            },
            getTasks(){
                axios.get('/api/task/'+this.id)
                .then(response => {
                    this.taskForm.title = response.data.title;
                    this.taskForm.description = response.data.description;
                    this.taskForm.start_date = response.data.start_date;
                    this.taskForm.due_date = response.data.due_date;
                    this.taskForm.progress = response.data.progress;
                })
                .catch(response => {
                    toastr['error'](response.message);
                });
            },
            updateTask(){
                this.taskForm.patch('/api/task/'+this.id)
                .then(response => {
                    if(response.type == 'error')
                        toastr['error'](response.message);
                    else {
                        this.$router.push('/task');
                    }
                })
                .catch(response => {
                    toastr['error'](response.message);
                });
            }
        }
    }
</script>
<style>
    .slider{
        width: 100%;
    }
</style>
