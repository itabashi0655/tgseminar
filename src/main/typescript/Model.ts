///<reference path='libs/DefinitelyTyped/angularjs/angular.d.ts' />

/**
 * モデルのモジュール。
 */
module Model {
	export class Sample {
		test:string;

		/**
		 * @constructor
		 * @param data JSONObjectまたはJSON文字列
		 */
			constructor(data) {
			if (angular.isString(data)) {
				data = angular.fromJson(data);
			}
			this.test = data.test;
		}
	}

    /**                      ｆ
     * TODOを表すモデルクラス
     */
    export class Todo {
        // properties.
        public id:number;
        public createdAt:string;
        public createdBy:string;
        public content:string;

        // constructor
        constructor(
            id:number=-1,
            content:string = "unknown",
            createdAt:string = "unknown",
            createdBy:string = "unknown"){
            this.id = id;
            this.content = content;
            this.createdAt = createdAt;
            this.createdBy = createdBy;
        }
    }
}
