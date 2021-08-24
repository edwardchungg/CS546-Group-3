function getLink(event, link){
    event.preventDefault();
    console.log(link);
    window.open(`https://maps.google.com/maps?saddr=Stevens+Institute+of+Technology&daddr=${link.replace(/\s/g, '+')}`)
}
