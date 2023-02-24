<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	
	$color = $_POST['color'];
	

	if (empty($color)) {
		header("HTTP/1.1 422");
		exit;
	}
	
	$dates = [
		"red" => [
			"min" => "22.02.2023",
			"max" => "05.03.2023"
		],
		"green" => [
			"min" => "24.02.2023",
			"max" => "08.03.2023"
		],
		"blue" => [
			"min" => "18.02.2023",
			"max" => "01.03.2023"
		]
	];

	header("Content-Type: application/json");
	echo json_encode($dates[$color]);
	exit();
}

header("HTTP/1.1 422");
exit;