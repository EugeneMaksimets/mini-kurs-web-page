
document.addEventListener('click', function(event) {
    const button = event.target.closest?.(
    'a[href*="secure.wayforpay.com/button/"]'
    );

    if (!button) return;

    // Только обычный клик левой кнопкой мыши
    if (
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
    ) {
        return;
    }

    event.preventDefault();

    const paymentUrl = button.href;

    let redirected = false;

    function redirectToPayment() {
        if (redirected) return;

        redirected = true;
        window.location.href = paymentUrl;
    }

    // Резервный переход через 1,5 секунды
    const fallbackTimer = setTimeout(
        redirectToPayment,
        800
    );

    if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout', {
            content_name: 'Мінікурс із корпусних десертів',
            content_type: 'product',
            currency: 'UAH',
            value: 390
        }, {
            eventCallback: function() {
                clearTimeout(fallbackTimer);
                redirectToPayment();
            },
            eventTimeout: 500
        });
    } else {
        redirectToPayment();
    }
});
