import React, {Component} from 'react';
import axios from 'axios';

/* REST API 호출 */
export function callApi(url, data, method, callback) {
    axios({
        method: method,
        url: url,
        data : data,
        responseType: "json"
    }).then(function (response) {
        console.log( '-------------------RESULT-------------------' );
        console.log( response.data );
        console.log( '--------------------------------------------' );
        callback( response.data );
    }).catch(function( e ){
        console.log( '-------------------ERROR!-------------------' );
        console.log(e.message);
        console.log( '--------------------------------------------' );
    });
}

