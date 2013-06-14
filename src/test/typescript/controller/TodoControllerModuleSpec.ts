///<reference path='../libs/DefinitelyTyped/jasmine/jasmine.d.ts' />

///<reference path='../../../main/typescript/libs/DefinitelyTyped/angularjs/angular.d.ts' />
///<reference path='../libs/DefinitelyTyped/angularjs/angular-mocks.d.ts' />

///<reference path='../../../main/typescript/controller/TodoControllerModule.ts' />
/**
 * Created by 201304013 on 13/06/14.
 */
describe("Controllerの", () => {
    var $injector:ng.auto.IInjectorService;
    beforeEach(() => {
        $injector = angular.injector(['ngMock', 'gae-standards.service']);
    });

    describe("Todo.Controllerの", () => {
        var $scope:Todo.Scope;
        var $controller:ng.IControllerService;
        var $httpBackend:ng.IHttpBackendService;

        beforeEach(() => {
            $httpBackend = $injector.get("$httpBackend");
            $controller = $injector.get("$controller");
            $scope = <any>$injector.get("$rootScope").$new();
        });

        it("Controllerの作成", () => {

            console.log('Case 1');
            $httpBackend.expect('GET', '/List',new RegExp('\\[.+\\]'))
                .respond((method, url, data, header)=>{

                });

            var controller:Todo.Controller = $controller(Todo.Controller, {
                $scope: $scope
            }) ;
            $httpBackend.flush();
//            console.log('end expectPOST')

            expect($scope.todos.length).toBe(1);

            console.log('Case 2');
            $httpBackend.expect('GET', '/Post?title=晩御飯たべる',null)
                .respond(201);

            $httpBackend.expect('GET', '/List', new RegExp('\\[.+\\]'))
                .respond(201, new RegExp('\\[.+\\]'), '');
/*
            $httpBackend.expect('GET', '/List',
                    angular.toJson(
                        [
                            {
                                id: 2,
                                title: "晩御飯食べる",
                                createdAt: "2013/04/04 10:10:10",
                                createdBy: "test@example.com"
                            },
                            {
                                id: 1,
                                title: "aaaa",
                                createdAt: "2013/04/04 10:10:10",
                                createdBy: "test@example.com"
                            }
                        ]))
                .respond(201);
*/
            $scope.newContent = "晩御飯たべる";
            controller.add();
            $httpBackend.flush();

            expect($scope.todos.length).toBe(1);
            expect($scope.todos[0].content).toBe("晩御飯たべる");
        });

    });
})