var ferry = require('../index.js');
var expect = require('expect.js');
var espionage = require('espionage');
var React = require('react');

describe('init', function(){
    it('defines property replaceTemplate', function(){
        expect(typeof ferry.replaceTemplate).not.to.be('undefined');
    });
});
describe('#route', function(){
    it('returns a function', function(){
        expect(typeof ferry.route({})).to.be('function');
    });
    describe('when the returned function is called', function(){
        describe('when a defined route is requested', function(){
            it('calls res.send', function(){
                var pathStub = '/';
                var sendSpy = espionage.createSpy();
                var nextStub = function(){};
                var componentFactoryStub = React.createFactory(React.createClass({
                    render: function(){
                        return React.createElement('div');
                    }
                }));
                var middlewareFunc = ferry.route({
                    parentComponentFactory: componentFactoryStub,
                    htmlPath: __dirname + '/ferry.js',
                    routes: [{
                        path: pathStub,
                        componentFactory: componentFactoryStub
                    }]
                });

                middlewareFunc({path: pathStub}, {send: sendSpy}, nextStub);

                expect(sendSpy.wasCalled()).to.be(true);
            });
        });
        describe('when the route is not matched', function() {
            it('does not call res.send, but does call next', function(){
                var pathStub = '/';
                var sendSpy = espionage.createSpy();
                var nextSpy = espionage.createSpy();
                var componentFactoryStub = React.createFactory(React.createClass({
                    render: function(){
                        return React.createElement('div');
                    }
                }));
                var middlewareFunc = ferry.route({
                    parentComponentFactory: componentFactoryStub,
                    htmlPath: __dirname + '/ferry.js',
                    routes: [{
                        path: pathStub,
                        componentFactory: componentFactoryStub
                    }]
                });

                middlewareFunc({path: '/fakeroute'}, {send: sendSpy}, nextSpy);

                expect(sendSpy.wasCalled()).to.be(false);
                expect(nextSpy.wasCalled()).to.be(true);
            });
        });
    });
});
describe('#buildTemplate', function(){

});
describe('#buildHtml', function(){

});
