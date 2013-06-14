///<reference path='../libs/DefinitelyTyped/angularjs/angular.d.ts' />

///<reference path='../Model.ts' />
///<reference path='../service/TodoServiceModule.ts' />

/**
 * Created by 201304013 on 13/06/13.
 */
module Todo{
    /**
     * Interface
     * Scopeの内容を定義する
     */
    export interface Scope extends ng.IScope{
        todos: Model.Todo[];
        add: () => void;
        modify: () => void;
        remove: () => void;
        list: () => void;
        todo: Model.Todo;
        newContent: string;
    }

    /**
     * TODOのアイテム用コントローラ
     */
    export class ItemController{
        /**
         * コンストラクタ
         * @param $scope
         * @param todoService
         */
        constructor(public $scope:Scope, private todoService:Service.TodoService){
            this.$scope.remove = () =>
                this.remove();
            this.$scope.modify = () =>
                this.modify();
        }

        /**
         * TODOを更新します。
         */
        modify():void{
            var id = this.$scope.todo.id;
/*
            // execute modify.
            this.$scope.todoService
                .post(id)
                .success(function(data){
                    alert("remove completed.");
                })
                .error(function(data){
                    alert("remove failed.");
                })
*/
        }

        /**
         * TODOを削除します。
         */
        remove():void{
            var id = this.$scope.todo.id;
//            if(!this.$window.confirm("remove?")){
//                return;
//            }
            // execute remove.
            this.todoService
                .remove(id)
                .success((data) => {
                    // TODOのリストを再取得する
                    // $scopeを介さないとだめ？
                    this.$scope.list();
                    alert("remove completed.");
                })
                .error((data) => {
                    alert("remove failed.");
                })
        }
    }
    /**
     * Controller
     * $scopeをコンストラクタにお渡しして初期化する
     */
    export class Controller {

         constructor(public $scope:Scope, private todoService:Service.TodoService){

            // $scopeに対して自分自身の情報を設定してやる
            this.list();
            this.$scope.add = ()
                => this.add();

            this.$scope.list = ()
                => this.list();
/*
            this.$scope.modify = ()
                => this.modify();
            this.$scope.remove = ()
                => this.remove();
*/
        }

        list():void{
            this.todoService.list()
                .success((todos) => {
                    this.$scope.todos = [];
                    todos.forEach((todo) => {
                        console.log(todo.title);
                        var newTodo = new Model.Todo();
                        newTodo.id = todo.id;
                        newTodo.content = todo.title;
                        newTodo.createdAt = todo.createdAt;
                        newTodo.createdBy = todo.createdBy;
                        this.$scope.todos.push(todo);
                    })
                })
        }
        /**
         * TODOを追加
         */
        add():void{
//            var todo = new Model.Todo();
//            todo.content = this.$scope.newContent;
            var content = this.$scope.newContent;

            this.todoService.post(content)
                .success((data) => {
                    this.list();
                })
        }
    }
}