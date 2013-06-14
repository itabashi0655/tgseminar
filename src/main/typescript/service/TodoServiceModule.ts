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
                    method: "POST" ,
                    url: "/Post?title=" + title
                });
            //return this.$http.get("");
        }

        remove(id:number):ng.IHttpPromise {
            return this.$http({
                method: "POST" ,
                url: "/Delete?id=" + id
            });
        }

        list():ng.IHttpPromise {
            return this.$http({
                method: "POST" ,
                url: "/List"
            });
        }
    }
}