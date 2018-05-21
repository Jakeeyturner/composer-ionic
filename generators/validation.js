'use strict';

class Validate {

    static Method(method){
        if(method != 'connect' || method != 'supply'){
            return 'The method must either be \'connect\' or \'supply\'. Please enter the method again.';
        }
        else{
            return true;
        }
    }


    static Name(name){
        if(name == null || name == undefined || name == '' || name.indexOf(' ') > -1){
            return 'The mobile application name cannot be empty or contain any spaces. Please enter a valid application name.';
        }
        else{
            return true;
        }
    }

    static Description(description) {
        if(description == null || description == undefined || description == ''){
            return 'The mobile application description cannot be empty. Please enter a valid description.';
        } else {
            return true;
        }
    }

    static Author(author){
        if(author == null || author == undefined || author == ''){
            return 'The authors name cannot be empty. Please enter a valid author name.';
        }
        else{
            return true;
        }
    }

    static Email(email) {
        if(email == null || email == undefined || email == '' || email.indexOf('@') < 0){
            return 'The authors email must be a valid and cannot be empty. Please enter a valid email address.';
        } else {
            return true;
        }
    }

    static Card(card){
        if(card == null || card == undefined || card == ''){
            return 'The business network card name cannot be empty. Please enter a valid business network card.';
        }
        else{
            return true;
        }
    }

    static Rest(rest){
        if(rest != 'generate' || rest != 'connect'){
            return 'The rest option must either be \'generate\' or \'connect\'. Please enter the rest method again.';
        }
        else{
            return true;
        }
    }

    static File(file){
        if(file == null || file == undefined || file == '' || !file.endsWith('.bna')){
            return 'The business network archive file must be valid. Try checking that the file exists. Please enter a valid business network archive file.';
        }
        else{
            return true;
        }
    }

    static Port(port){
        if(port == null || port == undefined || port == '' || parseInt(port) > 65535 || parseInt(port) < 1 || !Number.isInteger(parseInt(port))){
            return 'The port number must be a valid integer. Please enter a valid port number.';
        }
        else{
            return true;
        }
    }

    static Namespaces(namespaces){
        if(namespaces != 'always' || namespaces != 'never'){
            return 'The namespaces option must either be \'always\' or \'never\'. Please enter the namespaces method again.';
        }
        else{
            return true;
        }
    }

    static Address(address){
        if(address == null || address == undefined || address == ''){
            return 'The Rest API address cannot be empty. Please enter a valid Rest API address (excluding the port).';
        }
        else{
            return true;
        }
    }

    static Travis(travis){
        if(travis != 'true' || travis != 'false'){
            return 'The travis option must either be \'true\' or \'false\'. Please enter a valid boolean.';
        }
        else{
            return true;
        }
    }
}

module.exports = Validate;
