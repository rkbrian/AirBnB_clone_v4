function itsSoFetch () {
    $.ajax( {
        url:"http://134add2f7e14.4fd667c2.hbtn-cod.io:5001/",
        method:'POST',
        dataType:'json',
        data:JSON.stringify(empty),
        contentType: 'application/json',
        processData:false,
        sucess: function(data) {
            for (const index in places) {
                const place = places[index];
                let artlist = `<article>
                    <div class="title_box">
                      <h2>${ place.name }</h2>
                      <div class="price_by_night">$${ place.price_by_night }</div>
                    </div>
                    <div class="information">
                      <div class="max_guest">${ place.max_guest } Guest`
                    if (place.max_guest !== 1) {
                        artlist += 's';
                    }
                    artlist += `</div>
                    <div class="number_rooms">${ place.number_rooms } Bedroom`
                    if (place.number_rooms !== 1) {
                        artlist += 's';
                    }
                    artlist += `</div>
                    <div class="number_bathrooms">${ place.number_bathrooms } Bathroom`
                    if (place.number_bathrooms !== 1) {
                        artlist += 's';
                    }
                    artlist += `</div>
                </div>
                    <div class="description">
                    ${ place.description | safe }
                    </div>
                </article>`
                    $(".places").append(artlist);
            }
    
        })
    });
}
$(document).ready(function () {
    itsSoFetch();
    const amdict = {};

    // Attach a change event handler to the checkboxes.
    $("input").click(function() {
	$(":input").each(function() {
            if (this.checked===true) {
		amdict[$(this).data('name')] = $(this).data('id');
            } else {
		delete amdict[$(this).data('name')];
	    }
	});
	const arr = [];
	for (const key in amdict) {
	    arr.push(key);
	}
	$(".amenities h4").html(arr.join(', '));
    });
});
              

    $.get('http://0.0.0.0:5001/api/v1/status', function (info) {
        if (info.status === "OK"){
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
    }
});
