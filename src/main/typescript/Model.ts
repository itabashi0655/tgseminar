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
        public title:string;

        // constructor
        constructor(data:any){
            this.id = data.id;
            this.title = data.title;
            this.createdAt = data.createdAt;
            this.createdBy = data.createdBy;
        }
    }
}
