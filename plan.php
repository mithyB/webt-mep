<?php

    function createPlan($connection, $furniture_json) {
        $insert_plan = $connection->prepare("INSERT INTO plan (furniture, created_at) VALUES (?, now());");
        $insert_plan->bind_param("s", $furniture_json);
        $insert_plan->execute();
        if($insert_plan->affected_rows == 1){
            return "Plan wurde erfolgreich gespeichert!";
        } else {
            return "Plan konnte nicht gespeichert werden!";
        }
    }


    function printSavedPlans($connection){
        $select_plans = $connection->prepare("SELECT * FROM plan");
        $select_plans->execute();
        $result = $select_plans->get_result();
        while ($row = $result->fetch_assoc()) {
            echo "<h1> ID: ".$row['id']."</h1>";
            echo "<h5> Möbel: ".$row['furniture']."</h5>";
            echo "<p> Erstellt am: ".$row['created_at']."</p>";

        }
    }

    function printCookie(){
        if(isset($_COOKIE[COOKIENAME])){
            echo $_COOKIE[COOKIENAME];
        }
    }

    function incrementCookie(){
        $count = 0;
        if(isset($_COOKIE[COOKIENAME])){
            $count = intval($_COOKIE[COOKIENAME]);
        }
        setcookie(COOKIENAME, $count+1, time() + 3600*24, "/");
    }

    function connectDB(){
        $connection = new mysqli("localhost","root","", "plans");
        if($connection->connect_error){
            die("<p style='color:red;'>Error: " .$connection->connect_error."</p>");
        }
        return $connection;
    }

    function closeDB($connection){
        $connection->close();
    }
    
    define('COOKIENAME', 'created_plans_count');
    $DBConnection = connectDB();

    echo createPlan(
        $DBConnection,
        $_POST['data']
    );

    printSavedPlans($DBConnection);

    closeDB($DBConnection);
?>