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
        $select_plans = $connection->prepare("SELECT * FROM plan WHERE id > 1"); // filter out the test plan
        $select_plans->execute();
        $result = $select_plans->get_result();
        
        incrementCookie() ;
        printCookie();

        while ($row = $result->fetch_assoc()) {
            echo "<h1> ID: ".$row['id']."</h1>";
            echo "<p> Möbel: ".$row['furniture']."</p>";
            echo "<p> Erstellt am: ".$row['created_at']."</p>";
        }
    }
    
    define('COOKIENAME', 'created_plans_count');

    function incrementCookie(){
        $count = 0;

        if (isset($_COOKIE[COOKIENAME])){
            $count = intval($_COOKIE[COOKIENAME]);
        }

        setcookie(COOKIENAME, $count+1, time() + 3600*24, "/");
        $_COOKIE[COOKIENAME] = $count+1;
    }

    function printCookie(){
        if (isset($_COOKIE[COOKIENAME])){
            echo "<p>Anzahl Aufrufe: ".$_COOKIE[COOKIENAME]."</p>";
        }
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
    $DBConnection = connectDB();

    echo createPlan(
        $DBConnection,
        $_POST['data']
    );

    printSavedPlans($DBConnection);

    closeDB($DBConnection);
?>