///<reference path='controller/SampleControllerModuleSpec.ts' />

decribe("Controllerの", () => {
    var $injector:ng.auto.IInjectorService;
    beforeEarch(() => {
        $injector.injector({'ngMock','gae-standards.service'});
    });
    describe("Todo.Controllerの", () => {
        var $scope:Todo.Scope;
    });
})