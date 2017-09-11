providers.provider('ParametrosApp', function() {

    var hostApp = "/seguranca-services/services";

    this.setHostApp = function(host){
        hostApp = host;
    }

    this.$get = function() {
        return {
        	"host" : hostApp
        };
    }
});