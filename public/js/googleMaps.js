function getLink(event, link){
    event.preventDefault();
    const address = link.getAttribute("href");
    window.open(`https://maps.google.com/maps?saddr=Stevens+Institute+of+Technology&daddr=${address.replace(/\s/g, '+')}`)
}
