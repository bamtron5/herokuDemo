describe('Users service', function() {
  var creds,
  createCtrl,
  scope,
  $controller,
  $compile,
  fetchedLogin,
  UserService,
  $q,
  login,
  ctrl;

  // DEFINE MODULE MOCKS
  beforeEach(angular.mock.module('imdbclone'));

  //DEFINE SERVICE MOCKS
  beforeEach(module(function($provide) {
    let UserServiceMock = {
      login: () => {}
    };
    $provide.value('UserService', UserServiceMock);
  }));

  //INJECT CONTROLLER w/ $controller, fresh $scope, and services
  beforeEach(inject(function(_$controller_,
    _$rootScope_,
    _$compile_,
    _UserService_,
    _$q_
  ){
    $q = _$q_;
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    UserService = _UserService_;
    scope = $rootScope.$new();
    createCtrl = function(login){
      return $controller(imdbclone.Controllers.UserController, {
        $scope: scope,
        UserService: UserService
      });
    }
    creds = {username: 'username', password: 'password'};
    scope.$digest();
  }));

  it('should exist', function() {
    let ctrl = createCtrl();
    expect(ctrl).toBeDefined();
  });

  describe(' - login method: ', function() {
    beforeEach(function(){
      var deferred = $q.defer();
      ctrl = new createCtrl();
      spyOn(ctrl, 'login').and.callThrough();
      spyOn(ctrl.UserService, 'login').and.returnValue(deferred.promise);
      ctrl.login();
    });

    it('UserService.login should be called when ctrl.login is called', function() {
      expect(ctrl.UserService.login).toHaveBeenCalled();
    });

    xit('should set cookie token', function () {

    });

    xit('state should go home', function () {

    });
  })


});
