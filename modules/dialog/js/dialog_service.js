(function()
{
    'use strict';

    angular
        .module('lumx.dialog')
        .service('LxDialogService', LxDialogService);

    LxDialogService.$inject = ['$rootScope', '$q'];

    function LxDialogService($rootScope, $q)
    {
        var service = this;

        service.open = open;
        service.close = close;
        service.cancel = cancel;
        service.locals = locals;

        var localsMap = {};

        ////////////

        function open(_dialogId, _params)
        {
            var deferred = $q.defer();
            $rootScope.$broadcast('lx-dialog__open', _dialogId, _params, deferred);
            localsMap[_dialogId] = _params;
            return deferred.promise;
        }

        function close(_dialogId, _params)
        {
            delete localsMap[_dialogId];
            $rootScope.$broadcast('lx-dialog__close', _dialogId, _params);
        }

        function cancel(_dialogId)
        {
            delete localsMap[_dialogId];
            $rootScope.$broadcast('lx-dialog__cancel', _dialogId);
        }

        function locals(_dialogId)
        {
            return localsMap[_dialogId];
        }
    }
})();
