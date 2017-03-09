export const io = function( url, timeout = 60000, responseType = 'text', method = 'GET', headers = {} ) {
    var request = new XMLHttpRequest();
    var promise = new Promise( ( resolve, reject ) => {
        request.open( method, url, true );
        request.timeout = timeout;
        request.responseType = responseType;
        request.onload = () => {
            if ( request.status === 200 ) {
                if ( [ 'text', 'json' ].indexOf( request.responseType ) > -1 ) {
                    resolve( request.responseText );
                } else {
                    resolve( request.response );
                }
            } else {
                reject( Error( 'Request error with a status of ' + request.statusText ) );
            }
        };
        request.onerror = ( evt ) => {
            reject( Error( 'There was a network error' + evt.toString() ) );
        };
        request.ontimeout = ( evt ) => {
            reject( Error( 'timeout ' + evt.toString() ) );
        };
        request.send();
    } );

    Object.defineProperty( promise, 'request', {
        value: request
    } );

    return promise;
};

export const jsonp = url => {
    return new Promise( (resolve, reject) => {
        const callbackName = '_cdbc_' + Math.round( 100000 * Math.random() );

        window[ callbackName ] = data => {
            delete window[ callbackName ];
            document.body.removeChild( script );
            resolve( data );
        };

        let script = document.createElement( 'script' );
        script.src = url + ( url.indexOf( '?' ) >= 0 ? '&' : '?' ) + 'callback=' + callbackName;
        document.body.appendChild( script );
    });
};