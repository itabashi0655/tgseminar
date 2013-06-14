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
        constructor(public $scope:Scope, public $window:ng.IWindowService, private todoService:Service.TodoService){
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
            var title = this.$scope.todo.title;

            // execute modify.
            this.todoService
                .modify(id, title)
                .success(function(data){
                    alert("modify completed.");
                })
                .error(function(data){
                    alert("modify failed.");
                })
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
                    this.$window.alert("remove completed.");
                })
                .error((data) => {
                    this.$window.alert("remove failed.");
                })
        }
    }
    /**
     * Controller
     * $scopeをコンストラクタにお渡しして初期化する
     */
    export class Controller {

         constructor(public $scope:Scope, public $window:ng.IWindowService, private todoService:Service.TodoService){

            // $scopeに対して自分自身の情報を設定してやる
            this.list();
            this.$scope.add = ()
                => this.add();

            this.$scope.list = ()
                => this.list();
/*
             this.todoService.list()
                 .success((todos:Model.Todo[])=>{
                    this.$scope.todos = todos;
                 });
*/
/*
            this.$scope.modify = ()
                => this.modify();
            this.$scope.remove = ()
                => this.remove();
*/
        }

        list():void{
            this.todoService.getTodos()
                .success((todos:Model.Todo[]) => {
                    this.$scope.todos = [];
                    if(!Array.isArray(todos))
                        return;
                    todos.forEach((todo) => {
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