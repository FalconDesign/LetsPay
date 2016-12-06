
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1>
      <?php

      if (isset($_POST['ugive'], $_POST['uget'], $_POST['email'], $_POST['phonenumber'])) {
        echo $_POST['email'];
      }

      ?>
    </h1>
  </body>
</html>
