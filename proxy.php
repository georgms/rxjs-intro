<?php

header('Content-Type: application/json');

$seconds = (11 - strlen($_GET['search'])) / 10;
sleep($seconds);

$params = array_merge([
    'action' => 'opensearch',
], $_GET);
$url = 'https://en.wikipedia.org/w/api.php?' . http_build_query($params);

echo file_get_contents($url);
