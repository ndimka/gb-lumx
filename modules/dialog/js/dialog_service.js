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

        ////////////

        function open(_dialogId, _params)
        {
            var deferred = $q.defer();
            $rootScope.$broadcast('lx-dialog__open', _dialogId, _params, deferred);
            return deferred.promise;
        }

        function close(_dialogId, _params)
        {
            $rootScope.$broadcast('lx-dialog__close', _dialogId, _params);
        }

        function cancel(_dialogId)
        {
            $rootScope.$broadcast('lx-dialog__cancel', _dialogId);
        }
    }
})();
