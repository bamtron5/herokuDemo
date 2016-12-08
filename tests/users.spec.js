describe('Users Controller', function() {
  var creds,
  createCtrl,
  scope,
  $controller,
  $compile,
  fetchedLogin,
  UserService,
  $q,
  login,
  ctrl,
  $cookies,
  deferred,
  $httpBackend,
  promise,
  resolvedValue,
  $rootScope,
  token,
  response,
  $state;

  // DEFINE MODULE MOCKS
  beforeEach(angular.mock.module('imdbclone'));

  //DEFINE SERVICE MOCKS
  beforeEach(module(function($provide) {
    let UserServiceMock = {
      login: () => {
        let q = $q.defer();
        return q.promise;
      }
    };

    let $cookiesMock = {
      get: () => {},
      set: () => {},
      put: () => {}
    }

    $provide.value('UserService', UserServiceMock);
    $provide.value('$cookies', $cookiesMock);
  }));

  //INJECT CONTROLLER w/ $controller, fresh $scope, and services
  beforeEach(inject(
  function (
    _$controller_,
    _$rootScope_,
    _$compile_,
    _UserService_,
    _$cookies_,
    _$q_,
    _$httpBackend_,
    _$state_
  ) {
    $q = _$q_;
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    UserService = _UserService_;
    $cookies = _$cookies_;
    $httpBackend = _$httpBackend_;
    $state = _$state_;
    scope = $rootScope.$new();
    $httpBackend.whenGET(/views.*/).respond(200, '');
    createCtrl = function(login){
      return $controller(imdbclone.Controllers.UserController, {
        $scope: scope,
        UserService: UserService,
        $cookies: $cookies
      });
    }
    token = 'faketoken';
    creds = {username: 'username', password: 'password'};
    scope.$digest();
  }));

  it('should exist', function() {
    let ctrl = createCtrl();
    expect(ctrl).toBeDefined();
  });

  describe('.login method', function() {
    beforeEach(function(){
      $state.go('main.login', null, {reload: true, notify: true})

      //NOTE will trigger digest cycle and execute the above
      scope.$apply();

      //NOTE mock promises and new ctrl
      deferred = $q.defer();
      promise = deferred.promise;
      ctrl = new createCtrl();

      //spy on callThrough
      spyOn(ctrl, 'login').and.callThrough();

      //spy on login and return a mock value
      spyOn(ctrl.UserService, 'login').and.returnValue(promise);

      //spy on $cookie.put and return nothing
      spyOn(ctrl.$cookies, 'put').and.returnValue({});

      //actually call spy
      ctrl.login(creds);

      //resolve login promise
      deferred.resolve({ token: token });
    });

    it('should call UserService.login', function() {
      expect(ctrl.UserService.login).toHaveBeenCalled();
    });

    it('should call $cookies.put', function () {
      //NOTE $httpBackend will call after UserService.login resolves promise
      $httpBackend.flush();
      expect(ctrl.$cookies.put).toHaveBeenCalled();
    });

    it('state should set state to home', function () {
      scope.$apply();
      $httpBackend.flush();
      expect($state.current.name).toBe('main.home');
    });
  })
});
