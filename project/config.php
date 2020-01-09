<?php

$dsn = "mysql:host=localhost;dbname=ajax";
$user = "root";
$pass = "pass1234";
try {
    $db = new PDO($dsn, $user, $pass);
} catch (PDOException $e) {
    echo "bağlantı hatası " . $e->getMessage();
}
