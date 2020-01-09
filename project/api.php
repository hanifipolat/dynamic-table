<?php

include 'config.php';

if (isset($_POST['add'])) {
  $tmp = new stdClass();
  $name = $_POST['name'];
  $lastname = $_POST['lastname'];
  $number = $_POST['number'];
  $city = $_POST['city'];
  $state = $_POST['state'];
  $query = $db->prepare(" insert into veri set
      name = :name,
      lastname = :lastname,
      number = :number,
      city = :city,
      state = :state
      ");
  $insert = $query->execute(array(
    "name" => $name,
    "lastname" => $lastname,
    "number" => $number,
    "city" => $city,
    "state" => $state,
  ));
  if ($insert) {
    $last_id = $db->lastInsertId();
    $tmp->status = 1;
    $tmp->recordId  = $last_id;
    $tmp->message = "insert işlemi başarılı";
  } else {
    $tmp->status = 0;
    $tmp->message = "Bir hata oluştu";
  }


  echo json_encode($tmp);
}
if (isset($_POST['select'])) {
  $data = $db->query("SELECT * FROM veri", PDO::FETCH_ASSOC);

  $dbResult = $data->fetchAll();
  echo json_encode($dbResult);
}
if (isset($_POST['stateid'])) {

  $id = $_POST['stateid'];
  $name = $_POST['stateName'];
  if ($name == "Aktif") {
    $query = $db->prepare("UPDATE veri SET 
    state = :state
    WHERE id = :id");
    $update = $query->execute(array(
      "state" => "Pasif",
      "id" => $id
    ));
    if ($update) {
      print "Pasif";
    }
  } else {
    $query = $db->prepare("UPDATE veri SET
    state = :state
    WHERE id = :id");
    $update = $query->execute(array(
      "state" => "Aktif",
      "id" => $id
    ));
    if ($update) {
      echo "Aktif";
    }
  }
}
if (isset($_POST['update'])) {
  $id = $_POST['update'];
  $name = $_POST['name'];
  $lastName = $_POST['lastname'];
  $city = $_POST['city'];
  $number = $_POST['number'];
  $query = $db->prepare("UPDATE veri SET
    name = :name,
    lastname = :lastname,
    number = :number,
    city = :city
    WHERE id = :id");
  $update = $query->execute(array(
    "name" => $name,
    "lastname" => $lastName,
    "number" => $number,
    "city" => $city,
    "id" => $id
  ));
  if ($update) {
  }
}
if (isset($_POST['del'])) {
  $id = $_POST['del'];
  $count = $db->prepare("delete from veri where id = $id ");
  $count->execute();
}
