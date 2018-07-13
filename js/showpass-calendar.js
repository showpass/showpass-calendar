(function($) {

    $(document).ready(function() {

      $('.showpass-calendar .calendar-contain-desktop').show();

    	var months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May' , 'Jun' , 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    	var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      var calendar_day = $('#calendar-day').val();
      var calendar_month = $('#calendar-month').val()-1;
      var calendar_year= $('#calendar-year').val();
      var use_widget = $('#use-widget').val();
    	var now = new Date(calendar_year, calendar_month, calendar_day);
    	var cur_month = now.getMonth();
    	var cur_year = now.getFullYear();
    	var today_first = parseInt($('#current_day').val());
    	var month_enable = $('#month_enable').val();
    	var week_enable = $('#week_enable').val();
    	var current_day = now.getDay();
      var widget_class = '';
      if (use_widget) {
          widget_class = 'open-ticket-widget'
      }

    	$('.showpass-prev-month').click(function() {

    		var month_number = parseInt($(this).attr('data-month'));
    		var year = parseInt($('.showpass-year').text());
            $('.showpass-next-month').show();
    		if (month_number == 0) {
    			month_number = 12;
    			year = year - 1;
    		}

    		if (month_number == (cur_month+1)) {
    			$(this).hide();
    		}

    		$('.showpass-month').html(months[month_number]);
    		$(this).attr('data-month', month_number - 1);
    		$('.showpass-next-month').attr('data-month', month_number + 1);
    		$('.showpass-year').text(year);

    		renderCalendar(year, month_number);

    	});

    	$('.showpass-next-month').click(function() {
    		var month_number = parseInt($(this).attr('data-month'));
    		var year = parseInt($('.showpass-year').text());
    		$('.showpass-prev-month').show();

    		if(month_number == 13) {
    			month_number = 1;
    			$('.showpass-year').text(year + 1);
    			year++;
    		}

    		if(month_number == cur_month && year == (cur_year+1)) {
    			$(this).hide();
    		}

    		$('.showpass-month').html(months[month_number]);
    		$(this).attr('data-month', month_number + 1);
    		$('.showpass-prev-month').attr('data-month', month_number - 1);
    		renderCalendar(year, month_number);

    	});

    	function renderCalendar (year , month) {

    		$('.loader-home').show();
    		var d = new Date();
    		var current_month = d.getMonth();
    		var page_type = $('#page_type').val();
    		var site_url = $('#site_url').val();
    		$('.showpass-calendar-body').empty();
        $('.showpass-calendar-mobile').empty();
    		var firstDay = new Date(year, month-1 , 1);  //  number + 1 = current
    		var firstDayString = firstDay.toString();
    		var first_day = firstDayString.substring(0,3).toLowerCase();
    		var first_day_of_the_month = days.indexOf(first_day);
    		var days_in_month = new Date(year, month, 0).getDate(); //excactly
    		var html = "";

    		var venue = $('#venue_id').val();

    		if (venue) {

    			var url = "https://www.showpass.com/api/public/events/?venue__in=" + venue + "&page_size=1000";

    			$.ajax({
    				method: "GET",
    				url: url,
    				success: function(data) {
    					if(first_day_of_the_month == 7) {
    						for (var j = first_day_of_the_month - 6; j <= days_in_month; j++) {
    							for (var i = 0; i < data.results.length; i++) {
    								var date_month = data.results[i].starts_on;
    								var date_day = date_month.split("-");
    								var day_event = parseInt(date_day[2].substring(0,2));
    								var month_event = parseInt(date_day[1]);
    								var year_event = parseInt(date_day[0]);
    								var image_event = data.results[i].thumbnail;
    								var event_slug = data.results[i].slug;

    								if(page_type !== "") {
    									var url_event = site_url + "/" + page_type + "?slug=" + event_slug;
    								} else {
    									var url_event = data.results[i].frontend_details_url;
    								}

    								if((month == month_event) && (j == day_event)) {
    									html += '<div class="showpass-calendar-item"></div>';
    								} else {
    									html += '<div class="showpass-calendar-item"></div>';
    								}
    							}
    						}
    					} else {
    						for(var j = (first_day_of_the_month * (-1)) + 1; j <= days_in_month; j++ ) {
    							if (j < 1) {
    								html += "<div class='showpass-calendar-item'></div>";
    							} else {
    								html += "<div class='showpass-calendar-item'><div class='day_number_showpass'>" + j + "</div><div id='event_on_" + month + "_" + j + "' class='showpass-calendar-item-event-container'></div></div>";
    							}
    						}
    					}

    					$('.showpass-calendar-body').html(html);

              var eventCounter = 0;
    					for (var i = 0; i < data.results.length; i++) {
    						var timezone = data.results[i].timezone;
    						var date_month = data.results[i].starts_on;
    						var a = moment(date_month).tz(timezone).format();
    						date_month = a;
    						var date_day = date_month.split("-");
    						var day_event = parseInt(date_day[2].substring(0,2));
    						var month_event = parseInt(date_day[1]);
    						var year_event = parseInt(date_day[0]);
    						var event_name = data.results[i].name;
    						var event_slug = data.results[i].slug;
                var event_location = data.results[i].location.name;
                var event_city = data.results[i].location.city + ', ' + data.results[i].location.province
                var timezone = moment.tz(data.results[i].timezone).format('z')
                var image_event = data.results[i].image;
                var image_banner = data.results[i].image_banner;
                if (!image_event) {
                    image_event = 'https://showpass-live.s3.amazonaws.com/static/assets/img/default-square.png'
                }

                if (page_type !== "" || widget_class !=='') {
                    var url_event = site_url + "/" + page_type + "?slug=" + event_slug;
                    var target = "_self";
                } else {
                    var url_event = data.results[i].frontend_details_url;
                    var target = "_blank"
                }

    						if (month == month_event && year == year_event) {
    							var tmp = month_event + '_' + day_event;
                  var html_tmp = "<div class='showpass-calendar-item-single open-showpass-widget' data-slug='"+ event_slug + "' data-month='" + month + "' data-day='" + day_event + "' data-year='" + year +"' style='background:url(" + image_event + ") no-repeat'>" +
                  "</div>";

                 $('#event_on_' + tmp).append(html_tmp);

                  eventCounter++;
              }
            }

            $('.loader-home').hide();

          }});
    		}
    	}  // ending render calendar

    	var date_now = now;
    	var month_now = date_now.getMonth();
    	var year_now = date_now.getFullYear();

    	if (month_enable === 'disabled')	{

    		// $('.showpass-week-view').addClass('active');
    		$('.showpass-month-view').hide();
    		var date_now = now;
    		var month_now = date_now.getMonth();
    		var year_now = date_now.getFullYear();
    		// $('#current_day').val(today_first-current_day);
    		current_day = date_now.getDay();
    		$('.showpass-week').html('');
    		$('.showpass-calendar-week').show();
    		renderCalendarWeek(year_now, month_now + 1, today_first);
    		$('#current_day').val(today_first-current_day);
    		$('#current-month').val(month_now +1);
    		$('.showpass-week-view').addClass('active');
    		$('.showpass-month-view').removeClass('active');
    		$('.showpass-calendar-month').hide();
    		$('.showpass-calendar-week').hide();
    		$('.showpass-prev-week').hide();

    	} else if (week_enable === 'disabled') {

    		$('.showpass-week-view').hide();
    		$('.showpass-month-view').css('border-right', '0px');
    		renderCalendar(year_now, month_now + 1);
        //initializeTooltip()

    	} else {

    		renderCalendar(year_now, month_now + 1);

    	}

      $('body').on('click', '.open-showpass-widget', function() {
        var slug = $(this).attr('data-slug');
        if (slug) {
          showpass.tickets.eventPurchaseWidget(slug, {'theme-primary': '#000000', 'theme-dark': true}) // update colors as needed
        }
      });

    });

})(jQuery);
