<template>
    <div>
        <div class="row page-titles">
            <div class="col-md-6 col-8 align-self-center">
                <h3 class="text-themecolor m-b-0 m-t-0">Home</h3>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Recent Incomplete Task</h4>
                        <h6 class="card-subtitle" v-if="!recent_incomplete_tasks.length">No result found!</h6>
                        <div class="table-responsive m-t-40">
                            <table class="table stylish-table" v-if="recent_incomplete_tasks.length">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Start Date</th>
                                        <th>Due Date</th>
                                        <th>Progress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="task in recent_incomplete_tasks">
                                        <td v-text="task.title"></td>
                                        <td>{{ task.start_date | moment }}</td>
                                        <td>{{ task.due_date | moment }}</td>
                                        <td>
                                            <div class="progress" style="height: 10px;">
                                                <div :class="getProgressColor(task)" role="progressbar" :style="getProgress(task)" aria-valuenow="task.progress" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            {{ task.progress }} %
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Users</h4>
                                <div class="text-right">
                                    <h2 class="font-light m-b-0"><i class="fa fa-users text-success"></i> {{users_count}}</h2>
                                    <span class="text-muted">Total Users</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Tasks</h4>
                                <div class="text-right">
                                    <h2 class="font-light m-b-0"><i class="fa fa-tasks text-info"></i> {{tasks_count}}</h2>
                                    <span class="text-muted">Total Tasks</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body b-b">
                        <h4 class="card-title">My Todo</h4>
                        <form @submit.prevent="storeTodo">
                            <div class="row">
                                <div class="col-8">
                                    <textarea placeholder="Add new todo here..." class="form-control b-0" v-model="todoForm.todo"></textarea>
                                </div>
                                <div class="col-4 text-right">
                                    <button type="submit" class="btn btn-info btn-circle btn-lg"><i class="fa fa-plus"></i> </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="card-body">
                        <select class="custom-select float-right" v-model="show_todo_status" @change="filterTodo" v-if="todos.length">
                            <option selected value=''>All</option>
                            <option value="1">Completed</option>
                            <option value="0">Incompleted</option>
                        </select>
                        <h4 class="card-title">Todo list</h4>
                        <div class="clearfix"></div>
                        <div class="message-box" v-if="todos.length">
                            <div class="message-widget message-scroll">
                                <ul class="list-task todo-list list-group m-b-0" data-role="tasklist">
                                    <li class="list-group-item" data-role="task" v-for="todo in todos">
                                        <div class="checkbox checkbox-info">
                                            <input type="checkbox" name="inputCheckboxesBook" @change="toggleTodoStatus(todo)" :checked="todo.status">
                                            <label for="inputBook" class=""> <span :class="[todo.status ? 'strikethrough' : '']">{{todo.todo}}</span> </label>
                                            <span class="float-right">
                                                <click-confirm yes-class="btn btn-success" no-class="btn btn-danger">
                                                    <button class="btn btn-danger btn-xs" @click.prevent="deleteTodo(todo)" data-toggle="tooltip" title="Delete Todo"><i class="fa fa-trash"></i></button>
                                                </click-confirm>
                                            </span>
                                        </div>
                                        <div class="item-date float-right" style="margin-right: 20px;">{{todo.created_at | momentWithTime}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <h6 class="card-subtitle" v-if="!todos.length">No todo found!</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import helper from '../../services/helper'
    import ClickConfirm from 'click-confirm'
    export default {
        data(){
            return {
                users_count: '',
                tasks_count: '',
                recent_incomplete_tasks: {},
                todos: [],
                todoForm: new Form({
                    'todo': ''
                }),
                show_todo_status: ''
            }
        },
        components : { ClickConfirm },
        mounted() {
            axios.get('/api/user/dashboard').then(response =>  {
                this.users_count = response.data.users_count;
                this.tasks_count = response.data.tasks_count;
                this.recent_incomplete_tasks = response.data.recent_incomplete_tasks;
            });
            this.getTodos();
        },
        methods: {
            getTodos(){
                axios.get('/api/todo?show_todo_status='+this.show_todo_status).then(response =>  {
                    this.todos = response.data;
                });
            },
            storeTodo(){
                this.todoForm.post('/api/todo').then(response => {
                    toastr['success'](response.message);
                    this.todos.unshift(response.data)
                }).catch(response => {
                    toastr['error'](response.message);
                });
            },
            deleteTodo(todo){
                axios.delete('/api/todo/'+todo.id).then(response => {
                    toastr['success'](response.data.message);
                    this.getTodos();
                }).catch(error => {
                    toastr['error'](error.response.data.message);
                });
            },
            toggleTodoStatus(todo){
                axios.post('/api/todo/status',{id:todo.id}).then(response => {
                    todo.status = !todo.status;
                }).catch(error => {
                    toastr['error'](error.response.message);
                });
            },
            filterTodo(){
                this.getTodos();
            },
            getProgress(task){
                return 'width: '+task.progress+'%;';
            },
            getProgressColor(task){
                return helper.taskColor(task.progress);
            }
        },
        computed: {
        },
        filters: {
          moment(date) {
            return helper.formatDate(date);
          },
          momentWithTime(date) {
            return helper.formatDateTime(date);
          }
        }
    }
</script>
<style>
    .strikethrough{
      text-decoration: line-through;
    }
</style>
