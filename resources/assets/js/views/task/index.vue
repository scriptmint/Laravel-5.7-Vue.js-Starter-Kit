<template>
	<div>
        <div class="row page-titles">
            <div class="col-md-6 col-8 align-self-center">
                <h3 class="text-themecolor m-b-0 m-t-0">Task</h3>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
                    <li class="breadcrumb-item active">Task</li>
                </ol>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Add new Task</h4>
                        <task-form @completed="getTasks"></task-form>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Filter Task</h4>

                        <div class="row m-t-40">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="">Title</label>
                                    <input name="title" class="form-control" v-model="filterTaskForm.title" @blur="getTasks">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="">Status</label>
                                    <select name="status" class="form-control" v-model="filterTaskForm.status" @change="getTasks">
                                        <option value="">All</option>
                                        <option value="1">Completed</option>
                                        <option value="0">Incompleted</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="">Sort By</label>
                                    <select name="sortBy" class="form-control" v-model="filterTaskForm.sortBy" @change="getTasks">
                                        <option value="title">Title</option>
                                        <option value="start_date">Start Date</option>
                                        <option value="due_date">Due Date</option>
                                        <option value="status">Status</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="">Order</label>
                                    <select name="order" class="form-control" v-model="filterTaskForm.order" @change="getTasks">
                                        <option value="asc">Asc</option>
                                        <option value="desc">Desc</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <h4 class="card-title">Task List</h4>
                        <h6 class="card-subtitle" v-if="tasks.total">Total {{tasks.total}} result found!</h6>
                        <h6 class="card-subtitle" v-else>No result found!</h6>
                        <div class="table-responsive">
                            <table class="table" v-if="tasks.total">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Start Date</th>
                                        <th>Due Date</th>
                                        <th>Progress</th>
                                        <th>Status</th>
                                        <th>Description</th>
                                        <th style="width:180px;">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="task in tasks.data">
                                        <td v-text="task.title"></td>
                                        <td>{{ task.start_date | moment }}</td>
                                        <td>{{ task.due_date | moment }}</td>
                                        <td>
                                            <div class="progress" style="height: 10px;">
                                                <div :class="getProgressColor(task)" role="progressbar" :style="getProgress(task)" aria-valuenow="task.progress" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            {{ task.progress }} %
                                        </td>
                                        <td v-html="getTaskStatus(task)"></td>
                                        <td v-text="task.description"></td>
                                        <td>
                                            <button class="btn btn-info btn-sm" @click.prevent="editTask(task)" data-toggle="tooltip" title="Edit Task"><i class="fa fa-pencil"></i></button>
                                            <button v-if="task.status" class="btn btn-danger btn-sm" @click.prevent="toggleTaskStatus(task)" data-toggle="tooltip" title="Mark as Incomplete"><i class="fa fa-times"></i></button>
                                            <button v-else class="btn btn-success btn-sm" @click.prevent="toggleTaskStatus(task)" data-toggle="tooltip" title="Mark as Complete"><i class="fa fa-check"></i></button>
                                            <click-confirm yes-class="btn btn-success" no-class="btn btn-danger">
                                                <button class="btn btn-danger btn-sm" @click.prevent="deleteTask(task)" data-toggle="tooltip" title="Delete task"><i class="fa fa-trash"></i></button>
                                            </click-confirm>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="row">
                                <div class="col-md-8">
                                    <pagination :data="tasks" :limit=3 v-on:pagination-change-page="getTasks"></pagination>
                                </div>
                                <div class="col-md-4">
                                    <div class="float-right">
                                        <select name="pageLength" class="form-control" v-model="filterTaskForm.pageLength" @change="getTasks" v-if="tasks.total">
                                            <option value="5">5 per page</option>
                                            <option value="10">10 per page</option>
                                            <option value="25">25 per page</option>
                                            <option value="100">100 per page</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TaskForm from './form'
    import pagination from 'laravel-vue-pagination'
    import helper from '../../services/helper'
    import ClickConfirm from 'click-confirm'

    export default {
        components : { TaskForm, pagination, ClickConfirm },
        data() {
            return {
                tasks: {},
                filterTaskForm: {
                    sortBy : 'start_date',
                    order: 'desc',
                    status: '',
                    title: '',
                    pageLength: 5
                }
            }
        },

        created() {
            this.getTasks();
        },

        methods: {
            getTasks(page) {
                if (typeof page === 'undefined') {
                    page = 1;
                }
                let url = helper.getFilterURL(this.filterTaskForm);
                axios.get('/api/task?page=' + page + url)
                    .then(response => this.tasks = response.data );
            },
            getProgress(task){
                return 'width: '+task.progress+'%;';
            },
            getProgressColor(task){
                return helper.taskColor(task.progress);
            },
            deleteTask(task){
                axios.delete('/api/task/'+task.id).then(response => {
                    toastr['success'](response.data.message);
                    this.getTasks();
                }).catch(error => {
                    toastr['error'](error.response.data.message);
                });
            },
            editTask(task){
                this.$router.push('/task/'+task.uuid+'/edit');
            },
            getTaskStatus(task){
                return (task.status) ? '<span class="label label-success">Completed</span>' : '<span class="label label-danger">Pending</span>';
            },
            toggleTaskStatus(task){
                axios.post('/api/task/status',{id:task.id}).then((response) => {
                    this.getTasks();
                });
            }
        },
        filters: {
          moment(date) {
            return helper.formatDate(date);
          }
        }
    }
</script>
