'use strict';

// Import node module dependencies

const Generator = require('yeoman-generator');
const fs = require('fs-extra');
const shell = require('shelljs');
const FileWriter = require('composer-common').FileWriter;
const TypescriptVisitor = require('composer-common').TypescriptVisitor;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const Validate = require('../validation.js');
const AdmZip = require('adm-zip');
const chalk = require('chalk');
const log = console.log;

// Initiate global variables
let method;
let name;
let description;
let author;
let email;
let card;
let rest;
let address;
let port;
let namespaces;
let travis;
let file;
let businessNetworkConnection;
let businessNetworkDefinition;
let businessNetworkIdentifier;
let modelManager;
let namespaceList;
let enumerationsList;
let destinationPath;
let definitionList = [];
let declarationProperties;
let assetList = [];
let assetServiceNames = [];
let assetComponentNames = [];
let participantList = [];
let participantServiceNames = [];
let participantComponentNames = [];
let transactionList = [];
let transactionServiceNames = [];
let transactionComponentNames = [];

// Create Generator class
module.exports = class extends Generator {

    // Class constructor

    constructor(args, opts){

        super(args, opts);

        // Create acceptable generator arguments

        this.option('method', {
            desc: 'Can \'connect\' to a running business network or \'supply\' a business network archive file.',
            type: String,
            required: 'true'
        });
        this.option('name', {
            desc: 'The name of the generated application',
            type: String
        });
        this.option('description', {
            desc: 'The description of the generated application',
            type: String
        });
        this.option('author', {
            desc: 'The name of the author for the generated application',
            type: String
        });
        this.option('email', {
            desc: 'The email address of the author for the generated application',
            type: String
        });
        this.option('card', {
            desc: 'The business network card name required to connect to the running business network (blockchain instance)',
            type: String
        });
        this.option('rest', {
            desc: 'Can either (generate) a new REST API or (connect) to an existing REST API',
            type: String
        });
        this.option('file', {
            desc: 'The (relative) path of business network archive file which the generated application is based upon',
            type: String
        });
        this.option('address', {
            desc: 'The address of the REST API server (not including the port numbwer). E.g. http://127.0.0.1',
            type: String,
        });
        this.option('port', {
            desc: 'The port number which the REST API is running on. E.g. 8080',
            type: String,
        });
        this.option('namespaces', {
            desc: 'Should either be \'never\' if namespaces aren\'t used in the REST API routes, or \'always\' if they are used. ',
            type: String,
        });
        this.option('travis', {
            desc: 'Set to true if you want a Travis CI pipeline configuration file',
            type: Boolean
        });
        this.option('zip', {
            desc: 'Set to true if you want to ZIP the outputted code',
            type: Boolean
        });
        this.option('skip-install', {
            desc: 'Set to true if you want to skip dependency installation',
            type: Boolean
        });
    }


    /*
	Prompting function runs after constructor as part of the Yeoman running context - http://yeoman.io/authoring/running-context.html
	Prompting stage asks the users questions which they must answer to generate a mobile application.
	*/
    prompting(){

        // Read in any user arguments and set the variables

        method = this.options.method;
        name = this.options.name;
        description = this.options.description;
        author = this.options.author;
        email = this.options.email;
        file = this.options.file;
        card = this.options.card;
        rest = this.options.rest;
        if(this.options.rest === 'connect' && this.options.address !== undefined){
            address = this.options.address;
        }
        port = this.options.port;
        namespaces = this.options.namespaces;
        travis = this.options.travis;

        // Inform the user that the code generator tool has started

        log(chalk.blue.bold('\nWelcome to the Hyperledger Composer Ionic Mobile Application Generator'));
        log('\nThe aim of this project is to provide developers with a code generation tool that can rapidly produce customised mobile applications for interacting with Hyperledger Composer blockchain networks.\n');

        let methodQuestion = [];

        if(!this.options.method){
            methodQuestion.push({
                type: 'list',
                name: 'method',
                message: 'How would you like to generate the mobile application?',
                default: 'connect',
                store: false,
                choices: [{
                    name: 'Connect to a running Business Network',
                    value: 'connect'
                },
                {
                    name: 'Supply a business network archive file (.bna)',
                    value: 'supply'
                }],
                validate: Validate.Method
            });
        }

        // Ask the user the first question
        return this.prompt(methodQuestion).then((answer) => {

            // Get the users answer
            method = this.options.method || answer.method;

            //Start to push any unanswered questions (with command-line arguments) to an array for later use
            let questions = [];

            if(!this.options.name){
                questions.push({
                    type: 'input',
                    name: 'name',
                    message: 'What is the mobile applications name?',
                    default: 'Mobile-Blockchain-App',
                    store: false,
                    validate: Validate.Name
                });
            }

            if(!this.options.description){
                questions.push({
                    type: 'input',
                    name: 'description',
                    message: 'Give the mobile application a description:',
                    default: 'This mobile application has been generated using the mobile application code generation tool.',
                    store: false,
                    validate: Validate.Description
                });
            }

            if(!this.options.author){
                questions.push({
                    type: 'input',
                    name: 'author',
                    message: 'Who is the mobile applications author?',
                    default: 'Author Name',
                    store: false,
                    validate: Validate.Author
                });
            }

            if(!this.options.email){
                questions.push({
                    type: 'input',
                    name: 'email',
                    message: 'What is the authors email address?',
                    default: 'author@email.com',
                    store: false,
                    validate: Validate.Email
                });
            }

            if(method === 'connect'){

                if(!this.options.card){
                    questions.push({
                        type: 'input',
                        name: 'card',
                        message: 'What business network card would you like to connect with?',
                        default: 'admin@carauction-network',
                        store: false,
                        validate: Validate.Card
                    });
                }

                if(!this.options.rest){
                    questions.push({
                        type: 'list',
                        name: 'rest',
                        message: 'Do you want to generate a new REST API or connect to an existing REST API?',
                        default: 'connect',
                        store: false,
                        choices: [{
                            name: 'Generate a new REST API',
                            value: 'generate'
                        },
                        {
                            name: 'Connect to an existing REST API',
                            value: 'connect'
                        }],
                        validate: Validate.Rest
                    });
                }
            }
            else{

                if(!this.options.file){
                    questions.push({
                        type: 'input',
                        name: 'file',
                        message: 'What business network archive file would you like to generate the mobile application with? (Path is from the current working directory)',
                        default: 'carauction-network.bna',
                        store: false,
                        validate: Validate.File
                    });
                }
            }

            let self = this;

            // Ask first set of questions
            return this.prompt(questions).then(function(answers){

                // Set global variables to answer for later usage

                name = self.options.name || answers.name;
                description = self.options.description || answers.description;
                author = self.options.author || answers.author;
                email = self.options.email || answers.email;

                // Prepare next set of questions
                let nextQuestions = [];

                // If the method is to connect to a running business network...
                if(method === 'connect'){


                    card = self.options.card || answers.card;
                    rest = self.options.rest || answers.rest;

                    // If generating a REST API
                    if (rest === 'generate'){

                        address = 'http://localhost';


                        if(!self.options.port){
                            nextQuestions.push({
                                type: 'input',
                                name: 'port',
                                store: false,
                                message: 'What port number would you like to start the REST API server on?',
                                default: '3000',
                                validate: Validate.Port
                            });
                        }

                        if(!self.options.namespaces){
                            nextQuestions.push({
                                type: 'list',
                                name: 'namespaces',
                                message: 'Would you like to use namespaces in the generated REST API?',
                                default: 'never',
                                store: false,
                                choices: [{
                                    name: 'Always use namespaces',
                                    value: 'always'
                                },
                                {
                                    name: 'Never use namespaces',
                                    value: 'never'
                                }
                                ],
                                validate: Validate.Namespaces
                            });
                        }

                    }
                    // If connecting to an existing REST API
                    else if(rest === 'connect'){

                        if(!self.options.address){
                            nextQuestions.push({
                                type: 'input',
                                name: 'address',
                                store: false,
                                message: 'What is the address of the REST API server the mobile application will connect to?',
                                default: 'http://localhost',
                                validate: Validate.Address
                            });
                        }

                        if(!self.options.port){
                            nextQuestions.push({
                                type: 'input',
                                name: 'port',
                                store: false,
                                message: 'What is the port number of the REST API server the mobile application will connect to?',
                                default: '3000',
                                validate: Validate.Port
                            });
                        }

                        if(!self.options.namespaces){
                            nextQuestions.push({
                                type: 'list',
                                name: 'namespaces',
                                message: 'Are namespaces used in the REST API?',
                                default: 'never',
                                store: false,
                                choices: [{
                                    name: 'Namespaces are used',
                                    value: 'always'
                                },
                                {
                                    name: 'Namespaces are not used',
                                    value: 'never'
                                }
                                ],
                                validate: Validate.Namespaces
                            });
                        }
                    }
                    else{
                        self.log('Unknown option');
                    }

                    if(!self.options.travis){
                        nextQuestions.push({
                            type: 'confirm',
                            name: 'travis',
                            message: 'Would you like to generate a Travis CI pipeline configuration file?',
                            default: true,
                            store: false,
                            validate: Validate.Travis
                        });
                    }


                }
                // If generating the mobile application by using a business network archive file...
                else{
                    file = self.options.file || answers.file;

                    if(!self.options.address){
                        nextQuestions.push({
                            type: 'input',
                            name: 'address',
                            store: false,
                            message: 'What is the address of the REST API server the mobile application will connect to?',
                            default: 'http://localhost',
                            validate: Validate.Address
                        });
                    }

                    if(!self.options.port){
                        nextQuestions.push({
                            type: 'input',
                            name: 'port',
                            store: false,
                            message: 'What is the port number of the REST API server the mobile application will connect to?',
                            default: '3000',
                            validate: Validate.Port
                        });
                    }

                    if(!self.options.namespaces){
                        nextQuestions.push({
                            type: 'list',
                            name: 'namespaces',
                            message: 'Are namespaces used in the REST API?',
                            default: 'never',
                            store: false,
                            choices: [{
                                name: 'Namespaces are used',
                                value: 'always'
                            },
                            {
                                name: 'Namespaces are not used',
                                value: 'never'
                            }
                            ],
                            validate: Validate.Namespaces
                        });
                    }

                    if(!self.options.travis){
                        nextQuestions.push({
                            type: 'confirm',
                            name: 'travis',
                            message: 'Would you like to generate a Travis CI pipeline configuration file?',
                            default: true,
                            store: false,
                            validate: Validate.Travis
                        });
                    }


                }

                // Ask final questions...
                return self.prompt(nextQuestions).then(function(answers){

                    // Set final answers

                    address = self.options.address || answers.address;
                    port = self.options.port || answers.port;
                    namespaces = self.options.namespaces || answers.namespaces;
                    travis = self.options.travis || answers.travis;
                });

            });
        });

    }

    // Configure business network connection
    configuring(){
        businessNetworkConnection = new BusinessNetworkConnection();
    }

    // Start to generate the mobile application
    writing(){
        return new Promise((resolve, reject) => {

            // If connecting to a business network, prepare connection
            if(method === 'connect') {

                // Connect using the given business network card
                return businessNetworkConnection.connect(card).then((result) => {
                    // Get business network definition
                    businessNetworkDefinition = result;
                    return businessNetworkConnection.disconnect();
                }).then(() => {
                    resolve(this._setDestination());
                }).catch((err) => {
                    reject(err);
                });
            }
            // If using a business network archive file, prepare to read file given
            else{
                fs.readFile(file, (err, buffer) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        // Read business network archive file
                        return BusinessNetworkDefinition.fromArchive(buffer).then((result) => {
                            // Get business network definition
                            businessNetworkDefinition = result;
                            resolve(this._setDestination());
                        }).catch((err) => {
                            reject(err);
                        });
                    }

                });
            }
        }).then(() => {

            // Read the business network definition, now we can generate files
            return this._generateApplication().then(() =>{
                if(this.options.zip === 'true' || this.options.zip === true){
                    shell.cd('..');
                }
            });

        }).catch((error) => {
            throw Error(error);
        });

    }

    // Set the output directory location
    _setDestination(){
        return new Promise((resolve, reject) => {
            this.destinationRoot(name);
            destinationPath = this.destinationPath();
            resolve();
        });
    }

    // Generate mobile application using business network definition
    _generateApplication(){

        return new Promise((resolve, reject) => {

            businessNetworkIdentifier = businessNetworkDefinition.getIdentifier();

            modelManager = businessNetworkDefinition.getIntrospector().getModelManager();
            namespaceList = modelManager.getNamespaces();
            enumerationsList = modelManager.getEnumDeclarations();
            shell.mkdir('-p', destinationPath + '/src/');

            // For each namespace in the business networks models...
            namespaceList.forEach((namespace) => {

                let modelFile = modelManager.getModelFile(namespace);

                // Put all the resource declarations in an array
                let declarations = [];
                declarations = declarations.concat(modelFile.getAssetDeclarations());
                declarations = declarations.concat(modelFile.getParticipantDeclarations());
                declarations = declarations.concat(modelFile.getTransactionDeclarations());


                declarations.filter((declaration) =>{
                    // Check if declaration is an abstract type, if so, ignore it.
                    return !declaration.isAbstract();
                }).filter((declaration) => {
                    if(declaration.isSystemType()) {
                        // Check if declaration is a system type, if so, ignore it.
                        return declaration.isSystemCoreType();
                    }
                    return true;
                }).forEach((declaration) => {
                    // For each resource declaration which isn't abstract or a system type...

                    let properties = [];

                    // Get the resource declarations properties
                    declarationProperties = declaration.getProperties();

                    declarationProperties.forEach((property) => {
                        properties.push(this._setProperties(property));
                    });

                    // Build resource definition context
                    let declarationType = this._getDeclarationType(declaration);
                    if(declarationType === 'asset'){
                        assetList.push({
                            'type': 'asset',
                            'name': declaration.name,
                            'namespace': declaration.getNamespace(),
                            'properties': properties,
                            'identifier': declaration.getIdentifierFieldName()
                        });
                        assetServiceNames.push(declaration.name + 'Service');
                        assetComponentNames.push(declaration.name + 'Component');
                    }
                    else if(declarationType === 'participant'){
                        participantList.push({
                            'type': 'participant',
                            'name': declaration.name,
                            'namespace': declaration.getNamespace(),
                            'properties': properties,
                            'identifier': declaration.getIdentifierFieldName()
                        });
                        participantServiceNames.push(declaration.name + 'Service');
                        participantComponentNames.push(declaration.name + 'Component');
                    }
                    else{
                        transactionList.push({
                            'type': 'transaction',
                            'name': declaration.name,
                            'namespace': declaration.getNamespace(),
                            'properties': properties,
                            'identifier': declaration.getIdentifierFieldName()
                        });
                        transactionServiceNames.push(declaration.name + 'Service');
                        transactionComponentNames.push(declaration.name + 'Component');
                    }

                    let folder = declarationType.concat('s/');

                    // Create a directory for each resource definition type
                    shell.mkdir('-p', destinationPath + '/src/app/pages/' + folder + declaration.name);
                });

            });

            definitionList = definitionList.concat(assetList);
            definitionList = definitionList.concat(participantList);
            definitionList = definitionList.concat(transactionList);



            this.fs.copy(this.templatePath('resources'),this.destinationPath('resources'),{ overwrite: true });

            /*
				This is responsible for copying across the bulk of the generic files.
				As well as copying the files, it also writes data (template context) from the user’s options such as
				the mobile application name, description, author name, etc., to the generic templates.
			*/
            this.fs.copyTpl(
                this.templatePath('**/!(node_modules|resources|typings|template|Transaction|*.png|_dot_travis.yml)*'),
                this.destinationPath(),
                this._tempateContext()
            );

            this.fs.move(this.destinationPath('_dot_gitignore'), this.destinationPath('.gitignore'));

            if(travis === 'true' || travis === true){
                this.fs.copyTpl(this.templatePath('**/_dot_travis.yml'), this.destinationPath(), this._tempateContext());
                this.fs.move(this.destinationPath('_dot_travis.yml'), this.destinationPath('.travis.yml'));
            }

            // For each resource definition...
            definitionList.forEach((definition) => {

                let definitionType = definition.type;
                let definitionCapital = definitionType.charAt(0).toUpperCase() + definitionType.slice(1);
                let definitionTypePlural = definitionType.concat('s/');

                let currentType = 'current'.concat(definitionCapital);
                let currentName = definitionType.concat('Name');
                let currentIdentifier = definitionType.concat('Identifier');

                // Creates resource definition HTML page
                this.fs.copyTpl(
                    this.templatePath('src/app/pages/template/'+definitionType+'/template.component.html'),
                    this.destinationPath('src/app/pages/'+ definitionTypePlural + definition.name + '/' + definition.name + '.component.html'), {
                        [currentType]: definition
                    }
                );

                // Creates resource definition TypeScript component
                this.fs.copyTpl(
                    this.templatePath('src/app/pages/template/'+definitionType+'/template.component.ts'),
                    this.destinationPath('src/app/pages/'+ definitionTypePlural + definition.name + '/' + definition.name + '.component.ts'), {
                        [currentType]: definition,
                        [currentName]: definition.name,
                        namespace: definition.namespace,
                        [currentIdentifier]: definition.identifier,
                        properties: definition.properties
                    }
                );

                // Creates resource definition Unit Test file
                this.fs.copyTpl(
                    this.templatePath('src/app/pages/template/'+definitionType+'/template.component.spec.ts'),
                    this.destinationPath('src/app/pages/'+ definitionTypePlural + definition.name + '/' + definition.name + '.component.spec.ts'), {
                        [currentName]: definition.name,
                        namespace: definition.namespace,
                        [definitionType+'Identifier']: definition.identifier,
                        properties: definition.properties
                    }
                );

                // Create resource definition data Service file
                this.fs.copyTpl(
                    this.templatePath('src/app/pages/template/'+definitionType+'/template.service.ts'),
                    this.destinationPath('src/app/services/'+ definitionTypePlural + definition.name + '/' + definition.name + '.service.ts'), {
                        [currentName]: definition.name,
                        namespace: definition.namespace,
                        apiNamespace: namespaces
                    }
                );

                // Create resource definition scss styling
                this.fs.copyTpl(
                    this.templatePath('src/app/pages/template/'+definitionType+'/template.component.scss'),
                    this.destinationPath('src/app/pages/'+ definitionTypePlural + definition.name + '/' + definition.name + '.component.scss'), {
                        [currentType]: definition
                    }
                );

                // Create resource definition service tests
                this.fs.copyTpl(
                    this.templatePath('src/app/pages/template/'+definitionType+'/template.service.spec.ts'),
                    this.destinationPath('src/app/services/'+ definitionTypePlural + definition.name + '/' + definition.name + '.service.spec.ts'), {
                        [currentName]: definition.name,
                        namespace: definition.namespace,
                        [definitionType+'Identifier']: definition.identifier
                    }
                );

                // Create resource definition form html
                this.fs.copyTpl(
                    this.templatePath('src/app/pages/template/'+definitionType+'/template.form.component.html'),
                    this.destinationPath('src/app/pages/'+ definitionTypePlural + definition.name + '/' + definition.name + '.form.component.html'), {
                        [currentType]: definition
                    }
                );

                // Create resource definition form scss styling
                this.fs.copyTpl(
                    this.templatePath('src/app/pages/template/'+definitionType+'/template.form.component.scss'),
                    this.destinationPath('src/app/pages/'+ definitionTypePlural + definition.name + '/' + definition.name + '.form.component.scss'), {
                        [currentType]: definition
                    }
                );

                // Create resource definition form typescript component
                this.fs.copyTpl(
                    this.templatePath('src/app/pages/template/'+definitionType+'/template.form.component.ts'),
                    this.destinationPath('src/app/pages/'+ definitionTypePlural + definition.name + '/' + definition.name + '.form.component.ts'), {
                        [currentType]: definition,
                        [currentName]: definition.name,
                        namespace: definition.namespace,
                        [definitionType+'Identifier']: definition.identifier,
                        properties: definition.properties
                    }
                );

                // Create resource definition form typescript component tests
                this.fs.copyTpl(
                    this.templatePath('src/app/pages/template/'+definitionType+'/template.form.component.spec.ts'),
                    this.destinationPath('src/app/pages/'+ definitionTypePlural + definition.name + '/' + definition.name + '.form.component.spec.ts'), {
                        [currentName]: definition.name,
                        namespace: definition.namespace,
                        [definitionType+'Identifier']: definition.identifier,
                        properties: definition.properties
                    }
                );
            });

            // Use Composer's typescript visitor to create TypeScript class
            let visitor = new TypescriptVisitor();
            let parameters = {
                fileWriter: new FileWriter(this.destinationPath() + '/src/app')
            };

            modelManager.accept(visitor, parameters);

            definitionList = [];
            assetList = [];
            assetComponentNames = [];
            assetServiceNames = [];
            participantList = [];
            participantComponentNames = [];
            participantServiceNames = [];
            transactionList = [];
            transactionComponentNames = [];
            transactionServiceNames = [];

            resolve();

        }).then(() => {
            log(chalk.yellowBright.bold('\nGenerating application...\n'));
        }).catch((error) => {
            throw Error(error);
        });
    }

    // Create resource definition properties context
    _setProperties(property){
        let enumValues = [];

        if(property.constructor.name === 'Field'){
            if(property.isTypeEnum()){
                enumerationsList.forEach(enumeration => {
                    if(enumeration.name === property.getType()){

                        enumeration.properties.forEach(function(value){
                            enumValues.push(value.name);
                        });
                    }
                });
            }
            return{
                'name': property.getName(),
                'type': property.getType(),
                'optional': property.isOptional(),
                'primitive': property.isPrimitive(),
                'default': property.getDefaultValue(),
                'validator': property.getValidator(),
                'array': property.isArray(),
                'enum': property.isTypeEnum(),
                'enumValues':enumValues
            };
        }
        else{ // Must be relationship declaration
            return{
                'name': property.getName(),
                'type': property.getType(),
                'optional': property.isOptional(),
                'primitive': property.isPrimitive(),
                'array': property.isArray(),
                'enum': property.isTypeEnum(),
                'enumValues': enumValues
            };
        }

    }

    // Get the type of resource definition
    _getDeclarationType(declaration){
        let declarationType = declaration.constructor.name.toLowerCase();
        let index = declarationType.indexOf('declaration');
        return declarationType.substring(0,index);
    }

    // Install generated mobile applications dependencies
    install(){
        if(this.options.zip === 'true' || this.options.zip === true){

            let zipArchive = new AdmZip();

            zipArchive.addLocalFolder(name);
            zipArchive.writeZip(name+'.zip');

        }
        else{
            if(this.options['skip-install'] !== true){
                this.installDependencies({bower: false, npm: true});
            }
            else{
                this.log(chalk.yellow.bold('\nSkipping dependency installation\n'));
            }
        }
    }

    // Generic template context. Passed into all files.
    _tempateContext(){
        return{
            appName: name,
            appDescription: description,
            authorName: author,
            authorEmail: email,
            cardName: card,
            apiServer: rest,
            apiIP: address,
            apiPort: port,
            apiNamespace: namespaces,
            travisCi: travis,
            businessNetworkIdentifier: businessNetworkIdentifier,
            namespaceList: namespaceList,
            assetList: assetList,
            assetServiceNames: assetServiceNames,
            assetComponentNames: assetComponentNames,
            participantList: participantList,
            participantServiceNames: participantServiceNames,
            participantComponentNames: participantComponentNames,
            transactionList: transactionList,
            transactionServiceNames: transactionServiceNames,
            transactionComponentNames: transactionComponentNames
        };
    }

    // End the program
    end(){
        log(chalk.green.bold('\nFinished generating mobile application\n'));
        shell.exec('pkill yo');
    }
};
