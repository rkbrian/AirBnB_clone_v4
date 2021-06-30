function itsSoFetch (amenities) {
    if (amenities === undefined) {
        amenities = {};
    }
    console.log(amenities);
    $.ajax({
      url: 'http://134add2f7e14.4fd667c2.hbtn-cod.io:5001/api/v1/places_search',
      data: JSON.stringify(amenities),
      method: 'POST',
      dataType: 'json',      
      processData: false,
      contentType: 'application/json',
      success: function (places) {
        $('.places').html('');
        for (const index in places) {
          const place = places[index];
          let artlist = `<article>
                      <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                      </div>
                      <div class="information">
                        <div class="max_guest">${place.max_guest} Guest`;
          if (place.max_guest !== 1) {
            artlist += 's';
          }
          artlist += `</div> 
                      <div class="number_rooms">${place.number_rooms} Bedroom`;
          if (place.number_rooms !== 1) {
            artlist += 's';
          }
          artlist += `</div>
                      <div class="number_bathrooms">${place.number_bathrooms} Bathroom`;
          if (place.number_bathrooms !== 1) {
            artlist += 's';
          }
          artlist += `</div>
                  </div>
                      <div class="description">
                      ${place.description}
                      </div>
                  </article>`;
          $('.places').append(artlist);
        }
      }
    });
  }
  const amdict = {};
  $(document).ready(function () {
    itsSoFetch();
    // Attach a change event handler to the checkboxes.
    $('input').click(function () {
      $(':input').each(function () {
        if (this.checked === true) {
          amdict[$(this).data('name')] = $(this).data('id');
        } else {
          delete amdict[$(this).data('name')];
        }
      });
      const arr = [];
      for (const key in amdict) {
        arr.push(key);
      }
      $('.amenities h4').html(arr.join(', '));
    });
    $.get('http://0.0.0.0:5001/api/v1/status', function (info) {
      if (info.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
    $('button').click(function () {
      const arr = [];
      for (const key in amdict) {
        arr.push(amdict[key]);
      }
      itsSoFetch({ amenities: arr });
    });
  });