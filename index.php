<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-gb" lang="en-gb" slick-uniqueid="3">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>Showpass Calendar</title>
  <link rel="stylesheet" type="text/css" href="css/showpass-calendar.css">

</head>
<body>

    <?php
      require_once('calendar-function.php');
      echo wpshp_calendar();
    ?>

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js?ver=2.1.0"></script>
    <script type="text/javascript" src="js/moment-timezone.js"></script>
    <script type="text/javascript" src="js/timezone.js"></script>
    <script type="text/javascript" src="js/showpass-sdk.js"></script>
    <script type="text/javascript" src="js/showpass-calendar.js?v=2.0"></script>

</body>
</html>
