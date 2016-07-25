<?php

$url = 'http://localhost:3000/auth';
$data = array(
    'accountNumber' => 1,
    'password' => '123456');

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/json",
        'method'  => 'POST',
        'content' => json_encode($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

// if ($result == FALSE) { /* Handle error */ }
// 	var_dump($result);

$auth = json_decode($result, TRUE);
$token = $auth['result']['accessToken'];

$url = 'http://localhost:3000/loan';
$options = array(
    'http' => array(
        'header'  => "Authorization: {$token}\r\n".
                     "Content-type: application/json",
        'method'  => 'GET'
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo 'GET Response:'.'</br>';
echo $result;

echo '</br></br>';

$data = array(
    'name' => "Kazım",
    'surname' => "Kasnak",
    'identityNumber' => "12345678901",
    'mobilePhone' => "4440123",
    'mobilePhoneAreaCode' => "595",
    'email' => "kazim_kasnak@mail.com",
    'applicationClass' => 'ARACBINEK2EL',
    'amount' => 52400);

$url = 'http://localhost:3000/loan';
$options = array(
    'http' => array(
        'header'  => "Authorization: {$token}\r\n".
                    "Content-type: application/json",
        'method'  => 'POST',
        'content' => json_encode($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo 'POST Response:'.'</br>';
echo $result;