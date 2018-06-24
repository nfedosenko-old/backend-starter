/* Template	:	ICO Crypto v1.2.4 */
(function ($) {
    'use strict';
    let confirmationToken;
    try {
        confirmationToken = window.location.search.match(/token=([^&]+)/)['1'] ;
    } catch {
        confirmationToken = '';
    }

    // make a api request
    $.post('/api/auth/confirm-email/', { confirmationToken })
        .done(function (res) {
            console.log('res', res);
            window.location.href = '/confirm-success';
        })
        .fail(function (err) {
            window.location.href = '/confirm-failed';
        });
})(jQuery);
