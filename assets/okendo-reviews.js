const dateFormat = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'numeric',
    year: 'numeric'
});

window.okeReviewsWidgetOnInit = function () {
    const reviewMain = document.querySelector('.js-okeReviews-reviews-main');

    // Format the Date of Reviews Widget into Numbers.
    if (reviewMain) {
        const observer = new MutationObserver(formatDateForElement);
        observer.observe(reviewMain, {childList: true});
        formatDateForElement();
    }

    const warButton = document.querySelector(".okeReviews-reviewsWidget-header .js-okeReviews-writeReview");
    const aggregateSummaryTotal = document.querySelector(".okeReviews-reviewsAggregate-summary-total");

    // Move WaR Button below Aggregate Summary Total.
    if (warButton && aggregateSummaryTotal) {
        aggregateSummaryTotal.insertAdjacentElement("afterend", warButton);
    }

}

function formatDateForElement() {
    const reviewDates = document.querySelectorAll('[data-oke-reviews-date]');
    for (const reviewDate of reviewDates) {
        const dateIsoString = reviewDate.getAttribute('data-oke-reviews-date');
        const date = new Date(dateIsoString);
        const localeDate = `${dateFormat.format(date)}`;
        reviewDate.innerText = localeDate;
    }
}