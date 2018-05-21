'use strict';
let path = require('path');
let assert = require('yeoman-assert');
let helpers = require('yeoman-test');

let carDir; // This is the directory which we will create our app into
let digitalDir; // This is the directory which we will create our app into

describe('tests against archive files', function(){
    after(function(done) {
        console.log(carDir+'/Mobile-Blockchain-App');
        console.log(digitalDir+'/Mobile-Blockchain-App');
        done();
    });

    describe('test against the carauction-network business network archive file', function() {
        let carPackageJson;

        before(function(){
            return helpers.run(path.join(__dirname, '../generators/app'))
                .inTmpDir(function (dir){
                    carDir = dir;
                })
                .withOptions({ skipInstall: false })
                .withPrompts({
                    method: 'supply',
                    name: 'Mobile-Blockchain-App',
                    description: 'A mobile application',
                    author: 'AuthorName',
                    email: 'User@Email.com',
                    file: __dirname+'/data/carauction-network.bna',
                    address: 'http://localhost',
                    port: 3000,
                    namespaces: 'never'
                })
                .on('error', function (error) {
                    console.log('Error found:', error);
                })
                .on('end', function(error){
                    carPackageJson = require(carDir+'/Mobile-Blockchain-App/package.json');
                });

        });

        describe('should create correct package.json', function() {
            it('should have correct package name', function(){
                assert.equal(carPackageJson.name, 'Mobile-Blockchain-App');
            });
            it('should have correct package description', function(){
                assert.equal(carPackageJson.description, 'A mobile application');
            });
            it('should have correct package author name', function(){
                assert.equal(carPackageJson.author.name, 'AuthorName');
            });
            it('should have correct package author email', function(){
                assert.equal(carPackageJson.author.email, 'User@Email.com');
            });
        });

        it('should create typescript classes', function(){
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/org.acme.vehicle.auction.ts');
        });

        it('should create Vehicle component typescript', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/Vehicle/Vehicle.component.ts');
        });

        it('should create Vehicle service', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/services/assets/Vehicle/Vehicle.service.ts');
        });

        it('should create Vehicle service test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/services/assets/Vehicle/Vehicle.service.spec.ts');
        });

        it('should create Vehicle component html', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/Vehicle/Vehicle.component.html');
        });

        it('should create Vehicle component test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/Vehicle/Vehicle.component.spec.ts');
        });

        it('should create Vehicle component scss', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/Vehicle/Vehicle.component.scss');
        });

        it('should create Vehicle form component typescript', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/Vehicle/Vehicle.form.component.ts');
        });

        it('should create Vehicle form component test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/Vehicle/Vehicle.form.component.spec.ts');
        });

        it('should create Vehicle form html', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/Vehicle/Vehicle.form.component.html');
        });

        it('should create Vehicle form scss', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/Vehicle/Vehicle.form.component.scss');
        });

        it('should create VehicleListing component typescript', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/VehicleListing/VehicleListing.component.ts');
        });

        it('should create VehicleListing service', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/services/assets/VehicleListing/VehicleListing.service.ts');
        });

        it('should create VehicleListing service test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/services/assets/VehicleListing/VehicleListing.service.spec.ts');
        });

        it('should create VehicleListing component html', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/VehicleListing/VehicleListing.component.html');
        });

        it('should create VehicleListing component test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/VehicleListing/VehicleListing.component.spec.ts');
        });

        it('should create VehicleListing component scss', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/VehicleListing/VehicleListing.component.scss');
        });

        it('should create VehicleListing form component typescript', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/VehicleListing/VehicleListing.form.component.ts');
        });

        it('should create VehicleListing form component test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/VehicleListing/VehicleListing.form.component.spec.ts');
        });

        it('should create VehicleListing form html', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/VehicleListing/VehicleListing.form.component.html');
        });

        it('should create VehicleListing form scss', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/assets/VehicleListing/VehicleListing.form.component.scss');
        });

        it('should create Offer component typescript', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/Offer/Offer.component.ts');
        });

        it('should create Offer service', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/services/transactions/Offer/Offer.service.ts');
        });

        it('should create Offer service test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/services/transactions/Offer/Offer.service.spec.ts');
        });

        it('should create Offer component html', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/Offer/Offer.component.html');
        });

        it('should create Offer component test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/Offer/Offer.component.spec.ts');
        });

        it('should create Offer component scss', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/Offer/Offer.component.scss');
        });

        it('should create Offer form component typescript', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/Offer/Offer.form.component.ts');
        });

        it('should create Offer form component test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/Offer/Offer.form.component.spec.ts');
        });

        it('should create Offer form html', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/Offer/Offer.form.component.html');
        });

        it('should create Offer form scss', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/Offer/Offer.form.component.scss');
        });

        it('should create CloseBidding component typescript', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/CloseBidding/CloseBidding.component.ts');
        });

        it('should create CloseBidding service', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/services/transactions/CloseBidding/CloseBidding.service.ts');
        });

        it('should create CloseBidding service test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/services/transactions/CloseBidding/CloseBidding.service.spec.ts');
        });

        it('should create CloseBidding component html', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/CloseBidding/CloseBidding.component.html');
        });

        it('should create CloseBidding component test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/CloseBidding/CloseBidding.component.spec.ts');
        });

        it('should create CloseBidding component scss', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/CloseBidding/CloseBidding.component.scss');
        });

        it('should create CloseBidding form component typescript', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/CloseBidding/CloseBidding.form.component.ts');
        });

        it('should create CloseBidding form component test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/CloseBidding/CloseBidding.form.component.spec.ts');
        });

        it('should create CloseBidding form html', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/CloseBidding/CloseBidding.form.component.html');
        });

        it('should create CloseBidding form scss', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/transactions/CloseBidding/CloseBidding.form.component.scss');
        });

        it('should create Auctioneer component typescript', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Auctioneer/Auctioneer.component.ts');
        });

        it('should create Auctioneer service', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/services/participants/Auctioneer/Auctioneer.service.ts');
        });

        it('should create Auctioneer service test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/services/participants/Auctioneer/Auctioneer.service.spec.ts');
        });

        it('should create Auctioneer component html', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Auctioneer/Auctioneer.component.html');
        });

        it('should create Auctioneer component test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Auctioneer/Auctioneer.component.spec.ts');
        });

        it('should create Auctioneer component scss', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Auctioneer/Auctioneer.component.scss');
        });

        it('should create Auctioneer form component typescript', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Auctioneer/Auctioneer.form.component.ts');
        });

        it('should create Auctioneer form component test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Auctioneer/Auctioneer.form.component.spec.ts');
        });

        it('should create Auctioneer form html', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Auctioneer/Auctioneer.form.component.html');
        });

        it('should create Auctioneer form scss', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Auctioneer/Auctioneer.form.component.scss');
        });

        it('should create Member component typescript', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Member/Member.component.ts');
        });

        it('should create Member service', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/services/participants/Member/Member.service.ts');
        });

        it('should create Member service test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/services/participants/Member/Member.service.spec.ts');
        });

        it('should create Member component html', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Member/Member.component.html');
        });

        it('should create Member component test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Member/Member.component.spec.ts');
        });

        it('should create Member component scss', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Member/Member.component.scss');
        });

        it('should create Member form component typescript', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Member/Member.form.component.ts');
        });

        it('should create Member form component test', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Member/Member.form.component.spec.ts');
        });

        it('should create Member form html', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Member/Member.form.component.html');
        });

        it('should create Member form scss', function () {
            assert.file(carDir+'/Mobile-Blockchain-App/src/app/pages/participants/Member/Member.form.component.scss');
        });

    });


    describe('test against the digitalproperty-network business network archive file', function () {

        let digitalPackageJson;

        before(function(){
            return helpers.run(path.join(__dirname, '../generators/app'))
                .inTmpDir(function (dir){
                    digitalDir = dir;
                })
                .withOptions({ skipInstall: false })
                .withPrompts({
                    method: 'supply',
                    name: 'Mobile-Blockchain-App',
                    description: 'A mobile application',
                    author: 'AuthorName',
                    email: 'User@Email.com',
                    file: __dirname+'/data/digitalproperty-network.bna',
                    address: 'http://localhost',
                    port: 3000,
                    namespaces: 'never'
                })
                .on('error', function (error) {
                    console.log('Error found:', error);
                }).on('end', function(error){
                    digitalPackageJson = require(digitalDir+'/Mobile-Blockchain-App/package.json');
                });

        });

        describe('should create correct package.json', function() {
            it('should have correct package name', function(){
                assert.equal(digitalPackageJson.name, 'Mobile-Blockchain-App');
            });
            it('should have correct package description', function(){
                assert.equal(digitalPackageJson.description, 'A mobile application');
            });
            it('should have correct package author name', function(){
                assert.equal(digitalPackageJson.author.name, 'AuthorName');
            });
            it('should have correct package author email', function(){
                assert.equal(digitalPackageJson.author.email, 'User@Email.com');
            });
        });

        it('should create typescript classes', function(){
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/net.biz.digitalPropertyNetwork.ts');
        });

        it('should create LandTitle component typescript', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/LandTitle/LandTitle.component.ts');
        });

        it('should create LandTitle service', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/services/assets/LandTitle/LandTitle.service.ts');
        });

        it('should create LandTitle service test', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/services/assets/LandTitle/LandTitle.service.spec.ts');
        });

        it('should create LandTitle component html', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/LandTitle/LandTitle.component.html');
        });

        it('should create LandTitle component test', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/LandTitle/LandTitle.component.spec.ts');
        });

        it('should create LandTitle component scss', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/LandTitle/LandTitle.component.scss');
        });

        it('should create LandTitle form component typescript', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/LandTitle/LandTitle.form.component.ts');
        });

        it('should create LandTitle form component test', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/LandTitle/LandTitle.form.component.spec.ts');
        });

        it('should create LandTitle form html', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/LandTitle/LandTitle.form.component.html');
        });

        it('should create LandTitle form scss', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/LandTitle/LandTitle.form.component.scss');
        });

        it('should create SalesAgreement component typescript', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/SalesAgreement/SalesAgreement.component.ts');
        });

        it('should create SalesAgreement service', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/services/assets/SalesAgreement/SalesAgreement.service.ts');
        });

        it('should create SalesAgreement service test', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/services/assets/SalesAgreement/SalesAgreement.service.spec.ts');
        });

        it('should create SalesAgreement component html', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/SalesAgreement/SalesAgreement.component.html');
        });

        it('should create SalesAgreement component test', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/SalesAgreement/SalesAgreement.component.spec.ts');
        });

        it('should create SalesAgreement component scss', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/SalesAgreement/SalesAgreement.component.scss');
        });

        it('should create SalesAgreement form component typescript', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/SalesAgreement/SalesAgreement.form.component.ts');
        });

        it('should create SalesAgreement form component test', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/SalesAgreement/SalesAgreement.form.component.spec.ts');
        });

        it('should create SalesAgreement form html', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/SalesAgreement/SalesAgreement.form.component.html');
        });

        it('should create SalesAgreement form scss', function () {
            assert.file(digitalDir+'/Mobile-Blockchain-App/src/app/pages/assets/SalesAgreement/SalesAgreement.form.component.scss');
        });

    });

});
