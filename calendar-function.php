<?php

function wpshp_calendar($atts = null) {
	//$atts["starting_date"] = '01-10-2018'; // 'DD-MM-YYYY' to set the starting date for the calendar
	$organization_id = 5; // enter in showpass organization ID
	$theme = ''; // '' for light theme

  if (isset($atts["starting_date"])) {
    $value = explode('-', $atts["starting_date"]);
    $current_month = date('M', mktime(0, 0, 0, $value[1], $value[0], $value[2]));
    $current_month_number = date('n', mktime(0, 0, 0, $value[1], $value[0], $value[2]));
    $current_month_prev = $current_month_number - 1;
    $current_month_next = $current_month_number + 1;
    $current_year = date('Y', mktime(0, 0, 0, $value[1], $value[0], $value[2]));
    $current_day = date('j', mktime(0, 0, 0, $value[1], $value[0], $value[2]));
    $month = date('m', mktime(0, 0, 0, $value[1], $value[0], $value[2]));
    $days = date('t', mktime(0, 0, 0, $value[1], $value[0], $value[2]));
  } else {
    $current_month = date('M');
    $current_month_number = date('n');
    $current_month_prev = date('n') - 1;
    $current_month_next = date('n') + 1;
    $current_year = date('Y');
    $current_day = date('j');
    $month = date('m');
    $days = date('t');
  }
  if (isset($atts["use_widget"])) {
    $use_widget = true;
  }else {
		$use_widget = false;
	}
	$prev_week = (int)$current_day - 7;
	$next_week = (int)$current_day + 7;
	$first = '01-' . $month . "-" . $current_year;
	$first_of_the_month_day = date('N', strtotime($first));
	$array_days = array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');
	$array_months = array('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
	$html = "<div class='showpass-calendar " .  $theme . "'>";
	//$html .= "<div class='showpass-month-view showpass-view active'>Month View</div>";
	//$html .= "<div class='showpass-week-view showpass-view'>Week View</div>";
  if (isset($page)) {
    $html .= "<input type='hidden' id='page_type' value='" . $page . "' />";
  } else {
    $html .= "<input type='hidden' id='page_type' value='' />";
  }
  $html .= "<input type='hidden' id='calendar-day' value='" . $current_day . "' />";
	$html .= "<input type='hidden' id='calendar-month' value='" . $month . "' />";
  $html .= "<input type='hidden' id='calendar-year' value='" . $current_year . "' />";
	$html .= "<input type='hidden' id='current_day' value='" . $current_day . "' />";
	$html .= "<input type='hidden' id='current-month' value='" . $current_month_number . "' />";
  $html .= "<input type='hidden' id='current-month' value='" . $current_year . "' />";
	//$html .= "<input type='hidden' id='site_url' value='" . get_home_url() . "' />";
	$html .= "<input type='hidden' id='venue_id' value='" . $organization_id . "' />";
  $html .= "<input type='hidden' id='use-widget' value='" . $use_widget . "' />";
  if (isset($month_enable)) {
    $html .= "<input type='hidden' id='month_enable' value='" . $month_enable . "' />";
  }
  if (isset($week_enable)) {
    $html .= "<input type='hidden' id='week_enable' value='" . $week_enable . "' />";
  }
	$html .= "<div class='showpass-calendar-month'><div class='showpass-prev-month' data-month='" .$current_month_prev . "'></div><p class='showpass-month'>" . $current_month ."</p> <p class='showpass-year'>" . $current_year ."</p><div class='showpass-next-month' data-month='" . $current_month_next . "'></div></div>";
	$html .= "<div class='showpass-calendar-week'><div class='showpass-prev-week' data-prev-week='" . $prev_week . "'></div><p class='showpass-week'>Week of " . $current_day ." of " . $current_month . "</p><div class='showpass-next-week' data-next-week='" . $next_week . "'></div> </div>";
  $html .= "<div class='calendar-contain-desktop'><div class='showpass-calendar-head-container clearfix'>";
	for($i = 0; $i < sizeof($array_days); $i++) {
		$html .= "<div class='showpass-calendar-head'>" . $array_days[$i] ."</div>";
	}
  $html .= "</div>";
	$html .= "<div class='calendar-contain'><div class='showpass-calendar-body clearfix'>";
	if($first_of_the_month_day == 7) {
		for($i = (int)$first_of_the_month_day - 6 ; $i <= (int)$days; $i++) {
			$html .= "<div class='showpass-calendar-item'>" . $i ."</div>";
		}
	} else {
		for($i = ((int)$first_of_the_month_day * (-1)) + 1 ; $i <= (int)$days; $i++) {
			if($i < 1) {
				$html .= "<div class='showpass-calendar-item'></div>";
			} else {
				$html .= "<div class='showpass-calendar-item'><div class='day_number_showpass'>" . $i ."</div></div>";
			}
		}
	}
  $html .= "</div><div class='loader-home'><div class='loader'>Loading...</div></div></div></div>";
  $html .= "<div class='calendar-contain-mobile'><div class='showpass-calendar-mobile'></div><div class='loader-home'><div class='loader'>Loading...</div></div></div></div>";
	return $html;
}

?>
