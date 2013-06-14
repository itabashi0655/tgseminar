///<reference path='../libs/DefinitelyTyped/angularjs/angular.d.ts' />

///<reference path='../Model.ts' />
/**
 * Created by 201304013 on 13/06/14.
 */
'use strict';

module Service {

    export class TodoService {

        constructor(public $http:ng.IHttpService) {
        }

        post(title:string):ng.IHttpPromise {
            return this.$http({
                    method: "GET" ,
                    url: "/Post?title=" + title
                });
            //return this.$http.get("");
        }

        remove(id:number):ng.IHttpPromise {
            return this.$http({
                method: "GET" ,
                url: "/Delete?id=" + id
            });
        }

        modify(id:number, title:string):ng.IHttpPromise {
            return this.$http.get("/Update?id=" + id.toString() + "&title=" + title);
        }

        getTodos():ng.IHttpPromise {
            var promise:ng.IHttpPromise= this.$http.get("/List");

            // 既存のIHttPromiseでTodo[]を扱えるように拡張する
            var wrapped:ng.IHttpPromise = {
                // successの部分で取り扱うdataは、デフォルトではanyなので
                // Todo[]が扱えるようにする
                // dataをTodo[]に変換してから、もらったコールバックに変換したTodo[]をわたす
                // そのほかの処理は既存のpromiseと同じにする
                success: (callback) => {
                    promise.success((data, status, headers, config ) => {
                        var todos:Model.Todo[] = [];
                        data.forEach((todo) => {
                            todos.push(new Model.Todo(todo));
                        });
                        callback(todos, status, headers, config);
                    });
                },
                error: promise.error,
                then: promise.then
            }
            return wrapped;
        }
    }
}