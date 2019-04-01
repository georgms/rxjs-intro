<?php

header('Content-Type: application/json');
sleep(rand(0, 500) / 1000);
echo file_get_contents('https://en.wikipedia.org/w/api.php?' . http_build_query($_GET));